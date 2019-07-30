import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {distinctUntilChanged, first, map, shareReplay} from 'rxjs/operators';
import {CurrentUserService} from './currentuser-service.service';


@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private currentUserService: CurrentUserService) {
  }

  watch(permittedRole: string): Observable<boolean> {
    return this.currentUserService.auth$.pipe(
      map(auth => {
        if (auth == undefined) {
          return false;
        }
        return auth.role === permittedRole;
      }),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }

  has(permittedRole: string): Observable<boolean> {
    return this.watch(permittedRole).pipe(first());
  }
}
