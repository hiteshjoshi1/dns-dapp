import { Component, ViewChild } from '@angular/core';
import {NameService} from './../name.service'; 
import {FormControl, FormGroup, Validators, FormBuilder} from'@angular/forms';
import { from } from 'rxjs/observable/from';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-name-owner',
  templateUrl: './name-owner.component.html',
  styleUrls: ['./name-owner.component.css']
})
export class NameOwnerComponent {

  form: FormGroup;
  owner : string;
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

 public getOwner(){
  this.nameService.getOwner(this.form.value.nameUsd).then(res=> {
    res = "Owner Address "+ res;
    this._modal._displayResult = res;
  });
  
  this.form.reset();
 } 
}
