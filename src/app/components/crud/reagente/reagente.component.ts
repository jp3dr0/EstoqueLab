import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ReagenteService } from "./../../../services/reagente.service";
import { MatDialog } from "@angular/material";
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
    private dialog: MatDialog,
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
      qtdEstoqueTotal: new FormControl("", {
        validators: []
      })
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params && params["id"] != 0) {
        this.id = +params["id"]; // (+) converts string 'id' to a number
        console.log("id", this.id);
        this.reagenteService.getReagente(this.id).subscribe(r => {
          this.reagente = r;
          this.loading = false;

          this.nome = r.nome;
          this.lacrado = r.qtdEstoqueLacrado;
          this.total = r.qtdEstoqueTotal;
          this.aberto = r.qtdEstoqueAberto;
        });
      } else {
        this.loading = false;
      }
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
            alert(res.toString());
            this.loading = false;
          },
          error => {
            alert(error.toString());
          }
        );
    } else {
      alert("Nenhum valor foi digitado!");
    }
  }

  atualizarTotal() {
    this.total =
      parseInt(this.lacrado.toString()) + parseInt(this.aberto.toString());
  }
}
