import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-name-home',
  templateUrl: './name-home.component.html',
  styleUrls: ['./name-home.component.scss']
})
export class NameHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   reservation(): void{
    console.log("Test----->");
    
  }

  bidPage() : void{
    console.log("id---->");
  }

}
