import {Component, OnInit, ViewChild} from '@angular/core';
import {CabinetService} from '../../services/cabinet-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-cabinet-list',
  templateUrl: './cabinet-list.component.html',
  styleUrls: ['./cabinet-list.component.css']
})
export class CabinetListComponent implements OnInit {

  displayedColumns: string[] = ['cabinet', 'delete'];
  dataSource;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute, private router: Router, private cabinetService: CabinetService) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.cabinetService.findAll().subscribe(data => {
      const sorted = data.sort((a, b) => a.cabinetName.localeCompare(b.cabinetName));
      this.dataSource = new MatTableDataSource(sorted);
    });
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
