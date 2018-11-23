import { Reagente } from "./../../../models/reagente";
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import {
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatSnackBar
} from "@angular/material";
import { ReagenteService } from "src/app/services/reagente.service";
import { Observable } from "rxjs";
import { ExcluirModalComponent } from "../excluir-modal.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-reagentes",
  templateUrl: "./reagentes.component.html",
  styleUrls: ["./reagentes.component.css"]
})
export class ReagentesComponent implements OnInit, AfterViewInit {
  reagentes: Reagente[];
  reagentesObservable: Observable<Reagente[]>;
  loading: boolean;

  displayedColumns = ["nome", "valor", "classificacao", "quantidade", "acoes"];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private reagenteService: ReagenteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.getReagentes();
  }

  getReagentes() {
    console.log("get reagentes");

    this.reagentesObservable = this.reagenteService.getReagentes();

    this.reagentesObservable.subscribe(reagentes => {
      console.log(reagentes);
      this.reagentes = reagentes;
      this.dataSource.data = this.reagentes;
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  excluir(id) {
    let reagente: Reagente;
    this.reagenteService.getReagente(id).subscribe(r => {
      reagente = r;
      const dialogRef = this.dialog.open(ExcluirModalComponent, {
        data: {
          tipo: "reagente",
          nome: reagente.nome
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log("decidi exlcuir ?", result);
        if (result) {
          this.reagenteService.deleteReagente(id).subscribe(
            res => {
              console.log(res);
              this.getReagentes();
              /*
              if (res.msg) {
                const dialogRef = this.dialog.open(ToastModalComponent, {
                  data: {
                    msg: res.msg,
                    success: true
                  }
                });
  
                dialogRef.afterClosed().subscribe(result => {
                  if (result) {
                    //
                  }
                });
              }
              */

              this.snackBar
                .open(res, "OK", {
                  duration: 2000
                })
                .afterDismissed()
                .subscribe(() => {
                  //
                });
            },
            error => {
              console.log(error);
            }
          );
        }
      });
    });
  }

  editar(id) {
    //this.router.navigate(["/reagente", id]);
    this.router.navigate(["/reagente/" + id]);
  }
}
