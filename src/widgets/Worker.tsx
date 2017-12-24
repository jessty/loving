import { WidgetBase } from '@dojo/widget-core/WidgetBase';
// import { v } from '@dojo/widget-core/d';
import { theme, ThemedMixin } from '@dojo/widget-core/mixins/Themed';
import * as css from '../styles/worker.css';
import { tsx } from '@dojo/widget-core//tsx';
// import { workerFront } from './../styles/worker.css.d';

export interface WorkerProperties {
	firstName?: string;
	lastName?: string;
	email?: string;
	timePerTask?: number;
	tasks?: string[];
}

const WorkerBase = ThemedMixin(WidgetBase);

@theme(css)
export default class Worker extends WorkerBase<WorkerProperties> {
	private _isFlipped = false;

	protected render() {
		return (
			<div classes={this.theme([ css.worker, this._isFlipped ? css.reverse : null ])}>
				{this._renderFront()}
				{this._renderBack()}
			</div>
		)
		// return v('div', {
		// 	classes: this.theme([ css.worker, this._isFlipped ? css.reverse : null ])
		// }, [
		// 	this._renderFront(),
		// 	this._renderBack()
		// ]);
	}

	private _renderFront() {
		const {
			firstName = 'firstName',
			lastName = 'lastName'
		} = this.properties;

		return (
			<div classes={this.theme(css.workerFront)} onclick={this.flip}>
				<img classes={this.theme(css.image)} src='https://dojo.io/tutorials/resources/worker.svg'/>
				<div>
					<strong>{`${lastName}, ${firstName}`}</strong>
				</div>
			</div>
		)
		// v('div', {
		// 		classes: this.theme(css.workerFront),
		// 		onclick: this.flip
		// 	}, [
		// 		v('img', {
		// 			classes: this.theme(css.image),
		// 				src: 'https://dojo.io/tutorials/resources/worker.svg' }, []),
		// 		v('div', [
		// 			v('strong', [ `${lastName}, ${firstName}` ])
		// 		])
		// 	]
		// );
	}

	private _renderBack() {
		const {
			firstName = 'firstName',
			lastName = 'lastName',
			email = 'unavailable',
			timePerTask = 0,
			tasks = []
		} = this.properties;

		return (
			<div classes={this.theme(css.workerBack)} onclick={this.flip}>
				<img classes={this.theme(css.imageSmall)} src='https://dojo.io/tutorials/resources/worker.svg'/>
				<div classes={this.theme(css.generalInfo)}>
					<div classes={this.theme(css.label)}>Name</div>
					<div>{`${lastName}, ${firstName}`}</div>
					<div classes={this.theme(css.label)}>Email</div>
					<div>{`${email}`}</div>
					<div classes={this.theme(css.label)}>Avg. Time per Task</div>
					<div>{`${timePerTask}`}</div>
				</div>
				<div>
					<strong>Current Tasks</strong>
					<div>
						{tasks.map(task => (
						<div classes={this.theme(css.task) }>{task}</div>
						))}
					</div>
				</div>
			</div>
		)
		// v('div', {
		// 		classes: this.theme(css.workerBack),
		// 		onclick: this.flip
		// 	}, [
		// 		v('img', {
		// 			classes: this.theme(css.imageSmall),
		// 			src: 'https://dojo.io/tutorials/resources/worker.svg'
		// 		}),
		// 		v('div', {
		// 			classes: this.theme(css.generalInfo)
		// 		}, [
		// 			v('div', {
		// 				classes : this.theme(css.label)
		// 			}, ['Name']),
		// 			v('div', [`${lastName}, ${firstName}`]),
		// 			v('div', {
		// 				classes: this.theme(css.label)
		// 			}, ['Email']),
		// 			v('div', [`${email}`]),
		// 			v('div', {
		// 				classes: this.theme(css.label)
		// 			}, ['Avg. Time per Task']),
		// 			v('div', [`${timePerTask}`])
		// 		]),
		// 		v('div', [
		// 			v('strong', ['Current Tasks']),
		// 			v('div', tasks.map(task => {
		// 				return v('div', { classes: this.theme(css.task) }, [ task ]);
		// 			}))
		// 		])
		// 	]
		// );
	}

	flip(): void {
		this._isFlipped = !this._isFlipped;
		this.invalidate();
	}
}
