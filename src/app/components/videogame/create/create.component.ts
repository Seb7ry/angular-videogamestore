import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioVideoJuegoService } from '../../../service/servicio-video-juego.service';
import { UserModel } from '../../../model/user.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  mostrarAlerta: boolean = false;
  mostrarAlertaID: boolean = false;
  mostrarForm: boolean = false;
  existentIds: number[] = [];
  formVideojuego: FormGroup = new FormGroup({});
  usuarioEncontrado: UserModel | null = null;

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

  crearVideojuego() {
    if (this.formVideojuego.valid) {
      if (!this.usuarioEncontrado) {
        return;
      }
      
      const idUsuario = this.usuarioEncontrado.id;
      const idJuego = this.formVideojuego.get('id')?.value;
      let juegoExistente = false;

      for (let i = 0; i < this.existentIds.length; i++) {
        if (this.existentIds[i] == idJuego) {
          juegoExistente = true;
        break;
        }
      }

      if (juegoExistente) {
        this.mostrarAlertaID = true;
        setTimeout(() => {
          this.mostrarAlertaID = false;
        }, 5000);
        return;
      } else {
        const videojuegoData = {
          ...this.formVideojuego.value,
          usuarioId: idUsuario
        };
  
        this.service.agregarJuegos(idUsuario, videojuegoData).subscribe(resp => {
          if (resp) {
            this.formVideojuego.reset();
            this.mostrarAlerta = true;
            setTimeout(() => {
              this.mostrarAlerta = false;
            }, 5000);
          }
        });
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
        this.existentIds = juegos.map(juego => juego.id);
        console.log('Lista de IDs de videojuegos:', this.existentIds);
      });
    } else {
      this.formVideojuego.reset();
    }
  }
}
