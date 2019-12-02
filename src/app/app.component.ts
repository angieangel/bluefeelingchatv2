import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';
import { SpeechService } from './services/speech.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bots';

  //Propiedades para control de chat
  init: boolean;
  order: boolean = false;//Control orden de chat
  chat_0: string = "Hello";//Historico chat 0
  chat_1: string = "";//Historico chat 1
  lastChat_0: string;//Ultima respuesta 0
  lastChat_1: string;//Ultima respuesta 1


  constructor(private chatService:ChatService,private speechService:SpeechService) {}

  ngOnInit() {
    this.init = true;//Se da control para primera voz
    this.lastChat_0 = this.chat_0;//Se inicializa ultima respuesta
    setTimeout(function(e){
      e.read(e.lastChat_0);//Se da primer llamado a funcion de chat
    },1500,this);
  }

  /*Metodo para llamado de chat y control de pregunta respuesta*/
  chat(){
    var answer = this.order == false ? this.lastChat_0 : this.lastChat_1;//Se establece pregunta de acuerdo al orden de chat
    var question;
    this.chatService.chat(answer).subscribe((data) => {//Llamado a servicio de chat para obtencion respuesta
      if(data){//En caso de lectura exitosa
        question = data.chat;//Se asigna respuesta
        this.print(question);//Llamado a metodo asignacion de impresion
        this.order = this.order == false ? true : false;//Se cambia el orden de chat
      }
    });
  }

  /*Metodo de impresion*/
  print(text: string){
    if(this.order == true){
      this.lastChat_0 = text;//Se reasigna ultima respuesta 0
      this.chat_0 += "<br/>" + text;//Impresion chat 0
    }else{
      this.lastChat_1 = text;//Se reasigna ultima respuesta 1
      this.chat_1 += (this.chat_1 == "" ? "" : "<br/>") + text;//Impresion chat 1
    }
    this.read(text);//Llamado a servicio lector por voz
  }

  /*Metodo de lectura*/
  read(text: string){
    if(this.init == true){
      this.speechService.setVoice("Samantha");
      this.init = false;
    }else{
      if(this.order == true){
        this.speechService.setVoice("Samantha");
      }else{
        this.speechService.setVoice("Alex");
      }
    }
    this.speechService.read(text).subscribe((data) => {//Se invoca servicio de lectura del mensaje
      if(data == true){//En caso de lectura exitosa
        this.checkSpeech();//Se llama verificacion de speech activo
      }
    });
  }

  /*Verifica si se encuentra un speech activo, de ser así da espera para llamar el siguiente chat*/
  checkSpeech(){
    if(this.speechService.checkSpeech()){//En caso se estar hablando da una espera para invocar llamado de chat
      setTimeout(function(e){
          e.checkSpeech();//Control recursivo verificacion
      },1500,this);
    }else{
      this.chat();//Llamado de chat
    }
  }
}
