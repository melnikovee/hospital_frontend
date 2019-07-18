import { Component, OnInit } from '@angular/core';
import {Cabinet} from '../../models/cabinet';
import {CabinetService} from '../../services/cabinet-service.service';

@Component({
  selector: 'app-cabinet-list',
  templateUrl: './cabinet-list.component.html',
  styleUrls: ['./cabinet-list.component.css']
})
export class CabinetListComponent implements OnInit {

  cabinets: Cabinet[];

  constructor(private cabinetService: CabinetService) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.cabinetService.findAll().subscribe(data => {
      this.cabinets = data;
    });
  }

  deleteCabinet(id: number) {
    this.cabinetService.deleteCabinet(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
