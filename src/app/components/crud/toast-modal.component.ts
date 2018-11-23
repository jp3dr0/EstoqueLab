import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-toast-modal",
  template: `
    <h1 mat-dialog-title>{{ passedData.success ? "Sucesso" : "Erro" }}</h1>
    <mat-dialog-content>
      <p>{{ passedData.msg ? passedData.msg : "Sem mensagem" }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="center">
      <button mat-button [mat-dialog-close]="true">OK</button>
    </mat-dialog-actions>
  `
})
export class ToastModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}

  ngOnInit() {}
}
