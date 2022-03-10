import { Component } from '@angular/core';
import { User } from 'src/db/db';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  user!: User;
  _subscription_user: any;
  
  constructor(private userService : UserService) {
    this._subscription_user = this.userService.execChange.subscribe((value) => {
        this.user = value;
    });
  }
}
