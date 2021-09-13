import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-badge-button',
  templateUrl: './badge-button.component.html',
  styleUrls: ['./badge-button.component.scss']
})
export class BadgeButtonComponent implements OnInit {

  @Input() class: string = '';
  @Input() label: string = '';
  @Input() title: string = '';
  @Input() badge: string | number = null;
  @Output() click: EventEmitter<Event> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(event: Event) {
    this.click.emit(event);
  }

}
