import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  code = Array(6).fill(''); // Change 4 to the number of digits you want
  @ViewChildren('inputs') inputs!: QueryList<ElementRef>;

  onInputChange(event: Event, index: number) {
    event.stopPropagation()
    const input = event.target as HTMLInputElement;
    this.code[index] = input.value;

    if (input.value) {
      const nextInput = this.inputs.toArray()[index + 1];
      if (nextInput) {
        nextInput.nativeElement.focus();
      }
    }
  }

  onKeydown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && this.code[index] === '') {
      const previousInput = this.inputs.toArray()[index - 1];
      if (previousInput) {
        previousInput.nativeElement.focus();
      }
    }
  }
}
