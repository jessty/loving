import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { Registry } from '@dojo/widget-core/Registry';
import { registerRouterInjector } from '@dojo/routing/RouterInjector';
import App from './pages/app/App';
import routeConfig from './route';
import theme from './styles/theme/theme';
import { registerThemeInjector } from '@dojo/widget-core/mixins/Themed';
import AppContext from './states/AppContext';
// import CenterContext from './states/CenterContext';


const root = document.querySelector('#app') || undefined;

const registry = new Registry();
const appContext = new AppContext();
// const centerContext = new CenterContext();

registry.defineInjector('app-state', appContext);
// registry.defineInjector('center-state', centerContext);

const router = registerRouterInjector(routeConfig, registry);

registerThemeInjector(theme, registry);

const Projector = ProjectorMixin(App);
const projector = new Projector();
projector.setProperties({ registry });

projector.append(root);
router.start();