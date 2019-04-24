import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"]
})
export class ModalComponent implements OnInit {
  @Input()
  public _displayResult: string;

  @Input()
  public _results?: Results = {};

  @Input()
  public modalId: string;

  constructor() {}

  ngOnInit() {}
}

export interface Results {
  owner?: string;
  price?: string;
}
