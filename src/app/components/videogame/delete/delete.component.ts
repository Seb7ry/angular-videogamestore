import {Component, Output} from '@angular/core';
import {VideojuegoModel} from "../../../model/videojuego.model";
import { ServicioVideoJuegoService } from '../../../service/servicio-video-juego.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../model/user.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  mostrarForm: boolean = false;
  mostrarForm2: boolean = false;
  mostrarAlertaID: boolean = false
  mostrarAlerta: boolean = false;
  formVideojuego: FormGroup = new FormGroup({});
  existentIds: VideojuegoModel[] = [];
  usuarioEncontrado: UserModel | null = null;
  juegoEncontrado: VideojuegoModel | null = null;
  
  constructor(private service: ServicioVideoJuegoService) { }

  ngOnInit(): void {

    this.formVideojuego = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]),
      multijugador: new FormControl('', [Validators.required]),
      fechaLanzamiento: new FormControl('', [Validators.required])
    });
  }

  eliminarVideojuego(usuarioId: number, id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este videojuego?')) {
      this.service.eliminarJuego(usuarioId, id).subscribe({
        next: () => {
          console.log('Videojuego eliminado correctamente');
          this.formVideojuego.reset();
          this.mostrarAlerta = true;
          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 5000);
        },
        error: (error) => {
          console.error('Hubo un error al eliminar el juego', error);
        }
      });
    }
  }
  

  onUserEncontrado(user: UserModel | null): void {
    this.usuarioEncontrado = user;
    if (user) {
      this.mostrarForm = true;
      this.service.leerJuegos(user.id).subscribe(juegos => {
        this.existentIds = juegos;
        console.log('Lista de IDs de videojuegos:', this.existentIds);
      });
    } else {
      this.formVideojuego.reset();
    }
  }

  onJuegoEncontrado(juego: VideojuegoModel | null): void {
    if (juego) {
      this.mostrarForm2 = true;
      console.log(juego)
      this.juegoEncontrado = juego;
      this.formVideojuego.patchValue({
        id: this.juegoEncontrado.id,
        nombre: this.juegoEncontrado.nombre,
        precio: this.juegoEncontrado.precio,
        multijugador: this.juegoEncontrado.multijugador.toString(),
        fechaLanzamiento: this.juegoEncontrado.fechaLanzamiento
      });
    } else {
      this.juegoEncontrado = null;
      this.formVideojuego.reset();
    }
  }    
}
