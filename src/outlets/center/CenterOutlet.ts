import { Outlet } from '@dojo/routing/Outlet';
import { MY_TABS } from './../../pages/center/Center';
import CenterContainer from './../../pages/center/CenterContainer';

export const CenterOutlet = Outlet(CenterContainer, 'center', (inform) => {
        let params = inform.params;
        console.error('未解决：个人中心各子模块id传递问题，会涉及到本人与他人的个人中心在显示时的不同！！！');
        console.error('Centerdata', inform)
        if ('tab' in params && params.tab) {
            let key: 'MOOD' | 'ALBUM' | 'INFORM' | 'EMAIL' | 'ACTIVITY' | 'CREDIT';
            for (key in MY_TABS) {
                if (MY_TABS[key] === params.tab) {

                    console.log('id', inform)
                    return {tab: params.tab, id:9 };
                }
            }
            //route to Error.html
        } else {
            return {tab: MY_TABS.MOOD, id: params.id};
        }
    });
export default CenterOutlet;