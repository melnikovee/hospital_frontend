import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Specialty} from '../../models/specialty';
import {SpecialtyService} from '../../services/specialty-service.service';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';

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
  specialtyNameFormControl = new FormControl('', [
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

    this.specialtyService.save(this.specialty).subscribe(
        (data: Specialty) => {
          this.receivedSpecialty = data;
          this.done = true;
        },
        error => console.log(error)
    );
  }
}
