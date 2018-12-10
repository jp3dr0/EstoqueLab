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
    let snackbarMsg = "Sem Resposta";

    await this.authService
      .login({
        email: this.loginForm.value.email,
        senha: this.loginForm.value.senha
      })
      .subscribe(
        response => this.authService.finishAuthentication(response.token),
        //error => (snackbarMsg = error.msg)
        error => console.log(error)
      );

    this.snackBar
      .open(snackbarMsg, "OK", {
        duration: 2000
      })
      .afterDismissed()
      .subscribe(() => {
        //
      });
  }
}
