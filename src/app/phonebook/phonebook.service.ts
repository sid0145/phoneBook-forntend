import { Injectable } from "@angular/core";
import { ContactWithPage, Phonebook } from "./phonebook";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

const BACKKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class PhonebookService {
  contacts: Phonebook[] = [];

  private contactUpdated = new Subject<{
    contacts: Phonebook[];
    contactCount: number;
  }>();
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  createContact(name: string, phoneNumber: number, email: string) {
    const data = { name: name, phoneNumber: phoneNumber, email: email };
    this.http.post(`${BACKKEND_URL}/createContact`, data).subscribe((data) => {
      this.router.navigate(["/"]);
      this.snackbar.open("added success", "success", {
        duration: 3000,
      });
    });
  }

  //**********get all contacts */
  getAllContacts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;

    this.http
      .get<{ message: string; contacts: any; maxPosts: number }>(
        BACKKEND_URL + "/getContacts" + queryParams
      )
      .subscribe(
        (data) => {
          this.contacts = data.contacts;
          this.contactUpdated.next({
            contacts: [...this.contacts],
            contactCount: data.maxPosts,
          });
        },
        (err) => {}
      );
  }

  //*************get updated listener */
  getContactUpdateListner() {
    return this.contactUpdated.asObservable();
  }

  //****************get contact by id */

  getContact(id: string) {
    return this.http.get<Phonebook>(`${BACKKEND_URL}/getContact/${id}`);
  }

  //****************update contact */

  updateContact(id: string, body: Phonebook) {
    return this.http.put(`${BACKKEND_URL}/updateContact/${id}`, body);
  }
  //*****************delete handler */
  deleteContact(id: string) {
    return this.http.delete(`${BACKKEND_URL}/deleteContact/${id}`);
  }
}
