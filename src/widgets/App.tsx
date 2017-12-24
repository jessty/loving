import { WidgetBase } from '@dojo/widget-core/WidgetBase';
// import { v, w } from '@dojo/widget-core/d';
import { theme, ThemedMixin } from '@dojo/widget-core/mixins/Themed';
import { Link } from '@dojo/routing/Link';

import { WorkerFormData } from './WorkerForm';
import { WorkerProperties } from './Worker';
import WorkerFormOutlet from './../outlets/WorkerFormOutlet';
import WorkerContainerOutlet from './../outlets/WorkerContainerOutlet';
import BannerOutlet from './../outlets/BannerOutlet';
import FilteredWorkerContainerOutlet from './../outlets/FilteredWorkerContainerOutlet';

import workerData from './../support/workerData';

import * as css from './../styles/app.m.css';
import { tsx } from '@dojo/widget-core//tsx';

@theme(css)
export default class App extends ThemedMixin(WidgetBase) {
	private _newWorker: Partial<WorkerFormData> = {};

	private _workerData: WorkerProperties[] = workerData;

	private _addWorker() {
		this._workerData = this._workerData.concat(this._newWorker);
		this._newWorker = {};
		this.invalidate();
	}

	private _onFormInput(data: Partial<WorkerFormData>) {
		this._newWorker = {
			...this._newWorker,
			...data
		};
		this.invalidate();
	}

	protected render() {
		return (
			<div>
				<div classes={this.theme(css.root)}>
					<div classes={this.theme(css.container)}>
						<h1 classes={this.theme(css.title)}>Biz-E-Bodies</h1>
						<div classes={this.theme(css.link)}>
							<Link key='home' to='home' classes={this.theme(css.link)}>Home</Link>
							<Link key='directory' to='directory' classes={this.theme(css.link)}>Worker Directory</Link>
							<Link key='newworker' to='new-worker' classes={this.theme(css.link)}>New Worker</Link>
						</div>
					</div>
				</div>
				<div classes={this.theme(css.main)}> 
					<BannerOutlet data={this._workerData}></BannerOutlet>
					<WorkerFormOutlet formData={this._newWorker} onFormInput={this._onFormInput} onFormSave={this._addWorker}></WorkerFormOutlet>
					<FilteredWorkerContainerOutlet workerData={this._workerData}></FilteredWorkerContainerOutlet>
					<WorkerContainerOutlet workerData={this._workerData}></WorkerContainerOutlet>
				</div>
			</div>
		); 
	}
}