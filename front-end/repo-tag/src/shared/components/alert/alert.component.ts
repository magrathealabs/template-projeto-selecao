import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input()
  message = '';

  @Input()
  type: 'error' | 'success' = 'success';

  @Output()
  onClose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  get alertClasses() {
    return ['alert-container', `${this.type}`];
  }

}
