import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {
  AppComponent, FirstDirective, BasicComponent, SecondDirective, TrackingService,
  OnlineService, OnlineDirective, ThreeDirective
} from './app.component';
import {HighlightDirective} from "./highlight.directive";

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    HighlightDirective,
    FirstDirective,
    SecondDirective,
    OnlineDirective,
    ThreeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TrackingService, OnlineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
