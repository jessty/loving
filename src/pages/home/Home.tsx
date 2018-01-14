import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { theme, ThemedMixin } from '@dojo/widget-core/mixins/Themed';
import * as css from './home.m.css';
import { tsx } from '@dojo/widget-core//tsx';
import VisitingCard, { VisitingCardData } from './../../widgets/visitingCard/VisitingCard';
import CenterCard, {CenterCardData} from './../../widgets/centerCard/CenterCard';
export interface HomeProp {
    visitingCard: {
        visitingCardsData: VisitingCardData[];
        updateVisitingCard: (id: string, like: boolean) => void;
    };
    centerCard: {
        centerCardData: CenterCardData;
        arrive: () => void;
    }
    
    
}
@theme(css)

export default class Home extends ThemedMixin(WidgetBase)<HomeProp> {
    protected render() {
        let {
            visitingCardsData,
            updateVisitingCard,
        } = this.properties.visitingCard;
        let {
            centerCardData,
            arrive,
        } = this.properties.centerCard;
        return (
            <div classes={css.root}>
                <main>
                    {
                        visitingCardsData.map((data) => (
                            <VisitingCard extraClasses={{'root': css.visitingCard}} visitingCardData={data} clickLike={updateVisitingCard}></VisitingCard>
                        ))
                    }
                </main>
                <aside>
                    <CenterCard centerCardData={centerCardData} arrive={arrive}></CenterCard>
                </aside>
            </div>
        );
    }
}
