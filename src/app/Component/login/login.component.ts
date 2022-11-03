import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import * as CryptoJS from 'crypto-js';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { User } from 'src/app/models/user/user.module';
import { RegistrarService } from 'src/app/services/registrar.service';
import { LogInService } from 'src/app/services/log-in.service';
import {} from 'jquery';
import { MostrarCatalogoService } from 'src/app/services/mostrar-catalogo.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  Autorice = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 5;
  text = '';
  name = '';
  lastName = '';
  e_mail = '';
  password = '';
  confirmPassword = '';
  e_mail1 = '';
  password1 = '';
  secretKey = 'YourSecretKeyForEncryption&Descryption';
  private _snackBar: any;
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private registrarService: RegistrarService,
    private loginService: LogInService,
    private mostrarCatalogoService: MostrarCatalogoService
  ) {
    if (this.Autorice) {
    } else this.router.navigateByUrl('home');
    setTimeout(function () {
      $('#switch1').click();
    }, 1000);

    setTimeout(function () {
      $('#switch2').click();
    }, 3000);
    this.mostrarCatalogoService.Mostrab(true);
  }

  ngOnInit(): void {
    
    var $loginMsg = $('.loginMsg'),
      $login = $('.login'),
      $signupMsg = $('.signupMsg'),
      $signup = $('.signup'),
      $frontbox = $('.frontbox');

    $('#switch1').on('click', function () {
      $loginMsg.toggleClass('visibility');
      $frontbox.addClass('moving');
      $signupMsg.toggleClass('visibility');

      $signup.toggleClass('hide');
      $login.toggleClass('hide');
    });

    $('#switch2').on('click', function () {
      $loginMsg.toggleClass('visibility');
      $frontbox.removeClass('moving');
      $signupMsg.toggleClass('visibility');
      $signup.toggleClass('hide');
      $login.toggleClass('hide');
    });
  }
  encriptar(value: string) {
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }
  decrypt(textToDecrypt: string) {
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(
      CryptoJS.enc.Utf8
    );
  }
  seven() {
    if (this.name === '') {
      this.alert('Nombre');
    } else if (this.lastName === '') {
      this.alert('Apellidos');
    } else if (this.e_mail === '') {
      this.alert('Email');
    } else if (this.password === '') {
      this.alert('contraseña');
    } else if (this.confirmPassword === '') {
      this.alert('Confirmar contraseña');
    } else if (this.password === this.confirmPassword) {
      this.sevenDatabase();
    } else this.alert('las contraseñas no coinciden');
  }
            


  

  alert(text: string) {
    this.snackBar.open('' + text, '', {
      duration: 2000,
    });
  }
  limpiar() {
    this.text = '';
    this.name = '';
    this.lastName = '';
    this.e_mail = '';
    this.password = '';
    this.confirmPassword = '';
  }
  log_in() {
    this.loginService.getUser().subscribe((user: any) => {
      if (this.e_mail1 != '') {
        for (let i = 0; i < user.length; i++) {
          const us = user[i].E_mail;
          if (us === this.e_mail1) {
            if (this.password1 != '') {
              const pass = this.decrypt(user[i].Password);
              if (pass === this.password1) {
                this.router.navigateByUrl('/home');
                localStorage.setItem('user',''+user[i]._id)
              } else this.alert('contraseña incorrecta');
            }else this.alert('Llena el campo contraseña');
          } else this.alert('No se encuentra el gmail intentalo nuevamente');
        }
        this.limpiar();
      } else this.alert('Llena el campo Email');
    });
  }
  sevenDatabase() {
    const pass = this.encriptar(this.password);
    const user: User = {
      Name: this.name,
      LastName: this.lastName,
      E_mail: this.e_mail,
      Password: pass,
      Latitude: 0,
      Lenght: 0,
      Customer: true,
      Admin: false,
    };
    this.registrarService.postNewUsuari(user).subscribe((rest: any) => {
      if (rest != '') {
        this.alert('Guardado correctamente');
        this.limpiar();
      } else {
        this.alert('Ocurrio un error intentalo nuebamente');
      }
    });
  }
}
