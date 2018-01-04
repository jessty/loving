import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { tsx } from '@dojo/widget-core//tsx';
import * as css from './informBlock.m.css';
// import ComboBox from '@dojo/widgets/combobox/ComboBox';
// import Dialog from '@dojo/widgets/dialog/Dialog';
// import * as css from './informBlock.m.css';
// import { w } from '@dojo/widget-core/d';
import Button from '@dojo/widgets/button/Button';
import MySelect from './../mySelect/MySelect';
// import {LabelValue} from './../MySelect/MySelect';


export interface informBlockProp {
    fields?: Array<any>;
    informs?: any;
    onSubmit?(): void;
    onCancel?(): void;
    initState: 'read'|'edit';
    editable: Boolean;
    readable: Boolean;
}

@theme(css)
export default class InformBlock extends ThemedMixin(WidgetBase)<informBlockProp> {

    private _isEditing: Boolean;
    private _readable: Boolean;
    private _editable: Boolean;
    private _fields: any;
    private _initiated: Boolean;

    private _toggleState() {
        this._isEditing = !this._isEditing;
        this.invalidate();
        console.log('toggle');
    }
    private _onSubmitClick() {
        let {onSubmit} = this.properties;
        onSubmit ? onSubmit() : null;
        console.log(this._editable);
        this._readable ? this._toggleState() : null;
    }
    private _onCancelClick() {
        let {onCancel} = this.properties;
        onCancel ? onCancel() : null;
        this._readable ? this._toggleState() : null;
    }
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
            <div classes={[css.field, css.textareField, (this._isEditing ? null : css.fixTextarea)]} key={'textArea' + i}>
                <label classes={css.fieldLabel}>{textAreaField.label}</label>
                {this._isEditing ?
                    <textarea value={textAreaField.value}></textarea> :
                    <span classes={css.fieldResult}>{textAreaField.value}</span>
                }
            </div>
        );
    }
    private _renderEditState() {

        let fieldNodes: Array<any> =  this._fields ? this._fields.map((field: any, i: number) => {
            switch ( field.type ) {
                case 'textinput': return this._renderTextInput(field, i);
                case 'textarea': return this._renderTextArea(field, i);
                case 'select': return this._renderSelect(field, i);
            }
        }) : [];

        let btnField = (
            <div classes={[css.field, css.btnField]} key='btnField'>
                <Button onClick={this._onSubmitClick} extraClasses={{'root': css.btn}}>提交</Button>
                {this._readable ? <Button onClick={this._onCancelClick} extraClasses={{'root': css.btn}}>取消</Button> : null}
            </div>);
        
        return [...fieldNodes, btnField];

    }
    private _renderReadState() {
        let nodes: Array<any> = [];
        this._editable ? nodes[0] = (<span classes={css.editIcon} onclick={this._toggleState}></span>) : null;

        let fieldNodes = this._fields ? this._fields.map((field: any, i: number) => {
            switch ( field.type ) {
                case 'textinput': return this._renderTextInput(field, i);
                case 'textarea': return this._renderTextArea(field, i);
                case 'select': return this._renderSelect(field, i);
            }
        }) : null;
        return [...nodes, ...fieldNodes];
    }
    private _initWidget() {
        let {readable, editable, initState, fields} = this.properties;
        if (!(readable || editable)) {
            throw Error('Property Error: editable and readable can not be passed as \'false\' at the same time!');
        }else if(initState === 'edit' && !editable) {
            throw Error('Property Error: when initState is \'edit\',editable can not be passed as \'false\'!');
        }else if(initState === 'read' && !readable) {
            throw Error('Property Error: when initState is \'read\',readable can not be passed as \'false\'!');
        }
        this._readable = readable;
        this._editable = editable;
        this._isEditing = (initState === 'edit');
        this._fields = fields;
        this._initiated = true;
    }
    protected render() {
        this._initiated ? null : this._initWidget();
        return (
            <div classes={[this.theme(css.root), css.rootFixed]}>
                {this._isEditing ? this._renderEditState() : this._renderReadState()}
            </div>
        );
    }
}