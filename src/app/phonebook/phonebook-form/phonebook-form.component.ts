import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Phonebook } from "../phonebook";
import { PhonebookService } from "../phonebook.service";

@Component({
  selector: "app-phonebook-form",
  templateUrl: "./phonebook-form.component.html",
  styleUrls: ["./phonebook-form.component.css"],
})
export class PhonebookFormComponent implements OnInit {
  phoneForm: FormGroup;
  contact: Phonebook;
  id: string;

  constructor(
    private fb: FormBuilder,
    private pbService: PhonebookService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createFrom();
    this.getId();
  }

  createFrom() {
    this.phoneForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      phoneNumber: [null, [Validators.pattern(/^[0-9]{10}$/)]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.contact) {
      this.pbService
        .updateContact(this.contact._id, this.phoneForm.value)
        .subscribe(
          (data) => {
            this.router.navigate(["/"]);
            this.snackbar.open("updated successfully!", "success", {
              duration: 4000,
            });
          },
          (err) => {}
        );
    } else {
      this.pbService.createContact(
        this.phoneForm.value.name,
        this.phoneForm.value.phoneNumber,
        this.phoneForm.value.email
      );
    }
  }

  onCancel() {
    this.phoneForm.reset();
  }

  //**************get id and populate the form */
  private getId() {
    this.route.params.subscribe((params) => {
      let id = params["id"];
      this.id = id;

      if (!id) {
        return;
      }
      this.pbService.getContact(id).subscribe(
        (contact) => {
          this.contact = contact;
          this.phoneForm.patchValue({
            name: this.contact.name,
            phoneNumber: this.contact.phoneNumber,
            email: this.contact.email,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
}
