import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  open = false;
  headerType = 'header';

  constructor() { }

  ngOnInit(): void {
  }

  toggleDrawer() {
    this.open = !this.open;
  }

}
