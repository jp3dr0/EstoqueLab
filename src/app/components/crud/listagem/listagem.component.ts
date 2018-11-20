import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { ReagenteService } from "src/app/services/reagente.service";

@Component({
  selector: "app-listagem",
  templateUrl: "./listagem.component.html",
  styleUrls: ["./listagem.component.css"]
})
export class ListagemComponent implements OnInit {
  reagentes: any[];
  reagentesObservable: Observable<any[]>;
  tamanhos: any[];
  tamanhosObservable: Observable<any[]>;

  constructor(private reagenteService: ReagenteService) {}

  ngOnInit() {
    this.tamanhos = [];
    this.reagentes = [];

    this.tamanhosObservable = this.reagenteService.getTamanhos();

    this.tamanhosObservable.subscribe(tamanhos => {
      console.log(tamanhos);
      this.tamanhos = tamanhos;
    });
  }

  getReagentes() {
    console.log("get reagentes");

    this.reagentesObservable = this.reagenteService.getReagentes();

    this.reagentesObservable.subscribe(reagentes => {
      console.log(reagentes);
      this.reagentes = reagentes;
    });
  }
}
