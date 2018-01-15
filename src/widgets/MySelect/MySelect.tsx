import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { tsx } from '@dojo/widget-core//tsx';
import * as css from './mySelect.m.css';

export interface MySelectProp {
    initValue?: number;
    choises: Array<string>;
    onChange?(value: any, key?: string): void;
    onFocus?(): void;
    onBlur?(): void;
    disabled?: boolean;
}
// export interface LabelValue {
//     label: string;
//     value: any;
// }
@theme(css)
export default class MySelect extends ThemedMixin(WidgetBase)<MySelectProp> {
    private _isDown: Boolean = false;
    private _value: number|undefined;
    private _selectedChoise: string;
    private _initiated: boolean;
    // private _renderChoisesPane() {
    //     let { choises } = this.properties;
    //     console.log('choises', choises);
    //     return (
    //         <div classes={css.choisesPane}>
    //             {choises ? choises.map((choise) => {
    //                 return <span classes={css.choises}>{choise.label}</span>;
    //                 }
    //             ) : <span>无</span>}
    //         </div>
    //     );

    // }
    private _closeChoisesPane() {
        this._isDown = false;
        this.invalidate();
    }
    private _clickChoisesPane({target}: MouseEvent) {
        let { choises, onChange } = this.properties;
        let i = +(target.dataset.selectIndex);
        console.log('choise', target.dataset.selectIndex, choises[i]);
        
        if(this._value !== i) {
            this._value = i;
            this._selectedChoise = choises[i];
            onChange  ? onChange(i) : null;
        }
        this._isDown = ! this._isDown;
        this.invalidate();
    }
    protected _clickDownBtn() {
        this._isDown = !this._isDown;
        this.invalidate();
    }
    private _init() {
        this._initiated = true;
        let {
            initValue,
            choises
        } = this.properties;

        if (initValue !== undefined) {
            this._selectedChoise = choises[initValue];
        } else {
            this._selectedChoise = '未选';
        }
        this._value = initValue;
    }
    protected render() {
        // let {
        //     value,
        //     choises,
        //     onChange,
        //     onFocus,
        //     onBlur,
        //     disabled
        // } = this.properties;
        this._initiated ? null : this._init();
        console.log('value', this._value, 'choise', this._selectedChoise);
        let { choises } = this.properties;

        return (
            <div tabIndex={0} classes={[this.theme(css.rootFixed), css.root]} onblur={this._closeChoisesPane}>
                <span classes={css.result}>{this._selectedChoise}</span>
                <i classes={css.downBtn} onclick={() => {this._clickDownBtn()}}></i>
                <div classes={[css.choisesPane, this._isDown ? css.showChoisesPane : '']} onclick={this._clickChoisesPane}>
                    {choises ? choises.map((choise, i) => {
                        return <span data-select-index={i + ''} classes={css.choises}>{choise}</span>;
                    }) : null}
                </div>
            </div>
        );
    }
}
