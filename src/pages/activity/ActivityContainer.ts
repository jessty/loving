import { Container } from '@dojo/widget-core/Container';
import AppContext from './../../states/AppContext';
import Activity from './Activity';

function getProperties(inject: AppContext, properties: any) {
    console.log('swiper imgs', inject.activitySwipers);
    return {
        ...properties,
        activitySwipers: inject.activitySwipers
     };
}

const ActivityContainer = Container(Activity, 'app-state', {getProperties});
export default ActivityContainer;