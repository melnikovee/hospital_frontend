import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {Specialty} from '../../_models/specialty';
import {SpecialtyService} from '../../_services/specialty-service.service';



@Component({
  selector: 'app-specialty-list',
  templateUrl: './specialty-list.component.html',
  styleUrls: ['./specialty-list.component.css']
})
export class SpecialtyListComponent implements OnInit {

  displayedColumns: string[] = ['specialty', 'action'];
  private dataSource!: MatTableDataSource<Specialty>;

  constructor(private route: ActivatedRoute, private router: Router,
              private specialtyService: SpecialtyService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.specialtyService.findAll().subscribe(data => {
      const sorted = data.sort((a, b) => a.specialtyName.localeCompare(b.specialtyName));
      this.dataSource = new MatTableDataSource(sorted);
    });
  }

  deleteSpecialty(id: number) {
    if (confirm('Уверены что хотите удалить?')) {
      this.specialtyService.deleteSpecialty(id)
      .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
    }
  }
}
