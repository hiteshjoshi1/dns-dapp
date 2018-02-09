import { Component } from '@angular/core';
import {NameService} from './../name.service'; 
import {FormControl, FormGroup, Validators, FormBuilder} from'@angular/forms';
import { from } from 'rxjs/observable/from';

@Component({
  selector: 'app-name-bid-new',
  templateUrl: './name-bid-new.component.html',
  styleUrls: ['./name-bid-new.component.css']
})
export class NameBidNewComponent {

  _reserveForm: FormGroup;
  bidAccepted : Boolean;
  
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
     this.nameService.bidOnName(name,String(fee)).then(result => this.bidAccepted = result );
     this._reserveForm.reset(); 
  }

}
