import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { NameService } from './name.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent implements OnInit{
  title = 'Consensys Tutorial on distributed DNS';

  constructor(private _nameService: NameService) {

  }
  ngOnInit() {
    this._nameService.initializeContract();
  }
}
