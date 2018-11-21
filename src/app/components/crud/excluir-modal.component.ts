import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-excluir-modal",
  template: `
    <h1 mat-dialog-title>Você tem certeza?</h1>
    <mat-dialog-content>
      <p>
        Realmente deseja excluir o {{ passedData.tipo }}
        {{ passedData.nome ? passedData.nome : "" }}?
      </p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Sim</button>
      <button mat-button [mat-dialog-close]="false">Não</button>
    </mat-dialog-actions>
  `
})
export class ExcluirModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}

  ngOnInit() {}
}
