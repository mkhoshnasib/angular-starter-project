import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.createLoginForm();
  }

  login(loginFormValue) {
    if (loginFormValue.username === 'admin' && loginFormValue.password === '123') {
      localStorage.setItem('authenticated', 'true');
      this.toastr.success('', 'You`re successfully logged in!');
      this.router.navigate(['home']);
    } else {
      this.toastr.error('', 'Invalid username or password!');
    }
  }

  private createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
