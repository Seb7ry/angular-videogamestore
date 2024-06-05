import { Component, EventEmitter, Output } from '@angular/core';
import { ServicioVideoJuegoService } from "../../../service/servicio-video-juego.service";
import { UserModel } from '../../../model/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() usuarioEncontrado = new EventEmitter<UserModel | null>();
  mostrarAlerta: boolean = false;
  mostrarAlertaNo: boolean = false;
  usuarioEncontradoData: UserModel | null = null; 

  constructor(private servicio: ServicioVideoJuegoService) {}

  buscar(busqueda: string) {
    if (busqueda.trim()) {
      console.log('Iniciando búsqueda con:', busqueda);
      this.servicio.buscarUsuarioUnico(busqueda).subscribe({
        next: (usuario) => {
          console.log('Usuario encontrado:', usuario);
          this.usuarioEncontradoData = usuario; 
          this.usuarioEncontrado.emit(this.usuarioEncontradoData); 
        },
        error: (error) => {
          console.error('Error al buscar el usuario', error);
          this.usuarioEncontradoData = null; 
          this.usuarioEncontrado.emit(this.usuarioEncontradoData);
          this.mostrarAlertaNo = true;
          setTimeout(() => {
            this.mostrarAlertaNo = false;
          }, 5000);
          return;
        }
      });
    } else {
      console.log('No se ingresó término de búsqueda');
      this.usuarioEncontradoData = null; 
      this.usuarioEncontrado.emit(this.usuarioEncontradoData);
      this.mostrarAlerta = true;
      setTimeout(() => {
        this.mostrarAlerta = false;
      }, 5000);
      return;
    }
  }
}
