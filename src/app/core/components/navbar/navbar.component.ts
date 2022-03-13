import { Component } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast.service';
import { User } from 'src/db/db';
import { AppDBService } from '../../services/db.service';
import { isDevMode } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  currentUser!: User;
  user!: User;
  isDevMode = false;

  constructor(
    private appDBService: AppDBService,
    private toastService: ToastService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );

    this.isDevMode = isDevMode();
  }

  logout() {
    this.authenticationService.logout();
  }

  resetDB() {
    this.appDBService.resetDB();
    this.toastService.submitToast('Database Reset');
  }
}
