import { Injectable } from '@angular/core';
import { Paquete } from './paquetes';
//import { PAQUETES } from './paquetes.json';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Injectable()
export class PaqueteService {

  private urlEndPoint: string = 'http://localhost:8080/api/paquetes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getPaquetes(): Observable<Paquete[]> {
    //return of(PAQUETES);
    return this.http.get<Paquete[]>(this.urlEndPoint).pipe(
      tap((response: Paquete[]) => {
        console.log('PaqueteService: tap 1');
        response.forEach((paquete: Paquete) => {
          console.log(paquete.pedido);
        });
      }),
      map(response => {
        let paquetes = response as Paquete[];
        return paquetes.map(paquete => {
          paquete.pedido = paquete.pedido?.toUpperCase();
          
          let datePipe = new DatePipe('es');
          //paquete.fecha = datePipe.transform(paquete.fecha ?? '', 'EEEE dd, MMMM yyyy') ?? undefined;
          //formatDate(paquete.fecha ?? '', 'dd/MM/yyyy', 'en-US');

          return paquete;
        });

      }
      ),
      tap(response => {
        console.log('PaqueteService: tap 2');
        response.forEach( paquete=> {
          console.log(paquete.pedido);
        })
      })
    );
  }

  create(paquete: Paquete): Observable<Paquete> {
    return this.http.post(this.urlEndPoint, paquete, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.paquete as Paquete),
      catchError(e => {

        if (e.status === 400) {
          return throwError(() => e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  getPaquete(id: number): Observable<Paquete> {
    return this.http.get<Paquete>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/paquetes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar el paquete', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

  update(paquete: Paquete): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${paquete.id}`, paquete, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        
        if (e.status === 400) {
          return throwError(() => e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<Paquete> {
    return this.http.delete<Paquete>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

}
