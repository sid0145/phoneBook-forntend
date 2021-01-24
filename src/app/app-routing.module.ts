import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PhonebookFormComponent } from "./phonebook/phonebook-form/phonebook-form.component";
import { PhonebookListComponent } from "./phonebook/phonebook-list/phonebook-list.component";

const routes: Routes = [
  {
    path: "",
    component: PhonebookListComponent,
  },
  {
    path: "add-contact",
    component: PhonebookFormComponent,
  },
  {
    path: "edit-contact/:id",
    component: PhonebookFormComponent,
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
