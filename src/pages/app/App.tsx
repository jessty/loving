import { WidgetBase } from '@dojo/widget-core/WidgetBase';
// import { v, w } from '@dojo/widget-core/d';
import { theme, ThemedMixin } from '@dojo/widget-core/mixins/Themed';
// import { Link } from '@dojo/routing/Link';

// import { WorkerFormData } from './WorkerForm';
// import { WorkerProperties } from './Worker';
// import WorkerFormOutlet from './../outlets/WorkerFormOutlet';
// import WorkerContainerOutlet from './../outlets/WorkerContainerOutlet';
// import BannerOutlet from './../outlets/BannerOutlet';
// import FilteredWorkerContainerOutlet from './../outlets/FilteredWorkerContainerOutlet';

// import workerData from './../support/workerData';

import * as css from './app.m.css';
import { tsx } from '@dojo/widget-core//tsx';
import LoginOutlet from './../../outlets/LoginOutlet';
import { FrameOutlet } from './../../outlets/FrameOutlet';

@theme(css)
export default class App extends ThemedMixin(WidgetBase) {

	protected render() {
		return (
			<div>
				<LoginOutlet></LoginOutlet>
				<FrameOutlet></FrameOutlet>
			</div>
		);
	}

	
}
