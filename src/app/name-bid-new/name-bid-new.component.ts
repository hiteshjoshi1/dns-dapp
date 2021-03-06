import { Component, ViewChild } from '@angular/core';
import {NameService} from './../name.service'; 
import {FormControl, FormGroup, Validators, FormBuilder} from'@angular/forms';
import { from } from 'rxjs/observable/from';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-name-bid-new',
  templateUrl: './name-bid-new.component.html',
  styleUrls: ['./name-bid-new.component.css']
})
export class NameBidNewComponent {

  _reserveForm: FormGroup;
  @ViewChild('modal')
  private _modal: ModalComponent;
  
    constructor(private formBuilder: FormBuilder, private nameService : NameService) {
      this.createForm();
     }
  
     createForm() {
      this._reserveForm = this.formBuilder.group({
        nameUsd: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(2)]),
            ],
           bidValue: ['',
           Validators.compose([
           Validators.required
           
          ]),
            ]


      });
    }
  public bidOnName() {
     let result: Boolean;
     let name = this._reserveForm.value.nameUsd;
     let address = this._reserveForm.value.addressUsd;
     let fee = this._reserveForm.value.bidValue;
     this.nameService.bidOnName(name,String(fee))
     .then(result => { 
       console.log(result);
       if(result) this._modal._displayResult = "Bid Submitted";
       else this._modal._displayResult = "Bid Not Submitted";
       });
     this._reserveForm.reset(); 
  }

}
