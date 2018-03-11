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
    fields: Object;
    initData?: Object;
    informs?: any;
    onSubmit?(values: Object): void;
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
    private _values: any = {};
    private _fieldChange(key: string, value: any) {
        this._values[key] = value;
        this._fields[key].value = value;
    }

    private _toggleState() {
        this._isEditing = !this._isEditing;
        this.invalidate();
        console.log('toggle');
    }
    private _onSubmitClick() {
        let {onSubmit} = this.properties;
        if(onSubmit) {
            onSubmit(this._values)
        }
        console.log(this._editable);
        this._readable ? this._toggleState() : null;
    }
    private _onCancelClick() {
        let {onCancel} = this.properties;
        onCancel ? onCancel() : null;
        this._readable ? this._toggleState() : null;
    }
    private _renderSelect(selectField: any, key: string) {
        console.log('selectField', selectField);
        return (
            <div classes={[css.field, this.theme(css.customField)]} key={'select-' + key}>
                <label classes={css.fieldLabel}>{selectField.label}</label>
                {this._isEditing ?
                    <MySelect choises={selectField.choises} initValue={selectField.value} onChange={this._fieldChange.bind(this, key)}></MySelect> :
                    <span key={'select-result-' + key} classes={css.fieldResult}>
                        {selectField.choises[selectField.value]}
                    </span>
                }
            </div>
        );
    }
    private _renderTextInput(textInputField: any, key: string) {
        return (
            <div classes={[css.field, this.theme(css.customField)]} key={'textInput-' + key}>
                <label classes={css.fieldLabel}>{textInputField.label}</label>
                {this._isEditing ?
                    <input type={textInputField.originType ? textInputField.originType : 'text'} value={textInputField.value} onchange={({target:{value}}) => {this._fieldChange(key, value);}}/> :
                    <span classes={css.fieldResult}>
                        {textInputField.value ? textInputField.value + '' : '未填写'}
                    </span>
                }
            </div>
        );
    }
    private _renderTextArea(textAreaField: any, key: string) {
        return (
            <div classes={[css.field, css.textareField, (this._isEditing ? null : css.fixTextarea), this.theme(css.customField)]} key={'textArea-' + key}>
                <label classes={css.fieldLabel}>{textAreaField.label}</label>
                {this._isEditing ?
                    <textarea value={textAreaField.value} onchange={({target:{value}}) => {this._fieldChange(key, value);}}></textarea> :
                    <span classes={css.fieldResult}>
                        {textAreaField.value ? textAreaField.value + '' : '未填写'}
                    </span>
                }
            </div>
        );
    }
    private _renderEditState() {
        let fieldNodes = [];
        let fields = this._fields;
        console.log('inform fields2', this._fields);
        for(let key in fields) {
            switch ( fields[key].type ) {
                case 'textinput': fieldNodes.push(this._renderTextInput(fields[key], key)); break;
                case 'textarea': fieldNodes.push(this._renderTextArea(fields[key], key)); break;
                case 'select': fieldNodes.push(this._renderSelect(fields[key], key)); break;
            }
        }
        // let fieldNodes: Array<any> =  this._fields ? this._fields.map((field: any, i: number) => {
        //     switch ( field.type ) {
        //         case 'textinput': return this._renderTextInput(field, i);
        //         case 'textarea': return this._renderTextArea(field, i);
        //         case 'select': return this._renderSelect(field, i);
        //     }
        // }) : [];

        // let btnField = (
        //     <div classes={[css.field, css.btnField]} key='btnField'>
        //         <Button onClick={this._onSubmitClick} extraClasses={{'root': css.btn}}>提交</Button>
        //         {this._readable ? <Button onClick={this._onCancelClick} extraClasses={{'root': css.btn}}>取消</Button> : null}
        //     </div>);

        return [...fieldNodes];

    }
    private _renderReadState() {
        let nodes: Array<any> = [];

        this._editable ? nodes[0] = (<span classes={css.editIcon} onclick={this._toggleState}></span>) : null;

        let fieldNodes = [];
        let fields = this._fields;

        for(let key in fields) {
            switch ( fields[key].type ) {
                case 'textinput': fieldNodes.push(this._renderTextInput(fields[key], key)); break;
                case 'textarea': fieldNodes.push(this._renderTextArea(fields[key], key)); break;
                case 'select': fieldNodes.push(this._renderSelect(fields[key], key)); break;
            }
        }

        return [...nodes, ...fieldNodes];
        // let fieldNodes = this._fields ? this._fields.map((field: any, i: number) => {
        //     switch ( field.type ) {
        //         case 'textinput': return this._renderTextInput(field, i);
        //         case 'textarea': return this._renderTextArea(field, i);
        //         case 'select': return this._renderSelect(field, i);
        //     }
        // }) : null;
        // return [...nodes, ...fieldNodes];
    }
    private _initWidget() {
        let {readable, editable, initState, initData, fields} = this.properties;
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
        if (initData) {
            for (let p in initData) {
                console.log('prop', p);
                if(this._fields[p]) {
                    this._fields[p].value = initData[p];
                }
            }
        }
        
        console.log('inform fields1', this._fields);
    }
    protected render() {
        this._initiated ? null : this._initWidget();
        // this._initWidget()
        return (
            <div classes={[this.theme(css.root), css.rootFixed]}>
                {this._isEditing ? this._renderEditState() : this._renderReadState()}
                <div classes={[css.field, css.btnField, this._isEditing ? '' : css.hiddenBtns]} key='btnField'>
                    <Button onClick={this._onSubmitClick} extraClasses={{'root': css.btn}}>提交</Button>
                    {this._readable ? <Button onClick={this._onCancelClick} extraClasses={{'root': css.btn}}>取消</Button> : null}
                </div>
            </div>
        );
    }
}