import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public isMenuCollapsed = true;

  constructor(private authService: AuthService) {}

  showLoginButton: boolean = false;

  ngOnInit(): void {
    this.showLoginButton = this.authService.isLogged();
  }

  removeToken() {
    this.authService.logout();
  }
}
