import { Container } from '@dojo/widget-core/Container';
import AppContext from './../../states/AppContext';
import Center from './Center';

function getProperties(inject: AppContext, properties: any) {
    return {
        ...properties,
        myInform: {
            basicInformData: inject.basicInformData,
        },
        myAlbums: {
            albums: inject.albums
        }
     };
}

const CenterContainer = Container(Center, 'app-state', {getProperties});
export default CenterContainer;