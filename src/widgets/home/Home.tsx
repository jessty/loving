import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { theme, ThemedMixin } from '@dojo/widget-core/mixins/Themed';
import * as css from './home.m.css';
import { tsx } from '@dojo/widget-core//tsx';

@theme(css)
export default class Home extends ThemedMixin(WidgetBase) {
    protected render() {
        return (
            <div classes={css.root}>Home</div>
        );
    }
}
