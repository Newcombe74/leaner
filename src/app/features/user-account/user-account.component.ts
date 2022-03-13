import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AppDBService } from 'src/app/core/services/db.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LeanERErrorStateMatcher } from 'src/app/shared/utils/leaner-error-state-matcher';
import { User } from 'src/db/db';

@Component({
  selector: 'user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent {
  currentUser!: User;
  
  isLoaded = false;

  personalInfoFormGroup!: FormGroup;
  contactInfoFormGroup!: FormGroup;
  emergContactFormGroup!: FormGroup;
  passwordFormGroup!: FormGroup;

  minDOBDate: Date;
  maxDOBDate: Date;

  hidePassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;
  matcher = new LeanERErrorStateMatcher();

  sexes = [
    { value: 0, viewValue: 'Male' },
    { value: 1, viewValue: 'Female' },
    { value: 2, viewValue: 'Prefer not to say' },
  ];

  constructor(
    private appDBService: AppDBService,
    private toastService: ToastService,
    private authenticationService: AuthenticationService,
    private _formBuilder: FormBuilder
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );

    const currentYear = new Date().getFullYear();
    this.minDOBDate = new Date(currentYear - 100, 0, 1);
    this.maxDOBDate = new Date();
  }

  ngOnInit() {
    let user = this.currentUser;
    this.personalInfoFormGroup = this._formBuilder.group({
      firstNameCtrl: [{value: user.firstName, disabled: true}, Validators.required],
      lastNameCtrl: [user.lastName, Validators.required],
      dobCtrl: [user.dob, Validators.required],
      sexCtrl: [user.sex, Validators.required],
      healthCardNumberCtrl: [user.healthCardNumber, Validators.required],
    });
    this.contactInfoFormGroup = this._formBuilder.group({
      emailCtrl: [user.email, [Validators.required, Validators.email]],
      phoneNumberCtrl: [user.phoneNumber, Validators.required],
      addressLineOneCtrl: [user.addressLineOne, Validators.required],
      addressLineTwoCtrl: [user.addressLineTwo, Validators.required],
      postcodeCtrl: [user.postcode, Validators.required],
    });
    this.emergContactFormGroup = this._formBuilder.group({
      emergNameCtrl: [user.emergencyFullName, Validators.required],
      emergPhoneNumberCtrl: [user.emergencyPhoneNumber, Validators.required],
    });
    this.passwordFormGroup = this._formBuilder.group(
      {
        passwordCtrl: ['', Validators.required],
        passwordNewCtrl: ['', Validators.required],
        passwordConfirmCtrl: ['', Validators.required],
      },
      { validators: this.checkPasswords }
    );
  }

  async submitUpdate() {
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

    // Update DB
    let response = await this.appDBService.registerUser(user);

    // Handle DB Response
    
  }

  getEmailErrorMessage() {
    let emailCtrl = this.contactInfoFormGroup.controls['emailCtrl'];
    if (emailCtrl.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('passwordCtrl');
    if (pass) {
      pass = pass.value;
    }
    let confirmPass = group.get('passwordConfirmCtrl');
    if (confirmPass) {
      confirmPass = confirmPass.value;
    }
    return pass === confirmPass ? null : { notSame: true };
  };
}
