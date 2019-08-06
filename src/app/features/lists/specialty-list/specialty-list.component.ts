import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {Specialty} from '../../_models/specialty';
import {SpecialtyService} from '../../_services/specialty-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-specialty-list',
  templateUrl: './specialty-list.component.html',
  styleUrls: ['./specialty-list.component.css']
})
export class SpecialtyListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['specialty', 'duration', 'action'];
  dataSource!: MatTableDataSource<Specialty>;
  isNotFree!: boolean;
  private specialtySub = Subscription.EMPTY;
  private deleteSub = Subscription.EMPTY;

  constructor(private route: ActivatedRoute, private router: Router,
              private specialtyService: SpecialtyService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.isNotFree = false;
    this.specialtySub = this.specialtyService.findAll().subscribe(data => {
      const sorted = data.sort((a, b) => a.specialtyName.localeCompare(b.specialtyName));
      this.dataSource = new MatTableDataSource(sorted);
    });
  }

  createSpecialty() {
    this.router.navigate(['/addspecialty']);
  }

  updateSpecialty(id: number) {
    this.router.navigate(['/updatespecialty', id]);
  }

  deleteSpecialty(id: number) {
    if (confirm('Уверены что хотите удалить?')) {
      this.deleteSub = this.specialtyService.deleteSpecialty(id)
      .subscribe(
          data => {
            this.reloadData();
          },
          error => {
            this.isNotFree = true;
            console.log(error);
          }
      );
    }
  }

  ngOnDestroy(): void {
    this.specialtySub.unsubscribe();
    this.deleteSub.unsubscribe();
  }
}
