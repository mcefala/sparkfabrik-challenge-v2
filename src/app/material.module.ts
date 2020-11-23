import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
   
  ]
})
export class MaterialModule {}
