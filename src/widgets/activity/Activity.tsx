import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin } from '@dojo/widget-core/mixins/Themed';
import * as css from './activity.m.css';
import { tsx } from '@dojo/widget-core//tsx';

export default class Activity extends ThemedMixin(WidgetBase) {
    protected render() {
        return (
            <div classes={css.root}>Activity</div>
        );
    }
}