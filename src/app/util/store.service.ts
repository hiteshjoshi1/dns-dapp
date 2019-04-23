import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Web3Service } from "./web3.service";
import { e } from "@angular/core/src/render3";

export interface Name {
  name: string;
  fee: string;
}

export interface Bids {
  name: string;
  bids: string[];
}

@Injectable()
export class StoreService {
  constructor(private web3Service: Web3Service) {
    this.watchAccount();
  }

  // nameSubject = new BehaviorSubject<Name[]>(this.getUsers());
  private nameSubject: BehaviorSubject<Name[]> = new BehaviorSubject([]);

  namesObservable: Observable<Name[]> = this.nameSubject.asObservable();

  private bidSubject: BehaviorSubject<Bids[]> = new BehaviorSubject([]);

  bidObservable: Observable<Bids[]> = this.bidSubject.asObservable();

  public addNametoLocalStore(name: string, fee: string, ownerAddress: string) {
    let nameObj: Name = { name: name, fee: fee };
    let ownedNames: Name[] = JSON.parse(
      localStorage.getItem(ownerAddress.toLowerCase())
    );
    if (!ownedNames || !ownedNames.length) {
      ownedNames = [];
    }
    localStorage.setItem(
      ownerAddress.toLowerCase(),
      JSON.stringify([...ownedNames, nameObj])
    );
    this.nameSubject.next([...ownedNames, nameObj]);
  }

  public removeNameFromLocalStore(name: String, ownerAddress: string) {
    let ownedNames: Name[] = JSON.parse(
      localStorage.getItem(ownerAddress.toLowerCase())
    );
    // using lodash remove to  remove the element
    let removed = _.remove(ownedNames, item => item.name === name);

    if (!ownedNames || !(ownedNames.length > 0)) {
      localStorage.setItem(ownerAddress.toLowerCase(), JSON.stringify(null));
      this.nameSubject.next(null);
    } else {
      localStorage.setItem(
        ownerAddress.toLowerCase(),
        JSON.stringify(ownedNames)
      );
      this.nameSubject.next(ownedNames);
    }
  }

  public watchAccount() {
    this.web3Service.accountObservable.subscribe(acc => {
      let names = localStorage.getItem(acc.toLowerCase());
      this.nameSubject.next(JSON.parse(names));

      let bids = localStorage.getItem(acc.toLowerCase() + "bid");
      if (!bids) {
        this.bidSubject.next(null);
      }
      this.bidSubject.next(JSON.parse(bids));
    });
  }

  public addBidToLocalStore(
    name: string,
    bidValue: string,
    bidderAddress: string
  ) {
    let key = bidderAddress.toLowerCase() + "bid";
    let myBids: Bids[] = JSON.parse(localStorage.getItem(key));
    let bidInEth = parseInt(bidValue, 10) / 1000000000000000000;
    bidValue = bidInEth.toString();
    if (!myBids || !myBids.length) {
      let bids = [bidValue];
      let bid: Bids = { name, bids };
      myBids = [bid];
    } else {
      // user has bid , but not necessarily on the same name
      let bid: Bids = myBids.find(x => x.name === name);
      if (!bid) {
        let bids = [bidValue];
        let newBid: Bids = { name, bids };
        myBids.push(newBid);
      } else {
        bid.bids.push(bidValue);
      }
    }

    localStorage.setItem(key, JSON.stringify(myBids));

    this.bidSubject.next(myBids);
  }

  public removeBidFromLocalStore(
    name: String,
    bidderAddress: string,
    bidValue: string
  ) {
    let key = bidderAddress.toLowerCase() + "bid";
    let myBids: Bids[] = JSON.parse(localStorage.getItem(key));
    if (myBids) {
      // using lodash remove to  remove the element
      let removed = _.remove(myBids, item => item.name === name);
      console.log(myBids);
      localStorage.setItem(key, JSON.stringify(myBids));
      this.bidSubject.next(myBids);
    }
  }
}
