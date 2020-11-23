import { Component } from "@angular/core";
import { SharedService } from "./services/shared.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(public sharedServices: SharedService) {
    this.sharedServices.goLogin();
  }
}
