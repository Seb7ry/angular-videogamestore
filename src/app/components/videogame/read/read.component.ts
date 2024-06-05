import {Component, OnInit} from '@angular/core';
import {ServicioVideoJuegoService} from "../../../service/servicio-video-juego.service";
import { VideojuegoModel } from '../../../model/videojuego.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrl: './read.component.css'
})
export class ReadComponent implements OnInit{
  listVideojuegos: VideojuegoModel [] = [];
  filtroMultijugador: string = 'todos';
  id: number = 0;
  searchForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    precio: new FormControl(''),
    multijugador: new FormControl('')
  });
  constructor(private servicio: ServicioVideoJuegoService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.listar(this.id);
    })
  }

  listar(id: number){
    this.servicio.leerJuegos(id).subscribe((data:any) => {
      if(data){
        if (this.filtroMultijugador !== 'todos') {
          this.listVideojuegos = data.filter((item:any) => {
            if (this.filtroMultijugador === 'true') {
              return item.multijugador === true;
            } else {
              return item.multijugador === false;
            }
          });
        } else {
          this.listVideojuegos = data;
        }
      }
    });
  }

  onChangeFiltroMultijugador() {
      this.listar(this.id);
  }

  buscarVideojuego() {
    const id = this.searchForm.get('id')?.value;
    const nombre = this.searchForm.get('nombre')?.value;
    const precio = this.searchForm.get('precio')?.value;
    const multijugador = this.searchForm.get('multijugador')?.value;
  
    if (!id && !nombre && !precio && !multijugador) {
      console.warn('Debe proporcionar al menos un criterio de búsqueda');
      return;
    }
  
    this.servicio.obtenerVideojuegosDeUsuario(this.id, id, nombre, precio, multijugador)
      .subscribe((data: VideojuegoModel[]) => {
        console.log(data);
        this.listVideojuegos = data.length > 0 ? [data[0]] : [];
      }, error => {
        console.error('Error fetching videojuegos:', error);
      });
  }  
}
