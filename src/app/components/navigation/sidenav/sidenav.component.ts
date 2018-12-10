import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();

  //isLoggedIn: boolean;
  //authSubscription: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    /*
    this.authSubscription = this.authService.authChange.subscribe(
      authStatus => {
        this.isLoggedIn = authStatus;
        //console.log("logged in ", this.isLoggedIn);
      }
    );
    */
  }
  /*
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
  */

  onLogout() {
    this.auth.logout();
  }

  onClose() {
    this.closeSidenav.emit();
  }
}
