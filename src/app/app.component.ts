import { Component } from '@angular/core';
import {users} from './mock_data';
import {gridEntryProps} from './gridProps';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-components';
  data = users;
  progress = 50;
  color = '#008000';
  radius = 50;
  gridEntryProps = gridEntryProps;

  onSortChange(change) {
    const {column, direction} = change;
    console.log(`A sort change was emitted on column '${column}' with direction ${direction}`);
  }

  onPageSizeChange(pageSize) {
    console.log(`A page size change was emitted. New page size is ${pageSize}`);
  }

  onPageNumberChange(page) {
    console.log(`A page number change was emitted. New page number is ${page}`);
  }

  setProgress(value) {
    this.progress = value;
  }

  changeColor() {
    const input = <HTMLInputElement>document.getElementById('color-input');
    this.color = input.value;
  }

  changeRadius(event) {
    const {target: {value}} = event;
    this.radius = parseInt(value);
  }

  changeProgress(event) {
    const {target: {value}} = event;
    this.progress = parseInt(value);
  }

  onComplete() {
    console.log('Progress indicator completed');
  }
}
