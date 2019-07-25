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
  {path: 'patientpastvisits', component: PatientsPastVisitsFormComponent},
  {path: 'patientcurrentvisits', component: PatientsCurrentVisitsFormComponent},
  {path: 'patientcard', component: PatientCardFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

