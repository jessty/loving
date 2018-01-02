import { Outlet } from '@dojo/routing/Outlet';
import Center, { MY_TABS } from './../../pages/center/Center';

export const CenterOutlet = Outlet(Center, 'center', ({params}) => {
    console.log('inform', params.tab);
        if('tab' in params && params.tabs) {
            for(let tab in MY_TABS) {
                if (tab === params.tabs) {
                    return {tab: tab};
                }
            }
            //route to Error.html
        }else {
            return {tab: MY_TABS.INFORM};
        }
    });
export default CenterOutlet;