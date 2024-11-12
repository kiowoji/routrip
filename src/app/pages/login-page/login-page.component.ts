import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  // Email/Password login
  onLogin() {
    this.authService.login(this.email, this.password)
      .then(res => console.log('Login successful', res))
      .catch(err => console.error('Login failed', err));
  }

}
