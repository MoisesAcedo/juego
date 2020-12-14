import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {

  public numFlechas:number;
  public oro:boolean;
  public percepciones:string;
  public posicionJugador:Array<number>;

  constructor(public datosOutput: DataService) { 
    
   this.numFlechas=this.datosOutput.estadoTablero[2];
   this.oro = this.datosOutput.oro;
   this.percepciones=datosOutput.percepciones;
   this.posicionJugador=datosOutput.posicionJugador;

  }



  ngOnInit(){

    console.log(this.datosOutput.estadoTablero[2]);
    console.log("oro en output = " + this.datosOutput.oro);
    

  }

  ngDoCheck(){
    this.oro = this.datosOutput.oro;
    console.log("oro en output = " + this.datosOutput.oro);
    this.percepciones=this.datosOutput.percepciones;
    this.posicionJugador=this.datosOutput.posicionJugador;
    this.numFlechas=this.datosOutput.estadoTablero[2];
  }

}
