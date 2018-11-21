import { FormControl } from "@angular/forms";
import { VidrariaService } from "./../../../services/vidraria.service";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { Vidraria } from "./../../../models/vidraria";
import { Component, OnInit, AfterViewInit } from "@angular/core";
@Component({
  selector: "app-vidraria",
  templateUrl: "./vidraria.component.html",
  styleUrls: ["./vidraria.component.scss"]
})
export class VidrariaComponent implements OnInit {
  vidraria: Vidraria;
  id: number;
  private sub: any;
  form: FormGroup;
  loading: boolean;

  nome: string;
  estoque: number;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private vidrariaService: VidrariaService
  ) {
    this.loading = true;

    this.form = new FormGroup({
      nome: new FormControl("", {
        validators: []
      }),
      estoque: new FormControl("", {
        //validators: [Validators.required]
      })
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params && params["id"] != 0) {
        this.id = +params["id"]; // (+) converts string 'id' to a number

        this.vidrariaService.getVidraria(this.id).subscribe(v => {
          this.vidraria = v;
          this.loading = false;

          this.nome = v.nome;
          this.estoque = v.qtdEstoque;
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
      this.vidrariaService
        .updateVidraria(this.id, {
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
}
