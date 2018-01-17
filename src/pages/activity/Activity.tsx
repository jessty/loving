import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin } from '@dojo/widget-core/mixins/Themed';
import * as css from './activity.m.css';
import { tsx } from '@dojo/widget-core//tsx';
import SwiperArea from './../../widgets/swiperArea/SwiperArea';
export interface ActivityProp {
    activitySwipers: Array<any>;
}
export default class Activity extends ThemedMixin(WidgetBase)<ActivityProp> {
    protected render() {
        let {activitySwipers: imgs} = this.properties;
        return (
            <div classes={css.root}>
                <SwiperArea imgs={imgs}></SwiperArea>
            </div>
        );
    }
}