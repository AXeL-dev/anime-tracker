import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, OnDestroy {

  @Input() placeholder: string = 'Search...';
  @Input() value: string = null;
  @Output() valueChange: EventEmitter<string> = new EventEmitter();
  private inputChange: Subject<string> = new Subject();
  private componentDestroy: Subject<void> = new Subject();
  @Output() tap: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.inputChange.pipe(
      takeUntil(this.componentDestroy),
      tap(() => this.tap.emit()),
      debounceTime(700),
      distinctUntilChanged()
    ).subscribe((value) => {
      this.valueChange.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }

  onInput() {
    this.inputChange.next(this.value);
  }

  clear() {
    this.value = null;
    this.inputChange.next(this.value);
  }

}
