import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  phone = '8-888-888-88-88';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'phone',
      sanitizer.bypassSecurityTrustResourceUrl('assets/phone.svg'));
  }

  ngOnInit() {
  }

}
