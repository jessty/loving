import { Container } from '@dojo/widget-core/Container';
import AppContext from './../../states/AppContext';
import Home from './Home';

function getProperties(inject: AppContext, properties: any) {
    return {
        visitingCard:{
            visitingCardsData: inject.visitingCardsData,
            updateVisitingCard: inject.updateVisitingCard.bind(inject)
        },
        centerCard: {
            centerCardData: inject.centerCardData,
            arrive: inject.arrive.bind(inject),
        },
        search: inject.search.bind(inject),
        searchData: inject.searchData
     };
}

const HomeContainer = Container(Home, 'app-state', {getProperties});
export default HomeContainer;