import { theme, ThemedMixin } from "@dojo/widget-core/mixins/Themed";
import { WidgetBase } from "@dojo/widget-core/WidgetBase";
import * as css from '../styles/list.m.css'
// import { v, w } from "@dojo/widget-core/d";
import TextInput from "@dojo/widgets/textinput/TextInput";
import { WorkerProperties } from "./Worker";
import { tsx } from '@dojo/widget-core//tsx';

export interface ListProperties {
    data?: WorkerProperties[];
    onInput: (value: string) => void;
    value: string;
}

const ListBase = ThemedMixin(WidgetBase);
@theme(css)

export default class List extends ListBase<ListProperties> {
    protected onInput({ target: { value } }: any) {
        this.properties.onInput(value);
    }
    protected renderItems() {
        const { data = [] } = this.properties;
        return data.map((item: any) => (
                    <div key={item}>
                        {`${item.firstName} ${item.lastName}`}
                    </div>
                ));
    }
    protected render() {
        return (
            <div>
                <TextInput onInput={this.onInput} placeholder='Filter workers...'></TextInput>
                <div>
                    {this.renderItems()}
                </div>
            </div>
        )
        // return v('div', [
        //     w(TextInput,{
        //         onInput: this.onInput,
        //         placeholder: 'Filter workers...'
        //     }),
        //     v('div', this.renderItems())
        // ]);
    }
}