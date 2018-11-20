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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", {
        validators: [Validators.required, Validators.email]
      }),
      senha: new FormControl("", { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      senha: this.loginForm.value.senha
    });
  }
}
