import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatPage } from './chat.page';


import { ChatRoutingModule } from './chat-routing.module';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChatRoutingModule,
    ExploreContainerComponentModule,

  ],
  declarations: [ChatPage]
})
export class ChatModule {}
