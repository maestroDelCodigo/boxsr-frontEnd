import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/security-services/auth.service';
import { DataSharingService } from '../../shared/data-sharing.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() showLogin = new EventEmitter<boolean>();

  @Output() showCart = new EventEmitter<boolean>();
  isUserLoggedIn: boolean;

  isUserAuthenticated = false;

  constructor(private authService: AuthService, private router: Router, private dataSharingService: DataSharingService) {
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
  });
   }

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.isUserAuthenticated();
  }

  logOut(): void{
    this.authService.removeUser();
    this.isUserAuthenticated = false;
    this.router.navigate(['']);
    this.dataSharingService.isUserLoggedIn.next(false);
  }


}
