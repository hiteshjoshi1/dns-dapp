import { Injectable } from '@angular/core';
import { Web3Service } from './util/web3.service';
import * as dns_contract_json from './../../build/contracts/DNSRegistry.json';

declare let require: any;
const web3 = require('web3');

@Injectable()
export class NameService {

  DNSRegistry: any;
  constructor(private web3Service: Web3Service) {
  }

  initializeContract() {
    this.web3Service.artifactsToContract(dns_contract_json)
      .then((DNSAbstraction) => {
        this.DNSRegistry = DNSAbstraction;
      });
  }

  public isNameAvailable(name: string) {
    return this.DNSRegistry.deployed().then(function (instance) {
      return instance.checkNameExists.call(name);
    }).then(function (reserved) {
      console.log(reserved);
      return reserved;
    }
      );
  }

  public reserveName(name: string, fee: string) {

    return this.DNSRegistry.deployed().then((instance) => {
      console.log(instance);
      console.log(this.web3Service.activeAccount);
      return instance.reserveName(name,
        { from: this.web3Service.activeAccount, value: web3.utils.toWei(fee, "ether") })
        .then(function (result) {
          console.log(result);
        }).catch(err => {
          console.log(err);
        })
        .then(() => {
          return instance.checkNameExists.call(name).then(function (reserved) {
            console.log(reserved);
            return reserved;
          });
        }).catch(err => {
          console.log(err);
        })
    });
  }

  public getPrice(name: string) {
    return this.DNSRegistry.deployed().then((instance) => {
      return instance.checkNamePrice.call(name);
    }).then(function (price) {
      console.log(price);
      return price;
    });
  }

  public bidOnName(name: string, bid: string) {
    return this.DNSRegistry.deployed().then((instance) => {
      return instance.bid(name,
        { from: this.web3Service.activeAccount, value: web3.utils.toWei(bid, "ether") })
        .then((result) => {
          console.log(result);
          return true;
        }, (ex) => {
          console.log(ex);
          return false;
        });
      // .then( () => {
      //   return instance.getHighestBidSoFar.call(name).then(function (reserved) {
      //     console.log(reserved);
      //     return reserved;
      //   });
      // });
    });
  }

  public getOwner(name: String) {
    return this.DNSRegistry.deployed().then((instance) => {
      return instance.getCurrentOwnerOfName.call(name).then(function (owner) {
        console.log(owner);
        return owner;
      });
    });
  }

  public getHighestBid(name: String) {
    return this.DNSRegistry.deployed().then((instance) => {
      return instance.getHighestBidSoFar.call(name).then(function (bidValue) {
        console.log(bidValue);
        return bidValue;
      });
    });
  }

  public sendEtherToName(name: String, amount: number) {
    return this.DNSRegistry.deployed().then((instance) => {
      return instance.sendEtherToName(name, { from: this.web3Service.activeAccount, value: web3.utils.toWei(amount, "ether") })
        .then((result) => {
          console.log(result);
          return true;
        }, (ex) => {
          console.log(ex);
          return false;
        });
    });
  }

  public acceptBidAndTransfer(name: String) {
    return this.DNSRegistry.deployed().then((instance) => {
      return instance.acceptBidAndTransferOwnerShip(name, { from: this.web3Service.activeAccount })
        .then((result) => {
          console.log(result);
          return true;
        }, (ex) => {
          console.log(ex);
          return false;
        });
    });
  }

  public withdrawBid(name: String) {
    return this.DNSRegistry.deployed().then((instance) => {
      return instance.getHighestBidder.call(name).then(
        (bidder) => {
          console.log("bidder", bidder);
          if (bidder != this.web3Service.activeAccount) {
            return instance.withdrawOverBiddenBid(name, { from: this.web3Service.activeAccount })
              .then((result) => {
                console.log(result);
                return "Bid Withdrawn";
              }, (ex) => {
                console.log(ex);
                return "Exception";
              });
          }
          else {
            return "Cannot withdraw Highest bid";
          }
        }
      )
    });
  }

}
