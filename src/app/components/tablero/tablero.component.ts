import { Component, OnInit } from '@angular/core';
//Servicio para pasar datos entre componentes
import { DataService } from 'src/app/services/data.service';
//modelo de datos de tablero
import { Tablero } from '../../models/tablero';
//Iconos de Fontawesome
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { faHeadSideMask } from '@fortawesome/free-solid-svg-icons';
import { faPastafarianism } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  public modeloTablero: Tablero;
  public celdas: number;
  public pozos: number;
  public numFlechas: number;
  public arrayTablero: Array<any>;
  public posicionJugador: Array<number>;
  public posicionOro: Array<number>;
  public posicionWumpus: Array<number>;
  public percepcion: string;
  public imgJugador: string;
  public imgBrisa: string;
  public choque: boolean = false;
  public movimientoJugador: string;
  faWind = faWind;
  faMask = faHeadSideMask;
  faWumpus = faPastafarianism;
  faPozo = faCircle;
  faOro = faCoins;
  faSalida = faSignOutAlt;


  constructor(public datosTablero: DataService) {

    this.modeloTablero = new Tablero(0, 0, 0);
    this.celdas = this.datosTablero.estadoTablero[0];
    this.pozos = this.datosTablero.estadoTablero[1];
    this.numFlechas = this.datosTablero.estadoTablero[2];
    this.modeloTablero.celdas = this.datosTablero.estadoTablero[0];
    this.movimientoJugador = this.datosTablero.teclado;
    this.percepcion = datosTablero.percepciones;
    this.arrayTablero = new Array(this.celdas);
    this.posicionJugador = Array(this.celdas - 1, 0, 3);
    this.imgJugador = "../../../assets/arquero.png";
    this.imgBrisa = "../../../assets/brisa.png"
    this.datosTablero.posicionJugador = this.posicionJugador;
    this.posicionOro = Array(0, 0);
    this.posicionWumpus = Array(0, 0);

  }

//cuando inicie la aplicacion creará el tablero con wumpus, pozos, jugador, etc.
//cuando esté creado el tablero se creará los elementos como brisa, hedor, ...
  ngOnInit() {

    this.crearTablero();
    this.crearElementos();

  }
  //cuando se produzca un cambio por movimiento del jugador
  //se volverán a crear los elementos (hacer desaparecer hedor)
  //comprobará si hemos perdido o ganado
  ngDoCheck() {
    this.accionJugador(this.datosTablero.teclado, this.posicionJugador, this.celdas);
    this.perderGanar();
    this.crearElementos();
  }
