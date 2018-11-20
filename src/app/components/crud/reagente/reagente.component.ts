import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatTableDataSource, MatSort } from "@angular/material";
import { ReagenteService } from "src/app/services/reagente.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-reagente",
  templateUrl: "./reagente.component.html",
  styleUrls: ["./reagente.component.css"]
})
export class ReagenteComponent implements OnInit, AfterViewInit {
  reagentes: any[];
  reagentesObservable: Observable<any[]>;

  displayedColumns = ["nome", "valor", "classificacao", "quantidade", "acoes"];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private reagenteService: ReagenteService) {}

  ngOnInit() {
    this.loadReagentes();
  }

  loadReagentes() {
    console.log("get reagentes");

    this.reagentesObservable = this.reagenteService.getReagentes();

    this.reagentesObservable.subscribe(reagentes => {
      console.log(reagentes);
      this.reagentes = reagentes;
      this.dataSource.data = this.reagentes;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }
}
