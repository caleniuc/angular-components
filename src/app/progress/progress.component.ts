import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

enum Operator {
  PLUS = '+',
  MINUS = '-'
}

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
  strokeDashOffset;
  animationInterval;
  animationProgress;
  progressTextSize;
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
      this.strokeDashOffset = this.getStrokeFill(this.progress);
      this.progressTextSize = this.radius / 2;
    }
    if (p) {
      const {previousValue, currentValue} = p;
      this.checkProgress(this.setProgress, currentValue);
      this.checkProgress(this.setPreviousProgress, previousValue);

      if (this.previousProgress !== this.progress) {
        this.animate(this.previousProgress, this.progress);
      }

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
    else {
      setValue(value);
    }
  }

  setProgress = (value) => {
    this.progress = value;
  }

  setPreviousProgress = (value) => {
    this.previousProgress = value;
  }

  animate(from, to) {
    let operator;

    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    else {
      this.animationProgress = from;
    }

    if (this.animationProgress < to) {
      operator = Operator.PLUS;
    }
    else {
      operator = Operator.MINUS;
    }

    this.animationInterval  = setInterval(() => {
      if (operator === Operator.PLUS) {
        this.animationProgress++;
      }
      else {
        this.animationProgress--;
      }

      if ((operator === Operator.PLUS && this.animationProgress > to) || (operator === Operator.MINUS && this.animationProgress < to)) {
        this.animationProgress = to;
        clearInterval(this.animationInterval);
        this.animationInterval = undefined;
      }
      
      this.strokeDashOffset = this.getStrokeFill(this.animationProgress);
    }, 25)
  }

  getStrokeFill(progress) {
    return this.circumference * (1 - progress / 100);
  }

}
