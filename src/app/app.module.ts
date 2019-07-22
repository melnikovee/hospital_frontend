import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserListComponent} from './lists/user-list/user-list.component';
import {AdminFormComponent} from './forms/admin-form/admin-form.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {UserService} from './services/user-service.service';
import {CabinetFormComponent} from './forms/cabinet-form/cabinet-form.component';
import {CabinetService} from './services/cabinet-service.service';
import {PatientFormComponent} from './forms/patient-form/patient-form.component';
import {PatientService} from './services/patient-service.service';
import {DoctorFormComponent} from './forms/doctor-form/doctor-form.component';
import {DoctorService} from './services/doctor-service.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CabinetListComponent} from './lists/cabinet-list/cabinet-list.component';
import {PatientsListComponent} from './lists/patients-list/patients-list.component';
import {DoctorsListComponent} from './lists/doctors-list/doctors-list.component';
import {MaterialAppModule} from './ngmaterial.module';
import {SpecialtyFormComponent} from './forms/specialty-form/specialty-form.component';
import {DoctorSpecialtyService} from './services/doctorspecialty-service.service';
import {TimeslotsListComponent} from './lists/timeslots-list/timeslots-list.component';
import {TimeslotService} from './services/timeslot-service.service';
import {SpecialtyService} from './services/specialty-service.service';
import {CompositeService} from './services/composite-service.service';
import {SearchPatientFormComponent} from './forms/searchpatient-form/searchpatient-form.component';
import {DialogDiagnosisFormComponent} from './forms/dialog-diagnosis-form/dialog-diagnosis-form.component';
import {DiagnosisService} from './services/diagnosis-service.service';
import {CardFormComponent} from './forms/card-form/card-form.component';
import {ScheduleListComponent} from './lists/schedule-list/schedule-list.component';
import {CreateScheduleFormComponent} from './forms/create-schedule-form/create-schedule-form.component';
import {PatientRecordByDoctorFormComponent} from './forms/patient-record-by-doctor-form/patient-record-by-doctor-form.component';
import {AppointmentFormComponent} from './forms/appointment-form/appointment-form.component';
import {MatSortModule} from '@angular/material';
import {SpecialtyListComponent} from './lists/specialty-list/specialty-list.component';
import {DoctorTimeslotsListComponent} from './lists/doctor-timeslots-list/doctor-timeslots-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    AdminFormComponent,
    CabinetFormComponent,
    PatientFormComponent,
    DoctorFormComponent,
    CabinetListComponent,
    PatientsListComponent,
    DoctorsListComponent,
    SpecialtyFormComponent,
    DoctorsListComponent,
    TimeslotsListComponent,
    SearchPatientFormComponent,
    DialogDiagnosisFormComponent,
    CardFormComponent,
    ScheduleListComponent,
    CreateScheduleFormComponent,
    AppointmentFormComponent,
    SpecialtyListComponent,
    PatientRecordByDoctorFormComponent,
    DoctorTimeslotsListComponent
  ],
  imports: [
    MatSortModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialAppModule,
  ],
  providers: [UserService, CabinetService, PatientService, DoctorService,
    TimeslotService, SpecialtyService, CompositeService, DoctorSpecialtyService, DiagnosisService],
  bootstrap: [AppComponent],
  entryComponents: [DialogDiagnosisFormComponent]
})
export class AppModule {
}
