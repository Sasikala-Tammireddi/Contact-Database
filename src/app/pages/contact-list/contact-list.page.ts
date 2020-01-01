import { Component, OnInit } from '@angular/core';
import {
  NavController,
  ToastController,
  ModalController
} from '@ionic/angular';
import { SqlServiceService } from 'src/app/sql-service.service';
import { Router, NavigationExtras } from '@angular/router';
import { AddContactPage } from '../add-contact/add-contact.page';
import { UpdateContactPage } from '../update-contact/update-contact.page';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.page.html',
  styleUrls: ['./contact-list.page.scss']
})
export class ContactListPage implements OnInit {
  public contacts: Array<any> = [];
  constructor(
    private navCtrl: NavController,
    private sqlService: SqlServiceService,
    private toastController: ToastController,
    private router: Router,
    private modalCtrl: ModalController
  ) {
    this.getContacts();
  }

  ngOnInit() {}

  addContact() {
    const modal = this.modalCtrl
      .create({ component: AddContactPage })
      .then(modalElement => {
        modalElement.present();
        modalElement.onDidDismiss().then(() => {
          this.getContacts();
        });
      });
  }

  getContacts() {
    this.sqlService.getContacts().then(
      (data: any) => {
        this.contacts = data;
        console.log(data);
      },
      err => {
        console.log('Error::::::', err);
      }
    );
  }

  updateContact(contact) {
    this.modalCtrl
      .create({
        component: UpdateContactPage,
        componentProps: {
          data: contact
        }
      })
      .then(modalElement => {
        modalElement.present();
        modalElement.onDidDismiss().then(() => {
          this.getContacts();
        });
      });
  }

  deleteContact(contact) {
    this.sqlService.deleteContact(contact.id).then(
      async () => {
        const toast = await this.toastController.create({
          message: 'Contact deleted Successfully.',
          duration: 2000
        });
        toast.present();
        this.getContacts();
      },
      err => {
        console.log(err);
      }
    );
  }
}
