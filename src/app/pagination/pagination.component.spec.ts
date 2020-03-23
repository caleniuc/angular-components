import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise the pageNumberChange event', () => {
    const pageIndex = 2;
    component.pageNumberChange.subscribe(index => expect(index).toBe(pageIndex));
    component.onPageNumberChange(pageIndex);
  })

  it('should go to first page', () => {
    component.pageNumber = 5;
    component.pageNumberChange.subscribe(index => expect(index).toBe(0));
    component.selectFirstPage();
  })

  it('should go to previous page', () => {
    const pageNumber = 5;
    component.pageNumber = pageNumber;
    component.pageNumberChange.subscribe(index => expect(index).toBe(pageNumber - 2));
    component.selectPreviousPage();
  })

  it('should go to next page', () => {
    const pageNumber = 5;
    component.data = Array(10);
    component.pageNumber = pageNumber;
    component.pageNumberChange.subscribe(index => expect(index).toBe(pageNumber + 1));
    component.selectNextPage();
  })

  it('should go to last page', () => {
    const totalPages = 10;
    component.data = Array(totalPages);
    component.pageNumberChange.subscribe(index => expect(index).toBe(totalPages - 1));
    component.selectPreviousPage();
  })

  it('should raise the pageSizeChange event', () => {
    const event = {target: {value: 25}};
    component.pageSizeChange.subscribe(e => {
      expect(e.target.value).toBe(event.target.value)
    });
    component.onPageSizeChange(event);
  })

  it('should raise the pageNumberChange event', () => {
    const page = 2;
    component.pageNumberChange.subscribe(p => {
      expect(p).toBe(page)
    });
    component.onPageNumberChange(page);
  })
});
