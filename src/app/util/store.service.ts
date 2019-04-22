import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { BehaviorSubject, Observable } from "rxjs";
import { Web3Service } from "./web3.service";

export interface Name {
  name: string;
  fee: string;
}

@Injectable()
export class StoreService {
  constructor(private web3Service: Web3Service) {
    this.watchAccount();
  }

  // nameSubject = new BehaviorSubject<Name[]>(this.getUsers());
  private nameSubject: BehaviorSubject<Name[]> = new BehaviorSubject([]);

  namesObservable: Observable<Name[]> = this.nameSubject.asObservable();

  // private reservedNames: Array<Name>;

  public addtoLocalStore(name: string, fee: string, ownerAddress: string) {
    let nameObj: Name = { name: name, fee: fee };
    let ownedNames: Name[] = JSON.parse(
      localStorage.getItem(ownerAddress.toLowerCase())
    );
    if (!ownedNames || !ownedNames.length) {
      ownedNames = [];
    }

    // this.reservedNames.push(nameObj);
    // let x = this.reservedNames;
    localStorage.setItem(
      ownerAddress.toLowerCase(),
      JSON.stringify([...ownedNames, nameObj])
    );
    this.nameSubject.next([...ownedNames, nameObj]);
  }

  // public getAllFromLocalStore(): Observable<Name[]> {
  //   return this.web3Service.accountObservable.map(ownerAddress => {
  //     let names = localStorage.getItem(ownerAddress.toLowerCase());
  //     return JSON.parse(names);
  //   });
  // }

  public removeFromLocalStore(name: String, ownerAddress: string) {
    let ownedNames: Name[] = JSON.parse(
      localStorage.getItem(ownerAddress.toLowerCase())
    );
    // using lodash remove to  remove the element
    var removed = _.remove(ownedNames, item => item.name === name);
    localStorage.setItem(
      ownerAddress.toLowerCase(),
      JSON.stringify(ownedNames)
    );
    this.nameSubject.next(ownedNames);
  }

  // private getUsers(): Name[] {
  //   let ownerAddress = this.web3Service.activeAccount;
  //   let names = localStorage.getItem(ownerAddress.toLowerCase());
  //   this.reservedNames = JSON.parse(names);
  //   return this.reservedNames;
  // }

  public watchAccount() {
    this.web3Service.accountObservable.subscribe(acc => {
      let names = localStorage.getItem(acc.toLowerCase());
      this.nameSubject.next(JSON.parse(names));
    });
  }
}
