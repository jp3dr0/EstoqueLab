import { ExcluirModalComponent } from "./../excluir-modal.component";
import { VidrariaService } from "./../../../services/vidraria.service";
import { Router } from "@angular/router";
import { ViewChild } from "@angular/core";
import { MatSort, MatDialog } from "@angular/material";
import { MatTableDataSource } from "@angular/material";
import { Observable } from "rxjs";
import { Vidraria } from "./../../../models/vidraria";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-vidrarias",
  templateUrl: "./vidrarias.component.html",
  styleUrls: ["./vidrarias.component.css"]
})
export class VidrariasComponent implements OnInit {
  vidrarias: Vidraria[];
  vidrariasObservable: Observable<Vidraria[]>;

  displayedColumns = ["nome", "valor", "tamanho", "quantidade", "acoes"];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private vidrariaService: VidrariaService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadReagentes();
  }

  loadReagentes() {
    console.log("get vidrarias");

    this.vidrariasObservable = this.vidrariaService.getVidrarias();

    this.vidrariasObservable.subscribe(vidrarias => {
      console.log(vidrarias);
      this.vidrarias = vidrarias;
      this.dataSource.data = this.vidrarias;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  excluir(id) {
    this.vidrariaService.getVidraria(id).subscribe(vidraria => {
      const dialogRef = this.dialog.open(ExcluirModalComponent, {
        data: {
          tipo: "vidraria",
          nome: vidraria.nome
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log("decidi exlcuir ?", result);
        if (result) {
          this.vidrariaService.deleteVidraria(id).subscribe(
            res => {
              alert(res.toString());
            },
            error => {
              alert(error.toString());
            }
          );
        }
      });
    });
  }

  editar(id) {
    this.router.navigate(["/vidraria", id]);
  }
}
