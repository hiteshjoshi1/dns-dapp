import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-rules",
  templateUrl: "./rules.component.html",
  styleUrls: ["./rules.component.css"]
})
export class RulesComponent implements OnInit {
  constructor() {}

  public rules: string[];

  ngOnInit() {
    this.rules = [
      "Network Used - RINKEBY ",
      "Once a name is reserved the reserving person becomes the name owner.",
      "You can bid on a reserved name in the name auction.",
      "The auction only ends when the name owner accepts the highest bid.",
      "If your bid is over-bidden by another, you can withdraw your locked funds.",
      "Highest bid for a name cannot be withdrawn and is locked in a Smart contract.",
      "Please bid only once on a name, unless you withdrew your bid"
    ];
  }
}
