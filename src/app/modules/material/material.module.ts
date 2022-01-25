import {NgModule} from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    MatDialogModule,
    MatTableModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  exports: [
    MatDialogModule,
    MatTableModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {
}
