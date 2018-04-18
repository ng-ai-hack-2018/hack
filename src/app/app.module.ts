import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { WebcamComponent } from './webcam/webcam.component';
import { SongComponent } from './song/song.component';
import { FeedbackComponent } from './feedback/feedback.component';

import { CognitiveServicesModule } from './cognitive-services/cognitive-services.module';
import { DemoModule } from './demo/demo.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    WebcamComponent,
    SongComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
