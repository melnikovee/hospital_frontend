import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {DoctorFullName} from '../../_models/doctor-full-name';
import {Specialty} from '../../_models/specialty';
import {DoctorSpecialtyService} from '../../_services/doctorspecialty-service.service';
import {UserService} from '../../_services/user-service.service';
import {SpecialtyService} from '../../_services/specialty-service.service';
import {DoctorSpecialty} from '../../_models/doctorspecialty';
import {Subscription} from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-doctor-specialty-update-form',
  templateUrl: './doctor-specialty-update-form.component.html',
  styleUrls: ['./doctor-specialty-update-form.component.css']
})
export class DoctorSpecialtyUpdateFormComponent implements OnDestroy {

  foundDoctors!: DoctorFullName[];
  lastName!: string;
  doctorsColumns: string[] = ['doctor', 'specialties'];
  specialtiesColumns: string[] = ['specialtyName', 'duration', 'specialties'];
  isGetDoctors!: boolean;
  isGetSelectedDoctor!: boolean;
  doctorSpecialties!: Specialty[];
  selectedDoctor!: DoctorFullName;
  allSpecialties: Specialty[] = [];
  addingSpecialties: FormControl = new FormControl();
  private getSpecialtySub = Subscription.EMPTY;
  private deleteSpecialtySub = Subscription.EMPTY;
  private specialtySub = Subscription.EMPTY;
  private doctorSub = Subscription.EMPTY;
  private putSpecialtySub = Subscription.EMPTY;

  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);

  spForm = new FormGroup({
    lastName: this.lastNameFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private specialtyService: SpecialtyService, private userService: UserService,
              private doctorSpecialtyService: DoctorSpecialtyService) {
  }

  onSubmit() {
    this.lastName = this.spForm.controls.lastName.value;
    this.isGetSelectedDoctor = false;
    this.isGetDoctors = false;

    if (this.lastName !== '') {
      this.doctorSub = this.userService.getDoctorsByLastName(this.lastName).subscribe(data => {
        this.foundDoctors = data;

        if (data.length !== 0) {
          this.isGetDoctors = true;
        }
      });
    }
  }

  // tslint:disable-next-line:no-any
  getSpecialties(element: any) {
    this.selectedDoctor = element;
    this.isGetSelectedDoctor = true;

    this.specialtySub = this.specialtyService.getSpecialtiesByDoctor(element.id).subscribe(data => {
      this.doctorSpecialties = data;
    });
  }

  // tslint:disable-next-line:no-any
  deleteSpecialty(element: any) {
    this.deleteSpecialtySub = this.doctorSpecialtyService.deleteOneDoctorSpecialty(this.selectedDoctor.id, element.id).subscribe(res =>
    this.getSpecialties(this.selectedDoctor));
  }

  getAllSpecialties() {
    this.getSpecialtySub = this.doctorSpecialtyService.getNewSpecialtiesForDoctor(this.selectedDoctor.id).subscribe(data => {
      this.allSpecialties = data;
    });
  }

  putSpecialties() {
    for (const spec of this.addingSpecialties.value) {
      this.putSpecialtySub = this.doctorSpecialtyService.save(new DoctorSpecialty(this.selectedDoctor.id, spec.id)).subscribe(res =>
        this.getSpecialties(this.selectedDoctor));
    }
  }

  ngOnDestroy(): void {
    this.getSpecialtySub.unsubscribe();
    this.doctorSub.unsubscribe();
    this.specialtySub.unsubscribe();
    this.deleteSpecialtySub.unsubscribe();
    this.putSpecialtySub.unsubscribe();
  }
}
