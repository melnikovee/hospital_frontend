import { Component, OnInit } from '@angular/core';
import {Doctor} from '../../models/doctor';
import {DoctorService} from '../../services/doctor-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {

  doctors: Doctor[];

  constructor(private route: ActivatedRoute, private router: Router, private doctorService: DoctorService) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.doctorService.findAll().subscribe(data => {
      this.doctors = data;
    });
  }

  deleteDoctor(id: number) {
    this.doctorService.deleteDoctor(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
