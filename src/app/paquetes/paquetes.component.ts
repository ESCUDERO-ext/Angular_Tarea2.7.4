import { Component, OnInit } from '@angular/core';
import { Paquete } from './paquetes';
import { PaqueteService } from './paquete.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paquetes',
  standalone: false,
  templateUrl: './paquetes.component.html',
  styleUrl: './paquetes.component.css'
})
export class PaquetesComponent implements OnInit {

  paquetes: Paquete[] = [];
  paginador: any;

  constructor(private paqueteService: PaqueteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +(params.get('page') ?? 0);

      if (!page) {
        page = 0; // Si no hay página, establece la página inicial en 0
      }

      this.paqueteService.getPaquetes(page)
        .pipe(
          tap(response => {
            console.log('PaquetesComponent: tap 3');
            (response.content as Paquete[]).forEach((paquete: Paquete) => {
              console.log(paquete.pedido);
            });
          })
        ).subscribe(response => {
          this.paquetes = response.content as Paquete[];
          this.paginador = response;
        });

    }
    );
  }

  delete(paquete: Paquete): void {

    if (paquete.id === undefined) {
      console.error("El paquete no tiene un ID válido. No se puede eliminar.");
      return; // Detén la ejecución si el ID es inválido
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Está seguro?",
      text: `¿Seguro que desea elimininar el paquete ${paquete.pedido}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "¡Sí, eliminar!",
      cancelButtonText: "¡No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        if (paquete.id !== undefined) {
          this.paqueteService.delete(paquete.id).subscribe(() => {
            this.paquetes = this.paquetes.filter(p => p !== paquete);
          });
        }

        swalWithBootstrapButtons.fire({
          title: "¡Paquete Eliminado!",
          text: `Paquete ${paquete.pedido} eliminado con éxito.`,
          icon: "success"
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Paquete no borrado :)",
          icon: "error"
        });
      }
    });
  }

}
