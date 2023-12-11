import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserDataService } from '../servicios/user-data.service';
import { Usuario } from '../clases/usuario';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  email!: string;
  password!: string;
  token!: any;
  credenciales: boolean = false;


  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private userDataService: UserDataService,
    // private loadingService: LoadingService,
    public auth: AngularFireAuth) {
    // this.auth.user.subscribe(t => console.info(t));

  }

//   onInit() {
//     sessionStorage.clear();
//   }
//   onSubmit() {
//     //this.loadingService.show();

//     // Buscar el usuario por el correo proporcionado
//     this.firestore.collection('usuarios', ref => ref.where('email', '==', this.email))
//       .get()
//       .subscribe((querySnapshot) => {
//         if (querySnapshot.size === 1) {
//           // Usuario encontrado, comprobar la contraseña
//           const usuario = querySnapshot.docs[0].data() as Usuario;

//           // Verificar si la contraseña coincide
//           if (usuario.contraseña === this.password) {
//             const userData = {
//               displayName: usuario?.displayName,
//               email: usuario?.email,
//               photoURL: usuario?.photoURL,
//               id: usuario?.id,
//               rol: usuario.rol,
//               fechaIngreso: new Date().toLocaleDateString(),
//               horaIngreso: new Date().toLocaleTimeString(),
//             };

//             sessionStorage.setItem('USER_DATA', JSON.stringify(userData));
//             sessionStorage.setItem('ACCESS_TOKEN', JSON.stringify(userData));
//             this.userDataService.setUserData(userData);

//             // this.loadingService.hide();
//             this.router.navigate(['/']);

//           } else {
//             // No se encontró el usuario
//             this.credenciales = true; // Muestra el mensaje de credenciales incorrectas
//             // this.loadingService.hide();
//           }
//         }
//       });
//   }

//   loginWithGoogle() {
//     // this.loadingService.show();
//     this.auth.signInWithPopup(new GoogleAuthProvider())
//       .then((res) => {
//         const user = res.user;
//         const token = user?.getIdToken();
//         const userData = {
//           displayName: user?.displayName,
//           email: user?.email,
//           photoURL: user?.photoURL,
//           token: token,
//           id: user?.uid,
//           rol: '',
//           fechaIngreso: new Date().toLocaleDateString(),
//           horaIngreso: new Date().toLocaleTimeString(),
//         };
//         //  console.log("userdata: ", userData);
//         //  console.log("token: ", token);
//         sessionStorage.setItem('USER_DATA', JSON.stringify(userData));
//         sessionStorage.setItem('ACCESS_TOKEN', JSON.stringify(userData));

//         this.firestore.collection('usuarios').doc(user?.uid).get().subscribe((docSnapshot) => {
//           const usuarioFirestore = docSnapshot.data() as Usuario;
//           if (usuarioFirestore) {
//             userData.rol = usuarioFirestore.rol;
//             if (usuarioFirestore.photoURL != userData.photoURL) {
//               this.firestore.collection('usuarios').doc(user?.uid).update({ photoURL: userData.photoURL })
//                 .then(() => {
//                   console.log('URL de la foto actualizada en Firestore.');
//                 })
//                 .catch((error) => {
//                   console.error('Error al actualizar la URL de la foto en Firestore:', error);
//                 });
//             }
//             this.userDataService.setUserData(userData);
//           } else {
//             this.crearUsuarioEnFirestore(user);
//           }
//           // this.loadingService.hide();

//           this.router.navigate(['/tabs/tab2']);
//         });
//       })
//       .catch((error) => {
//         console.error('Error al iniciar sesión con Google:', error);
//       });
//   }

//   logout() {
//     this.auth.signOut();
//   }

//   crearUsuarioEnFirestore(user: any) {
//     const usuarioData = {
//       email: user.email,
//       displayName: user.displayName,
//       photoURL: user?.photoURL,
//       telefono: user?.phoneNumber,
//       emailVerified: user?.emailVerified,
//       isAnonymous: user?.isAnonymous,
//       fecha: new Date().toLocaleDateString(),
//       hota: new Date().toLocaleTimeString(),
//       estado: 'Deshabilitado',
//       cuil: '',
//       rol: 'Nuevo',
//       nombre: '',
//       apellido: '',
//       calle: '',
//       altura: '',
//       id: user.uid,
//       contraseña: '',
//     };

//     this.firestore.collection('usuarios').doc(user.uid).set(usuarioData)
//       .then(() => {
//         console.log('Usuario creado en Firestore con éxito');
//       })
//       .catch((error) => {
//         console.error('Error al crear el usuario en Firestore:', error);
//       });
//   }
//   getEstado() {
//     // return this.loadingService.getEstado();
//   }
}

