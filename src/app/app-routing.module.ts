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
import {DoctorTimeslotsListComponent} from './features/lists/doctor-timeslots-list/doctor-timeslots-list.component';
import {PatientUpdateFormComponent} from './features/forms/patient-update-form/patient-update-form.component';
import {PatientCardFormComponent} from './features/forms/patient-card-form/patient-card-form.component';
import {LoginFormComponent} from './features/forms/login-form/login-form.component';
import {AdminHomepageComponent} from './features/home/admin-homepage/admin-homepage.component';
import {DoctorHomepageComponent} from './features/home/doctor-homepage/doctor-homepage.component';
import {PatientHomepageComponent} from './features/home/patient-homepage/patient-homepage.component';
import {AdministratorGuard} from './core/auth/_guards/administrator.guard';
import {DoctorGuard} from './core/auth/_guards/doctor.guard';
import {PatientGuard} from './core/auth/_guards/patient.guard';
import {AdministratorDoctorGuard} from './core/auth/_guards/administrator-doctor.guard';
import {AdministratorPatientGuard} from './core/auth/_guards/administrator-patient.guard';
import {LoggedUserGuard} from './core/auth/_guards/logged-user.guard';


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
  {path: 'updatespecialtydoctor', component: DoctorSpecialtyUpdateFormComponent, canActivate: [AdministratorGuard]},
  {path: 'updateadmin', component: AdminUpdateFormComponent, canActivate: [AdministratorGuard]},
  {path: 'admin', component: AdminHomepageComponent, canActivate: [AdministratorGuard]},

  {path: 'searchpatient', component: SearchPatientFormComponent, canActivate: [DoctorGuard]},
  {path: 'patientrecordbydoctor', component: PatientRecordByDoctorFormComponent, canActivate: [DoctorGuard]},
  {path: 'doctor', component: DoctorHomepageComponent, canActivate: [DoctorGuard]},

  {path: 'patientpastvisits', component: PatientsPastVisitsFormComponent, canActivate: [PatientGuard]},
  {path: 'patientcurrentvisits', component: PatientsCurrentVisitsFormComponent, canActivate: [PatientGuard]},
  {path: 'patientcard', component: PatientCardFormComponent, canActivate: [PatientGuard]},
  {path: 'patient', component: PatientHomepageComponent, canActivate: [PatientGuard]},

  {path: 'updatedoctor', component: DoctorUpdateFormComponent, canActivate: [AdministratorDoctorGuard]},
  {path: 'doctorTimeslots/:id', component: DoctorTimeslotsListComponent, canActivate: [AdministratorDoctorGuard]},

  {path: 'makeAppointment/:id', component: AppointmentFormComponent, canActivate: [LoggedUserGuard]},
  {path: 'updatepatient', component: PatientUpdateFormComponent, canActivate: [AdministratorPatientGuard]},


  {path: 'login', component: LoginFormComponent},
  {path: 'addpatient', component: PatientFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]

})
export class AppRoutingModule {
}


