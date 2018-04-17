import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { tsx } from '@dojo/widget-core//tsx';
import * as css from './visitingCard.m.css';
import { Link } from '@dojo/routing/Link';
import { allTable } from './../../support/informTables';

export interface VisitingCardProp {
    clickLike?: (id: number) => void;
    sendEmail?: (id: string) => void;
    visitingCardData: any;
    // desiredInform?: DesiredInform;
}
export interface VisitingCardData {
    idUser: number;
    avator: string;
    nickname: string;
    age: number;
    height: number;
    education: number;
    salary: number;
    // job: string;
    quote: string;
    rank: number;
    phone: string;
    idenStatus: number;
    idLike: number|null|boolean;
    preAge: number;
    preHeight: number;
    preWeight: number;
    preEdu: number;
    preSalary: number;
    preGender: number;
    preLivingPlace: string;
}
// export interface DesiredInform {
//     age: number;
//     height: number;
//     edu: string;
//     salary: string;
//     job: string;
// }

@theme(css)
export default class  VisitingCard extends ThemedMixin(WidgetBase)<VisitingCardProp> {
    // private _baseImgUrl: string = this._serverIP + '/imgs/user';
    private _baseImgUrl: string = '../../assets/';
    private _data:any;
    private _serverIP: string = 'http://119.29.76.240:3000';
    constructor(parameters: any) {
        super();
    }
    private _transformData(originData: any){
        this._data = {};
        for(let p in originData) {
            if(p !== 'idUser' && typeof originData[p] === 'number') { //只处理number类型
                for(let table of allTable) {//在每个table中查找字段p
                    if(p in table.fields && table.fields[p].type === 'select'){
                        this._data[p] = table.fields[p].choises[originData[p]];
                        break;
                    }
                }
            }
            (p in this._data) ? null : this._data[p] = originData[p]
        }
        let birthday = this._data['birthday']
        delete this._data['birthday']
        this._data['age'] = (new Date()).getFullYear() - (new Date(birthday)).getFullYear();

    }
    private _toggleLike(event: MouseEvent) {
        let {
            clickLike
        } = this.properties;

        clickLike ? clickLike(this._data['idUser']) : null;
        console.log('toggle like user', this._data);
        // this.invalidate();
    }

    private _sendEmail(event: MouseEvent) {
        let {
            visitingCardData: {id},
            sendEmail
        } = this.properties;
        sendEmail ? sendEmail(id) : null;
    }

    private _renderQuote() {
        let {
            preAge,
            preHeight,
            preWeight,
            preEdu,
            preSalary,
            preGender,
            preLivingPlace,
            quote
        } = this._data;
        let preData = [
            preAge,
            preHeight,
            preWeight,
            preEdu,
            preSalary,
            preGender,
            preLivingPlace
        ]
        let preArr: any[] = [];
        preData.forEach(e => {
            e ? preArr.push(e) : null;
        });
        if (preArr.length >= 3) {
            return (
                <div classes={css.otherInform}>
                    <label>希望你：</label>
                    <p classes={css.basicInform}>
                    {
                        preArr.map(data => {
                            return (<span>{data + ''} |</span>)
                        })
                    }
                    </p>
                </div>
            )
        }else {
            return (
                <div classes={css.otherInform}>
                    <label>内心独白：</label>
                    <blockquote classes={css.basicInform} style='-webkit-box-orient: vertical;'>
                        {quote}
                    </blockquote>
                </div>
            );
        }
        // if (quote) {
        //     return (
        //         <div classes={css.otherInform}>
        //             <label>内心独白：</label>
        //             <blockquote classes={css.basicInform} style='-webkit-box-orient: vertical;'>
        //                 {quote}
        //             </blockquote>
        //         </div>
        //     );
        // } else {
        //     return (
        //         <div classes={css.otherInform}>
        //             <label>希望你：</label>
        //             <p classes={css.basicInform}>
        //                 <span>{preAge + ''}</span>|
        //                 <span>{preHeight + 'cm'}</span>|
        //                 <span>{preWeight + ''}</span>|
        //                 <span>{preEdu + ''}</span>|
        //                 <span>{preSalary + ''}</span>|
        //                 <span>{preLivingPlace}</span>
        //             </p>
        //         </div>
        //     )
        // }
    }
    
    protected render() {
        this._transformData(this.properties.visitingCardData)
        console.log('render VisitingCard', this.properties.visitingCardData);

        let {
            idUser,
            avator,
            nickname,
            age,
            height,
            education,
            salary,
            // job,
            rank,
            phone,
            idenStatus,
            idLike,
            imgDir
        } = this._data;

        return (
            <div classes={[this.theme(css.root), css.rootFixed]}>
                <div classes={css.portrait}>
                    <Link to={'#/center/myMood?id=' + idUser} params={{tab: 'myCenter', id: idUser}} isOutlet={false}>
                        <img src={this._serverIP + '/imgs' + (avator ? '/user/'+ imgDir +'/'+ avator : '/public/head.jpg')}/>
                    </Link>    
                </div>
                <div>
                    <h3 classes={css.nickName}>
                        <Link to={'#/center/myMood?id=' + idUser} params={{tab: 'myCenter', id: idUser}} isOutlet={false}>{nickname}</Link>
                        <img src={this._baseImgUrl + (rank === 2 ? '' : 'not') + 'vip.png'}/>
                        <img src={this._baseImgUrl + (idenStatus === 3 ? '' : 'not') + 'identity.png'}/>
                        <img src={this._baseImgUrl + (phone ? '' : 'not') + 'phone.png'}/>
                        <img classes={css.like} data-fire='ignore' src={this._baseImgUrl + (idLike ? this._baseImgUrl + 'like.png' : 'tolike.png')} onclick={this._toggleLike}/>
                        <img classes={css.contact} data-fire='ignore' src={this._baseImgUrl + 'contact.png'} onclick={this._sendEmail}/>
                    </h3>
                    <p classes={css.basicInform}>
                        <span>{age + '岁'}</span>|
                        <span>{height + 'cm'}</span>|
                        <span>{education}</span>|
                        <span>{salary}</span>
                        {/* <span>{job}</span> */}
                    </p>
                    {this._renderQuote()}
                </div>
            </div>
        );
    }
}