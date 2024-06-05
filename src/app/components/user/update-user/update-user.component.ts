import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../model/user.model';
import { ServicioVideoJuegoService } from '../../../service/servicio-video-juego.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  mostrarAlerta: boolean = false;
  mostrarAlertaID: boolean = false;
  formUsuario: FormGroup = new FormGroup({});
  existentIds: number[] = [];
  usuarioEncontrado: UserModel | null = null;

  constructor(private servicioUsuario: ServicioVideoJuegoService) { }

  ngOnInit(): void {
    this.obtenerIdsExistentes();

    this.formUsuario = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      nombre: new FormControl('', [Validators.required]),
      estatura: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]),
      esPremium: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required])
    });
  }

  obtenerIdsExistentes() {
    this.servicioUsuario.leerUsuarios().subscribe(usuarios => {
      this.existentIds = usuarios.map(usuario => usuario.id);
    });
  }

  actualizarUsuario() {
    if (this.formUsuario.valid) {
      const id = this.formUsuario.get('id')?.value;

      this.servicioUsuario.actualizarUsuarios(id, this.formUsuario.value).subscribe({
        next: (resp) => {
          console.log('Usuario actualizado', resp);
          this.formUsuario.reset();
          this.mostrarAlerta = true;
          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 5000);
        },
        error: (e) => {
          console.error('Error al actualizar usuario', e);
        }
      });
    } else {
      this.marcarControlesComoTocados();
    }
  }

  private marcarControlesComoTocados() {
    Object.values(this.formUsuario.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  onUsuarioEncontrado(usuario: UserModel | null): void {
    this.usuarioEncontrado = usuario;
    if (usuario) {
      this.formUsuario.patchValue({
        id: usuario.id,
        nombre: usuario.nombre,
        estatura: usuario.estatura,
        esPremium: usuario.esPremium.toString(),
        fechaNacimiento: usuario.fechaNacimiento
      });
    } else {
      this.formUsuario.reset();
    }
  }
}
