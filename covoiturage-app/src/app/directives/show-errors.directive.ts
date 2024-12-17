import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appShowErrors]'
})
export class ShowErrorsDirective implements OnInit {
  @Input() form!: AbstractControl;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.form.statusChanges.subscribe(() => {
      const errorsMessages = this.getErrorMessages();
      this.setErrorMessages(errorsMessages);
    });
  }

  private getErrorMessage(errorKey: string, errorValue: any): string {
    const messages: { [key: string]: string } = {
      invalidDate: 'La date est invalide',
      dateMismatch: "La date de départ doit être avant la date d'arrivée",
      pastDate: 'La date ne doit pas être dans le passé',
      min: `La valeur minimale est ${errorValue.min}`
    };
    return messages[errorKey] || 'Erreur inconnue';
  }

  private setErrorMessages(messages: string[]) {
    const container = this.el.nativeElement;
    this.renderer.setProperty(container, 'innerHTML', '');
    messages.forEach(message => {
      const div = this.renderer.createElement('div');
      const text = this.renderer.createText(message);
      this.renderer.appendChild(div, text);
      this.renderer.appendChild(container, div);
    });
  }

  private getErrorMessages(): string[] {
    if (this.form && this.form.errors) {
      return Object.keys(this.form.errors || {}).map(erroKey => {
        return this.getErrorMessage(erroKey, this.form.errors![erroKey]);
      });
    }
    return [];
  }
}
