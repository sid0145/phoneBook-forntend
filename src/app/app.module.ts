import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PhonebookFormComponent } from "./phonebook/phonebook-form/phonebook-form.component";
import { PhonebookListComponent } from "./phonebook/phonebook-list/phonebook-list.component";

//*********material modules */
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTableModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSelectModule,
  MatExpansionModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, PhonebookFormComponent, PhonebookListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
