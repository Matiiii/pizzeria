import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {Order} from '../shared/order';
import {Dish} from '../shared/dish';
import {OrderService} from '../shared/order.service';
import {UserService} from '../shared/user.service';
import {AuthGrandService} from '../shared/auth-grand.service';
import {User} from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  submitted = false;
  error: string;

  loginForm: FormGroup;


  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.login(this.loginForm.get('login').value, this.loginForm.get('password').value);
  }
  login(name: string, password: string) {
    this.authenticationService.login(name, password);
    this.navigateToAdmin();
  }

  constructor(private userService: UserService, private authenticationService: AuthGrandService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({

      login: ['',
        [
           Validators.required,
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(4),
        ]],
    });
  }
}
