import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-special-shift-for-patient-form',
  templateUrl: './special-shift-for-patient-form.component.html',
  styleUrls: ['./special-shift-for-patient-form.component.css']
})
export class SpecialShiftForPatientFormComponent {

  constructor(private route: ActivatedRoute, private router: Router) {
    const stringId = localStorage.getItem('id');

    if (stringId) {
      this.router.navigate(['/patientspecialshiftrecord', parseInt(stringId, 10)]);
    }
  }
}
