import { Component,OnInit,ViewChild } from '@angular/core';
import {NameService} from './../name.service'; 
import {FormControl, FormGroup, Validators, FormBuilder} from'@angular/forms';
import { from } from 'rxjs/observable/from';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-name-send-ether',
  templateUrl: './name-send-ether.component.html',
  styleUrls: ['./name-send-ether.component.css']
})
export class NameSendEtherComponent implements OnInit {

  form: FormGroup;
  etherSent : Boolean;
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
            ],            
            sentEtherUsd: ['',
            Validators.compose([
            Validators.required
          ]),
           ]
      });
    }

  ngOnInit() {
  }

 public sendEther(){
  this.nameService.sendEtherToName(this.form.value.nameUsd, this.form.value.sentEtherUsd)
  .then(res=> {
    this._modal._displayResult = res;
    this.form.reset();
});
  
 
 } 
}
