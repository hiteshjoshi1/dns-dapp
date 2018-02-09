import { Component, OnInit } from '@angular/core';
import {NameService} from './../name.service'; 
import {FormControl, FormGroup, Validators, FormBuilder} from'@angular/forms';
import { from } from 'rxjs/observable/from';

@Component({
  selector: 'app-name-accept-bid',
  templateUrl: './name-accept-bid.component.html',
  styleUrls: ['./name-accept-bid.component.css']
})
export class NameAcceptBidComponent implements OnInit {

  form: FormGroup;
  bidAccepted:Boolean;
  
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
  public acceptBid()  {
    
    this.nameService.acceptBidAndTransfer(this.form.value.nameUsd)
    .then(value=>this.bidAccepted = value);
     this.form.reset();
    
  }

  ngOnInit() {
  }

}
