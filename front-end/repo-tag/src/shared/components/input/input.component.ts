import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => InputComponent)
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  /**
   * Optional.
   */
  @Input()
  label?: string;

  /**
   * Optional.
   */
  @Input()
  value = '';

  /**
   * Optional.
   */
  @Input()
  placeholder = '';

  /**
   * Optional.
   */
  @Input()
  type: 'text' | 'password'| 'number' | 'search' | 'email' = 'text';

  /**
   * Optional.
   *
   * Value must be in the format of the CSS property value "width".
   * Example: 30%
   */
  @Input()
  width?: string;

  control: FormControl = new FormControl('');

  private onChange: (value: string) => void;
  private onBlur: () => void;

  constructor() { }

  ngOnInit(): void {
    this.control = new FormControl(this.value);
  }

  doInput() {
    this.onChange(this.control.value);
  }

  doBlur() {
    this.onBlur();
  }

  writeValue(obj: any): void {
    const value = String(obj);
    this.control.setValue(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onBlur = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  get inputStyles() {
    return {
      width: this.width
    }
  }
}
