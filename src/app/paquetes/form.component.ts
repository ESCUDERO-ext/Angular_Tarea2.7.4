import { Component, OnInit } from '@angular/core';
import { Paquete } from './paquetes';
import { PaqueteService } from './paquete.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public paquete: Paquete = new Paquete();

  public titulo: string = "Crear Paquete";

  public errores: string[] | undefined;

  constructor(private paqueteService: PaqueteService, private router: Router, private activatedRote: ActivatedRoute) {}

  ngOnInit(): void {
    this.cargarPaquete();
  }

  cargarPaquete(): void {
    this.activatedRote.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.paqueteService.getPaquete(id).subscribe(paquete => this.paquete = paquete);
      }
    });
  }

  public create(): void {
    this.paqueteService.create(this.paquete).subscribe(
      paquete => {
        this.router.navigate(['/paquetes']);
        Swal.fire('Nuevo paquete', `¡El paquete ${paquete.pedido} ha sido creado con éxito!`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    this.paqueteService.update(this.paquete).subscribe(
      json => {
        this.router.navigate(['/paquetes']);
        Swal.fire('Paquete actualizado', `${json.mensaje}: ${json.paquete.pedido}`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

}
