import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectCompletionPipe} from './_pipes/project-completion.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSortModule} from '@angular/material';
import {SharedModule} from '../_shared/shared.module';
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
import {DialogDiagnosisFormComponent} from './forms/dialog-diagnosis-form/dialog-diagnosis-form.component';
import {CardFormComponent} from './forms/card-form/card-form.component';
import {CreateScheduleFormComponent} from './forms/create-schedule-form/create-schedule-form.component';
import {AppointmentFormComponent} from './forms/appointment-form/appointment-form.component';
import {SpecialtyListComponent} from './lists/specialty-list/specialty-list.component';
import {PatientRecordByDoctorFormComponent} from './forms/patient-record-by-doctor-form/patient-record-by-doctor-form.component';
import {DoctorTimeslotsListComponent} from './lists/doctor-timeslots-list/doctor-timeslots-list.component';
import {DoctorUpdateFormComponent} from './forms/doctor-update-form/doctor-update-form.component';
import {PatientUpdateFormComponent} from './forms/patient-update-form/patient-update-form.component';
import {AdminUpdateFormComponent} from './forms/admin-update-form/admin-update-form.component';
import {UserService} from './_services/user-service.service';
import {CabinetService} from './_services/cabinet-service.service';
import {TimeslotService} from './_services/timeslot-service.service';
import {DoctorService} from './_services/doctor-service.service';
import {PatientService} from './_services/patient-service.service';
import {SpecialtyService} from './_services/specialty-service.service';
import {CompositeService} from './_services/composite-service.service';
import {DoctorSpecialtyService} from './_services/doctorspecialty-service.service';
import {DiagnosisService} from './_services/diagnosis-service.service';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialAppModule} from '../ngmaterial.module';
import {DoctorSpecialtyUpdateFormComponent} from './forms/doctor-specialty-update-form/doctor-specialty-update-form.component';
import {PatientsCurrentVisitsFormComponent} from './forms/patients-current-visits-form/patients-current-visits-form.component';
import {PatientsPastVisitsFormComponent} from './forms/patients-past-visits-form/patients-past-visits-form.component';
import {PatientCardFormComponent} from './forms/patient-card-form/patient-card-form.component';
import {LoginFormComponent} from './forms/login-form/login-form.component';
import {DoctorTimeslotsAdminFormComponent} from './forms/doctor-timeslots-admin-form/doctor-timeslots-admin-form.component';
import {DoctorTimeslotsForDoctorFormComponent} from './forms/doctor-timeslots-for-doctor-form/doctor-timeslots-for-doctor-form.component';
import {SpecialtyUpdateFormComponent} from './forms/specialty-update-form/specialty-update-form.component';
import {PatientAppointmentFormComponent} from './forms/patient-appointment-form/patient-appointment-form.component';
import {PasswordChangeDialogFormComponent} from './forms/password-change-dialog-form/password-change-dialog-form.component';
import {SpecialShiftService} from './_services/special-shift-service.service';
import {SpecialShiftFormComponent} from './forms/special-shift-form/special-shift-form.component';

@NgModule({
  declarations: [
    ProjectCompletionPipe,
    UserListComponent,
    AdminFormComponent,
    CabinetFormComponent,
    PatientFormComponent,
    DoctorFormComponent,
    CabinetListComponent,
    PatientsListComponent,
    DoctorsListComponent,
    SpecialtyFormComponent,
    TimeslotsListComponent,
    SearchPatientFormComponent,
    DialogDiagnosisFormComponent,
    CardFormComponent,
    CreateScheduleFormComponent,
    AppointmentFormComponent,
    SpecialtyListComponent,
    PatientRecordByDoctorFormComponent,
    DoctorTimeslotsListComponent,
    DoctorUpdateFormComponent,
    PatientUpdateFormComponent,
    AdminUpdateFormComponent,
    DoctorSpecialtyUpdateFormComponent,
    PatientsCurrentVisitsFormComponent,
    PatientsPastVisitsFormComponent,
    PatientCardFormComponent,
    LoginFormComponent,
    DoctorTimeslotsAdminFormComponent,
    DoctorTimeslotsForDoctorFormComponent,
    SpecialtyUpdateFormComponent,
    PatientAppointmentFormComponent,
    PasswordChangeDialogFormComponent,
    SpecialShiftFormComponent
  ],
  exports: [
    ProjectCompletionPipe,
    UserListComponent,
    AdminFormComponent,
    CabinetFormComponent,
    PatientFormComponent,
    DoctorFormComponent,
    CabinetListComponent,
    PatientsListComponent,
    DoctorsListComponent,
    SpecialtyFormComponent,
    TimeslotsListComponent,
    SearchPatientFormComponent,
    DialogDiagnosisFormComponent,
    CardFormComponent,
    CreateScheduleFormComponent,
    AppointmentFormComponent,
    SpecialtyListComponent,
    PatientRecordByDoctorFormComponent,
    DoctorTimeslotsListComponent,
    DoctorUpdateFormComponent,
    PatientUpdateFormComponent,
    AdminUpdateFormComponent,
    DoctorSpecialtyUpdateFormComponent,
    PatientsCurrentVisitsFormComponent,
    PatientsPastVisitsFormComponent,
    PatientCardFormComponent,
    LoginFormComponent,
    DoctorTimeslotsAdminFormComponent,
    DoctorTimeslotsForDoctorFormComponent,
    SpecialtyUpdateFormComponent,
    PatientAppointmentFormComponent,
    PasswordChangeDialogFormComponent,
    SpecialShiftFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSortModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialAppModule
  ],
  providers: [UserService, CabinetService, PatientService, DoctorService,
    TimeslotService, SpecialtyService, CompositeService, DoctorSpecialtyService, DiagnosisService, SpecialShiftService],
  entryComponents: [DialogDiagnosisFormComponent, PasswordChangeDialogFormComponent]
})
export class FeaturesModule { }
