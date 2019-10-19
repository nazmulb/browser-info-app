import { Injectable } from "@angular/core";

import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  authLogin(password: string): Promise<boolean> {
    /*
    this.apiService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.error = '';
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          console.log(error);
          this.showSpinner = false;
        }
      );*/


    return new Promise((resolve, reject) => {
      this.apiService.auth(password).subscribe((data: any) => {

        console.dir(data);
        if (data.token) {
          console.log(data.token);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("token", data.token);
          resolve(true);
        }

        reject(false);
      }, error => {
        console.log(`There was an error: ${error.message}`);
        reject(false);
      }
      );
    });
  }

  logout(): void {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("token");
  }
}
