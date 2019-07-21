import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
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
import {DoctorScheduleFormComponent} from './forms/doctor-schedule-form/doctor-schedule-form.component';
import {PatientRecordByDoctorFormComponent} from "./forms/patient-record-by-doctor-form/patient-record-by-doctor-form.component";
import {AppointmentFormComponent} from './forms/appointment-form/appointment-form.component';
import {DoctorUpdateFormComponent} from "./forms/doctor-update-form/doctor-update-form.component";
import {SpecialtyListComponent} from './lists/specialty-list/specialty-list.component';

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
  {path: 'doctorSchedule/:id', component: DoctorScheduleFormComponent},
  {path: 'makeAppointment/:id', component: AppointmentFormComponent},
  {path: 'specialties', component: SpecialtyListComponent},
  {path: 'patientrecordbydoctor', component: PatientRecordByDoctorFormComponent},
  {path: 'updatedoctor', component: DoctorUpdateFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
