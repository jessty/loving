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
import axios from '../../support/axios'

export interface HomeProp {
    visitingCard: {
        visitingCardsData: VisitingCardData[];
        updateVisitingCard: (id: number) => void;
    };
    centerCard: {
        centerCardData: CenterCardData;
        arrive: () => void;
    },
    search: (searchData: Object|undefined) => void;
    searchData: any;
    readSearchData:(name:string)=>any;
    
}
@theme(css)

export default class Home extends ThemedMixin(WidgetBase)<HomeProp> {
    constructor() {
        super()
        // this._getUserData();
    }
    // 弹窗

    private _popEle: any;
    private _showPop: boolean = false;
    private _userData: any;
    private _idUser:any;
    private _centerCardData:any;
    private _visitingCardsData:any=[];
    private _searchData:any;

    private _getUserData() {
        this._userData = JSON.parse(sessionStorage.getItem('user-data'))
    }
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

    onAttach() {
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

        let {readSearchData} = this.properties;
        this._visitingCardsData = visitingCardsData;
        this._centerCardData = centerCardData;
        this._searchData = searchData;

        if(!this._visitingCardsData || this._visitingCardsData.length === 0) {
            if(!this._searchData) {
                this._idUser = localStorage.getItem('id')
                this._searchData = readSearchData('search-data' + this._idUser)
                this._search(this._searchData)
            }
                Promise.all([this._getAccount(),this.getAllInform()])
                .then(values => {
                    this._centerCardData = Object.assign(values[0], values[1][0].values);
                    this.invalidate();
                })

        }
    }
    private async _getAccount(){
        let res = await axios.post('/setting/account',{idUser:this._idUser})
        if(res.status === 200) {
            return res.data.data;
        }
    }
    public async getAllInform() {
        let res = await axios.get(`/inform/all?idUser=${this._idUser}`);
        if(res.status === 200) {
            return res.data.data;
        }
    }
    private _search(searchData: Object|undefined) {
        this._searchData = Object.assign({},this._searchData, searchData)
        axios.post('/inform/search', this._searchData)
        .then((res) => {
            if(res.status === 200) {
                this._visitingCardsData = res.data.data;
                this.invalidate();
            }
        })
        .catch(err => {
            alert('获取推荐信息失败')
        })
        this._saveSearchData(this._searchData)
    }
    private _saveSearchData(data: Object) {
        
        if(localStorage.getItem('search-data'+ this._idUser)) {
            localStorage.removeItem('search-data'+ this._idUser);
        }
        let dataStr = JSON.stringify(data);

        localStorage.setItem('search-data'+ this._idUser, dataStr);
    }
    protected render() {
        let {
            updateVisitingCard,
        } = this.properties.visitingCard;
        let {
            arrive,
        } = this.properties.centerCard;
        let {
            search
        } = this.properties;
        return (
            <div classes={css.root}>
                <main>
                <InformBlock extraClasses={{'root': css.searchBlock, 'customField': css.searchItem}} onSubmit={this._search} initData={this._searchData ? this._searchData : {}} initState={'read'} fields={SearchTable.fields} editable={true} readable={true}></InformBlock>
                    {/* <div classes={css.search}>
                    {allTable.map((table) => (
                        <div>
                            <h2>{table.title}</h2>
                            <MySelect choises={table.fields}></MySelect>
                        </div>
                    ))}
                        
                    </div> */}
                    {
                        this._visitingCardsData.map((data) => (
                            // <VisitingCard extraClasses={{'root': css.visitingCard}} visitingCardData={data} clickLike={updateVisitingCard} sendEmail={this._sendEmail}></VisitingCard>
                            <VisitingCard extraClasses={{'root': css.visitingCard}} visitingCardData={data} clickLike={updateVisitingCard}></VisitingCard>
                        ))
                    }
                </main>
                <aside>
                    <CenterCard centerCardData={this._centerCardData ? this._centerCardData : {}} arrive={arrive} publishMood={this._publishMood}></CenterCard>
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
