import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[iconToggle]',
})
export class IconToggleDirective {
  @Input() iconOn: string;
  @Input() iconOff: string;
  @Input() on: boolean = false;
  @Input() titleOn: string = '';
  @Input() titleOff: string = '';
  @Input() classOn: string = '';
  @Input() classOff: string = '';
  @Output() onChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    this.update();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.on.isFirstChange()) {
      this.update();
    }
  }

  private update() {
    if (this.on) {
      this.element.nativeElement.innerHTML = this.iconOn;
      this.element.nativeElement.title = this.titleOn;
      if (this.classOff?.length) {
        this.removeClass(this.classOff);
      }
      if (this.classOn?.length) {
        this.addClass(this.classOn);
      }
    } else {
      this.element.nativeElement.innerHTML = this.iconOff;
      this.element.nativeElement.title = this.titleOff;
      if (this.classOn?.length) {
        this.removeClass(this.classOn);
      }
      if (this.classOff?.length) {
        this.addClass(this.classOff);
      }
    }
  }

  private addClass(_class: string) {
    this.element.nativeElement.classList.add(_class.split(' '));
  }

  private removeClass(_class: string) {
    this.element.nativeElement.classList.remove(_class.split(' '));
  }

  @HostListener('click', ['$event']) private onClick(event: Event) {
    this.on = !this.on;
    this.onChange.emit(this.on);
  }
}
