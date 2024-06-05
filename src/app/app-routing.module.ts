import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {AboutComponent} from "./components/about/about.component";

//VideoGames
import { CreateComponent } from './components/videogame/create/create.component';
import { ReadComponent } from './components/videogame/read/read.component';
import { UpdateComponent } from './components/videogame/update/update.component';
import { DeleteComponent } from './components/videogame/delete/delete.component';

//Users
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { ReadUserComponent } from './components/user/read-user/read-user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { DeleteUserComponent } from './components/user/delete-user/delete-user.component';

export const routes: Routes = [
  
  {path:'home', component: HomeComponent},
  {path:'about', component:AboutComponent},

  {path:'create-videogame', component: CreateComponent},
  {path:'read-videogame/:id', component: ReadComponent},
  {path:'update-videogame', component: UpdateComponent},
  {path:'delete-videogame', component: DeleteComponent},
  
  {path:'create-user', component: CreateUserComponent},
  {path:'read-user', component: ReadUserComponent},
  {path:'update-user', component: UpdateUserComponent},
  {path:'delete-user', component: DeleteUserComponent},

  {path:'', pathMatch:'full', component: HomeComponent},
  {path:'**', pathMatch:'full', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
