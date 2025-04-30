import { Component, OnInit } from '@angular/core';
import { Paquete } from './paquetes';
import { PaqueteService } from './paquete.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paquetes',
  standalone: false,
  templateUrl: './paquetes.component.html',
  styleUrl: './paquetes.component.css'
})
export class PaquetesComponent implements OnInit {

  paquetes: Paquete[] = [];

  constructor(private paqueteService: PaqueteService) { }

  ngOnInit() {
    this.paqueteService.getPaquetes().pipe(
      tap((paquetes: Paquete[]) => {
        console.log('PaquetesComponent: tap 3');
        paquetes.forEach((paquete: Paquete) => {
          console.log(paquete.pedido);
        });
      })
    ).subscribe(paquetes => this.paquetes = paquetes);
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
