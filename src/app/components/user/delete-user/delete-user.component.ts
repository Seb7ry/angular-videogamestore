import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioVideoJuegoService } from '../../../service/servicio-video-juego.service';
import { UserModel } from '../../../model/user.model';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent {
  mostrarAlertaID: boolean = false
  mostrarAlerta: boolean = false;
  formUser: FormGroup = new FormGroup({});
  existentIds: number[] = [];
  
  constructor(private service: ServicioVideoJuegoService) { }

  ngOnInit(): void {
    this.obtenerIdsExistentes();

    this.formUser = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      nombre: new FormControl('', [Validators.required]),
      estatura: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]),
      esPremium: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required])
    });
  }

  obtenerIdsExistentes() {
    this.service.leerUsuarios().subscribe(usuarios => {
      this.existentIds = usuarios.map(usuarios => usuarios.id);
    });
  }

  eliminarUsuario(id: number) {
    if (confirm('Are you sure you want to delete this video game?')) {
      this.service.eliminarUsuarios(id).subscribe({
        next: () => {
          console.log('Successfully removed video game');
          this.formUser.reset();
          this.mostrarAlerta = true;
          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 5000);

        },
        error: (error) => {
          console.error('There was an error deleting the game', error);
        }
      });
    }
  }

  onUsuarioEncontrado(usuario: UserModel | null): void {
    if (usuario) {
      this.formUser.patchValue({
        id: usuario.id,
        nombre: usuario.nombre,
        estatura: usuario.estatura,
        esPremium: usuario.esPremium.toString(),
        fechaNacimiento: usuario.fechaNacimiento
      });
    } else {
      this.formUser.reset();
    }
  }
}