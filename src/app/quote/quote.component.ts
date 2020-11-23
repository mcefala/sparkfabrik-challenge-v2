import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { Quote, SharedService } from "../services/shared.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-quote",
  templateUrl: "./quote.component.html",
  styleUrls: ["./quote.component.css"]
})
export class QuoteComponent implements OnInit {
  random: Quote;
  quote: Quote;
  quotesview: any[];
  quotes: any[];
  crit;
  error;

  constructor(
    public sharedServices: SharedService,
    public dialog: MatDialog,
    private snack: MatSnackBar
  ) {}
  ngOnInit() {
    this.init();
  }

  init() {
    this.quote = new Quote();
    this.getRandomQuote();
    this.getData();
  }

  public search(value) {
    let filtered = [];
    if (value.length === 0) {
      this.quotesview = [];
      filtered = [];
      this.getData();
    }
    if (value.length > 2) {
      let criteria = value.split(" ");
      console.log(criteria);
      for (var i in criteria) {
        filtered = this.quotes.filter(item => {
          let text = item.data().quote ? item.data().quote : item.data().text;
          if (filtered.indexOf(item) > -1) return true;
          if (criteria[i].toLowerCase().length > 0)
            return (
              text.toLowerCase().includes(criteria[i].toLowerCase()) > 0 ||
              item
                .data()
                .author.toLowerCase()
                .includes(criteria[i].toLowerCase()) > 0
            );
        });
      }
      this.quotesview = filtered;
    }
  }

  public copyToClipboard(item) {
    var textArea = document.createElement("textarea");
    let text = item.data().quote ? item.data().quote : item.data().text;
    textArea.value = `${text} \n(${item.data().author})`;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    let copy = document.execCommand("copy");
    document.body.removeChild(textArea);
    if (copy) {
      this.setError("Copied to clipboard");
      console.log("copied");
    }
  }

  private readData(value) {
    value.forEach(item => {
      this.quotes.push(item);
      this.quotes.sort((a, b) =>
        a.data().timestamp > b.data().timestamp
          ? -1
          : b.data().timestamp > a.data().timestamp
          ? 1
          : 0
      );
      this.quotesview = this.quotes;
    });
    console.log(this.quotesview);
  }

  private randomQuote(value) {
    let randoms = value as Quote[];
    this.random = randoms[Math.floor(Math.random() * randoms.length)];
    let dialog = this.dialog.open(randomQuoteModal, {
      width: "100%",
      data: this.random
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.addNewQuote(this.random);
      }
    });
  }

  private setError(error) {
    this.snack.open(error, "close", { duration: 2000 });
    this.error = error;
  }

  private getData() {
    this.quotesview = [];
    this.quotes = [];
    this.sharedServices.getData(
      value => this.readData(value),
      this.setError.bind(this)
    );
  }

  private getRandomQuote() {
    this.sharedServices.getRandomQuote(
      this.randomQuote.bind(this),
      this.setError.bind(this)
    );
  }

  public addNewQuote(value: Quote) {
    if (!value.author) value.author = "anonymous";
    this.sharedServices.addNewQuote(
      value,
      () => {
        this.clearfields();
        this.getData();
      },
      error => this.setError(error)
    );
  }
  public delete(value: any) {
    this.sharedServices.delete(
      value,
      () => this.getData(),
      error => this.setError(error)
    );
  }
  public clearfields() {
    this.quote = new Quote();
  }
}

@Component({
  selector: "random-quote-modal",
  templateUrl: "./randomQuoteModalTemplate.html",
  styleUrls: ["./quote.component.css"]
})
export class randomQuoteModal {
  constructor(
    public dialogRef: MatDialogRef<randomQuoteModal>,
    @Inject(MAT_DIALOG_DATA) public random: Quote
  ) {}

  close() {
    this.dialogRef.close();
  }
  save() {
    return true;
  }
}
