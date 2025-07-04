import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  standalone: false,
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() paginador:any;

  paginas: number[] = [];

  desde: number | undefined;
  hasta: number | undefined;

  ngOnInit() {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges) {
    let paginadorActualizado = changes['paginador'];

    if(paginadorActualizado.previousValue) {
      this.initPaginator();
    }
  }

  private initPaginator(): void {

    this.desde = Math.min(Math.max(1, this.paginador.number - 4), this.paginador.totalPages - 5);
    this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 4), 6);

    if(this.paginador.totalPages > 5) {
      this.paginas = new Array((this.hasta ?? 0) - (this.desde ?? 0) + 1).fill(0).map((_valor, indice) => indice + (this.desde ?? 0));
    } else {
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice + 1);
    }

  }

}
