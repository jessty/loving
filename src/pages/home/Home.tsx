import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { theme, ThemedMixin } from '@dojo/widget-core/mixins/Themed';
import * as css from './home.m.css';
import { tsx } from '@dojo/widget-core//tsx';
import VisitingCard from './../../widgets/visitingCard/VisitingCard';
import CenterCard from './../../widgets/centerCard/CenterCard';

@theme(css)
export default class Home extends ThemedMixin(WidgetBase) {
    protected render() {
        return (
            <div classes={css.root}>
                <main>
                    <VisitingCard extraClasses={{'root': css.visitingCard}}></VisitingCard>
                    <VisitingCard extraClasses={{'root': css.visitingCard}}></VisitingCard>
                    {/* <VisitingCard extraClasses={{'root': css.visitingCard}}></VisitingCard> */}
                    {/* <VisitingCard extraClasses={{'root': css.visitingCard}}></VisitingCard> */}
                    {/* <VisitingCard extraClasses={{'root': css.visitingCard}}></VisitingCard> */}
                    {/* <VisitingCard extraClasses={{'root': css.visitingCard}}></VisitingCard> */}
                    {/* <VisitingCard extraClasses={{'root': css.visitingCard}}></VisitingCard> */}
                </main>
                <aside>
                    <CenterCard></CenterCard>
                </aside>
                
            </div>
        );
    }
}
