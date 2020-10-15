import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router , NavigationEnd  } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/security-services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'boxsr-front';
  displayHeader: boolean;
  displayLogin = false;
  displayCarrito = false;


  constructor(private router: Router, private route: ActivatedRoute){
    router.events.pipe(
      filter((event) => event instanceof NavigationEnd))
      .subscribe(x => {

            // tslint:disable-next-line:no-string-literal
            const url =  x['url'] as string;

            if (url.indexOf('admin') > 0){
              this.displayHeader = false;
            }
            else{
              this.displayHeader = true;
            }

          }
      );
  }

  ngOnInit(): void {
    this.abrirLogin(false)
  }


  mostrarLogin(display: boolean): void{
    this.displayLogin = display;
  }
  abrirLogin(display: boolean): void{
    this.displayLogin = display;
  }

  mostrarCarrito(display: boolean): void{
    this.displayCarrito = display;
  }
}
