import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { tsx } from '@dojo/widget-core//tsx';
import * as css from './mySelect.m.css';

export interface MySelectProp {
    value?: any;
    choises?: Array<LabelValue>;
    onChange?(value: any, key?: string): void;
    onFocus?(): void;
    onBlur?(): void;
    disabled?: boolean;
}
export interface LabelValue {
    label: string;
    value: any;
}
@theme(css)
export default class MySelect extends ThemedMixin(WidgetBase)<MySelectProp> {
    private _isDown: Boolean = false;
    private _selectedChoise: LabelValue = {label: 'a1A搞', value: ''};
    private _renderChoisesPane() {
        let { choises } = this.properties;
        console.log('choises', choises);
        return (
            <div classes={css.choisesPane}>
                {choises ? choises.map((choise) => {
                    return <span classes={css.choises}>{choise.label}</span>;
                    }
                ) : <span>无</span>}
            </div>
        );

    }
    protected _clickDownBtn() {
        this._isDown = !this._isDown;
        this.invalidate();
    }
    protected render (){
        // let {
        //     value,
        //     choises,
        //     onChange,
        //     onFocus,
        //     onBlur,
        //     disabled
        // } = this.properties;
        return (
            <div classes={[this.theme(css.rootFixed), css.root]} onfocusout={() => { console.log('blur');this._isDown = false;this.invalidate();}}>
                <span classes={css.result}>{this._selectedChoise.label}</span>
                <i classes={css.downBtn} onclick={() => {this._clickDownBtn();}}></i>
                {this._isDown ? this._renderChoisesPane() : null}
            </div>
        );
    }
}