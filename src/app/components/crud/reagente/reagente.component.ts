import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ReagenteService } from "./../../../services/reagente.service";
import { MatSnackBar } from "@angular/material";
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { Reagente } from "src/app/models/reagente";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-reagente",
  templateUrl: "./reagente.component.html",
  styleUrls: ["./reagente.component.css"]
})
export class ReagenteComponent implements OnInit, OnDestroy {
  reagente: Reagente;
  id: number;
  private sub: any;
  form: FormGroup;
  loading: boolean;

  nome: string;
  lacrado: number;
  aberto: number;
  total: number;

  constructor(
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private reagenteService: ReagenteService
  ) {
    this.loading = true;

    this.form = new FormGroup({
      nome: new FormControl("", {
        validators: []
      }),
      qtdEstoqueLacrado: new FormControl("", {
        //validators: [Validators.required]
      }),
      qtdEstoqueAberto: new FormControl("", {
        validators: []
      }),
      qtdEstoqueTotal: new FormControl(
        { value: "", disabled: true },
        {
          validators: []
        }
      )
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params && params["id"] != 0) {
        this.id = +params["id"]; // (+) converts string 'id' to a number
        console.log("id", this.id);
        this.getReagente();
      } else {
        this.loading = false;
      }
      // In a real app: dispatch action to load the details here.
    });
  }

  getReagente() {
    this.reagenteService.getReagente(this.id).subscribe(r => {
      this.reagente = r;
      this.loading = false;

      this.nome = r.nome;
      this.lacrado = r.qtdEstoqueLacrado;
      this.total = r.qtdEstoqueTotal;
      this.aberto = r.qtdEstoqueAberto;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  atualizarTotal() {
    this.total =
      parseInt(this.lacrado.toString()) + parseInt(this.aberto.toString());
  }

  onSubmit() {
    console.log("editar " + this.form.value);
    if (this.form.value) {
      this.loading = true;
      this.reagenteService
        .updateReagente(this.id, {
          ...this.form.value
        })
        .subscribe(
          res => {
            console.log(res);
            this.getReagente();
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
              .open(res.msg, "OK", {
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
    } else {
      this.snackBar.open("Nenhum valor foi adicionado!", "OK", {
        duration: 2000
      });
    }
  }
}
