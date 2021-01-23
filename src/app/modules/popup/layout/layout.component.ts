import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { View } from 'src/app/models/settings';
import { Router } from '@angular/router';
import { DebugService } from 'src/app/services/debug.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  open: boolean = false;
  @Input() view: View = null;
  @Input() isLoading: boolean = false;
  @Output() private isLoadingChange: EventEmitter<boolean> = new EventEmitter();
  @Input() searchValue: string = null;
  @Output() private searchValueChange: EventEmitter<string> = new EventEmitter();
  readonly views: typeof View = View;

  constructor(public router: Router, private debug: DebugService) {
    this.debug.log('Router url:', this.router.url);
  }

  ngOnInit(): void {
  }

  toggleDrawer() {
    this.open = !this.open;
  }

  closeDrawer() {
    this.open = false;
  }

  onSearchTap() {
    this.isLoading = true;
    this.isLoadingChange.emit(this.isLoading);
  }

  onSearchValueChange(value: string) {
    this.searchValueChange.emit(value);
  }

}
