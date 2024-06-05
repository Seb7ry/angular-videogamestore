import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServicioVideoJuegoService } from '../../service/servicio-video-juego.service';
import { UserModel } from '../../model/user.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuarioEncontrado: UserModel | null = null;
  condicion: boolean = false;
  searchForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    estatura: new FormControl(''),
    esPremium: new FormControl('')
  });

  constructor(private servicioUsuario: ServicioVideoJuegoService) {}

  ngOnInit(): void {}

  buscarUsuario() {
    const id = this.searchForm.get('id')?.value;
    const nombre = this.searchForm.get('nombre')?.value;
    const estatura = this.searchForm.get('estatura')?.value;
    const esPremium = this.searchForm.get('esPremium')?.value;
  
    if (!id && !nombre && !estatura && !esPremium) {
      console.error('Por favor, ingrese al menos un criterio de búsqueda.');
      return;
    }
  
    this.servicioUsuario.buscarUsuarioParametro(id, nombre, estatura, esPremium).pipe(
      map((usuarios: UserModel[] | UserModel) => {
        if (Array.isArray(usuarios)) {
          return usuarios.length > 0 ? usuarios[0] : null;
        } else {
          return usuarios;
        }
      })
    ).subscribe({
      next: (usuario: UserModel | null) => {
        if (usuario) {
          this.usuarioEncontrado = usuario;
          this.condicion = true;
        } else {
          this.usuarioEncontrado = null;
          this.condicion = false;
        }
      },
      error: (error: any) => {
        console.error('Error al buscar usuarios', error);
        this.usuarioEncontrado = null;
        this.condicion = false;
      }
    });
  }  
}
