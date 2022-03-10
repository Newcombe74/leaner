import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { liveQuery } from 'dexie';
import { db } from 'src/db/db';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  async attemptLogin() {
    var users = await db.users.where('email').equals(this.email.value).toArray();
    if (users.length == 1) {
      // user found
      var user = users[0];
      if (user.password == this.password.value) {
        // Successful login
        console.log('Successful login');
      } else {
        // Failed login
        console.log('Failed login');
      }
    } else if (users.length == 0) {
      // no user found
    } else {
      // multiple users found
      console.error('ERROR: Email should not return multiple users')
    }
  }
}
