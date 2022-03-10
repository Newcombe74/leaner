import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  personalInfoFormGroup!: FormGroup;
  contactInfoFormGroup!: FormGroup;
  emergContactFormGroup!: FormGroup;

  sexes = [{ value: 0, viewValue: 'Male', }, { value: 1, viewValue: 'Female'}, { value: 2, viewValue: 'Prefer not to say', }]

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.personalInfoFormGroup = this._formBuilder.group({
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
      dobCtrl: ['', Validators.required],
      sexCtrl: ['', Validators.required],
    });
    this.contactInfoFormGroup = this._formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]],
      phoneNumberCtrl: ['', Validators.required],
      addressLineOneCtrl: ['', Validators.required],
      addressLineTwoCtrl: ['', Validators.required],
      postcodeCtrl: ['', Validators.required],
    });
    this.emergContactFormGroup = this._formBuilder.group({
      emergNameCtrl: ['', Validators.required],
      emergPhoneNumberCtrl: ['', Validators.required],
    });
  }

}
