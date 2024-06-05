import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VideojuegoModel } from '../../../model/videojuego.model';

@Component({
  selector: 'app-search2',
  templateUrl: './search2.component.html',
  styleUrls: ['./search2.component.css']
})
export class Search2Component {
  @Input() existentIds: VideojuegoModel[] = [];
  @Output() juegoEncontrado = new EventEmitter<VideojuegoModel | null>();
  mostrarAlerta: boolean = false;
  mostrarAlertaNo: boolean = false;

  constructor() {}

  buscar(id: number | string) {
    if (!id) {
      console.log('No se ingresó un ID de búsqueda');
      this.mostrarAlerta = true;
      setTimeout(() => {
        this.mostrarAlerta = false;
      }, 5000);
      return;
    }
  
    const idBuscado = +id;
  
    if (isNaN(idBuscado)) {
      console.log('ID de búsqueda no válido:', id);
      this.mostrarAlerta = true;
      setTimeout(() => {
        this.mostrarAlerta = false;
      }, 5000);
      return;
    }
  
    console.log('Iniciando búsqueda con ID:', id);
    const juegoEncontrado = this.existentIds.find(juego => juego.id === idBuscado);
    if (juegoEncontrado) {
      console.log('Juego encontrado:', juegoEncontrado);
      this.juegoEncontrado.emit(juegoEncontrado);
    } else {
      console.error('El juego no pudo ser encontrado');
      this.juegoEncontrado.emit(null); // Emitir null cuando no se encuentra el juego
      this.mostrarAlertaNo = true;
      setTimeout(() => {
        this.mostrarAlertaNo = false;
      }, 5000);
    }
  }  
}
