import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { LeanERErrorStateMatcher } from 'src/app/shared/utils/leaner-error-state-matcher';
import { User } from 'src/db/db';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  personalInfoFormGroup!: FormGroup;
  contactInfoFormGroup!: FormGroup;
  emergContactFormGroup!: FormGroup;
  passwordFormGroup!: FormGroup;

  minDate: Date;
  maxDate: Date;

  hidePassword = true;
  hideConfirmPassword = true;
  matcher = new LeanERErrorStateMatcher();

  sexes = [
    { value: 0, viewValue: 'Male' },
    { value: 1, viewValue: 'Female' },
    { value: 2, viewValue: 'Prefer not to say' },
  ];

  constructor(private _formBuilder: FormBuilder) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date();
  }

  ngOnInit() {
    this.personalInfoFormGroup = this._formBuilder.group({
      firstNameCtrl: ['', Validators.required],
      lastNameCtrl: ['', Validators.required],
      dobCtrl: ['', Validators.required],
      sexCtrl: ['', Validators.required],
      healthCardNumberCtrl: ['', Validators.required],
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
    this.passwordFormGroup = this._formBuilder.group({
      passwordCtrl: ['', Validators.required],
      passwordConfirmCtrl: ['', Validators.required],
    }, { validators: this.checkPasswords });
  }

  submitRegistration() {
    // Populate user object
    let personalInfoCtrls = this.personalInfoFormGroup.controls;
    let contactInfoCtrls = this.contactInfoFormGroup.controls;
    let emergContactCtrls = this.emergContactFormGroup.controls;
    let user: User;
    user = {
      firstName: personalInfoCtrls['firstNameCtrl'].value,
      lastName: personalInfoCtrls['lastNameCtrl'].value,
      dob: personalInfoCtrls['dobCtrl'].value,
      sex: personalInfoCtrls['sexCtrl'].value,
      healthCardNumber: personalInfoCtrls['healthCardNumberCtrl'].value,
      email: contactInfoCtrls['emailCtrl'].value,
      phoneNumber: contactInfoCtrls['phoneNumberCtrl'].value,
      addressLineOne: contactInfoCtrls['addressLineOneCtrl'].value,
      addressLineTwo: contactInfoCtrls['addressLineTwoCtrl'].value,
      postcode: contactInfoCtrls['postcodeCtrl'].value,
      emergencyFullName: emergContactCtrls['emergNameCtrl'].value,
      emergencyPhoneNumber: emergContactCtrls['emergPhoneNumberCtrl'].value,
      password: this.passwordFormGroup.controls['passwordCtrl'].value,
    };

    // Add to DB

    // Handle DB Response
  }

  getEmailErrorMessage() {
    let emailCtrl = this.contactInfoFormGroup.controls['emailCtrl'];
    if (emailCtrl.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('passwordCtrl');
    if(pass) {
      pass = pass.value;
    }
    let confirmPass = group.get('passwordConfirmCtrl');
    if(confirmPass) {
      confirmPass = confirmPass.value;
    }
    return pass === confirmPass ? null : { notSame: true };
  }
}
