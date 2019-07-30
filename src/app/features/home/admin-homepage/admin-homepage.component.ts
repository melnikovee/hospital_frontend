import {Component, OnInit} from '@angular/core';
import {User} from '../../_models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../_services/user-service.service';

export interface Section {
  name: string;
  value: string;
}

@Component({
  selector: 'app-admin-homepage-form',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {
  user!: User;
  id!: number;
  folders: Section[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
              private userService: UserService) {
  }

  async ngOnInit() {
    this.id = -1;
    const stringId = localStorage.getItem('id');
    if (stringId) {
      this.id = parseInt(stringId, 10);
    }
    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
    });
    await this.sleep(300);
    this.folders = [
      {
        name: 'Логин',
        value: this.user.login,
      },
      {
        name: 'E-mail',
        value: this.user.email,
      },
      {
        name: 'ФИО',
        value: this.user.lastName + ' ' + this.user.firstName + ' ' + this.user.middleName,
      }
    ];
  }

  sleep(ms: number) {
    return new Promise(r => setTimeout(r, ms));
  }
}
