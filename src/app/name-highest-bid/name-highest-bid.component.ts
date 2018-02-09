import { Component } from '@angular/core';
import {NameService} from './../name.service'; 
import {FormControl, FormGroup, Validators, FormBuilder} from'@angular/forms';
import { from } from 'rxjs/observable/from';

@Component({
  selector: 'app-name-highest-bid',
  templateUrl: './name-highest-bid.component.html',
  styleUrls: ['./name-highest-bid.component.css']
})
export class NameHighestBidComponent {

  form: FormGroup;
  bidValue : number;
  
    constructor(private formBuilder: FormBuilder, private nameService : NameService) {
      this.createForm();
     }
  
     createForm() {
      this.form = this.formBuilder.group({
        nameUsd: ['',
             Validators.compose([
             Validators.required,
             Validators.minLength(4)]),
            ]


      });
    }
  public getHighestBid()  {    
    this.nameService.getHighestBid(this.form.value.nameUsd)
    .then(value=>this.bidValue = value);
     this.form.reset();
    
  }

}
