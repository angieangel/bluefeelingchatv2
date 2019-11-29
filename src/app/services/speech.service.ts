import { Injectable } from '@angular/core';
import Speech from 'speak-tts';
import { Observable, of as observableOf } from 'rxjs';

const speech = new Speech();

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  constructor() {
    if(speech.hasBrowserSupport()) { //Navegador soporta speech
      speech.init({
        volume: 0.5,
        lang: "en-US",
        rate: 1,
        pitch: 1,
        splitSentences: false
      }).then((data) => {
      }).catch(e => {
        console.error("Ha ocurrido un error al inicializar: ", e)
      })
    }
  }

  //Metodo de lectura
  read(textToRead: string): Observable<boolean>{
    var return_val = true;
    speech.speak({
        text: textToRead,
    }).then(() => {
        return_val = true;
    }).catch(e => {
        console.error("Eror :", e);
        return_val = false;
    });

    return observableOf(return_val);
  }

  //Establecer voz de speech
  setVoice(voiceUri: string){
    speech.setVoice(voiceUri);
  }

  //Verificar si se speech se encuentra activo
  checkSpeech(){
    return speech.speaking();
  }


}
