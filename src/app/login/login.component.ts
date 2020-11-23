import { Component, OnInit } from "@angular/core";
import { SharedService } from "../services/shared.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email;
  password;
  error;
  constructor(
    public sharedServices: SharedService,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.sharedServices.initFirebase();
  }

  login() {
    let params = {
      email: this.email,
      password: this.password
    };
    try {
      this.sharedServices.login(
        params,
        value => this.success(value),
        error => this.setError(error)
      );
    } catch (error) {
      this.setError(error);
    }
  }

  register() {
    let params = {
      email: this.email,
      password: this.password
    };
    try {
      this.sharedServices.register(
        params,
        this.success.bind(this),
        this.setError.bind(this)
      );
    } catch (error) {
      this.setError(error);
    }
  }

  private success(value) {
    this.sharedServices.setUid(value.user.uid);
    this.sharedServices.goQuotes();
  }
  private setError(error) {
    this.snack.open(error, "close", { duration: 3000 });
    this.error = error;
  }
}
