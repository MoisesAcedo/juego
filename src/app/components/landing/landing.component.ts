import { Component } from '@angular/core';
//este servicio nos permite compartir datos entre los distintos componentes
import { DataService } from 'src/app/services/data.service';
import { Tablero } from '../../models/tablero';
//iconos de Fontawesome
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
 
//creamos el objeto con el modelo de datos del servicio
  constructor(public dataService: DataService ){
    this.config=new Tablero(0,0,0);

  }
  
//evento del boton iniciar partida
  onSubmit(){

    //Cambiamos el estado de los componentes visibles 
    this.dataService.estadoPantallas = [false, true, true, true];   
    //creamos el numero de pozos, celdas y flechas
    this.dataService.estadoTablero[0] = this.config.celdas;
    this.dataService.estadoTablero[1] = this.config.pozos;
    this.dataService.estadoTablero[2] = this.config.flechas;

    

   
  }



}
