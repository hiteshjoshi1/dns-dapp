import { Component,ViewChild } from '@angular/core';
import {NameService} from './../name.service'; 
import {FormControl, FormGroup, Validators, FormBuilder} from'@angular/forms';
import { from } from 'rxjs/observable/from';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-name-reserve',
  templateUrl: './name-reserve.component.html',
  styleUrls: ['./name-reserve.component.css']
})
export class NameReserveComponent {

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
           reservationFee: ['',
           Validators.compose([
           Validators.required  
          ]),
            ]


      });
    }
  public reserveName() {    
     let name = this._reserveForm.value.nameUsd;
     let address = this._reserveForm.value.addressUsd;
     let fee = this._reserveForm.value.reservationFee;
     this.nameService.reserveName(name,String(fee)).then((res)=>{
       console.log(res);
       if(res) this._modal._displayResult = ` ${name} reservation request sent to Blockchain!`;
      this._reserveForm.reset();
     }).catch((ex)=>{
       console.log(ex);
       this._modal._displayResult = `${name} cannot be reserved!`;
     });    
  }

}
