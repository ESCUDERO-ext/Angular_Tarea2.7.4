import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectivaComponent } from './directiva/directiva.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { FormComponent } from './paquetes/form.component';

const routes: Routes = [
  { path: 'directivas', component: DirectivaComponent }, // Ruta para Directivas
  { path: 'paquetes', component: PaquetesComponent }, // Ruta para Paquetes
  { path: 'paquetes/page/:page', component: PaquetesComponent }, // Ruta para paginación de Paquetes
  { path: 'paquetes/form', component: FormComponent }, // Ruta para el formulario de Paquetes
  { path: 'paquetes/form/:id', component: FormComponent }, // Ruta para editar un Paquete
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
