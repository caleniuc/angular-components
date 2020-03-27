import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';


import { ProgressComponent } from './progress.component';


describe('ProgressComponent', () => {
  let component: ProgressComponent;
  let fixture: ComponentFixture<ProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test for progress min value', () => {
    expect(component.progress).toBeFalsy();
    component.ngOnChanges({progress: new SimpleChange(undefined, -100, true)});
    expect(component.progress).toBe(0);
    expect(component.previousProgress).toBe(0);
  });

  it('should test for progress max value', () => {
    expect(component.progress).toBeFalsy();
    component.ngOnChanges({progress: new SimpleChange(undefined, 1000, true)});
    expect(component.progress).toBe(100);
    expect(component.previousProgress).toBe(0);
  });

  it('should test for radius min value', () => {
    expect(component.radius).toBeFalsy();
    component.ngOnChanges({radius: new SimpleChange(undefined, 20, true)});
    expect(component.radius).toBe(50);
  });

  it('should raise the complete event', () => {
    const onComplete = jasmine.createSpy();
    component.complete.subscribe(onComplete);
    component.ngOnChanges({progress: new SimpleChange(undefined, 100, true)});
    expect(onComplete).toHaveBeenCalled();
  })
});
