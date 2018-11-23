import { ToastModalComponent } from "./../toast-modal.component";
import { FormControl } from "@angular/forms";
import { VidrariaService } from "./../../../services/vidraria.service";
import { MatDialog, MatSnackBar } from "@angular/material";
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
    private vidrariaService: VidrariaService,
    public snackBar: MatSnackBar
  ) {
    this.loading = true;

    this.form = new FormGroup({
      nome: new FormControl("", {
        validators: []
      }),
      qtdEstoque: new FormControl("", {
        //validators: [Validators.required]
      })
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params && params["id"] != 0) {
        this.id = +params["id"]; // (+) converts string 'id' to a number

        this.getVidraria();
      } else {
        this.loading = false;
      }
      // In a real app: dispatch action to load the details here.
    });
  }

  getVidraria() {
    this.vidrariaService.getVidraria(this.id).subscribe(v => {
      this.vidraria = v;
      this.loading = false;

      this.nome = v.nome;
      this.estoque = v.qtdEstoque;
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
            console.log(res);
            this.getVidraria();
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
