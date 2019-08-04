import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Specialty} from '../../_models/specialty';
import {SpecialtyService} from '../../_services/specialty-service.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-specialty-update-form',
  templateUrl: './specialty-update-form.component.html',
  styleUrls: ['./specialty-update-form.component.css']
})
export class SpecialtyUpdateFormComponent implements OnInit {
  specialty = new Specialty('', 0);
  currentSpecialty!: Specialty;
  done!: boolean;
  id!: number;
  idStr = 'id';
  specialtyNameFormControl = new FormControl('', [
    Validators.maxLength(32)
  ]);

  durationFormControl = new FormControl('', [
    Validators.pattern('[0-9]{1,3}')
  ]);

  specialtyForm = new FormGroup({
    specialtyName: this.specialtyNameFormControl,
    duration: this.durationFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private router: Router,
              private specialtyService: SpecialtyService) {
    this.route.params.subscribe(params => this.id = params[this.idStr]);
  }

  ngOnInit(): void {
    this.specialtyService.getSpecialtyById(this.id).subscribe(data => {
      this.currentSpecialty = data;
    });
  }

  putData() {
    let changedData = this.specialtyForm.controls.specialtyName.value;
    this.specialty.specialtyName = changedData === '' ? this.currentSpecialty.specialtyName : changedData;

    changedData = this.specialtyForm.controls.duration.value;
    this.specialty.duration = changedData === '' ? this.currentSpecialty.duration : changedData;
  }

  onSubmit() {
    this.putData();
    this.specialtyService.updateSpecialty(this.id, this.specialty).subscribe();
    this.done = true;
  }
}
