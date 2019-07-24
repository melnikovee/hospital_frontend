import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './lists/user-list/user-list.component';
import {AdminFormComponent} from './forms/admin-form/admin-form.component';
import {CabinetFormComponent} from './forms/cabinet-form/cabinet-form.component';
import {PatientFormComponent} from './forms/patient-form/patient-form.component';
import {DoctorFormComponent} from './forms/doctor-form/doctor-form.component';
import {CabinetListComponent} from './lists/cabinet-list/cabinet-list.component';
import {PatientsListComponent} from './lists/patients-list/patients-list.component';
import {DoctorsListComponent} from './lists/doctors-list/doctors-list.component';
import {SpecialtyFormComponent} from './forms/specialty-form/specialty-form.component';
import {TimeslotsListComponent} from './lists/timeslots-list/timeslots-list.component';
import {SearchPatientFormComponent} from './forms/searchpatient-form/searchpatient-form.component';
import {CreateScheduleFormComponent} from './forms/create-schedule-form/create-schedule-form.component';
import {PatientRecordByDoctorFormComponent} from './forms/patient-record-by-doctor-form/patient-record-by-doctor-form.component';
import {AppointmentFormComponent} from './forms/appointment-form/appointment-form.component';
import {DoctorUpdateFormComponent} from './forms/doctor-update-form/doctor-update-form.component';
import {SpecialtyListComponent} from './lists/specialty-list/specialty-list.component';
import {DoctorSpecialtyUpdateFormComponent} from './forms/doctor-specialty-update-form/doctor-specialty-update-form.component';
import {DoctorTimeslotsListComponent} from './lists/doctor-timeslots-list/doctor-timeslots-list.component';
import {PatientUpdateFormComponent} from './forms/patient-update-form/patient-update-form.component';
import {AdminUpdateFormComponent} from './forms/admin-update-form/admin-update-form.component';
import {PatientsPastVisitsFormComponent} from './forms/patients-past-visits-form/patients-past-visits-form.component';

const routes: Routes = [
  {path: 'users', component: UserListComponent},
  {path: 'cabinets', component: CabinetListComponent},
  {path: 'patients', component: PatientsListComponent},
  {path: 'doctors', component: DoctorsListComponent},
  {path: 'addadmin', component: AdminFormComponent},
  {path: 'addcabinet', component: CabinetFormComponent},
  {path: 'addpatient', component: PatientFormComponent},
  {path: 'adddoctor', component: DoctorFormComponent},
  {path: 'addspecialty', component: SpecialtyFormComponent},
  {path: 'adddoctor', component: DoctorFormComponent},
  {path: 'timeslots', component: TimeslotsListComponent},
  {path: 'searchpatient', component: SearchPatientFormComponent},
  {path: 'createSchedule/:id', component: CreateScheduleFormComponent},
  {path: 'makeAppointment/:id', component: AppointmentFormComponent},
  {path: 'specialties', component: SpecialtyListComponent},
  {path: 'patientrecordbydoctor', component: PatientRecordByDoctorFormComponent},
  {path: 'updatedoctor', component: DoctorUpdateFormComponent},
  {path: 'updatespecialtydoctor', component: DoctorSpecialtyUpdateFormComponent},
  {path: 'doctorTimeslots/:id', component: DoctorTimeslotsListComponent},
  {path: 'updatepatient', component: PatientUpdateFormComponent},
  {path: 'updateadmin', component: AdminUpdateFormComponent},
  {path: 'patientpastvisits', component: PatientsPastVisitsFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
