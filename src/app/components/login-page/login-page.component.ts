import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthFirebaseService } from '../../services/firebase/authorization/auth-firebase.service';

@Component({
  selector: 'app-login-page',
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    MatIcon,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthFirebaseService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    const { username, password } = this.loginForm.value;
    this.authService
      .login(username, password)
      .then(() => alert('Sikeres bejelentkezés!'))
      .catch((error) => alert(`Hiba: ${error.message}`));
  }
}
