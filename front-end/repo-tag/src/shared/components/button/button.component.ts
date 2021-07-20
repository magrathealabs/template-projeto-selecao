import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type ButtonSize = 'default' | 'small';
type ButtonType = 'raised' | 'stroked'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  /**
   * Optional.
   */
  @Input()
  size: ButtonSize = 'default'; 

  /**
   * Optional.
   */
  @Input()
  type: ButtonType = 'raised';

  /**
   * Optional.
   */
  @Input()
  disabled = false;

  /**
   * Optional.
   *
   * Value must be in the format of the CSS property value "width".
   * Example: 30%
   */
  @Input()
  width?: string;

  @Output()
  onClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  get buttonClasses() {
    return [`size-${this.size}`, `type-${this.type}`, this.disabled ? 'disabled' : ''];
  }

  get buttonStyles() {
    return {
      width: this.width
    }
  }
}