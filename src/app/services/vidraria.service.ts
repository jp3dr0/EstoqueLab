import { AuthService } from "./auth.service";
import { Vidraria } from "./../models/vidraria";
import { environment } from "./../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Tamanho } from "../models/tamanho";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class VidrariaService {
  private API_URL = environment.apiUrl + "v1/";
  private header: HttpHeaders;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.auth.getToken()
    );
  }

  getTamanhos() {
    return this.http.get<Tamanho[]>(this.API_URL + "tamanho", {
      headers: this.header,
      responseType: "json"
    });
  }

  getVidrarias() {
    return this.http.get<Vidraria[]>(this.API_URL + "vidraria", {
      headers: this.header,
      responseType: "json"
    });
  }

  getVidraria(id: number) {
    return this.http.get<Vidraria>(this.API_URL + "vidraria/" + id, {
      headers: this.header,
      responseType: "json"
    });
  }

  createVidraria(vidraria: Vidraria) {
    return this.http.post(this.API_URL + "vidraria/", vidraria, {
      headers: this.header,
      responseType: "json"
    });
  }
  /*
  updateVidraria(id: number, obj: any) {
    console.log("update vidraria", obj);
    return this.http.put(this.API_URL + "teste/verbo/" + id, obj);
  }
  */

  updateVidraria(id: number, obj: any): Observable<any> {
    console.log("update vidraria", obj);
    return this.http.put(this.API_URL + "vidraria/" + id, obj, {
      headers: this.header,
      responseType: "json"
    });
  }

  deleteVidraria(id: number): Observable<any> {
    return this.http.delete(this.API_URL + "vidraria/" + id, {
      headers: this.header,
      responseType: "json"
    });
  }
}
