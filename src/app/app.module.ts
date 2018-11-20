import { AppRoutingModule } from "./modules/app-routing/app-routing.module";
import { MaterialModule } from "./modules/material/material.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DndModule } from "ngx-drag-drop";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { HeaderComponent } from "./components/navigation/header/header.component";
import { SidenavComponent } from "./components/navigation/sidenav/sidenav.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { RegistrarComponent } from "./components/auth/registrar/registrar.component";
import { VidrariaComponent } from "./components/crud/vidraria/vidraria.component";
import { ReagenteComponent } from "./components/crud/reagente/reagente.component";
import { ListagemComponent } from "./components/crud/listagem/listagem.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    LoginComponent,
    RegistrarComponent,
    VidrariaComponent,
    ReagenteComponent,
    ListagemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    FlexLayoutModule,
    DndModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
