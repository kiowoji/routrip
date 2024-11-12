import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignUp() {
    this.authService.signUp(this.email, this.password)
      .then(res => {
        console.log('Sign-up successful', res);
        this.router.navigate(['/dashboard']); 
      })
      .catch(err => console.error('Sign-up failed', err));
  }
}
