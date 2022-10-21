import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {
    setTimeout(function () {
      $('#switch1').click()
  }, 1000)

  setTimeout(function () {
      $('#switch2').click()
  }, 3000)
   }

  ngOnInit(): void {
    var $loginMsg = $('.loginMsg'),
            $login = $('.login'),
            $signupMsg = $('.signupMsg'),
            $signup = $('.signup'),
            $frontbox = $('.frontbox');

        $('#switch1').on('click', function () {
            $loginMsg.toggleClass("visibility");
            $frontbox.addClass("moving");
            $signupMsg.toggleClass("visibility");

            $signup.toggleClass('hide');
            $login.toggleClass('hide');
        })

        $('#switch2').on('click', function () {
            $loginMsg.toggleClass("visibility");
            $frontbox.removeClass("moving");
            $signupMsg.toggleClass("visibility");

            $signup.toggleClass('hide');
            $login.toggleClass('hide');
        })

        
  }
  

}
