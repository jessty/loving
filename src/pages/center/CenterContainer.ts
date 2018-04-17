import { Container } from '@dojo/widget-core/Container';
import AppContext from './../../states/AppContext';
import Center from './Center';

function getProperties(inject: AppContext, properties: any) {
    return {
        ...properties,
        logger: inject.centerCardData,
        search: inject.search.bind(inject),
        myInform: {
            basicInformData: inject.basicInformData,
        },
        myAlbums: {
            albums: inject.albums,
            getAlbums: inject.getAlbums.bind(inject)
        }
     };
}

const CenterContainer = Container(Center, 'app-state', {getProperties});
export default CenterContainer;