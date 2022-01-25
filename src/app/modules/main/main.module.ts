import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {MaterialModule} from "../material/material.module";
import {BaseApi} from "../../services/base.api";
import {HttpClientModule} from "@angular/common/http";
import {DialogComponent} from "../../components/dialog/dialog.component";

@NgModule({
  declarations: [
    MainComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule
  ],
  exports: [
    MainComponent
  ],
  providers: [
    BaseApi
  ],
})
export class MainModule { }
