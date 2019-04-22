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

  nameSubject = new BehaviorSubject<Name[]>(this.getUsers());

  private reservedNames: Array<Name>;

  public addtoLocalStore(name: string, fee: string, ownerAddress: string) {
    // Difference between String(class) and string(Primitive) - use and prefer Primitives
    let nameObj: Name = { name: name, fee: fee };
    this.reservedNames = JSON.parse(
      localStorage.getItem(ownerAddress.toLowerCase())
    );
    if (!this.reservedNames || !this.reservedNames.length) {
      this.reservedNames = [];
    }

    this.reservedNames.push(nameObj);
    let x = this.reservedNames;
    localStorage.setItem(ownerAddress.toLowerCase(), JSON.stringify(x));
    this.nameSubject.next(x);
  }

  public getAllFromLocalStore(): Observable<Name[]> {
    return this.nameSubject.asObservable();
  }

  public removeFromLocalStore(name: String, ownerAddress: string) {
    this.reservedNames = JSON.parse(
      localStorage.getItem(ownerAddress.toLowerCase())
    );
    // using lodash remove to  remove the element
    var removed = _.remove(this.reservedNames, item => item.name === name);
    localStorage.setItem(
      ownerAddress.toLowerCase(),
      JSON.stringify(this.reservedNames)
    );
    this.nameSubject.next(this.reservedNames);
  }

  private getUsers(): Name[] {
    let ownerAddress = this.web3Service.activeAccount;
    let names = localStorage.getItem(ownerAddress.toLowerCase());
    this.reservedNames = JSON.parse(names);
    return this.reservedNames;
  }

  public watchAccount() {
    this.web3Service.accountObservable.subscribe(acc => {
      console.log(" 1 " + acc);
      let names = localStorage.getItem(acc.toLowerCase());
      console.log(names);
      this.reservedNames = JSON.parse(names);
      this.nameSubject.next(this.reservedNames);
    });
  }
}
