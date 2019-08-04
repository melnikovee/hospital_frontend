import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Specialty} from '../../_models/specialty';
import {SpecialtyService} from '../../_services/specialty-service.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-specialty-form',
  templateUrl: './specialty-form.component.html',
  styleUrls: ['./specialty-form.component.css']
})
export class SpecialtyFormComponent {
  specialty = new Specialty('', 0);
  receivedSpecialty!: Specialty;
  done!: boolean;
  alreadyExists!: boolean;
  specialtyNameFormControl = new FormControl('', [
    Validators.maxLength(32),
    Validators.required
  ]);

  durationFormControl = new FormControl('', [
    Validators.required
  ]);

  specForm = new FormGroup({
    specialtyName: this.specialtyNameFormControl,
    duration: this.durationFormControl,
  });

  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private router: Router,
              private specialtyService: SpecialtyService) {
  }

  putData() {
    this.specialty.specialtyName = this.specForm.controls.specialtyName.value;
    this.specialty.duration = this.specForm.controls.duration.value;
  }

  onSubmit() {
    this.putData();
    this.alreadyExists = false;
    this.done = false;
    this.specialtyService.save(this.specialty).subscribe(
        (data: Specialty) => {
          this.receivedSpecialty = data;
          this.done = true;
        },
        error => {
          this.alreadyExists = true;
          console.log(error);
        }
    );
  }
}
