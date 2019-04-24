import { Component, ViewChild, OnInit } from "@angular/core";
import { NameService } from "./../name.service";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { from } from "rxjs/observable/from";
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: "app-name-check",
  templateUrl: "./name-check.component.html",
  styleUrls: ["./name-check.component.css"]
})
export class NameCheckComponent {
  form: FormGroup;
  metamaskAcc: string;

  @ViewChild("modal")
  private _modal: ModalComponent;

  constructor(
    private formBuilder: FormBuilder,
    private nameService: NameService
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      nameUsd: [
        "",
        Validators.compose([Validators.required, Validators.minLength(4)])
      ]
    });
  }
  public async isNameAvailable() {
    let name = this.form.value.nameUsd;
    let value = await this.nameService.isNameAvailable(name);
    if (value) {
      // name is reserved
      // Reserved by who
      let reservedBy: string = await this.nameService.getOwner(name);
      // What is the cost
      let namePrice = await this.nameService.getHighestBid(name);

      this._modal._displayResult = "Name is Reserved";
      this._modal._results.owner = reservedBy;
      this._modal._results.price = namePrice;
    } else {
      this._modal._displayResult = "Name Not Reserved";
    }
    // this.nameService.isNameAvailable(this.form.value.nameUsd).then(value => {
    //   if (value) this._modal._displayResult = "Name is reserved";
    //   else
    // });
    // this.form.reset();
  }
}
