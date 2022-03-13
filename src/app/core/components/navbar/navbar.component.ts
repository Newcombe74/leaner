import { Component } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast.service';
import { User } from 'src/db/db';
import { AppDBService } from '../../services/db.service';
import { UserService } from '../../services/user.service';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  user!: User;
  isDevMode = false;

  constructor(
    private appDBService: AppDBService,
    private toastService: ToastService,
    private userService: UserService
  ) {
    this.userService.execChange.subscribe((value) => {
      this.user = value;
    });
    
    this.isDevMode = isDevMode();
  }

  resetDB() {
    this.appDBService.resetDB();
    this.toastService.submitToast('Database Reset')
  }
}
