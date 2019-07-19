import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSortModule,
  MatSelectModule, MatTableModule, MatBottomSheetModule, MatListModule, MatExpansionModule, MatRippleModule,
  MatPaginatorModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonToggleModule, MatDatepickerModule, MatNativeDateModule, MatSortModule,
    MatSelectModule, MatTableModule, MatBottomSheetModule, MatListModule, MatExpansionModule, MatRippleModule],
  exports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonToggleModule, MatDatepickerModule, MatNativeDateModule, MatSortModule,
    MatSelectModule, MatTableModule, MatBottomSheetModule, MatListModule, MatExpansionModule, MatRippleModule]
    MatButtonToggleModule, MatDatepickerModule, MatNativeDateModule, MatSortModule, MatSelectModule, MatTableModule, MatPaginatorModule],
  exports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonToggleModule, MatDatepickerModule, MatNativeDateModule, MatSortModule, MatSelectModule, MatTableModule, MatPaginatorModule]
})
export class MaterialAppModule {
}
