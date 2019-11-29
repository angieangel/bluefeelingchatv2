import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

export interface Chat {
  chat: string
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {
  }

  chat(text: string){
    /*var arr = ["Hi. how are you?","Fine. Thank you","Good day sir, are you all right? Tell me","What time is it? Is it? Is it","Ok","Bye bye","Dont leave me"];
    return text = arr[Math.floor(Math.random() * arr.length)];*/

    return this.http.get<Chat>('https://bluefeeling.herokuapp.com/' + text)
  }
}