//metodo para las acciones del jugador
  accionJugador(tec: string, posicionJugador: Array<number>, celdas: number): Array<number> {
 
    if (tec == "derecha") {
      if (posicionJugador[2] == 3) {

        if (posicionJugador[1] < celdas - 1) {

          posicionJugador[1]++;
          this.datosTablero.percepciones = "derecha";
        } else {
          this.choque = true;
          this.datosTablero.percepciones = "choque";
        }

      }
      else {
        this.posicionJugador[2] = 3;
        this.datosTablero.percepciones = "giro derecha";
      }
    }

    if (tec == "izquierda") {
      if (posicionJugador[2] == 9) {

        if (posicionJugador[1] > 0) {

          this.datosTablero.percepciones = "izquierda";
          this.posicionJugador[1]--;
        } else {
          this.datosTablero.percepciones = "choque";
        }

      }
      else {
        posicionJugador[2] = 9;
        this.datosTablero.percepciones = "giro izquierda";
      }
    }

    if (tec == "arriba") {
      if (posicionJugador[2] == 12) {

        if (posicionJugador[0] > 0) {

          posicionJugador[0]--;
          this.datosTablero.percepciones = "arriba";
        } else {
          this.choque = true;
          this.datosTablero.percepciones = "choque";
        }

      }
      else {
        posicionJugador[2] = 12;
        this.datosTablero.percepciones = "giro arriba";
      }
    }

    if (tec == "abajo") {
      if (posicionJugador[2] == 6) {

        if (posicionJugador[0] < this.celdas - 1) {

          posicionJugador[0]++;
          this.datosTablero.percepciones = "abajo";
        } else {
          this.choque = true;
          this.datosTablero.percepciones = "choque";
        }

      }
      else {
        posicionJugador[2] = 6;
        this.datosTablero.percepciones = "giro abajo";
      }
    }

    if (tec == "recoger") {
      if (this.arrayTablero[posicionJugador[0]][posicionJugador[1]] == 'oro') {
        this.arrayTablero[posicionJugador[0]][posicionJugador[1]] == 'vacio';

      }
      if (this.arrayTablero[posicionJugador[0]][posicionJugador[1]] == 'brisa, oro') {
        this.arrayTablero[posicionJugador[0]][posicionJugador[1]] == 'brisa';

      }
      if (this.arrayTablero[posicionJugador[0]][posicionJugador[1]] == 'hedor, brisa, oro') {

        this.datosTablero.oro = true;
        this.arrayTablero[posicionJugador[0]][posicionJugador[1]] == 'hedor,brisa';


      }

      this.datosTablero.oro = true;
      this.datosTablero.percepciones = "recogido oro";
    }

    if (tec == "disparo" && this.datosTablero.estadoTablero[2] > 0) {

      this.datosTablero.estadoTablero[2]--;

      if (this.arrayTablero[posicionJugador[0]][posicionJugador[1]] == 'hedor'
        || this.arrayTablero[posicionJugador[0]][posicionJugador[1]] == 'hedor, brisa'
        || this.arrayTablero[posicionJugador[0]][posicionJugador[1]] == 'hedor, oro'
        || this.arrayTablero[posicionJugador[0]][posicionJugador[1]] == 'hedor, brisa, oro') {



        if (posicionJugador[2] == 3 && this.arrayTablero[posicionJugador[0]][posicionJugador[1] + 1] == "wumpus") {

          this.arrayTablero[posicionJugador[0]][posicionJugador[1] + 1] = "vacio";
        }
        if (posicionJugador[2] == 9 && this.arrayTablero[posicionJugador[0]][posicionJugador[1] - 1] == "wumpus") {
          this.arrayTablero[posicionJugador[0]][posicionJugador[1] - 1 > 0 ? posicionJugador[1] - 1 : 0] = "vacio";
        }
        if (posicionJugador[2] == 6 && this.arrayTablero[posicionJugador[0] + 1][posicionJugador[1]] == "wumpus") {
          this.arrayTablero[posicionJugador[0] + 1][posicionJugador[1]] = "vacio";
        }
        if (posicionJugador[2] == 12 && this.arrayTablero[posicionJugador[0] - 1][posicionJugador[1]] == "wumpus") {

          this.arrayTablero[posicionJugador[0] - 1 > 0 ? posicionJugador[1] - 1 : 0][posicionJugador[1]] = "vacio";

        }

        this.datosTablero.percepciones = "wumpus muerto por flecha Gritooooooo";

      } else {
        this.datosTablero.percepciones = "flecha perdida";

      }

    }
    return posicionJugador;
  }

//metodo para comprobar si gana o pierde
  perderGanar() {

    if (this.arrayTablero[this.posicionJugador[0]][this.posicionJugador[1]] == 'salida' && this.datosTablero.oro == true) {

      this.datosTablero.percepciones = "has ganado";
      this.datosTablero.estadoPantallas = Array(true, false, false, false);
      alert("Has ganado");

    }

    if (this.arrayTablero[this.posicionJugador[0]][this.posicionJugador[1]] == 'pozo') {



      this.datosTablero.estadoPantallas = Array(true, false, false, false);
      this.datosTablero.percepciones = "has perdido";
      alert("Has perdido");


    }

    if (this.arrayTablero[this.posicionJugador[0]][this.posicionJugador[1]] == 'wumpus') {

      this.datosTablero.estadoPantallas = Array(true, false, false, false);

      alert("Has perdido");

    }

  }

