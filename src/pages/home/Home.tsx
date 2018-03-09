import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { theme, ThemedMixin } from '@dojo/widget-core/mixins/Themed';
import * as css from './home.m.css';
import { tsx } from '@dojo/widget-core//tsx';
import VisitingCard, { VisitingCardData } from './../../widgets/visitingCard/VisitingCard';
import CenterCard, {CenterCardData} from './../../widgets/centerCard/CenterCard';
import InformBlock, { informBlockProp } from './../../widgets/informBlock/InformBlock';
import MySelect from './../../widgets/mySelect/MySelect';
import { allTable, SearchTable } from './../../support/informTables';
import Upload from './../../widgets/upload/Upload';

export interface HomeProp {
    visitingCard: {
        visitingCardsData: VisitingCardData[];
        updateVisitingCard: (id: number) => void;
    };
    centerCard: {
        centerCardData: CenterCardData;
        arrive: () => void;
    },
    search: () => void;
    searchData: any;
    
    
}
@theme(css)

export default class Home extends ThemedMixin(WidgetBase)<HomeProp> {
    // 弹窗
    private _popEle: any;
    private _showPop: boolean = false;

    private _publishMood() {
        this._showPop = true;
        this._popEle = (
            <div classes={css.popMyMood}>
                <h2>倾诉一下心情</h2>
                <textarea placeholder='今天，我的心情......'></textarea>
                <Upload name={'avator'} extraClasses={{root: css.popUpload}} numHint={false} action='http://localhost:8800' multiple={false} accept='image/*' imgsMaxNum={5}></Upload>
                <div classes={css.finishBtn} onclick={this._closePop}>发表</div>
            </div>
        );
        this.invalidate();
    }
    private _closePop({target, currentTarget}: MouseEvent) {
        if(target === currentTarget) {
            this._showPop = false;
            this.invalidate();
        }
        
    }
    private _search() {
        
    }
    
    protected render() {
        let {
            visitingCardsData,
            updateVisitingCard,
        } = this.properties.visitingCard;
        let {
            centerCardData,
            arrive,
        } = this.properties.centerCard;
        let {
            searchData,search
        } = this.properties;
        return (
            <div classes={css.root}>
                <main>
                <InformBlock extraClasses={{'root': css.searchBlock, 'customField': css.searchItem}} onSubmit={search} initData={searchData} initState={'read'} fields={SearchTable.fields} editable={true} readable={true}></InformBlock>
                    {/* <div classes={css.search}>
                    {allTable.map((table) => (
                        <div>
                            <h2>{table.title}</h2>
                            <MySelect choises={table.fields}></MySelect>
                        </div>
                    ))}
                        
                    </div> */}
                    {
                        visitingCardsData.map((data) => (
                            // <VisitingCard extraClasses={{'root': css.visitingCard}} visitingCardData={data} clickLike={updateVisitingCard} sendEmail={this._sendEmail}></VisitingCard>
                            <VisitingCard extraClasses={{'root': css.visitingCard}} visitingCardData={data} clickLike={updateVisitingCard}></VisitingCard>
                        ))
                    }
                </main>
                <aside>
                    <CenterCard centerCardData={centerCardData} arrive={arrive} publishMood={this._publishMood}></CenterCard>
                </aside>
                <div classes={[css.popLayer, this._showPop ? css.showPop : '']} onclick={this._closePop}>
                    <div classes={css.popContent}>
                        {this._popEle}
                        <span classes={css.closePop} onclick={this._closePop}>X</span>
                    </div>
                </div>
            </div>
        );
    }
}
