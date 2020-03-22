import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 't-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() pageSize;
  @Input() data;
  @Input() pageNumber;
  @Output() pageSizeChange = new EventEmitter();
  @Output() pageNumberChange = new EventEmitter();

  firstItemShown;
  lastItemShown;

  pageSizes = [5, 15, 25, 50, 100];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes) {
    const {pageSize, pageNumber} = changes;
    const currPageSize = pageSize ? pageSize.currentValue : this.pageSize;
    const currPageNumber = pageNumber ? pageNumber.currentValue : this.pageNumber;
    this.firstItemShown = (currPageNumber - 1) * currPageSize + 1;
    this.lastItemShown = currPageNumber * currPageSize > this.data.length ? this.data.length : currPageNumber * currPageSize;
  }

  onPageSizeChange(event) {
    this.pageSizeChange.emit(event);
  }

  calculateTotalPages() {
    return Math.ceil(this.data.length / parseInt(this.pageSize));
  }

  onPageNumberChange(page) {
    this.pageNumberChange.emit(page);
  }

  getPages() {
    const totalPages = this.calculateTotalPages();
    if (totalPages < 6) {
      return [...Array(totalPages).keys()];
    }

    const left = this.pageNumber - 3;
    const right = this.pageNumber + 2;
    let lowerLimit = 0;
    let upperLimit = 0;

    if (left >= 0) {
      lowerLimit = left;
    }
    else {
      lowerLimit = 0;
      upperLimit -= left;
    }

    if (right <= totalPages) {
      upperLimit += right;
    }
    else {
      upperLimit = totalPages;
      lowerLimit -= right;
    }

    return [...Array(this.calculateTotalPages()).keys()].slice(lowerLimit, upperLimit);
  }
}
