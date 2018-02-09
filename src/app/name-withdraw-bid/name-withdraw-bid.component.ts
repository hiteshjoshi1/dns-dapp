import { Component } from '@angular/core';
import {NameService} from './../name.service'; 
import {FormControl, FormGroup, Validators, FormBuilder} from'@angular/forms';
import { from } from 'rxjs/observable/from';

@Component({
  selector: 'app-name-withdraw-bid',
  templateUrl: './name-withdraw-bid.component.html',
  styleUrls: ['./name-withdraw-bid.component.css']
})
export class NameWithdrawBidComponent {

  form: FormGroup;
  withdrawn:Boolean;
  
    constructor(private formBuilder: FormBuilder, private nameService : NameService) {
      this.createForm();
     }
  
     createForm() {
      this.form = this.formBuilder.group({
        nameUsd: ['',
             Validators.compose([
             Validators.required,
             Validators.minLength(2)]),
            ]


      });
    }
  public withdrawBid()  { 
    // get your Bid... if exist withdraw   
    this.nameService.withdrawBid(this.form.value.nameUsd)
    .then(value=>this.withdrawn = value);
     this.form.reset();
    
  }
}
