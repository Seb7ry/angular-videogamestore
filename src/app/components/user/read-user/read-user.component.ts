import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../model/user.model';
import { ServicioVideoJuegoService } from '../../../service/servicio-video-juego.service';

@Component({
  selector: 'app-read-user',
  templateUrl: './read-user.component.html',
  styleUrl: './read-user.component.css'
})
export class ReadUserComponent implements OnInit{
  listUsers: UserModel [] = [];
  filtroPremium: string = 'todos';

  constructor(private servicio: ServicioVideoJuegoService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.servicio.leerUsuarios().subscribe((data:any) => {
      if(data){
        console.log(data);
        if (this.filtroPremium !== 'todos') {
          this.listUsers = data.filter((item:any) => {
            if (this.filtroPremium === 'true') {
              return item.esPremium === true;
            } else {
              return item.esPremium === false;
            }
          });
        } else {
          this.listUsers = data;
        }
      }
    });
  }

  onChangeFiltroPremium() {
    this.listar();
  }
}
