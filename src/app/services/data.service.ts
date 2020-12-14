import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  estadoPantallas: Array<boolean> = [true, false, false, false];
  estadoTablero: Array<number> = [0, 0, 0];
  teclado:string = "";
  oro:boolean = false;
  percepciones:string = "";
  posicionJugador:Array<number> = Array(0,0,0);


  constructor() { }
}
