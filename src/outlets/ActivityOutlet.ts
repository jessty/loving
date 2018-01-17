import { Outlet } from '@dojo/routing/Outlet';
import ActivityContainer from './../pages/activity/ActivityContainer';

export const ActivityOutlet = Outlet(ActivityContainer, 'activity');
export default ActivityOutlet;