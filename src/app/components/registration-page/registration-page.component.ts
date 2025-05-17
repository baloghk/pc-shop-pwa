import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsersFirebaseService } from '../../services/firebase/users/users-firebase.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class RegistrationPageComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UsersFirebaseService
  ) {
    this.registrationForm = this.fb.group({
      forename: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister() {
    const { forename, surname, email, username, password } =
      this.registrationForm.value;
    this.userService
      .registerUser(email, password, username, forename, surname)
      .then(() => alert('Sikeres regisztráció!'))
      .catch((error) => alert(`Hiba a regisztráció során: ${error.message}`));
  }
}
