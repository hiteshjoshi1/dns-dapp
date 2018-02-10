import { Component, ViewChild,OnInit } from '@angular/core';
import {NameService} from './../name.service'; 
import {FormControl, FormGroup, Validators, FormBuilder} from'@angular/forms';
import { from } from 'rxjs/observable/from';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-name-price',
  templateUrl: './name-price.component.html',
  styleUrls: ['./name-price.component.css']
})
export class NamePriceComponent implements OnInit {

  form: FormGroup;
  price : number;

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

  ngOnInit() {
  }

 public getNamePrice(){
  this.nameService.getPrice(this.form.value.nameUsd).then(value=>{
    this._modal._displayResult= "Name price "+value;
  });
  
  this.form.reset();
 } 

}
