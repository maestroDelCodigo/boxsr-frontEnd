import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'boxsr-front';

  displayLogin = false;

  mostrarLogin(display: boolean): void{
    this.displayLogin = display;
  }
}
