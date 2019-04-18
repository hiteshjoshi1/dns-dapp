import { Component, OnInit, AfterViewInit } from "@angular/core";
import { StoreService, Name } from "../util/store.service";
import { Web3Service } from "../util/web3.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-my-names",
  templateUrl: "./my-names.component.html",
  styleUrls: ["./my-names.component.css"]
})
export class MyNamesComponent implements OnInit {
  constructor(private storeService: StoreService) {}

  names: Observable<Name[]>;

  ngOnInit() {
    this.names = this.storeService.getAllFromLocalStore();
  }

  // private watchAccount() {
  //   this.web3Service.accountObservable.subscribe(account => {
  //     console.log("Account changed -  fetch the changed Names", account);
  //     // fetch the changed Names
  //     this.refetchUsers();

  //     // this.names = this.storeService.getAllFromLocalStore();
  //   });
  // }
}
