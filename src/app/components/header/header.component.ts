import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/security-services/auth.service';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() showLogin = new EventEmitter<boolean>();
  @Output() perfilUsuario = new EventEmitter<any>();
  @Output() showCart = new EventEmitter<boolean>();
  isUserLoggedIn: boolean;

  isUserAuthenticated = false;
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {
    this.dataSharingService.isUserLoggedIn.subscribe((value) => {
      this.isUserLoggedIn = value;
    });
    this.isUserAuthenticated = this.authService.isUserAuthenticated();
  }

  logOut(): void {
    this.authService.removeUser();
    this.isUserAuthenticated = false;
    localStorage.removeItem('APP_USER');
    this.router.navigate(['']);
    this.dataSharingService.isUserLoggedIn.next(false);
  }
}
