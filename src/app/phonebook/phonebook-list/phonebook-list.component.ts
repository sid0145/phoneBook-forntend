import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSnackBar, PageEvent } from "@angular/material";
import { Subscription } from "rxjs";
import { Phonebook } from "../phonebook";
import { PhonebookService } from "../phonebook.service";

@Component({
  selector: "app-phonebook-list",
  templateUrl: "./phonebook-list.component.html",
  styleUrls: ["./phonebook-list.component.css"],
})
export class PhonebookListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["name", "phone", "email"];
  dataSource: Phonebook[] = [];
  resultLengths = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private pbService: PhonebookService,
    private snackBar: MatSnackBar
  ) {}

  contacts: Phonebook[] = [];
  contactsSubscription: Subscription;
  isLoading = false;
  currentPage = 1;
  totalContacts = 0;
  contactsperPage = 10;
  pageSizeOptions = [10, 2, 5];

  ngOnInit() {
    this.isLoading = true;
    this.pbService.getAllContacts(this.contactsperPage, this.currentPage);
    this.contactsSubscription = this.pbService
      .getContactUpdateListner()
      .subscribe((data: { contacts: Phonebook[]; contactCount: number }) => {
        this.isLoading = false;
        this.totalContacts = data.contactCount;
        this.contacts = data.contacts;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.contactsperPage = pageData.pageSize;
    this.pbService.getAllContacts(this.contactsperPage, this.currentPage);
  }

  //***********delete handler */
  onDelete(id: string) {
    this.pbService.deleteContact(id).subscribe(() => {
      this.pbService.getAllContacts(this.contactsperPage, this.currentPage);
      this.snackBar.open("deleted successfully!", "success", {
        duration: 3000,
      });
    });
  }

  ngOnDestroy() {
    this.contactsSubscription.unsubscribe();
  }
}
