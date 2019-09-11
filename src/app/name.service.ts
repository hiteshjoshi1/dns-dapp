import { Injectable } from "@angular/core";
import { Web3Service } from "./util/web3.service";
import * as dns_contract_json from "./../../build/contracts/DNSRegistry.json";
import { StoreService } from "./util/store.service";

declare let require: any;
const web3 = require("web3");

@Injectable()
export class NameService {
  DNSRegistry: any;

  constructor(
    private storeService: StoreService,
    private web3Service: Web3Service
  ) { }

  async initializeContract() {
    await this.web3Service
      .artifactsToContract(dns_contract_json)
      .then(DNSAbstraction => {
        this.DNSRegistry = DNSAbstraction;
      });
  }

  public async isNameAvailable(name: string) {
    let instance = await this.DNSRegistry.deployed();
    console.log(instance);
    let reserved = await instance.checkNameExists.call(name);
    console.log(reserved);
    return reserved;
  }

  public async reserveName(name: string, fee: string) {
    try {
      let instance = await this.DNSRegistry.deployed();
      console.log(instance.address);
      let fromAccount = this.web3Service.activeAccount;
      console.log(fromAccount);
      let result = await instance.reserveName(name, {
        from: fromAccount,
        value: web3.utils.toWei(fee, "ether")
      });
      console.log(result);
      this.storeService.addNametoLocalStore(name, fee, fromAccount);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  public getPrice(name: string) {
    return this.DNSRegistry.deployed()
      .then(instance => {
        return instance.checkNamePrice.call(name);
      })
      .then(function (price) {
        console.log(price);
        return price;
      })
      .catch(err => {
        console.log(err);
      });
  }

  public async bidOnName(name: string, bid: string) {
    try {
      let fromAccount = this.web3Service.activeAccount;
      let fee = web3.utils.toWei(bid, "ether");
      let instance = await this.DNSRegistry.deployed();
      let result = await instance.bid(name, {
        from: this.web3Service.activeAccount,
        value: web3.utils.toWei(bid, "ether")
      });

      console.log(result);
      this.storeService.addBidToLocalStore(name, fee, fromAccount);
      return result;
    } catch (ex) {
      console.log(ex);
    }
  }

  public getOwner(name: String) {
    return this.DNSRegistry.deployed().then(instance => {
      return instance.getCurrentOwnerOfName.call(name).then(function (owner) {
        console.log(owner);
        return owner;
      });
    });
  }

  public getHighestBid(name: String) {
    return this.DNSRegistry.deployed().then(instance => {
      return instance.getHighestBidSoFar.call(name).then(function (bidValue) {
        console.log(bidValue);
        return bidValue;
      });
    });
  }

  public sendEtherToName(name: String, amount: number) {
    return this.DNSRegistry.deployed().then(instance => {
      return instance
        .sendEtherToName(name, {
          from: this.web3Service.activeAccount,
          value: web3.utils.toWei(amount, "ether")
        })
        .then(
          result => {
            console.log(result);
            return true;
          },
          ex => {
            console.log(ex);
            return false;
          }
        );
    });
  }

  public async acceptBidAndTransfer(name: String) {
    try {
      let instance = await this.DNSRegistry.deployed();
      let result = instance.acceptBidAndTransferOwnerShip(name, {
        from: this.web3Service.activeAccount
      });
      console.log(result);
      this.storeService.removeNameFromLocalStore(
        name,
        this.web3Service.activeAccount
      );
      return true;
    } catch (ex) {
      console.log(ex);
      return false;
    }

    // return this.DNSRegistry.deployed().then(instance => {
    //   return instance
    //     .acceptBidAndTransferOwnerShip(name, {
    //       from: this.web3Service.activeAccount
    //     })
    //     .then(
    //       result => {
    //         console.log(result);
    //         return true;
    //       },
    //       ex => {
    //         console.log(ex);
    //         return false;
    //       }
    //     );
    // });
  }

  public withdrawBid(name: String) {
    return this.DNSRegistry.deployed().then(instance => {
      return instance.getHighestBidder.call(name).then(bidder => {
        console.log("bidder", bidder);
        if (bidder != this.web3Service.activeAccount) {
          return instance
            .withdrawOverBiddenBid(name, {
              from: this.web3Service.activeAccount
            })
            .then(
              result => {
                console.log(result);
                return "Bid Withdrawn";
              },
              ex => {
                console.log(ex);
                return "Exception";
              }
            );
        } else {
          return "Cannot withdraw Highest bid";
        }
      });
    });
  }

  public async listenForTransactionConfirmation(txHash: String) {
    let status = await this.web3Service.getTransactionReceipt(txHash);
    console.log(status);
  }

  public async nameReserveEventHandler() {
    let instance = await this.DNSRegistry.deployed();

    let event = instance.ReserveNameEvent({});
    event
      .on("data", result => {
        console.log("Kaki....");
        console.log(result.args);
      })
      .on("changed", event => {
        console.log("can can");
        console.log(event);
      })
      .on("error", error => console.log(error));
  }

  public async handleBidAcceptedEvent() {
    let instance = await this.DNSRegistry.deployed();

    let event = instance.BidAcceptedEvent({});
    event
      .on("data", result => {
        let newOwner = result.args.newOwner;
        let latestPrice = result.args.latestPrice / 1000000000000000000;
        console.log(result.args.latestPrice);
        console.log(result.args.newOwner);

        let nameOwned = result.args._name;

        this.storeService.removeBidFromLocalStore(
          nameOwned,
          newOwner,
          latestPrice.toString()
        );

        // if (newOwner === this.web3Service.activeAccount) {
        this.storeService.addNametoLocalStore(
          nameOwned,
          latestPrice.toString(),
          newOwner
        );
        // }
      })
      .on("changed", event => {
        console.log(event);
      })
      .on("error", error => console.log(error));
  }
}
