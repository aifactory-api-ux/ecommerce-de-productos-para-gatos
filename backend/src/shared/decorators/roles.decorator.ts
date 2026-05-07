import { SetMetadata } from '@nestjs/common';
import { ROLES } from '../constants';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
export const ROLES_KEY = 'roles';
export const RolesDecorator = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
export const AdminOnly = () => RolesDecorator(ROLES.ADMIN);