import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Tablero } from '../../models/tablero';

import { faWind } from '@fortawesome/free-solid-svg-icons';
import { faHeadSideMask } from '@fortawesome/free-solid-svg-icons';
import { faPastafarianism } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faHandHolding } from '@fortawesome/free-solid-svg-icons';
import { faMeteor } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  faWind = faWind;
  faMask = faHeadSideMask;
  faWumpus = faPastafarianism;
  faPozo = faCircle;
  faOro = faCoins;
  faSalida = faSignOutAlt;
  faMano = faHandHolding;
  faDisparo = faMeteor;
public config:Tablero;
 
  constructor(public dataService: DataService ){

    this.config=new Tablero(0,0,0);
    
   
  }
  

  onSubmit(){

    console.log("config"+ this.config.celdas);    
    this.dataService.estadoPantallas = [false, true, true, true];   
    this.dataService.estadoTablero[0] = this.config.celdas;
    this.dataService.estadoTablero[1] = this.config.pozos;
    this.dataService.estadoTablero[2] = this.config.flechas;

    console.log("flechas land = " + this.dataService.estadoTablero[2])

   
  }



}
