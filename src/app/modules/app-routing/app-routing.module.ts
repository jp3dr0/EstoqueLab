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
  { path: "home", component: ListagemComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
