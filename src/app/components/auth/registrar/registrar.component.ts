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

  constructor(private authService: AuthService) {
    this.dataMaxima = moment();
    // a pessoa deve ter no minimo 18 anos
    this.dataMaxima.year(this.dataMaxima.year() - 18);
  }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    console.log(form);
    this.authService.registrarUsuario({
      email: form.value.email,
      senha: form.value.senha
    });
  }
}
