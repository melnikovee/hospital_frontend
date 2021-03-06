import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Cabinet} from '../../_models/cabinet';
import {CabinetService} from '../../_services/cabinet-service.service';
import {Subscription} from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-cabinet-form',
  templateUrl: './cabinet-form.component.html',
  styleUrls: ['./cabinet-form.component.css']
})
export class CabinetFormComponent implements OnDestroy {
  cabinet = new Cabinet('');
  receivedCabinet!: Cabinet;
  done!: boolean;
  alreadyExists!: boolean;
  private cabunetSub = Subscription.EMPTY;
  cabinetNameFormControl = new FormControl('', [
    Validators.maxLength(32),
    Validators.required
  ]);

  cabForm = new FormGroup({
    cabinetName: this.cabinetNameFormControl
  });

  matcher = new MyErrorStateMatcher();

  constructor(private route: ActivatedRoute, private router: Router,
              private cabinetService: CabinetService) {}

  putData() {
    this.cabinet.cabinetName = this.cabForm.controls.cabinetName.value;
  }

  onSubmit() {
    this.putData();
    this.alreadyExists = false;
    this.done = false;
    this.cabunetSub = this.cabinetService.save(this.cabinet).subscribe(
        (data: Cabinet) => {
          this.receivedCabinet = data;
          this.done = true;
        },
        error => {
          this.alreadyExists = true;
          console.log(error);
        }
    );
  }

  ngOnDestroy(): void {
    this.cabunetSub.unsubscribe();
  }
}
