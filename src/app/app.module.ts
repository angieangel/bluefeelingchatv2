import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BotComponent } from './components/bot/bot.component';

import { HttpClientModule } from '@angular/common/http'
import { Speech } from 'speak-tts';
import { SpeechService } from './services/speech.service';
import { ChatService } from './services/chat.service';


@NgModule({
  declarations: [
    AppComponent,
    BotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ChatService,
    SpeechService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
