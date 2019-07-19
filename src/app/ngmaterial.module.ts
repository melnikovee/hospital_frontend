import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldControl,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSortModule,
  MatSelectModule, MatTableModule, MatBottomSheetModule, MatListModule, MatExpansionModule, MatRippleModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonToggleModule, MatDatepickerModule, MatNativeDateModule, MatSortModule,
    MatSelectModule, MatTableModule, MatBottomSheetModule, MatListModule, MatExpansionModule, MatRippleModule],
  exports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonToggleModule, MatDatepickerModule, MatNativeDateModule, MatSortModule,
    MatSelectModule, MatTableModule, MatBottomSheetModule, MatListModule, MatExpansionModule, MatRippleModule]
})
export class MaterialAppModule {
}
