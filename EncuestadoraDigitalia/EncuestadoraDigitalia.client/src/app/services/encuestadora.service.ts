// ---------------------------------------
// Email: quickapp@ebenmonney.com
// Templates: www.ebenmonney.com/templates
// (c) 2024 www.ebenmonney.com/mit-license
// ---------------------------------------

import { Injectable } from '@angular/core';
import { Observable, forkJoin} from 'rxjs';
//import { mergeMap, tap } from 'rxjs/operators';

//import { AccountEndpoint } from './account-endpoint.service';
import { AuthService } from './auth.service';
//import { User } from '../models/user.model';
//import { Role } from '../models/role.model';
//import { Permission, PermissionValues } from '../models/permission.model';
//import { UserEdit } from '../models/user-edit.model';
import { Encuesta } from '../models/encuesta.model';
import { EncuestadoraEndpoint } from './encuestadora-endpoint.service';
import { PermissionValues } from '../models/permission.model';

//export type RolesChangedOperation = 'add' | 'delete' | 'modify';
//export interface RolesChangedEventArg { roles: Role[] | string[]; operation: RolesChangedOperation; }

@Injectable()
export class EncuestadoraService {
  //public static readonly roleAddedOperation: RolesChangedOperation = 'add';
  //public static readonly roleDeletedOperation: RolesChangedOperation = 'delete';
  //public static readonly roleModifiedOperation: RolesChangedOperation = 'modify';

  //private rolesChanged = new Subject<RolesChangedEventArg>();

  constructor(
    private authService: AuthService,
    private encuestadoraEndpoint: EncuestadoraEndpoint) {

  }

  //getUser(userId?: string) {
  //  return this.accountEndpoint.getUserEndpoint<User>(userId);
  //}

  //getUserAndRoles(userId?: string) {
  //  return forkJoin([
  //    this.accountEndpoint.getUserEndpoint<User>(userId),
  //    this.accountEndpoint.getRolesEndpoint<Role[]>()]);
  //}

  getEncuestas(page?: number, pageSize?: number) {
    return forkJoin([this.encuestadoraEndpoint.getEncuestasEndpoint<Encuesta[]>(page, pageSize)]);
  }

  //getUsersAndRoles(page?: number, pageSize?: number) {
  //  return forkJoin([
  //    this.encuestadoraEndpoint.getUsersEndpoint<User[]>(page, pageSize),
  //    this.encuestadoraEndpoint.getRolesEndpoint<Role[]>()]);
  //}

  //updateUser(user: UserEdit) {
  //  if (user.id) {
  //    return this.accountEndpoint.getUpdateUserEndpoint(user, user.id);
  //  } else {
  //    return this.accountEndpoint.getUserByUserNameEndpoint<User>(user.userName).pipe(
  //      mergeMap(foundUser => {
  //        user.id = foundUser.id;
  //        return this.accountEndpoint.getUpdateUserEndpoint(user, user.id);
  //      }));
  //  }
  //}

  //newUser(user: UserEdit) {
  //  return this.accountEndpoint.getNewUserEndpoint<User>(user);
  //}

  //getUserPreferences() {
  //  return this.accountEndpoint.getUserPreferencesEndpoint<string>();
  //}

  //updateUserPreferences(configuration: string | null) {
  //  return this.accountEndpoint.getUpdateUserPreferencesEndpoint(configuration);
  //}

  //deleteUser(userOrUserId: string | User): Observable<User> {
  //  if (typeof userOrUserId === 'string') {
  //    return this.accountEndpoint.getDeleteUserEndpoint<User>(userOrUserId as string).pipe<User>(
  //      tap(user => this.onRolesUserCountChanged(user.roles)));
  //  } else {
  //    if (userOrUserId.id) {
  //      return this.deleteUser(userOrUserId.id);
  //    } else {
  //      return this.accountEndpoint.getUserByUserNameEndpoint<User>(userOrUserId.userName).pipe<User>(
  //        mergeMap(user => this.deleteUser(user.id)));
  //    }
  //  }
  //}

  //unblockUser(userId: string) {
  //  return this.accountEndpoint.getUnblockUserEndpoint(userId);
  //}

  userHasPermission(permissionValue: PermissionValues): boolean {
    return this.permissions.some(p => p === permissionValue);
  }

  //refreshLoggedInUser() {
  //  return this.accountEndpoint.refreshLogin();
  //}

  //getRoles(page?: number, pageSize?: number) {
  //  return this.accountEndpoint.getRolesEndpoint<Role[]>(page, pageSize);
  //}

  //getRolesAndPermissions(page?: number, pageSize?: number) {
  //  return forkJoin([
  //    this.accountEndpoint.getRolesEndpoint<Role[]>(page, pageSize),
  //    this.accountEndpoint.getPermissionsEndpoint<Permission[]>()]);
  //}

  //updateRole(role: Role) {
  //  if (role.id) {
  //    return this.accountEndpoint.getUpdateRoleEndpoint(role, role.id).pipe(
  //      tap(() => this.onRolesChanged([role], AccountService.roleModifiedOperation)));
  //  } else {
  //    return this.accountEndpoint.getRoleByRoleNameEndpoint<Role>(role.name).pipe(
  //      mergeMap(foundRole => {
  //        role.id = foundRole.id;
  //        return this.accountEndpoint.getUpdateRoleEndpoint(role, role.id);
  //      }),
  //      tap(() => this.onRolesChanged([role], AccountService.roleModifiedOperation)));
  //  }
  //}

  grabarEncuesta(encuesta: Encuesta) {
    return this.encuestadoraEndpoint.getNewEncuestaEndpoint<Encuesta>(encuesta);
      //.pipe<Encuesta>(
      //tap(() => this.onRolesChanged([role], AccountService.roleAddedOperation));
  }

  deleteEncuesta(EncuestaOEncuestaId: number | Encuesta): Observable<Encuesta> {
    if (typeof EncuestaOEncuestaId === 'number') {
      return this.encuestadoraEndpoint.getDeleteEncuestaEndpoint<Encuesta>(EncuestaOEncuestaId as number);
      //.pipe<Encuesta>(
      //  tap(data => this.onRolesChanged([data], AccountService.roleDeletedOperation)));
    } else {
      return this.deleteEncuesta(EncuestaOEncuestaId.id);      
    }
  }

  //getPermissions() {
  //  return this.accountEndpoint.getPermissionsEndpoint<Permission[]>();
  //}

  //private onRolesChanged(roles: Role[] | string[], op: RolesChangedOperation) {
  //  this.rolesChanged.next({ roles, operation: op });
  //}

  //onRolesUserCountChanged(roles: Role[] | string[]) {
  //  return this.onRolesChanged(roles, AccountService.roleModifiedOperation);
  //}

  //getRolesChangedEvent(): Observable<RolesChangedEventArg> {
  //  return this.rolesChanged.asObservable();
  //}

  get permissions(): PermissionValues[] {
    return this.authService.userPermissions;
  }

  //get currentUser() {
  //  return this.authService.currentUser;
  //}
}
