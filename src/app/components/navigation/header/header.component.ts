import { AuthService } from "./../../../services/auth.service";
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isLoggedIn: boolean;
  authSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(
      authStatus => {
        this.isLoggedIn = authStatus;
        //console.log("logged in ", this.isLoggedIn);
      }
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
