import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioVideoJuegoService } from '../../../service/servicio-video-juego.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  mostrarAlerta: boolean = false;
  mostrarAlertaID: boolean = false;
  existentIds: number[] = [];
  formUser: FormGroup = new FormGroup({});

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
      this.existentIds = usuarios.map(usuario => usuario.id);
    });
  }

  crearUsuario() {
    if (this.formUser.valid) {
      const id = this.formUser.get('id')?.value;
      if (this.existentIds.find((data)=> data == id)) {
        this.mostrarAlertaID = true;
        setTimeout(() => {
            this.mostrarAlertaID = false;
        }, 5000);
        return;
      }
      this.service.agregarUsuarios(this.formUser.value).subscribe(resp => {
        if (resp) {
          this.formUser.reset();
          this.mostrarAlerta = true;
          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 5000);
        }
      });
    } else {
      this.marcarControlesComoTocados();
    }
  }

  private marcarControlesComoTocados() {
    Object.values(this.formUser.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
