import { environment } from "./../../environments/environment.prod";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./../models/auth-data";
import { Usuario } from "./../models/usuario";
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Router } from "@angular/router";
import * as jwtDecode from "jwt-decode";
import { tokenNotExpired } from "angular2-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authChange = new Subject<boolean>();
  private usuario: Usuario;

  constructor(private router: Router, private http: HttpClient) {}

  login(authData: AuthData): Observable<any> {
    this.usuario = {
      email: authData.email,
      senha: authData.senha
      //id: Math.round(Math.random() * 10000).toString()
    };
    return this.http.post(`${environment.apiUrl}login`, this.usuario);
  }

  registrar(authData: AuthData): Observable<any> {
    this.usuario = {
      email: authData.email,
      senha: authData.senha,
      nivel: authData.nivel
    };
    return this.http.post(`${environment.apiUrl}registrar`, this.usuario);
  }

  finishAuthentication(token): void {
    localStorage.setItem("token", token);
    this.router.navigate(["home"]);
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  isAuthenticated(): boolean {
    return tokenNotExpired("token");
  }

  isAdmin(): boolean {
    return jwtDecode(this.getToken()).nivel === 3;
  }

  isTecnico(): boolean {
    return jwtDecode(this.getToken()).nivel === 2;
  }

  isProfessor(): boolean {
    return jwtDecode(this.getToken()).nivel === 1;
  }

  getToken(): string {
    return localStorage.getItem("token");
  }

  getNivel(): string {
    return jwtDecode(this.getToken()).nivel;
  }

  /*
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
  */

  getUsuario() {
    // retorna um novo usuario com as mesmas propriedades de this.usuario. basicamente uma copia
    // isso é feito pra nao retornar a referencia direta do objeto
    return { ...this.usuario };
  }
}
