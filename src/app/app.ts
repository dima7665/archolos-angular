import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemListComponent } from "./modules/item/pages/list/item-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ItemListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('archolos');
}
