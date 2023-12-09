import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable, combineLatest } from 'rxjs';
import { Mensaje } from 'src/app/clases/mensaje.model';
import { Usuario } from 'src/app/clases/usuario';
import { IonContent } from '@ionic/angular';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage  implements OnInit {

  @ViewChild(IonContent) content!: IonContent;
  @ViewChild('chat_input') messageInput!: ElementRef;
  msgList: Mensaje[] = [];
  user!: Usuario;
  toUser!: any;
  editorMsg = '';
  showEmojiPicker = false;
  otherImage: string='';
  chatReceived = new EventEmitter<any>();
  
  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
    ) {
    
    
  }

  ngOnInit() {
    const userDataString = sessionStorage.getItem('USER_DATA');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.user = userData;
      console.log('id logueado:', this.user.id);
      const userId = this.route.snapshot.paramMap.get('id');
    
    if (userId) {
      this.firestore.collection('usuarios').doc(userId).valueChanges().subscribe((user: any) => {
        this.toUser = user;
        console.log('Usuario encontrado:', this.toUser);
        this.getMsg();
      }, error => {
        console.error('Error al obtener el usuario:', error);
      });
    } else {
      console.error('No se proporcionó un ID de usuario en navParams.');
    }
    } else {
      console.log('id logueado:', userDataString);
    }
    this.otherImage = this.user.photoURL;
    
  }


  // ionViewWillLeave() {
  //   // unsubscribe
  //   this.chatReceived.emit(msg);
  // }

  // ionViewDidEnter() {
  //   //get message list
  //   this.getMsg();

  //   // Subscribe to received  new message events
  //   this.chatService.chatReceived.subscribe(msg => {
  //     this.pushNewMsg(msg);
  //   })
  // }

  onFocus() {
    this.showEmojiPicker = false;
    this.scrollToBottom();
  }
  
  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    this.scrollToBottom();
  }
  

  /**
   * @name getMsg
   * @returns {Promise<ChatMessage[]>}
   */
  getMsg() {
    const query1 = this.firestore.collection<Mensaje>('mensajes', ref => {
      return ref.where('remitente', '==', this.user.id)
        .where('destinatario', '==', this.toUser.id);
    }).valueChanges();

    const query2 = this.firestore.collection<Mensaje>('mensajes', ref => {
      return ref.where('remitente', '==', this.toUser.id)
        .where('destinatario', '==', this.user.id);
    }).valueChanges();

    combineLatest([query1, query2]).subscribe(([mensajesQuery1, mensajesQuery2]) => {
      const mensajes = [...mensajesQuery1, ...mensajesQuery2];
      const mensajesValidos = mensajes.filter(mensaje => mensaje !== undefined);

      const mensajesOrdenados = mensajesValidos.sort((a, b) => {
        const comparacionFecha = a.fecha.localeCompare(b.fecha);
        const comparacionHora = a.hora.localeCompare(b.hora);
        return comparacionFecha || comparacionHora;
      });

      this.msgList = mensajesOrdenados;
      console.log(this.msgList);
      this.scrollToBottom();
    });
  }


  /**
   * @name sendMsg
   */
  sendMsg() {
    if (!this.editorMsg.trim()) return;

    const nuevoMensaje = {
      remitente: this.user.id,
      destinatario: this.toUser.id,
      texto: this.editorMsg,
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString()
    };

    this.firestore.collection('mensajes').add(nuevoMensaje)
      .then(() => {
        this.editorMsg = '';
        this.scrollToBottom();
      })
      .catch((error) => {
        console.error('Error al agregar el mensaje:', error);
      });
  }

  /**
   * @name pushNewMsg
   * @param msg
   */
  // pushNewMsg(msg: Mensaje) {
  //   const userId = this.user.id,
  //     toUserId = this.toUser.id;
  //   // Verify user relationships
  //   if (msg.userId === userId && msg.toUserId === toUserId) {
  //     this.msgList.push(msg);
  //   } else if (msg.toUserId === userId && msg.userId === toUserId) {
  //     this.msgList.push(msg);
  //   }
  //   this.scrollToBottom();
  // }

  // getMsgIndexById(id: string) {
  //   return this.msgList.findIndex(e => e.messageId === id)
  // }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea = this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }
}
