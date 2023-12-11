import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../clases/usuario';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user!: Usuario;
  toUser!: any;
  showEmojiPicker = false;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.firestore.collection('usuarios').doc(userId).valueChanges().subscribe((user: any) => {
        this.user = user;
        console.log('ToUser encontrado:', this.user);
      }, error => {
        console.error('Error al obtener el usuario:', error);
      });
    } else {
      console.error('No se proporcionó un ID de usuario en navParams.');
      this.firestore.collection('usuarios').doc('uSmMAeQbA0dJiH94DRA3Pmir7I83').valueChanges().subscribe((user: any) => {
        this.user = user;
        console.log('User encontrado:', this.user);
      }, error => {
        console.error('Error al obtener el usuario:', error);
      });
    }
    // } else {
    //   console.log('id logueado:', userDataString);
    // }
  }
}
