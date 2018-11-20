import { AuthData } from "./../models/auth-data";
import { Usuario } from "./../models/usuario";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authChange = new Subject<boolean>();
  private usuario: Usuario;

  constructor(private router: Router) {}

  registrarUsuario(authData: AuthData) {
    this.usuario = {
      email: authData.email,
      id: Math.round(Math.random() * 10000).toString()
    };
    this.entrar();
  }

  login(authData: AuthData) {
    this.usuario = {
      email: authData.email,
      id: Math.round(Math.random() * 10000).toString()
    };
    this.entrar();
  }

  logout() {
    this.usuario = null;
    this.sair();
  }

  getUsuario() {
    // retorna um novo usuario com as mesmas propriedades de this.usuario. basicamente uma copia
    // isso é feito pra nao retornar a referencia direta do objeto
    return { ...this.usuario };
  }

  isAutenticado() {
    return this.usuario != null;
  }

  private entrar() {
    this.authChange.next(true);
    this.router.navigate(["/home"]);
  }

  private sair() {
    this.authChange.next(false);
    this.router.navigate(["/"]);
  }
}
