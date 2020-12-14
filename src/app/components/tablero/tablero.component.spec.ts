//import { ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { DataService } from 'src/app/services/data.service';
import { TableroComponent } from './tablero.component';


describe('Test para tablero', () => {

  describe('pruebas para accion jugador', () => {

    it("Devuelve posicion de celdas derecha", () => {

      let tablero = new TableroComponent(new DataService);

      let posicionJugador: Array<number> = Array(3, 0, 3);
      let teclado = tablero.datosTablero.teclado;
      let celdas: number = 5;

      teclado = "derecha";

      let resultado: Array<number> = tablero.accionJugador(teclado, posicionJugador, celdas);

      expect(resultado).toEqual(Array(3, 1, 3));

    });

    it("Devuelve posicion de celdas izquierda", () => {

      let tablero = new TableroComponent(new DataService);

      let posicionJugador: Array<number> = Array(3, 0, 3);
      let teclado = tablero.datosTablero.teclado;
      let celdas: number = 5;

      teclado = "izquierda";

      let resultado: Array<number> = tablero.accionJugador(teclado, posicionJugador, celdas);

      expect(resultado).toEqual(Array(3, 0, 9));

    });

    it("Devuelve posicion de celdas abajo", () => {

      let tablero = new TableroComponent(new DataService);

      let posicionJugador: Array<number> = Array(3, 0, 3);
      let teclado = tablero.datosTablero.teclado;
      let celdas: number = 5;

      teclado = "abajo";

      let resultado: Array<number> = tablero.accionJugador(teclado, posicionJugador, celdas);

      expect(resultado).toEqual(Array(3, 0, 6));

    });

    it("Devuelve posicion de celdas arriba", () => {

      let tablero = new TableroComponent(new DataService);

      let posicionJugador: Array<number> = Array(3, 0, 3);
      let teclado = tablero.datosTablero.teclado;
      let celdas: number = 5;

      teclado = "arriba";

      let resultado: Array<number> = tablero.accionJugador(teclado, posicionJugador, celdas);

      expect(resultado).toEqual(Array(3, 0, 12));

    });


  });


});
