import { Component, OnInit} from '@angular/core';
import { DataService } from './services/data.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title:string;
  constructor( public visibilidadComponente: DataService )
  {

    this.title = 'hunt2';

  }

  

  ngOnInit(){
    console.log("oninit del app");
    this.title = 'hunt2';
  }

  ngDoCheck(){

    console.log(this.visibilidadComponente.estadoPantallas);

  

  }
 


}