//metodo para crear tablero
  crearTablero() {

    let numPozos = this.pozos;
    let wumpus = 1;
    let oro = 1;
    for (let i = 0; i < this.celdas; i++) {

      this.arrayTablero[i] = new Array(this.celdas)
      for (let j = 0; j < this.celdas; j++) {

        if (Math.floor(Math.random() * 2) == 1 && numPozos > 0) {

          this.arrayTablero[i][j] = "pozo";
          numPozos--;
        } else if (Math.floor(Math.random() * 2) == 1 && wumpus > 0) {

          this.arrayTablero[i][j] = "wumpus";
          wumpus--;
          this.posicionWumpus = Array(this.arrayTablero[i], this.arrayTablero[j]);
        } else if (Math.floor(Math.random() * 2) == 1 && oro > 0) {

          this.arrayTablero[i][j] = "oro";
          this.posicionOro = Array(this.arrayTablero[i], this.arrayTablero[j]);
          oro--;
        } else if (i == this.celdas - 1 && j == 0) {


          this.arrayTablero[i][j] = "salida";

        } else {
          this.arrayTablero[i][j] = "vacio";
        }

      }

    }

  }

  crearElementos() {
    for (let i = 0; i < this.celdas; i++) {


      for (let j = 0; j < this.celdas; j++) {

        if (this.arrayTablero[i][j] == "hedor") {


          this.arrayTablero[i][j] = "vacio";
        }

        if (this.arrayTablero[i][j] == "hedor, brisa") {


          this.arrayTablero[i][j] = "brisa";
        }

        if (this.arrayTablero[i][j] == "hedor, brisa, oro") {



          this.arrayTablero[i][j] = "brisa, oro";
        }

        if (this.arrayTablero[i][j] == "hedor, oro") {


          this.arrayTablero[i][j] = "oro";
        }






        if (this.arrayTablero[i][j] == "pozo") {

          if (j > 0) {

            if (this.arrayTablero[i][j - 1] == "vacio") {
              this.arrayTablero[i][j - 1] = "brisa";
            }

            if (this.arrayTablero[i][j - 1] == "oro") {
              this.arrayTablero[i][j - 1] = "brisa, oro";
            }

          }

          if (i > 0) {

            if (this.arrayTablero[i - 1][j] == "vacio") {
              this.arrayTablero[i - 1][j] = "brisa";
            }

            if (this.arrayTablero[i - 1][j] == "oro") {
              this.arrayTablero[i - 1][j] = "brisa, oro";
            }

          }

          if (j < this.celdas - 1) {

            if (this.arrayTablero[i][j + 1] == "vacio") {
              this.arrayTablero[i][j + 1] = "brisa";
            }

            if (this.arrayTablero[i][j + 1] == "oro") {
              this.arrayTablero[i][j + 1] = "brisa, oro";
            }

          }

          if (i < this.celdas - 1) {

            if (this.arrayTablero[i + 1][j] == "vacio") {
              this.arrayTablero[i + 1][j] = "brisa";
            }

            if (this.arrayTablero[i + 1][j] == "oro") {
              this.arrayTablero[i + 1][j] = "brisa, oro";
            }

          }
        }

      }

    }

    for (let i = 0; i < this.celdas; i++) {


      for (let j = 0; j < this.celdas; j++) {

        if (this.arrayTablero[i][j] == "wumpus") {


          if (j > 0) {

            if (this.arrayTablero[i][j - 1] == "vacio") {
              this.arrayTablero[i][j - 1] = "hedor";
            }

            if (this.arrayTablero[i][j - 1] == "brisa") {
              this.arrayTablero[i][j - 1] = "hedor, brisa";
            }
            if (this.arrayTablero[i][j - 1] == "oro") {
              this.arrayTablero[i][j - 1] = "hedor, oro";
            }
            if (this.arrayTablero[i][j - 1] == "brisa, oro") {
              this.arrayTablero[i][j - 1] = "hedor, brisa, oro";
            }

          }

          if (i > 0) {

            if (this.arrayTablero[i - 1][j] == "vacio") {
              this.arrayTablero[i - 1][j] = "hedor";
            }

            if (this.arrayTablero[i - 1][j] == "brisa") {
              this.arrayTablero[i - 1][j] = "hedor, brisa";
            }

            if (this.arrayTablero[i - 1][j] == "oro") {
              this.arrayTablero[i - 1][j] = "hedor, oro";
            }
            if (this.arrayTablero[i - 1][j] == "brisa, oro") {
              this.arrayTablero[i - 1][j] = "hedor, brisa, oro";
            }

          }

          if (j < this.celdas - 1) {

            if (this.arrayTablero[i][j + 1] == "vacio") {
              this.arrayTablero[i][j + 1] = "hedor";
            }

            if (this.arrayTablero[i][j + 1] == "brisa") {
              this.arrayTablero[i][j + 1] = "hedor, brisa";
            }

            if (this.arrayTablero[i][j + 1] == "oro") {
              this.arrayTablero[i][j + 1] = "hedor, oro";
            }
            if (this.arrayTablero[i][j + 1] == "brisa, oro") {
              this.arrayTablero[i][j + 1] = "hedor, brisa, oro";
            }

          }

          if (i < this.celdas - 1) {

            if (this.arrayTablero[i + 1][j] == "vacio") {
              this.arrayTablero[i + 1][j] = "hedor";
            }

            if (this.arrayTablero[i + 1][j] == "brisa") {
              this.arrayTablero[i + 1][j] = "hedor, brisa";
            }

            if (this.arrayTablero[i + 1][j] == "oro") {
              this.arrayTablero[i + 1][j] = "hedor, oro";
            }

            if (this.arrayTablero[i + 1][j] == "brisa, oro") {
              this.arrayTablero[i + 1][j] = "hedor, brisa, oro";
            }

          }
        }

      }
    }
  }

}
