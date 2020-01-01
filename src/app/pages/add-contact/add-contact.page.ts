import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { SqlServiceService } from "src/app/sql-service.service";
import {
  ToastController,
  NavController,
  ModalController
} from "@ionic/angular";

@Component({
  selector: "app-add-contact",
  templateUrl: "./add-contact.page.html",
  styleUrls: ["./add-contact.page.scss"]
})
export class AddContactPage implements OnInit {
  addContactForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sqlService: SqlServiceService,
    public toastController: ToastController,
    private modalCtrl: ModalController
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.addContactForm = this.formBuilder.group({
      mobile: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required)
    });
  }

  onSubmit(addContactFormValue) {
    console.log(addContactFormValue);
    this.sqlService.addContact(addContactFormValue).then(
      async () => {
        const toast = await this.toastController.create({
          message: "Contact added Successfully.",
          duration: 2000
        });
        toast.present();
        this.modalCtrl.dismiss();
      },
      err => {
        console.log(err);
      }
    );
  }
}
