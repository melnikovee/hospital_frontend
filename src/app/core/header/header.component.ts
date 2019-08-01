import { Component, OnInit } from '@angular/core';
import {CurrentUserService} from '../auth/currentuser-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Hospital';

  constructor(private currentUserService: CurrentUserService) { }

  ngOnInit() {
  }

  logout() {
    this.currentUserService.logout();
  }
}
