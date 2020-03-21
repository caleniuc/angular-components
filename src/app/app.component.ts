import { Component } from '@angular/core';
import {countries} from './countries';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-components';
  data = countries;

  onSortChange(change) {
    const {column, direction} = change;
    console.log(`A sort change was emitted on column '${column}' with direction ${direction}`);
  }
}
