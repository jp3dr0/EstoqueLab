import { PageNotFoundComponent } from "./../../components/navigation/page-not-found/page-not-found.component";
import { ReagentesComponent } from "./../../components/crud/reagentes/reagentes.component";
import { VidrariasComponent } from "./../../components/crud/vidrarias/vidrarias.component";
import { ReagenteComponent } from "./../../components/crud/reagente/reagente.component";
import { VidrariaComponent } from "./../../components/crud/vidraria/vidraria.component";
import { AuthGuard } from "./../../guards/auth.guard";
import { ListagemComponent } from "./../../components/crud/listagem/listagem.component";
import { LoginComponent } from "./../../components/auth/login/login.component";
import { RegistrarComponent } from "./../../components/auth/registrar/registrar.component";
import { HomeComponent } from "./../../components/home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "registrar", component: RegistrarComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: ListagemComponent, canActivate: [AuthGuard] },
  { path: "vidraria", component: VidrariaComponent },
  { path: "vidraria/:id", component: VidrariaComponent },
  { path: "reagente", component: ReagenteComponent },
  { path: "reagente/:id", component: ReagenteComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
