import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  isLogin: boolean = false;
  username: string;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    if (this.auth.user) {
      this.username = this.auth.user?.user?.email;

      this.isLogin = true;
    }
  }

  logout() {
    this.auth.logout();
  }
}
