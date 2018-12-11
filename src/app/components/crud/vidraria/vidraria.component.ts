import { Tamanho } from "./../../../models/tamanho";
import { Unidade } from "./../../../models/unidade";
import { ToastModalComponent } from "./../toast-modal.component";
import { FormControl } from "@angular/forms";
import { VidrariaService } from "./../../../services/vidraria.service";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { Vidraria } from "./../../../models/vidraria";
import { Component, OnInit, AfterViewInit } from "@angular/core";

@Component({
  selector: "app-vidraria",
  templateUrl: "./vidraria.component.html",
  styleUrls: ["./vidraria.component.scss"]
})
export class VidrariaComponent implements OnInit {
  tamanhos: Tamanho[];
  unidades: Unidade[];
  create: boolean;

  vidraria: Vidraria;
  id: number;
  private sub: any;
  form: FormGroup;
  loading: boolean;

  nome: string;
  estoque: number;
  valor: number;
  tamanho: number;
  unidade: number;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private vidrariaService: VidrariaService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loading = true;

    this.form = new FormGroup({
      nome: new FormControl("", {
        validators: []
      }),
      tamanho: new FormControl("", {
        validators: []
      }),
      unidade: new FormControl("", {
        validators: []
      }),
      valor: new FormControl("", {
        validators: []
      }),
      qtdEstoque: new FormControl(0, {
        //validators: [Validators.required]
      })
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params && params["id"] !== 0 && params["id"] != undefined) {
        this.id = +params["id"]; // (+) converts string 'id' to a number

        this.getVidraria();
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
    this.vidrariaService.getTamanhos().subscribe(t => {
      if (t === null) location.reload();
      this.tamanhos = t;
      console.log(this.tamanhos);
    });
    this.vidrariaService.getUnidades().subscribe(u => {
      if (u === null) location.reload();
      this.unidades = u;
      console.log(this.unidades);
    });
    this.loading = false;
  }

  getVidraria() {
    this.vidrariaService.getVidraria(this.id).subscribe(v => {
      if (v === null) location.reload();
      this.vidraria = v;
      this.loading = false;

      this.nome = v.nome;
      this.estoque = v.qtdEstoque;
      this.tamanho = v.tamanho ? v.tamanho.id : null;
      this.valor = v.valor;
      this.unidade = v.unidade ? v.unidade.id : null;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    let values = { ...this.form.value };

    console.log(values);

    Object.keys(values).forEach(value => {
      console.log(value);
      if (value === undefined) {
        value = null;
      }
    });

    console.log("editar ", values);
    if (values) {
      this.loading = true;

      const sub = this.create
        ? this.vidrariaService.createVidraria({
            ...values
          })
        : this.vidrariaService.updateVidraria(this.id, {
            ...values
          });

      sub.subscribe(
        res => {
          console.log(res);
          if (!this.create) this.getVidraria();
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
