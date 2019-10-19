import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Server Web Interface";

  constructor(private authGuard: AuthGuard, private router: Router, private authService: AuthService, private apiService: ApiService) { }

  ngOnInit() { }

  get isLoggedIn(): boolean {
    return this.authGuard.isLoggedIn();
  }

  logout(): void {
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
