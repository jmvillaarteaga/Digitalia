// ---------------------------------------
// Email: quickapp@ebenmonney.com
// Templates: www.ebenmonney.com/templates
// (c) 2024 www.ebenmonney.com/mit-license
// ---------------------------------------

export type PermissionNames =
  'View Users' | 'Manage Users' |
  'View Encuestas' | 'Manage Encuestas' |
  'View Roles' | 'Manage Roles' | 'Assign Roles';

export type PermissionValues =
  'users.view' | 'users.manage' |
  'encuestas.view' | 'encuestas.manage' |
  'roles.view' | 'roles.manage' | 'roles.assign';

export interface Permission {
  name: PermissionNames;
  value: PermissionValues;
  groupName: string;
  description: string;
}

export class Permissions {
  public static readonly viewUsers: PermissionValues = 'users.view';
  public static readonly manageUsers: PermissionValues = 'users.manage';  

  public static readonly viewEncuestas: PermissionValues = 'encuestas.view';
  public static readonly manageEncuestas: PermissionValues = 'encuestas.manage';

  public static readonly viewRoles: PermissionValues = 'roles.view';
  public static readonly manageRoles: PermissionValues = 'roles.manage';
  public static readonly assignRoles: PermissionValues = 'roles.assign';
}
