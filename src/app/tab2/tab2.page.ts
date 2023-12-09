import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../clases/usuario';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  toUser!: any;
  public usuarioActual!: any;
  public usuarios: Observable<any[]> | undefined;
  
  constructor(
    private router: Router,
    private firestore: AngularFirestore
    ) {

  }

  ngOnInit() {
    const userDataString = sessionStorage.getItem('USER_DATA');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.usuarioActual = userData;
    } else {
      console.log(":", userDataString);
    }
    this.usuarios = this.firestore.collection<any>('usuarios').valueChanges();
  }

  // seleccionarUsuario(remitenteSeleccionado: any) {

  //   this.router.navigate(['/tab2/chat']);
  // }

}
