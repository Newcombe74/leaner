import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, startWith, map } from 'rxjs';
import { Router } from '@angular/router';
import { AppDBService } from 'src/app/core/services/db.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { MatStepper } from '@angular/material/stepper';
import { Hospital } from 'src/db/db';

@Component({
  selector: 'er-admission',
  templateUrl: './er-admission.component.html',
  styleUrls: ['./er-admission.component.scss'],
})
export class ERAdmissionComponent {
  admissionFormGroup!: FormGroup;
  hospitalFormGroup!: FormGroup;

  erSelected = false;
  loadingWaitTimes = true;
  requestingER = true;

  hospitals: Hospital[] = [];
  selectedHospital!: Hospital;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  filteredSymptoms!: Observable<string[]>;
  symptomsInputCtrl = new FormControl();
  symptomsList: string[] = [];
  allSymptoms: string[] = [
    'Abdominal pain',
    'Blood in stool',
    'Chest pain',
    'Constipation',
    'Cough',
    'Diarrhea',
    'Difficulty swallowing',
    'Dizziness',
    'Eye discomfort and redness',
    'Eye problems',
    'Foot pain or ankle pain',
    'Foot swelling or leg swelling',
    'Headaches',
    'Heart palpitations',
    'Hip pain',
    'Knee pain',
    'Low back pain',
    'Nasal congestion',
    'Nausea or vomiting',
    'Neck pain',
    'Numbness or tingling in hands',
    'Pelvic pain',
    'Shortness of breath',
    'Shoulder pain',
    'Sore throat',
    'Urinary problems',
    'Wheezing',
  ];
  filteredConditions!: Observable<string[]>;
  conditionsInputCtrl = new FormControl();
  conditionsList: string[] = [];
  allConditions: string[] = [
    'Type I Diabetes',
    'Type II Diabetes',
    'Cancer',
    'Heart Disease',
    'High Blood Pressure',
    'Auto Immune Disorder',
    'Liver Disease',
    'Allergies',
    'Anxiety Disorder',
    'Mood Disorder',
    'Asthma',
    'Arthritis',
    'Kidney Disease',
    'Dementia',
    "Alsheimer's",
    'Pregnancy',
    'Epilepsy',
    'Gastrointestinal Disorder',
    'Gout',
    'Heart Failure',
    'High Cholesterol',
    'Lyme Disease',
    'Chronic Migraines',
    'Osteoporosis',
    'Thyroid Disorder',
    "Parkinson's",
    'Addiction',
    'Psychosis',
    'Spina Bifida',
    'Polio',
    'Anemia',
    'Sickle Cell Disease',
    'Ulcers',
    'Infection',
  ];

  @ViewChild('symptomInput') symptomInput!: ElementRef<HTMLInputElement>;
  @ViewChild('conditionInput') conditionInput!: ElementRef<HTMLInputElement>;
  @ViewChild('admissionStepper') admissionStepper!: MatStepper;

  constructor(
    private router: Router,
    private appDBService: AppDBService,
    private toastService: ToastService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.admissionFormGroup = this._formBuilder.group({
      symptomsCtrl: ['', Validators.required],
      conditionsCtrl: [''],
      sysBPCtrl: [''],
      diaBPCtrl: [''],
      heartRateCtrl: [''],
      notesCtrl: [''],
    });

    this.hospitalFormGroup = this._formBuilder.group({
      hospitalCtrl: ['', Validators.required],
    });

    this.filteredSymptoms = this.symptomsInputCtrl.valueChanges.pipe(
      startWith(null),
      map((symptom: string | null) =>
        symptom ? this._filterSymptoms(symptom) : this.allSymptoms.slice()
      )
    );

    this.filteredConditions = this.conditionsInputCtrl.valueChanges.pipe(
      startWith(null),
      map((condition: string | null) =>
        condition
          ? this._filterConditions(condition)
          : this.allConditions.slice()
      )
    );
  }

  async submitAdmissionForm() {
    if (this.admissionFormGroup.valid) {
      this.loadingWaitTimes = true;

      this.toastService.submitToast('Admission Form Submitted');

      let response = await this.appDBService.getHospitalsWaitTimeUser();

      if (response.status === 0) {
        this.hospitals = response.hospitals;

        // sort hospitals by waittime
        this.hospitals.sort((a, b) => a.waitTime! - b.waitTime!);

        await new Promise((r) => setTimeout(r, 3000));
        this.loadingWaitTimes = false;
      }
    }
  }

  async selectER(selectedHospital: Hospital) {
    this.requestingER = true;
    this.erSelected = true;
    this.hospitalFormGroup.controls['hospitalCtrl'].setValue(selectedHospital);
    this.selectedHospital = selectedHospital;
    this.toastService.submitToast('ER wait request submitted');
    this.admissionStepper.next();

    await new Promise((r) => setTimeout(r, 3000));
    this.requestingER = false;
  }

  addSymptom(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our symptom
    if (value) {
      this.symptomsList.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.symptomsInputCtrl.setValue(null);
    this.admissionFormGroup.controls['symptomsCtrl'].setValue(
      this.symptomsList
    );
  }

  removeSymptom(symptom: string): void {
    const index = this.symptomsList.indexOf(symptom);

    if (index >= 0) {
      this.symptomsList.splice(index, 1);
      this.admissionFormGroup.controls['symptomsCtrl'].setValue(
        this.symptomsList
      );
    }
  }

  selectedSymptom(event: MatAutocompleteSelectedEvent): void {
    this.symptomsList.push(event.option.viewValue);
    this.symptomInput.nativeElement.value = '';
    this.symptomsInputCtrl.setValue(null);
    this.admissionFormGroup.controls['symptomsCtrl'].setValue(
      this.symptomsList
    );
  }

  private _filterSymptoms(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSymptoms.filter((symptom) =>
      symptom.toLowerCase().includes(filterValue)
    );
  }

  addCondition(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our condition
    if (value) {
      this.conditionsList.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.conditionsInputCtrl.setValue(null);
    this.admissionFormGroup.controls['conditionsCtrl'].setValue(
      this.conditionsList
    );
  }

  removeCondition(condition: string): void {
    const index = this.conditionsList.indexOf(condition);

    if (index >= 0) {
      this.conditionsList.splice(index, 1);
      this.admissionFormGroup.controls['conditionsCtrl'].setValue(
        this.conditionsList
      );
    }
  }

  selectedCondition(event: MatAutocompleteSelectedEvent): void {
    this.conditionsList.push(event.option.viewValue);
    this.conditionInput.nativeElement.value = '';
    this.conditionsInputCtrl.setValue(null);
    this.admissionFormGroup.controls['conditionsCtrl'].setValue(
      this.conditionsList
    );
  }

  private _filterConditions(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allConditions.filter((condition) =>
      condition.toLowerCase().includes(filterValue)
    );
  }
}
