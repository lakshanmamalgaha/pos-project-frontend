import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  expandHeight = '56px';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  logOut(): void {
    console.log('logout');
    this.authService.logout();
  }

  onSidenavClose(): void {
    this.sidenavClose.emit();
  }

}
