import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './modules/user/components/login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('archolos');
}
