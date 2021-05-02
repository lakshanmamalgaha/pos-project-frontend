import { Component, OnInit } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  isMobile = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    const layoutChanges = breakpointObserver.observe([
      '(max-width: 768px)'
    ]);

    layoutChanges.subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit(): void {
  }

}
