import { Component,ViewChild } from '@angular/core';
import {NameService} from './../name.service'; 
import {FormControl, FormGroup, Validators, FormBuilder} from'@angular/forms';
import { from } from 'rxjs/observable/from';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-name-highest-bid',
  templateUrl: './name-highest-bid.component.html',
  styleUrls: ['./name-highest-bid.component.css']
})
export class NameHighestBidComponent {

  form: FormGroup;
  bidValue : number;
  @ViewChild('modal')
  private _modal: ModalComponent;

  
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
  public getHighestBid()  {    
     let name = this.form.value.nameUsd;
    this.nameService.getHighestBid(name)
    .then(value=> {
      //convert to Ether
      value  = value/1000000000000000000;
      this._modal._displayResult = "Highest Bid for : "+name+" is :"+value + " ether";
    });
     this.form.reset();
    
  }

}
