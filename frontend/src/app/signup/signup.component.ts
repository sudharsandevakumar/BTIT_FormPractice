import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private router: Router, private service: ApiserviceService) {}

  ngOnInit() {}

  title = 'FormPractic';
  email = new FormControl('chandru@gmail.com');

  userProfileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  updateEmail() {
    this.email.setValue('chandru@yahoo.com');
  }

  handleButtonClick() {}
  onSubmit() {
    this.router.navigate(['/login']);
    console.log(this.userProfileForm.value);
    console.log(this.userProfileForm.controls['firstName'].value);
    console.log(this.userProfileForm.get('firstName')?.value);

    if (this.userProfileForm.valid) {
      this.service.createData(this.userProfileForm.value).subscribe((res) => {
        console.log(res, 'res=>');
        this.userProfileForm.reset();
      });
    } else {
      console.log('all fields are required');
    }
  }
}
