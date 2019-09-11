import { Injectable } from "@angular/core";

import { Subject, Observable, BehaviorSubject } from "rxjs/Rx";
// import * as Web3 from 'web3';
declare let require: any;
const Web3 = require("web3");
import * as contract from "truffle-contract";
import { from } from "rxjs/observable/from";
import { bindNodeCallback } from "rxjs/observable/bindNodeCallback";
import { of } from "rxjs/observable/of";
import { tap, map, catchError } from "rxjs/operators";

declare let window: any;

@Injectable()
export class Web3Service {
  // private web3: any;
  private accounts: string[];
  public ready = false;

  public accountObservable = new BehaviorSubject<string>(
    window.ethereum.selectedAddress
  );

  public accObs = this.accountObservable.asObservable();

  public activeAccount: string;

  constructor() {
    // window.addEventListener('load', event => {
    //   this.bootstrapWeb3();
    // });
    window.addEventListener("load", async () => {
      this.bootstrapWeb3();
    });

    window.ethereum.on("accountsChanged", async accounts => {
      this.activeAccount = accounts[0];
      this.accountObservable.next(accounts[0]);
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
        console.log("User denied account access...");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }

    await this.refreshAccounts();

    // setInterval(() => this.refreshAccounts(), 100);
  }

  public async artifactsToContract(artifacts) {
    if (!window.web3) {
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      await delay;
      return await this.artifactsToContract(artifacts);
    }

    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(window.web3.currentProvider);
    return contractAbstraction;
  }

  private async refreshAccounts() {
    let accounts = await window.web3.eth.getAccounts();
    this.activeAccount = accounts[0];
    // window.web3.eth.getAccounts().then(res => {
    //   this.activeAccount = res[0];
    this.ready = true;
    // });
  }

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

  public async getTransactionReceipt(txHash: String): Promise<String> {
    let result = await window.web3.eth.getTransactionReceipt(txHash);
    console.log(result);
    return result.status;
    // return "0x1";
    // eth.getTransactionReceipt(transactionHash)
  }

  private getPrimaryAccount(): string {
    return this.activeAccount;
  }

  /** Returns all accounts available */
  // public getAccounts(): Observable<string[]> {
  //   return bindNodeCallback(window.web3.eth.getAccounts())();
  // }

  // /** Get the current account */
  // public currentAccount(): Observable<string | Error> {
  //   if (this.web3.eth.defaultAccount) {
  //     return of(this.web3.eth.defaultAccount);
  //   } else {
  //     return this.getAccounts().pipe(
  //       tap((accounts: string[]) => {
  //         if (accounts.length === 0) { throw new Error('No accounts available'); }
  //       }),
  //       map((accounts: string[]) => accounts[0]),
  //       tap((account: string) => this.web3.defaultAccount = account),
  //       catchError((err: Error) => of(err))
  //     );
  //   }
  // }
}
