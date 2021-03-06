import { Component, ViewChild } from "@angular/core";
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
  selector: "app-name-accept-bid",
  templateUrl: "./name-accept-bid.component.html",
  styleUrls: ["./name-accept-bid.component.css"]
})
export class NameAcceptBidComponent {
  form: FormGroup;

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
        Validators.compose([Validators.required, Validators.minLength(2)])
      ]
    });
  }
  public acceptBid() {
    this.nameService
      .acceptBidAndTransfer(this.form.value.nameUsd)
      .then(value => {
        if (value) this._modal._displayResult = "Bid Acceptance complete";
        else this._modal._displayResult = "Bid Acceptance failed";
      })
      .catch(ex => (this._modal._displayResult = " Exception occurred"));
    this.form.reset();
  }
}
