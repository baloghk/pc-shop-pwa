import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-profile-page',
  imports: [MatButton],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

  username: string = 'johndoe';
  email: string = 'johndoe3@gmail.com';
  name: string = 'John Doe';

}
