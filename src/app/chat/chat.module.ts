import {NgModule} from '@angular/core';
import {ChatComponent} from './chat.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../shared/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { InputMessageComponent } from './input-message/input-message.component';

@NgModule({
  declarations: [
    ChatComponent,
    MessagesComponent,
    InputMessageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule {}
