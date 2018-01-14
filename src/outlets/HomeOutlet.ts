import { Outlet } from '@dojo/routing/Outlet';
import HomeContainer from './../pages/home/HomeContainer';

export const HomeOutlet = Outlet(HomeContainer, 'home');
export default HomeOutlet;