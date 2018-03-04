import { Container } from '@dojo/widget-core/Container';
import AppContext from './../../states/AppContext';
import Login from './Login';

function getProperties(inject: AppContext, properties: any) {
    return {
        login: inject.login.bind(inject),
        signup: inject.signup.bind(inject),
        updateInform: inject.updateInform.bind(inject),
        identify: inject.identify.bind(inject)
     };
}

const LoginContainer = Container(Login, 'app-state', {getProperties});
export default LoginContainer;