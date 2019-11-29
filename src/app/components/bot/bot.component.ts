import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css']
})

@Injectable()
export class BotComponent implements OnInit {

  @ViewChild('chat') myChat: ElementRef;
  @Input() chat: string = "";

  constructor() {}

  ngOnInit() {
  }

}
