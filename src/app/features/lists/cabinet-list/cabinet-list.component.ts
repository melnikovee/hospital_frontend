import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {Cabinet} from '../../_models/cabinet';
import {CabinetService} from '../../_services/cabinet-service.service';


@Component({
  selector: 'app-cabinet-list',
  templateUrl: './cabinet-list.component.html',
  styleUrls: ['./cabinet-list.component.css']
})
export class CabinetListComponent implements OnInit {

  displayedColumns: string[] = ['cabinet', 'action'];
  dataSource!: MatTableDataSource<Cabinet>;

  constructor(private route: ActivatedRoute, private router: Router,
              private cabinetService: CabinetService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.cabinetService.findAll().subscribe(data => {
      const sorted = data.sort((a, b) => a.cabinetName.localeCompare(b.cabinetName));
      this.dataSource = new MatTableDataSource(sorted);
    });
  }


  createCabinet() {
    this.router.navigate(['/addcabinet']);
  }

  deleteCabinet(id: number) {
    if (confirm('Уверены что хотите удалить?')) {
      this.cabinetService.deleteCabinet(id)
      .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
    }
  }
}
