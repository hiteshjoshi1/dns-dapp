import { Component, OnInit } from '@angular/core';
import {NameService} from './../name.service'; 
import {FormControl, FormGroup, Validators, FormBuilder} from'@angular/forms';
import { from } from 'rxjs/observable/from';


@Component({
  selector: 'app-name-price',
  templateUrl: './name-price.component.html',
  styleUrls: ['./name-price.component.css']
})
export class NamePriceComponent implements OnInit {

  form: FormGroup;
  price : number;
  
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

  ngOnInit() {
  }

 public getNamePrice(){
  this.nameService.getPrice(this.form.value.nameUsd).then(value=>{
      this.price = value
  });
  
  this.form.reset();
 } 

}
