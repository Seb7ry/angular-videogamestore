import { VideojuegoModel } from "./videojuego.model";

export class UserModel{
    id: number = 0;
    nombre: string = ' ';
    estatura: number = 0;
    esPremium: boolean = false;
    fechaNacimiento: Date = new Date();
    videojuegos: VideojuegoModel[] = [];
}