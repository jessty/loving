import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { tsx } from '@dojo/widget-core//tsx';
import * as css from './informBlock.m.css';
// import ComboBox from '@dojo/widgets/combobox/ComboBox';
// import Dialog from '@dojo/widgets/dialog/Dialog';
// import * as css from './informBlock.m.css';
// import { w } from '@dojo/widget-core/d';
import Button from '@dojo/widgets/button/Button';
import MySelect from './../MySelect/MySelect';
// import {LabelValue} from './../MySelect/MySelect';


export interface informBlockProp {
    fields?: any;
    informs?: any;
}

@theme(css)
export default class InformBlock extends ThemedMixin(WidgetBase)<informBlockProp> {
    // private currentValue = 'baz';
    // private open = false;
    private _isEditing = true;
    // private choises:Array<LabelValue> = [
    //     {
    //         value:1,
    //         key:'111'
    //     },
    //     {
    //         value:2,
    //         key:'222'
    //     },
    //     {
    //         value:3,
    //         key:'333'
    //     }
    // ]
    private _renderSelect(selectField: any, i: number) {
        return (
            <div classes={css.field} key={'select' + i}>
                <label classes={css.fieldLabel}>{selectField.label}</label>
                {this._isEditing ?
                    <MySelect choises={selectField.choises}></MySelect> :
                    <span classes={css.fieldResult}>{selectField.result.label}</span>
                }
            </div>
        );
    }
    private _renderTextInput(textInputField: any, i: number) {
        return (
            <div classes={css.field} key={'textInput' + i}>
                <label classes={css.fieldLabel}>{textInputField.label}</label>
                {this._isEditing ?
                    <input value={textInputField.value}/> :
                    <span classes={css.fieldResult}>{textInputField.value}</span>
                }
            </div>
        );
    }
    private _renderTextArea(textAreaField: any, i: number) {
        return (
            <div classes={[css.field, css.textareField, (this._isEditing?null:css.fixTextarea)]} key={'textArea' + i}>
                <label classes={css.fieldLabel}>{textAreaField.label}</label>
                {this._isEditing ?
                    <textarea value={textAreaField.value}></textarea> :
                    <span classes={css.fieldResult}>{textAreaField.value}</span>
                }
            </div>
        );
    }
    private _renderEditState() {
        let { fields } = this.properties;
        return fields ? fields.map((field: any, i: number) => {
            switch ( field.type ) {
                case 'textinput': return this._renderTextInput(field, i);
                case 'textarea': return this._renderTextArea(field, i);
                case 'select': return this._renderSelect(field, i);
            }
        }).concat(
            <div classes={[css.field, css.btnField]} key='btnField'>
                <Button onClick={this._toggleEditState} extraClasses={{'root': css.btn}}>提交</Button>
                <Button onClick={this._toggleEditState} extraClasses={{'root': css.btn}}>取消</Button>
            </div>
        ) : null;
    }
    private _renderReadState() {
        let { fields } = this.properties;
        let nodes: Array<any> = [];
        nodes[0] = (<span classes={css.editIcon} onclick={this._toggleEditState}></span>);
        let fieldNodes = fields ? fields.map((field: any, i: number) => {
            switch ( field.type ) {
                case 'textinput': return this._renderTextInput(field, i);
                case 'textarea': return this._renderTextArea(field, i);
                case 'select': return this._renderSelect(field, i);
            }
        }) : null;
        return [...nodes, ...fieldNodes];
    }
    private _toggleEditState() {
        this._isEditing = !this._isEditing;
        this.invalidate();
    }
    protected render() {
        // w(ComboBox, {
        //     results: ['foo', 'bar', 'baz'],
        //     value: this.state.currentValue,
        //     onChange: (value: string) => this.setState({ currentValue: value })
        // });
        // let { fields } = this.properties;
        return (
            <div classes={[this.theme(css.root), css.rootFixed]}>
                {/* <ComboBox results={['foo','baz','boo']} clearable={true} value={this.currentValue} onChange={(value: string)=>{this.currentValue = value;}}></ComboBox>
                <Button onClick={()=>{this.open = true;this.invalidate();}}>open</Button>
                <Dialog title='My Dialog' open={this.open} onRequestClose={() => {this.open=false;this.invalidate();}}>'My dialog content...' </Dialog> */}
                {/* {this._isEditing ? null : <span classes={css.editIcon} onclick={this._toggleEditState}></span>}
                {
                    fields ? fields.map((field: any) => {
                        switch ( field.type ) {
                            case 'textinput': return this._renderTextInput(field);
                            case 'textarea': return this._renderTextArea(field);
                            case 'select': return this._renderSelect(field);
                        }
                    }) : null
                }
                {this._isEditing ? (
                    <div classes={css.field}>
                        <Button onClick={this._toggleEditState}>提交</Button>
                        <Button onClick={this._toggleEditState}>取消</Button>
                    </div>) : null
                } */}
                {this._isEditing ? this._renderEditState() : this._renderReadState()}
            </div>
        );
    }
}