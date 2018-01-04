import { Outlet } from '@dojo/routing/Outlet';
import Center, { MY_TABS } from './../../pages/center/Center';

export const CenterOutlet = Outlet(Center, 'center', (inform) => {
    let params = inform.params;
        if('tab' in params && params.tab) {
            let key: 'MOOD'|'ALBUM'|'INFORM'|'EMAIL'|'ACTIVITY'|'CREDIT';
            for(key in MY_TABS) {
                if (MY_TABS[key] === params.tab) {
                    return {tab: params.tab};
                }
            }
            //route to Error.html
        }else {
            return {tab: MY_TABS.INFORM};
        }
    });
export default CenterOutlet;