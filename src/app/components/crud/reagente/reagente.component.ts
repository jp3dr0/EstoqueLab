import { Unidade } from "./../../../models/unidade";
import { Classificacao } from "./../../../models/classificacao";
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
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-reagente",
  templateUrl: "./reagente.component.html",
  styleUrls: ["./reagente.component.css"]
})
export class ReagenteComponent implements OnInit, OnDestroy {
  classificacoes: Classificacao[];
  unidades: Unidade[];
  create: boolean;

  reagente: Reagente;
  id: number;
  private sub: any;
  form: FormGroup;
  loading: boolean;

  nome: string;
  classificacao: number;
  unidade: number;
  valor: number;
  lacrado: number;
  aberto: number;
  total: number;

  constructor(
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private reagenteService: ReagenteService,
    private router: Router
  ) {
    this.loading = true;

    this.form = new FormGroup({
      nome: new FormControl("", {
        validators: [Validators.required]
      }),
      classificacao: new FormControl("", {
        validators: [Validators.required]
      }),
      unidade: new FormControl("", {
        validators: [Validators.required]
      }),
      valor: new FormControl("", {
        validators: [Validators.required]
      }),
      qtdEstoqueLacrado: new FormControl(0, {
        //validators: [Validators.required]
      }),
      qtdEstoqueAberto: new FormControl(0, {
        validators: []
      }),
      qtdEstoqueTotal: new FormControl(
        { value: 0, disabled: true },
        {
          validators: []
        }
      )
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      //console.log(params["id"]);
      if (params && params["id"] !== 0 && params["id"] != undefined) {
        this.id = +params["id"]; // (+) converts string 'id' to a number
        console.log("id", this.id);
        this.getReagente();
        this.create = false;
      } else {
        this.create = true;
        this.loading = false;
      }
      this.getSelects();
      // In a real app: dispatch action to load the details here.
    });
  }

  getSelects() {
    this.reagenteService.getClassificacoes().subscribe(c => {
      if (c === null) location.reload();
      this.classificacoes = c;
      console.log(this.classificacoes);
    });
    this.reagenteService.getUnidades().subscribe(u => {
      if (u === null) location.reload();
      this.unidades = u;
      console.log(this.unidades);
    });
    this.loading = false;
  }

  getReagente() {
    this.reagenteService.getReagente(this.id).subscribe(r => {
      if (r === null) location.reload();
      this.reagente = r;
      this.loading = false;

      this.classificacao = r.classificacao ? r.classificacao.id : null;
      this.unidade = r.unidade ? r.unidade.id : null;
      this.valor = r.valor;
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
      (this.lacrado ? parseInt(this.lacrado.toString()) : 0) +
      (this.aberto ? parseInt(this.aberto.toString()) : 0);
  }

  onSubmit() {
    console.log("editar ", this.form.value);
    if (this.form.value) {
      this.loading = true;

      const sub = this.create
        ? this.reagenteService.createReagente({
            ...this.form.value
          })
        : this.reagenteService.updateReagente(this.id, {
            ...this.form.value
          });

      sub.subscribe(
        res => {
          console.log(res);
          if (!this.create) this.getReagente();
          else this.router.navigate(["/home"]);

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
