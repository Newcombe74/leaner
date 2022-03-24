import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, startWith, map } from 'rxjs';
import { Router } from '@angular/router';
import { AppDBService } from 'src/app/core/services/db.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'er-admission',
  templateUrl: './er-admission.component.html',
  styleUrls: ['./er-admission.component.scss'],
})
export class ERAdmissionComponent {
  admissionFormGroup!: FormGroup;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredSymptoms!: Observable<string[]>;
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

  @ViewChild('symptomInput') symptomInput!: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private appDBService: AppDBService,
    private toastService: ToastService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.admissionFormGroup = this._formBuilder.group({
      symptomsCtrl: [''],
      sysBPCtrl: [''],
      diaBPCtrl: [''],
      heartRateCtrl: [''],
      notesCtrl: [''],
    });

    this.filteredSymptoms = this.admissionFormGroup.controls[
      'symptomsCtrl'
    ].valueChanges.pipe(
      startWith(null),
      map((symptom: string | null) =>
        symptom ? this._filter(symptom) : this.allSymptoms.slice()
      )
    );
  }

  addSymptom(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our symptom
    if (value) {
      this.symptomsList.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.admissionFormGroup.controls['symptomsCtrl'].setValue(null);
  }

  removeSymptom(symptom: string): void {
    const index = this.symptomsList.indexOf(symptom);

    if (index >= 0) {
      this.symptomsList.splice(index, 1);
    }
  }

  selectedSymptom(event: MatAutocompleteSelectedEvent): void {
    this.symptomsList.push(event.option.viewValue);
    this.symptomInput.nativeElement.value = '';
    this.admissionFormGroup.controls['symptomsCtrl'].setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSymptoms.filter((symptom) =>
      symptom.toLowerCase().includes(filterValue)
    );
  }
}
