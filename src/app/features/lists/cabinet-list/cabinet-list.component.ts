import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {Cabinet} from '../../_models/cabinet';
import {CabinetService} from '../../_services/cabinet-service.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-cabinet-list',
  templateUrl: './cabinet-list.component.html',
  styleUrls: ['./cabinet-list.component.css']
})
export class CabinetListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['cabinet', 'action'];
  dataSource!: MatTableDataSource<Cabinet>;
  isNotFree!: boolean;
  private cabinetSub = Subscription.EMPTY;
  private deleteSub = Subscription.EMPTY;

  constructor(private route: ActivatedRoute, private router: Router,
              private cabinetService: CabinetService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.isNotFree = false;
    this.cabinetSub = this.cabinetService.findAll().subscribe(data => {
      const sorted = data.sort((a, b) => a.cabinetName.localeCompare(b.cabinetName));
      this.dataSource = new MatTableDataSource(sorted);
    });
  }


  createCabinet() {
    this.router.navigate(['/addcabinet']);
  }

  deleteCabinet(id: number) {
    if (confirm('Уверены что хотите удалить?')) {
      this.deleteSub = this.cabinetService.deleteCabinet(id)
      .subscribe(
          data => {
            this.reloadData();
          },
          error => {
            this.isNotFree = true;
            console.log(error);
          });
    }
  }

  ngOnDestroy(): void {
    this.cabinetSub.unsubscribe();
    this.deleteSub.unsubscribe();
  }
}
