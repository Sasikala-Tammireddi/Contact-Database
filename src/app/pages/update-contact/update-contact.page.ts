import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { SqlServiceService } from 'src/app/sql-service.service';
import { ToastController, NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.page.html',
  styleUrls: ['./update-contact.page.scss']
})
export class UpdateContactPage implements OnInit {
  updateContactForm: FormGroup;
  public info: any;

  constructor(
    private formBuilder: FormBuilder,
    private sqlService: SqlServiceService,
    private toastController: ToastController,
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) {
    this.info = this.navParams.get('data');
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.updateContactForm = this.formBuilder.group({
      id: new FormControl(''),
      mobile: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    console.log('contact:::::::::::::::\n', this.info);
    this.updateContactForm.patchValue(this.info);
  }

  onSubmit(updateContactFormValue) {
    console.log(updateContactFormValue);
    this.sqlService.updateContact(updateContactFormValue).then(
      async () => {
        const toast = await this.toastController.create({
          message: 'Contact updated Successfully.',
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
