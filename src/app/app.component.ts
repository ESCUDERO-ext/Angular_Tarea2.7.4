import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  titulo = 'mensajeria-app';

  curso: string = "Angular con Spring 5";

  alumno: string = "ESCUDERO"
}
