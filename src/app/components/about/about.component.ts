import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{
  items: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<any[]>('/assets/about.json').subscribe(
      data => {
        this.items = data;
      },
      error => {
        console.error('Error al cargar el archivo JSON', error);
      }
    );
  }

}
