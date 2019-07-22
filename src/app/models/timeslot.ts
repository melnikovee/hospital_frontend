import {Time} from '@angular/common';

export class Timeslot {

  id!: number;
  patient!: number;
  specialty!: number;
  doctor!: number;
  cabinet!: number;
  date!: Date;
  time!: Time;
  isFree!: boolean;
}
