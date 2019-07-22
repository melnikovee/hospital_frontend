import {
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonToggleModule, MatDatepickerModule, MatNativeDateModule, MatSortModule,
    MatSelectModule, MatTableModule, MatBottomSheetModule, MatListModule, MatExpansionModule, MatRippleModule],
  exports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonToggleModule, MatDatepickerModule, MatNativeDateModule, MatSortModule,
    MatSelectModule, MatTableModule, MatBottomSheetModule, MatListModule, MatExpansionModule, MatRippleModule, MatPaginatorModule]
})
export class MaterialAppModule {
}
