import { Component, ViewChild, ElementRef } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { NameService } from "./name.service";
import { DidService } from './did.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "A Tutorial on distributed DNS";

  constructor(private _nameService: NameService, private _didService: DidService) { }
  async ngOnInit() {
    await this._nameService.initializeContract();
    await this._nameService.nameReserveEventHandler();
    await this._nameService.handleBidAcceptedEvent();
    await this._didService.initializeContract();
  }
}
