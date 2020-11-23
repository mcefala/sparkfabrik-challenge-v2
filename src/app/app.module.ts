import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { QuoteComponent, randomQuoteModal } from "./quote/quote.component";
import { SharedService } from "./services/shared.service";
import { HttpClientModule } from "@angular/common/http";
import { FirebaseService } from "./services/firebase.service";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material.module";
import { APP_BASE_HREF } from "@angular/common";
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: "login", component: LoginComponent },
      { path: "quotes", component: QuoteComponent },
      { path: "", component: AppComponent },
      { path: "**", redirectTo: "" }
    ])
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    QuoteComponent,
    randomQuoteModal
  ],
  bootstrap: [AppComponent],
  providers: [
    SharedService,
    FirebaseService,
    { provide: APP_BASE_HREF, useValue: "/app" }
  ]
})
export class AppModule {}
