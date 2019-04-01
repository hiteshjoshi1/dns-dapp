import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Rx';
// import * as Web3 from 'web3';
declare let require: any;
const Web3 = require('web3');
import * as contract from 'truffle-contract';

declare let window: any;

@Injectable()
export class Web3Service {
  // private web3: any;
  private accounts: string[];
  public ready = false;
  public accountsObservable = new Subject<string[]>();

  public activeAccount: string;

  constructor() {
    // window.addEventListener('load', event => {
    //   this.bootstrapWeb3();
    // });
    window.addEventListener('load', async () => {
      this.bootstrapWeb3();
    });
  }

  public async bootstrapWeb3() {
    //  if (typeof window.web3 !== 'undefined') {
    //   // Use Mist/MetaMask's provider
    //   this.web3 = new Web3(window.web3.currentProvider);
    // } else {
    //   console.log('No web3? You should consider trying MetaMask!');

    //   // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
    //   Web3.providers.HttpProvider.prototype.sendAsync =
    //     Web3.providers.HttpProvider.prototype.send;
    //   // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)

    //   // this.web3 = new Web3(
    //   //   new Web3.providers.HttpProvider('http://localhost:8545')
    //   // );

    //   this.web3 = new Web3(
    //     new Web3.providers.HttpProvider('http://localhost:8545')
    //   );
    // }

    // this.web3.eth.getAccounts((err, accs) => {
    //   if (err != null) {
    //     console.warn('There was an error fetching your accounts.');
    //     return;
    //   }

    //   this.activeAccount = accs[0];
    // });
    // to get main account

    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
      } catch (error) {
        console.log('User denied account access...');
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }

    setInterval(() => this.refreshAccounts(), 100);
  }

  public async artifactsToContract(artifacts) {
    if (!window.web3) {
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      await delay;
      return await this.artifactsToContract(artifacts);
    }

    const contractAbstraction = contract(artifacts);
    console.log(window.web3.currentProvider);
    contractAbstraction.setProvider(window.web3.currentProvider);
    return contractAbstraction;
  }

  private refreshAccounts() {
    window.web3.eth.getAccounts().then(res => {
      this.activeAccount = res[0];
      this.ready = true;
    });
    // this.web3.eth.getAccounts((err, accs) => {
    //   if (err != null) {
    //     console.warn('There was an error fetching your accounts.');
    //     return;
    //   }

    //   // Get the initial account balance so it can be displayed.
    //   if (accs.length === 0) {
    //     console.warn(
    //       "Couldn't get any accounts! Make sure your Ethereum client is configured correctly."
    //     );
    //     return;
    //   }
    //   if (
    //     !this.accounts ||
    //     this.accounts.length !== accs.length ||
    //     this.accounts[0] !== accs[0]
    //   ) {
    //     this.accountsObservable.next(accs);
    //     this.accounts = accs;
    //     this.activeAccount = accs[0];
    //   }
    //   this.ready = true;
    // });
  }

  // public fixTruffleContractCompatibilityIssue(contract) {
  //   if (typeof contract.currentProvider.sendAsync !== 'function') {
  //     contract.currentProvider.sendAsync = function() {
  //       return contract.currentProvider.send.apply(
  //         contract.currentProvider,
  //         arguments
  //       );
  //     };
  //   }
  //   return contract;
  // }
}
