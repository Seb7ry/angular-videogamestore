import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioVideoJuegoService } from '../../../service/servicio-video-juego.service';
import { UserModel } from '../../../model/user.model';
import { VideojuegoModel } from '../../../model/videojuego.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  mostrarForm: boolean = false;
  mostrarForm2: boolean = false;
  mostrarAlerta: boolean = false;
  mostrarAlertaID: boolean = false;
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

  actualizarVideojuego() {
    if (this.formVideojuego.valid) {
      const usuarioId = this.usuarioEncontrado?.id;
      const juegoId = this.formVideojuego.get('id')?.value;
  
      if (usuarioId) {
        this.service.actualizarJuego(usuarioId, juegoId, this.formVideojuego.value).subscribe({
          next: (resp) => {
            console.log('Juego actualizado', resp);
            this.formVideojuego.reset();
            this.mostrarAlerta = true;
            setTimeout(() => {
              this.mostrarAlerta = false;
              this.mostrarForm = false;
              this.mostrarForm2 = false;
            }, 3000);
          },
          error: (e) => {
          }
        });
      } else {
        console.error('No se ha seleccionado ningún usuario');
      }
    } else {
      this.marcarControlesComoTocados();
    }
  }
  

  private marcarControlesComoTocados() {
    Object.values(this.formVideojuego.controls).forEach(control => {
      control.markAsTouched();
    });
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
