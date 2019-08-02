import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DoctorSpecialtyUpdateFormComponent} from './features/forms/doctor-specialty-update-form/doctor-specialty-update-form.component';
import {PatientsPastVisitsFormComponent} from './features/forms/patients-past-visits-form/patients-past-visits-form.component';
import {PatientsCurrentVisitsFormComponent} from './features/forms/patients-current-visits-form/patients-current-visits-form.component';
import {AdminUpdateFormComponent} from './features/forms/admin-update-form/admin-update-form.component';
import {AdminFormComponent} from './features/forms/admin-form/admin-form.component';
import {UserListComponent} from './features/lists/user-list/user-list.component';
import {CabinetListComponent} from './features/lists/cabinet-list/cabinet-list.component';
import {PatientsListComponent} from './features/lists/patients-list/patients-list.component';
import {DoctorsListComponent} from './features/lists/doctors-list/doctors-list.component';
import {CabinetFormComponent} from './features/forms/cabinet-form/cabinet-form.component';
import {PatientFormComponent} from './features/forms/patient-form/patient-form.component';
import {DoctorFormComponent} from './features/forms/doctor-form/doctor-form.component';
import {SpecialtyFormComponent} from './features/forms/specialty-form/specialty-form.component';
import {TimeslotsListComponent} from './features/lists/timeslots-list/timeslots-list.component';
import {SearchPatientFormComponent} from './features/forms/searchpatient-form/searchpatient-form.component';
import {CreateScheduleFormComponent} from './features/forms/create-schedule-form/create-schedule-form.component';
import {AppointmentFormComponent} from './features/forms/appointment-form/appointment-form.component';
import {SpecialtyListComponent} from './features/lists/specialty-list/specialty-list.component';
import {PatientRecordByDoctorFormComponent} from './features/forms/patient-record-by-doctor-form/patient-record-by-doctor-form.component';
import {DoctorUpdateFormComponent} from './features/forms/doctor-update-form/doctor-update-form.component';
import {PatientUpdateFormComponent} from './features/forms/patient-update-form/patient-update-form.component';
import {PatientCardFormComponent} from './features/forms/patient-card-form/patient-card-form.component';
import {LoginFormComponent} from './features/forms/login-form/login-form.component';
import {HomepageComponent} from './core/home/homepage/homepage.component';
import {AdministratorGuard} from './core/auth/_guards/administrator.guard';
import {DoctorGuard} from './core/auth/_guards/doctor.guard';
import {PatientGuard} from './core/auth/_guards/patient.guard';
import {LoggedUserGuard} from './core/auth/_guards/logged-user.guard';
// tslint:disable-next-line:max-line-length
import {DoctorTimeslotsForDoctorFormComponent} from './features/forms/doctor-timeslots-for-doctor-form/doctor-timeslots-for-doctor-form.component';
import {DoctorTimeslotsAdminFormComponent} from './features/forms/doctor-timeslots-admin-form/doctor-timeslots-admin-form.component';
import {SpecialtyUpdateFormComponent} from './features/forms/specialty-update-form/specialty-update-form.component';
import {AdministratorDoctorGuard} from './core/auth/_guards/administrator-doctor.guard';
import {PatientAppointmentFormComponent} from './features/forms/patient-appointment-form/patient-appointment-form.component';
import {SpecialShiftFormComponent} from './features/forms/special-shift-form/special-shift-form.component';
// tslint:disable-next-line:max-line-length
import {SpecialShiftRecordFormComponent} from './features/forms/special-shift-record-form/special-shift-record-form.component';
import {AdministratorPatientGuard} from './core/auth/_guards/administrator-patient.guard';
import {SpecialShiftForPatientFormComponent} from './features/forms/special-shift-for-patient-form/special-shift-for-patient-form.component';

const routes: Routes = [
  {path: 'users', component: UserListComponent, canActivate: [AdministratorGuard]},
  {path: 'cabinets', component: CabinetListComponent, canActivate: [AdministratorGuard]},
  {path: 'patients', component: PatientsListComponent, canActivate: [AdministratorGuard]},
  {path: 'doctors', component: DoctorsListComponent, canActivate: [AdministratorGuard]},
  {path: 'addadmin', component: AdminFormComponent, canActivate: [AdministratorGuard]},
  {path: 'addcabinet', component: CabinetFormComponent, canActivate: [AdministratorGuard]},
  {path: 'adddoctor', component: DoctorFormComponent, canActivate: [AdministratorGuard]},
  {path: 'addspecialty', component: SpecialtyFormComponent, canActivate: [AdministratorGuard]},
  {path: 'timeslots', component: TimeslotsListComponent, canActivate: [AdministratorGuard]},
  {path: 'createSchedule/:id', component: CreateScheduleFormComponent, canActivate: [AdministratorGuard]},
  {path: 'specialties', component: SpecialtyListComponent, canActivate: [AdministratorGuard]},
  {path: 'updatespecialty/:id', component: SpecialtyUpdateFormComponent, canActivate: [AdministratorGuard]},
  {path: 'updatespecialtydoctor', component: DoctorSpecialtyUpdateFormComponent, canActivate: [AdministratorGuard]},
  {path: 'updateadmin', component: AdminUpdateFormComponent, canActivate: [AdministratorGuard]},
  {path: 'doctorTimeslotsAdmin/:id', component: DoctorTimeslotsAdminFormComponent, canActivate: [AdministratorGuard]},
  {path: 'addspecialshift', component: SpecialShiftFormComponent, canActivate: [AdministratorGuard]},

  {path: 'searchpatient', component: SearchPatientFormComponent, canActivate: [DoctorGuard]},
  {path: 'patientrecordbydoctor', component: PatientRecordByDoctorFormComponent, canActivate: [DoctorGuard]},
  {path: 'doctorTimeslots', component: DoctorTimeslotsForDoctorFormComponent, canActivate: [DoctorGuard]},
  {path: 'updatedoctor', component: DoctorUpdateFormComponent, canActivate: [DoctorGuard]},

  {path: 'patientpastvisits', component: PatientsPastVisitsFormComponent, canActivate: [PatientGuard]},
  {path: 'patientspecialshift', component: SpecialShiftForPatientFormComponent, canActivate: [PatientGuard]},
  {path: 'patientcurrentvisits', component: PatientsCurrentVisitsFormComponent, canActivate: [PatientGuard]},
  {path: 'patientcard', component: PatientCardFormComponent, canActivate: [PatientGuard]},
  {path: 'updatepatient', component: PatientUpdateFormComponent, canActivate: [PatientGuard]},
  {path: 'patientAppointment', component: PatientAppointmentFormComponent, canActivate: [PatientGuard]},

  {path: 'patientspecialshiftrecord/:id', component: SpecialShiftRecordFormComponent, canActivate: [AdministratorPatientGuard]},
  {path: 'makeAppointment/:id', component: AppointmentFormComponent, canActivate: [AdministratorDoctorGuard]},
  {path: 'home', component: HomepageComponent, canActivate: [LoggedUserGuard]},

  {path: 'addpatient', component: PatientFormComponent},
  {path: 'login', component: LoginFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]

})
export class AppRoutingModule {
}


