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
  ) {}

  initializeContract() {
    this.web3Service
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
      let fromAccount = this.web3Service.activeAccount;
      let result = await instance.reserveName(name, {
        from: fromAccount,
        value: web3.utils.toWei(fee, "ether")
      });

      this.storeService.addtoLocalStore(name, fee, fromAccount);
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
      .then(function(price) {
        console.log(price);
        return price;
      })
      .catch(err => {
        console.log(err);
      });
  }

  public bidOnName(name: string, bid: string) {
    return this.DNSRegistry.deployed().then(instance => {
      return instance
        .bid(name, {
          from: this.web3Service.activeAccount,
          value: web3.utils.toWei(bid, "ether")
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
      // .then( () => {
      //   return instance.getHighestBidSoFar.call(name).then(function (reserved) {
      //     console.log(reserved);
      //     return reserved;
      //   });
      // });
    });
  }

  public getOwner(name: String) {
    return this.DNSRegistry.deployed().then(instance => {
      return instance.getCurrentOwnerOfName.call(name).then(function(owner) {
        console.log(owner);
        return owner;
      });
    });
  }

  public getHighestBid(name: String) {
    return this.DNSRegistry.deployed().then(instance => {
      return instance.getHighestBidSoFar.call(name).then(function(bidValue) {
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
      this.storeService.removeFromLocalStore(
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
}
