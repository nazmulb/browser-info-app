import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder, private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      password: ["", Validators.required]
    });
    this.returnUrl = "/dashboard";
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  async login() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      const isSuccess = await this.authService.authLogin(this.f.password.value);
      if (isSuccess) {
        console.log("Login successful");
        this.router.navigate([this.returnUrl]);
      } else {
        this.message = "Please check your password";
      }
    }
  }
}
