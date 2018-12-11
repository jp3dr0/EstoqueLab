import { Unidade } from "./../models/unidade";
import { Classificacao } from "./../models/classificacao";
import { Tamanho } from "./../models/tamanho";
import { AuthService } from "./auth.service";
import { Reagente } from "src/app/models/reagente";
import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ReagenteService {
  private API_URL = environment.apiUrl + "v1/";
  private header: HttpHeaders;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.auth.getToken()
    );
  }

  getClassificacoes() {
    return this.http.get<Classificacao[]>(this.API_URL + "classificacao", {
      headers: this.header,
      responseType: "json"
    });
  }

  getUnidades() {
    return this.http.get<Unidade[]>(this.API_URL + "unidade", {
      headers: this.header,
      responseType: "json"
    });
  }

  getReagentes() {
    console.log("Bearer " + this.auth.getToken());
    return this.http.get<Reagente[]>(this.API_URL + "reagente", {
      headers: this.header,
      responseType: "json"
    });
  }

  getReagente(id: number): Observable<Reagente> {
    return this.http.get<Reagente>(this.API_URL + "reagente/" + id, {
      headers: this.header,
      responseType: "json"
    });
  }

  createReagente(reagente: Reagente) {
    return this.http.post(this.API_URL + "reagente", reagente, {
      headers: this.header,
      responseType: "json"
    });
  }

  updateReagente(id: number, obj: any): Observable<any> {
    console.log("update reagente", obj);
    return this.http.put(this.API_URL + "reagente/" + id, obj, {
      headers: this.header,
      responseType: "json"
    });
  }

  deleteReagente(id: number): Observable<any> {
    return this.http.delete(this.API_URL + "reagente/" + id, {
      headers: this.header,
      responseType: "json"
    });
  }
}
