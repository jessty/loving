import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { Registry } from '@dojo/widget-core/Registry';
import { registerRouterInjector } from '@dojo/routing/RouterInjector';
import App from './widgets/App';
import routeConfig from './route';

const root = document.querySelector('#app') || undefined;

const registry = new Registry();
const router = registerRouterInjector(routeConfig, registry);

const Projector = ProjectorMixin(App);
const projector = new Projector();
projector.setProperties({ registry });

projector.append(root);
router.start();
