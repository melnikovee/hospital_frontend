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
  MatTableModule,
  MatMenuModule, MatIconModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonToggleModule, MatDatepickerModule, MatNativeDateModule, MatSortModule,
    MatSelectModule, MatTableModule, MatBottomSheetModule, MatListModule, MatExpansionModule,
    MatRippleModule, MatMenuModule, MatPaginatorModule, MatIconModule],
  exports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonToggleModule, MatDatepickerModule, MatNativeDateModule, MatSortModule,
    MatSelectModule, MatTableModule, MatBottomSheetModule, MatListModule, MatExpansionModule,
    MatRippleModule, MatPaginatorModule, MatMenuModule, MatIconModule]
})
export class MaterialAppModule {
}
