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
