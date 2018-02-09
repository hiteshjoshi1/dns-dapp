import { Component } from '@angular/core';
import {NameService} from './../name.service'; 
import {FormControl, FormGroup, Validators, FormBuilder} from'@angular/forms';
import { from } from 'rxjs/observable/from';


@Component({
  selector: 'app-name-check',
  templateUrl: './name-check.component.html',
  styleUrls: ['./name-check.component.css']
})
export class NameCheckComponent { 
  form: FormGroup;
  nameExists:Boolean;
  
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
  public isNameAvailable()  {
    
    this.nameService.isNameAvailable(this.form.value.nameUsd)
    .then(value=>this.nameExists = value);
     this.form.reset();
    
  }

}
