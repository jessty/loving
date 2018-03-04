import { Outlet } from '@dojo/routing/Outlet';
import LoginContainer from './../pages/login/LoginContainer';

export const LoginOutlet = Outlet(LoginContainer, 'login');
export default LoginOutlet;