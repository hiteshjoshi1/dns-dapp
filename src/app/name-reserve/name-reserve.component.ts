import { Component } from '@angular/core';
import {NameService} from './../name.service'; 
import {FormControl, FormGroup, Validators, FormBuilder} from'@angular/forms';
import { from } from 'rxjs/observable/from';


@Component({
  selector: 'app-name-reserve',
  templateUrl: './name-reserve.component.html',
  styleUrls: ['./name-reserve.component.css']
})
export class NameReserveComponent {

  _reserveForm: FormGroup;
  reserved: Boolean;
  
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
        // addressUsd: ['',
        //   Validators.compose([
        //   Validators.required,
        //   Validators.maxLength(50)]),
        //    ],
           reservationFee: ['',
           Validators.compose([
           Validators.required,
            Validators.max(10),
            Validators.min(0.1),
          ]),
            ]


      });
    }
  public reserveName() {    
     let name = this._reserveForm.value.nameUsd;
     let address = this._reserveForm.value.addressUsd;
     let fee = this._reserveForm.value.reservationFee;
     this.nameService.reserveName(name,String(fee)).then((res)=>{
      this.reserved = res;
      this._reserveForm.reset();
     })
  
    
  
    
  }

}
