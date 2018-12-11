import { MatSnackBar } from "@angular/material";
import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", {
        validators: [Validators.required, Validators.email]
      }),
      senha: new FormControl("", { validators: [Validators.required] })
    });
  }

  async onSubmit() {
    await this.authService
      .login({
        email: this.loginForm.value.email,
        senha: this.loginForm.value.senha
      })
      .subscribe(
        response => {
          this.snackBar
            .open("Login realizado com sucesso. Seja bem vindo!", "OK", {
              duration: 4000
            })
            .afterDismissed()
            .subscribe(() => {
              //
            });
          this.authService.finishAuthentication(response.token);
        },
        error => {
          console.log(error.error.msg);
          console.log(error);
          //this.snackbarMsg = "aa";

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

    //snackbarMsg = "aa";

    //console.log(this.snackbarMsg);
    /*
    this.snackBar
      .open(this.snackbarMsg, "OK", {
        duration: 2000
      })
      .afterDismissed()
      .subscribe(() => {
        //
      });
      */
  }
}
