import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { DidService } from '../did.service';
import web3 from "web3";
// const web3 = require("web3");

@Component({
  selector: 'app-did-events',
  templateUrl: './did-events.component.html',
  styleUrls: ['./did-events.component.css']
})
export class DidEventsComponent implements OnInit {


  ngOnInit() {
  }

  _reserveForm: FormGroup;

  events: any[] = [];

  headElements: string[] = ['Event Type', 'Transaction Hash', 'Type', 'UTF-Type', 'Value', 'UTF-Value', 'Validity'];

  resultMesg: string = null;



  constructor(
    private formBuilder: FormBuilder,
    private didService: DidService
  ) {

    this.createForm();

  }

  createForm() {
    this._reserveForm = this.formBuilder.group({
      didAddress: [
        "",
        Validators.compose([Validators.required, Validators.minLength(2)])
      ]
    });
  }
  public didAddress() {
    let didAddress = this._reserveForm.value.didAddress;
    this.events = [];
    this.didService
      .getHistory(didAddress)
      .then(res => {
        if (res) {
          console.log(this.events);
          this.resultMesg = null;
          // this.events = res;
          res.forEach(element => {
            let event = {
              'eventType': element.event,
              'transactionHash': element.transactionHash,
              'type': element.returnValues.name,
              'utf_type': web3.utils.toUtf8(element.returnValues.name),
              'value': element.returnValues.value,
              'utf_value': web3.utils.toUtf8(element.returnValues.value),
              'valid': element.returnValues.validTo
            };

            this.events.push(event);
          });
          console.log(this.events);
        }
        else if (res == null) {
          this.resultMesg = `No Attributes found for ID ${didAddress}`;

        }
        else {
          this.resultMesg = "Internal Server Error";
        }
        this._reserveForm.reset();
      })
      .catch(ex => {
        console.log(ex);

      });
  }

}
