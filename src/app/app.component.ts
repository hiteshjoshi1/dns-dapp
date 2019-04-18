import { Component, ViewChild, ElementRef } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { NameService } from "./name.service";
import { Web3Service } from "./util/web3.service";
import { StoreService } from "./util/store.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "A Tutorial on distributed DNS";

  constructor(private _nameService: NameService) {}
  ngOnInit() {
    this._nameService.initializeContract();
  }
}
