import withAuthBase, { AuthenticationRole } from './withAuthBase';

export const withUserAuth = withAuthBase(AuthenticationRole.User);
export const withAdminAuth = withAuthBase(AuthenticationRole.Admin);
