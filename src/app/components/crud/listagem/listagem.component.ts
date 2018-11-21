import { Observable } from "rxjs";
import { Component, OnInit, Input } from "@angular/core";
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

  @Input() items: any[];

  constructor(private reagenteService: ReagenteService) {}

  ngOnInit() {
    //console.log(this.items.length);

    //this.items = this.fixItems(this.items);
    //console.log(this.items.length);

    this.tamanhos = [];
    //this.reagentes = [];
    /*
    this.tamanhosObservable = this.reagenteService.getTamanhos();

    this.tamanhosObservable.subscribe(tamanhos => {
      console.log(tamanhos);
      this.tamanhos = tamanhos;
    });
    */
  }

  fixItems(items) {
    while (items.length % 2 !== 0) {
      items.push(items[0]);
    }
    return items;
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
