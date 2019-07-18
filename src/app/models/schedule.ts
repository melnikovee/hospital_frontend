import {Time} from '@angular/common';

export class Schedule {
  id: number;
  userId: number;
  date: Date;
  startTime: Time;
  endTime: Time;
  cabinet: number;
}
