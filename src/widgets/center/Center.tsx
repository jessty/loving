import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin } from '@dojo/widget-core/mixins/Themed';
import * as css from './center.m.css';
import { tsx } from '@dojo/widget-core//tsx';

export default class Center extends ThemedMixin(WidgetBase) {
    protected render() {
        return (
            <div classes={css.root}>Center</div>
        );
    }
}