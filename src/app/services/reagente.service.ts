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
    return this.http.get<any[]>(environment.apiUrl + "reagente", {
      responseType: "json"
    });
  }
}
