import { Component } from '@angular/core';
import {NameService} from './../name.service'; 
import {FormControl, FormGroup, Validators, FormBuilder} from'@angular/forms';
import { from } from 'rxjs/observable/from';



@Component({
  selector: 'app-name-owner',
  templateUrl: './name-owner.component.html',
  styleUrls: ['./name-owner.component.css']
})
export class NameOwnerComponent {

  form: FormGroup;
  owner : string;
  
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

 public getOwner(){
  this.nameService.getOwner(this.form.value.nameUsd).then(res=> {
       this.owner = res;
  });
  
  this.form.reset();
 } 
}
