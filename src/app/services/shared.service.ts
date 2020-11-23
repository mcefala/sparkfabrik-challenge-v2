import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { FirebaseService } from "./firebase.service";

@Injectable()
export class SharedService {
  public quotesurl = "https://type.fit/api/quotes";
  private uid: string;
  public error;
  constructor(
    private http: HttpClient,
    private router: Router,
    private firebase: FirebaseService
  ) {
    this.initFirebase();
  }

  public getRandomQuote(success, failure) {
    this.http.get("https://type.fit/api/quotes").subscribe(
      values => {
        success(values);
      },
      error => {
        failure(error);
      }
    );
  }

  public initFirebase() {
    this.firebase.initFirebase();
  }
  public login(params, success, failure) {
    this.firebase.login(params).then(
      value => {
        success(value);
      },
      error => failure(error)
    );
  }

  public register(params, success, failure) {
    this.firebase
      .register(params)
      .then(value => success(value), error => failure(error));
  }

  public setUid(value) {
    this.uid = value;
  }

  public goQuotes() {
    this.router.navigate(["quotes"], { skipLocationChange: true });
  }

  /**
   * callback {success, failure}
   */
  public getData(success, failure) {
    this.firebase.getData(this.uid).then(
      querySnapshot => {
        success(querySnapshot);
      },
      error => failure(error)
    );
  }

  /**
   * item to delete
   * success callback
   * failure callback
   */
  public delete(item, success, failure) {
    this.firebase
      .delete(this.uid, item)
      .then(
        () => {
          console.log("Document successfully deleted!");
        },
        error => {
          failure(error);
        }
      )
      .finally(() => {
        success();
      });
  }
  /**
   * quote to add
   * success callback
   * failure callback
   */
  public addNewQuote(quote, success, failure) {
    this.firebase.addNewQuote(this.uid, quote).then(
      value => {
        console.log(`${value} written`);
        success();
      },
      error => failure(error)
    );
  }
  public goHome() {
    this.router.navigate([""], { skipLocationChange: true });
  }
  public goLogin() {
    this.router.navigate(["/login"], { skipLocationChange: true });
  }
  public getUid() {
    return this.uid;
  }
}

export class Quote {
  text: string;
  author: string;
}
