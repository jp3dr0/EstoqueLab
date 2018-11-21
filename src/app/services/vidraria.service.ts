import { Vidraria } from "./../models/vidraria";
import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Tamanho } from "../models/tamanho";

@Injectable({
  providedIn: "root"
})
export class VidrariaService {
  constructor(private http: HttpClient) {}

  getTamanhos() {
    return this.http.get<Tamanho[]>(environment.apiUrl + "tamanho", {
      responseType: "json"
    });
  }

  getVidrarias() {
    return this.http.get<Vidraria[]>(environment.apiUrl + "vidraria", {
      responseType: "json"
    });
  }

  getVidraria(id: number) {
    return this.http.get<Vidraria>(environment.apiUrl + "vidraria/" + id, {
      responseType: "json"
    });
  }

  createVidraria(vidraria: Vidraria) {
    return this.http.post(environment.apiUrl + "vidraria/", vidraria);
  }

  updateVidraria(id: number, obj: any) {
    console.log("update vidraria", obj);
    return this.http.put(environment.apiUrl + "vidraria/" + id, obj);
  }

  deleteVidraria(id: number) {
    return this.http.delete(environment.apiUrl + "vidraria/" + id, {
      responseType: "json"
    });
  }
}
