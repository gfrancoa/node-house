import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public isMenuCollapsed = true;
  public mobiliarios = [];

  constructor(
    private authService: AuthService,
    private mobiliarioService: HttpserviceService
  ) {}

  showLoginButton: boolean = false;

  ngOnInit(): void {
    this.showLoginButton = this.authService.isLogged();
    this.getMobiliarios();
  }

  removeToken() {
    this.authService.logout();
  }

  getMobiliarios() {
    this.mobiliarioService.getMobiliariosFilter({}).subscribe({
      next: (res: any) => {
        console.log('res get mobiliario', res);
        this.mobiliarios = res;
      },
      complete: () => {}, // completeHandler
      error: (err) => {
        console.log('Error getting records', err);
      }, // errorHandler
    });
  }
}
