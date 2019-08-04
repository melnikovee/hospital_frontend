import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {PermissionService} from '../permision.service';


@Injectable({
  providedIn: 'root'
})
export class AdministratorDoctorGuard implements CanActivate {

  constructor(private permissionService: PermissionService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.permissionService.has('ADMINISTRATOR')) {
      return true;
    }
    if (this.permissionService.has('DOCTOR')) {
      return true;
    }
    return false;
  }

}
