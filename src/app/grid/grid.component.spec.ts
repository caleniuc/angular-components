import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent, SortDirection } from './grid.component';

const testData = [
  {
    country: "Germany",
    code: "DE"
  },
  {
    country: "Italy",
    code: "IT"
  },
  {
    country: "Romania",
    code: "RO'"
  }
]

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    component.data = testData;
    fixture.detectChanges();
    component.data = [...testData];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a table', () => {
    const wrapper = fixture.nativeElement;
    const table = wrapper.querySelector('table');
    expect(table).toBeTruthy();
  });

  it('should sort data', () => {
    const sortProperty = 'country';
    // No sorting active by default
    expect(component.isSortActive(sortProperty, SortDirection.ASC)).toBeFalse();
    expect(component.isSortActive(sortProperty, SortDirection.DESC)).toBeFalse();
    component.onSort(sortProperty);
    // ASC sort
    expect(component.isSortActive(sortProperty, SortDirection.ASC)).toBeTrue();
    expect(component.isSortActive(sortProperty, SortDirection.DESC)).toBeFalse();
    component.data.forEach((element, i) => {
      expect(element[sortProperty]).toBe(testData[i][sortProperty]);
    });
    component.onSort(sortProperty);
    // DESC sort
    expect(component.isSortActive(sortProperty, SortDirection.ASC)).toBeFalse();
    expect(component.isSortActive(sortProperty, SortDirection.DESC)).toBeTrue();
    component.data.forEach((element, i) => {
      expect(element[sortProperty]).toBe(testData[testData.length - i - 1][sortProperty]);
    });
  });

  it('should get the data to display', () => {
    let displayData = component.getDataToDisplay();
    expect(displayData.length).toBe(testData.length);
    component.pageSize = 1;
    // It return the first element
    displayData = component.getDataToDisplay();
    expect(displayData.length).toBe(1);
    expect(displayData[0].country).toBe(testData[0].country);
    // It return the second element
    component.pageNumber = 2;
    displayData = component.getDataToDisplay();
    expect(displayData.length).toBe(1);
    expect(displayData[0].country).toBe(testData[1].country);
  })

  it('should raise the pageSizeChange event', () => {
    const event = {target: {value: 25}};
    component.pageNumber = 2;
    component.pageSizeChange.subscribe(size => {
      expect(size).toBe(event.target.value)
      expect(component.pageNumber).toBe(1);
    });
    component.onPageSizeChange(event);
  })

  it('should raise the pageNumberChange event', () => {
    const pageIndex = 2;
    component.pageNumberChange.subscribe(page => expect(page).toBe(pageIndex + 1));
    component.onPageNumberChange(pageIndex);
  })
});
