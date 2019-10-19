import { Injectable } from "@angular/core";
import { first } from "rxjs/operators";

import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  authLogin(password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService
        .auth(password)
        .pipe(first())
        .subscribe(
          data => {
            resolve(true);
          },
          error => {
            console.log(error);
            reject(false);
          }
        );
    }).catch((error) => {
      console.log(error);
    });
  }

  logout(): void {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("token");
  }
}
