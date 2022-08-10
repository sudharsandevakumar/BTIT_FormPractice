import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {
  constructor(private router: Router, private service: ApiserviceService) {}

  ngOnInit() {}

  title = 'FormPractic';
  userProfileForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  handleLogin() {
    console.log('LoggedIN ---- ', this.userProfileForm.value);
    this.service.getAllData().subscribe((res) => {
      for (let us of res.data) {
        if (us.firstname == this.userProfileForm.value.email) {
          if (us.password == this.userProfileForm.value.password) {
            this.router.navigate(['/userprofile', us.id]);
          } else {
            console.log('invalid password');
          }
        } else {
          console.log('Invalid Email!!!');
        }
      }
    });
  }
}
