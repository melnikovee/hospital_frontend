import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSortModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonToggleModule, MatDatepickerModule, MatNativeDateModule, MatSortModule, MatSelectModule, MatTableModule, MatPaginatorModule],
  exports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonToggleModule, MatDatepickerModule, MatNativeDateModule, MatSortModule, MatSelectModule, MatTableModule, MatPaginatorModule]
})
export class MaterialAppModule { }
