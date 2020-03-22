import { Component, OnInit, Directive, ContentChildren, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export enum SortDirection {
  ASC,
  DESC
}

@Directive({selector: 't-entry'})
export class Entry {
  @Input() title;
  @Input() property;
  @Input() sortable;
}

@Component({
  selector: 't-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush   
})
export class GridComponent implements OnInit {
  @Input() data;
  @Input() pageSize;
  @Output() sortChange = new EventEmitter();
  @Output() pageNumberChange = new EventEmitter();
  @Output() pageSizeChange = new EventEmitter();

  columnsSorting = {};
  pageNumber = 1;

  @ContentChildren(Entry) entries;

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes) {
    this.data = JSON.parse(JSON.stringify(changes.data.currentValue));
  }

  onSort(property) {
    const sortDirection = this.columnsSorting[property];
    let newSortDirection = sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
    this.columnsSorting = {};
    this.columnsSorting[property] = newSortDirection;
    this.data.sort((a, b) => (a[property] > b[property]) ? 1 : -1);
    if (newSortDirection === SortDirection.DESC) {
      this.data.reverse();
    }

    this.sortChange.emit({column: property, direction: newSortDirection});
  }

  isSortActive(property, direction) {
    return this.columnsSorting[property] === direction;
  }

  getDataToDisplay() {
    if (!this.pageSize) {
      return this.data;
    }
    return this.data.slice((this.pageNumber - 1) * this.pageSize, this.pageSize * this.pageNumber);
  }

  onPageSizeChange(event) {
    const {target: {value}} = event;
    this.pageSize = value;
    this.pageNumber = 1;
    this.pageSizeChange.emit(value);
  }

  onPageNumberChange(page) {
    this.pageNumber = page + 1;
    this.pageNumberChange.emit(page + 1);
  }
}
