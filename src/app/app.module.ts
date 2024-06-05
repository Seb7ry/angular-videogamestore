import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SearchComponent } from './components/shared/search/search.component';
import { Search2Component } from './components/shared/search2/search2.component';
import { AboutComponent } from './components/about/about.component';
import { CardComponent } from './components/about/card/card.component';

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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    AboutComponent,
    NavbarComponent,
    SearchComponent,

    CreateComponent,
    ReadComponent,
    UpdateComponent,
    DeleteComponent,
  
    CreateUserComponent,
    ReadUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    Search2Component
],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
