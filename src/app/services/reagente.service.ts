import { Reagente } from "src/app/models/reagente";
import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ReagenteService {
  constructor(private http: HttpClient) {}

  getTamanhos() {
    return this.http.get<any[]>(environment.apiUrl + "tamanho", {
      responseType: "json"
    });
  }

  getReagentes() {
    return this.http.get<Reagente[]>(environment.apiUrl + "reagente", {
      responseType: "json"
    });
  }

  getReagente(id: number) {
    return this.http.get<Reagente>(environment.apiUrl + "reagente/" + id, {
      responseType: "json"
    });
  }

  createReagente(reagente: Reagente) {
    return this.http.post(environment.apiUrl + "reagente/", reagente);
  }

  updateReagente(id: number, obj: any) {
    console.log("update reagente", obj);
    return this.http.put(environment.apiUrl + "reagente/" + id, obj);
  }

  deleteReagente(id: number) {
    return this.http.delete(environment.apiUrl + "reagente/" + id, {
      responseType: "json"
    });
  }
}
