import { MatSnackBar } from "@angular/material";
import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "app-registrar",
  templateUrl: "./registrar.component.html",
  styleUrls: ["./registrar.component.css"]
})
export class RegistrarComponent implements OnInit {
  dataMaxima: moment.Moment;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
    this.dataMaxima = moment();
    // a pessoa deve ter no minimo 18 anos
    this.dataMaxima.year(this.dataMaxima.year() - 18);
  }

  ngOnInit() {}

  async onSubmit(form: NgForm) {
    console.log(form.value);

    let snackbarMsg = "";

    await this.authService
      .registrar({
        email: form.value.email,
        senha: form.value.senha,
        nome: form.value.nome,
        login: form.value.login,
        nivel: form.value.nivel
      })
      .subscribe(
        response => {
          this.snackBar
            .open("Registro realizado com sucesso. Seja bem vindo!", "OK", {
              duration: 4000
            })
            .afterDismissed()
            .subscribe(() => {
              //
            });
          this.authService.finishAuthentication(response.token);
        },
        error => {
          console.log(error);
          this.snackBar
            .open(error.error.msg, "OK", {
              duration: 4000
            })
            .afterDismissed()
            .subscribe(() => {
              //
            });
        }
        //error => console.log(error)
      );
  }
}
