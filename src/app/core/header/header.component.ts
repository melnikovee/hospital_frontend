import { Component, OnInit } from '@angular/core';
import {CurrentUserService} from '../auth/currentuser-service.service';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Hospital';


  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
              private currentUserService: CurrentUserService) {
    iconRegistry.addSvgIcon(
      'logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/logo.svg'));
  }

  ngOnInit() {
  }

  logout() {
    this.currentUserService.logout();
  }
}
