import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 't-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
  
})
export class ProgressComponent implements OnInit {
  @Input() radius;
  @Input() progress;
  @Input() color;
  @Output() complete = new EventEmitter();
  strokeWidth;
  svgSize;
  circumference
  previousProgress;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes) {
    const {radius: r, progress: p} = changes;
    if (r) {
      const {currentValue} = r;
      if (currentValue < 50) {
        this.radius = 50;
      }
      else {
        this.radius = currentValue;
      }
      this.strokeWidth = 7/100 * this.radius;
      this.svgSize = this.radius * 2 + this.strokeWidth;
      this.circumference = 2 * Math.PI * this.radius;
    }
    if (p) {
      const {previousValue, currentValue} = p;
      this.checkProgress(this.setProgress, currentValue);
      this.checkProgress(this.setPreviousProgress, previousValue);

      if (previousValue < this.progress && this.progress === 100) {
        this.complete.emit();
      }
    }
  }

  checkProgress(setValue, value) {
    if (value === undefined || value < 0) {
      setValue(0);
    }
    else if (value > 100) {
      setValue(100);
    }
  }

  setProgress = (value) => {
    this.progress = value;
  }

  setPreviousProgress = (value) => {
    this.previousProgress = value;
  }

  getStrokeFill() {
    return this.circumference * (1 - this.progress / 100);
  }

}
