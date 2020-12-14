import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import { faMeteor } from '@fortawesome/free-solid-svg-icons';
import { faHandHolding } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'teclado',
  templateUrl: './teclado.component.html',
  styleUrls: ['./teclado.component.css']
})
export class TecladoComponent implements OnInit {

  faUp =faArrowAltCircleUp;
  faDown = faArrowAltCircleDown;
  faRight = faArrowAltCircleRight;
  faLeft = faArrowAltCircleLeft;
  faDisparo = faMeteor;
  faMano = faHandHolding;

  constructor(public datosTeclado:DataService) { }

  ngOnInit(): void {
  }


  



  movimiento(direccion:string){

    console.log("direccion= " + this.datosTeclado.teclado);
    this.datosTeclado.teclado = direccion;

    

  }

  

}

