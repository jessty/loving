import { WidgetBase } from '@dojo/widget-core/WidgetBase';
// import { v, w } from '@dojo/widget-core/d';
import List from './List';
import { WorkerProperties } from './Worker';
import { tsx } from '@dojo/widget-core//tsx';
// import { label } from '../styles/worker.css';

export interface BannerProperties {
	data?: WorkerProperties[];
}
export default class Banner extends WidgetBase<BannerProperties> {
	private _data: any[];
	protected filterData(value: string) {
		const { data = []} = this.properties;
		this._data = data.filter((item: WorkerProperties)=>{
			let name = `${item.firstName} ${item.lastName}`;
			return (new RegExp(`^${value.toLowerCase()}`)).test(name.toLowerCase());
		});
		this.invalidate();
	}
	protected render() {
		return (
			<div>
				<h1 title='I am a title'>Welcome To Biz-E-Bodies</h1>
				<label>Find a worker:</label>
				<List onInput={this.filterData} value='' data={this._data || this.properties.data}></List>
			</div>
		);
		// return [
		// 	v('h1', { title: 'I am a title!' }, [ 'Welcome To Biz-E-Bodies' ]),
		// 	v('label', ['Find a worker:']),
		// 	w(List, {
		// 		onInput: this.filterData,
		// 		value: '',
		// 		data: this._data || this.properties.data
		// 	})
		// ];
	}
}
