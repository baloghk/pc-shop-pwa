import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersFirebaseService } from '../../../services/firebase/users/users-firebase.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-password-change-dialog',
  templateUrl: './password-change-dialog.component.html',
  styleUrls: ['./password-change-dialog.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    NgIf,
    MatIcon,
    MatTooltipModule,
  ],
})
export class PasswordChangeDialogComponent {
  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: UsersFirebaseService,
    private dialogRef: MatDialogRef<PasswordChangeDialogComponent>
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required],
    });
  }

  get passwordMismatch(): boolean {
    return (
      this.changePasswordForm.get('newPassword')!.value !==
      this.changePasswordForm.get('confirmNewPassword')!.value
    );
  }

  onSubmit() {
    if (this.changePasswordForm.invalid || this.passwordMismatch) {
      return;
    }
    const { currentPassword, newPassword } = this.changePasswordForm.value;
    this.authService
      .changePassword(currentPassword, newPassword)
      .then(() => {
        alert('Jelszó sikeresen módosítva!');
        this.dialogRef.close();
      })
      .catch((error) => {
        alert(`Hiba a jelszó módosítása során: ${error.message}`);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
