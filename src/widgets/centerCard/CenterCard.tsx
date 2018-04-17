import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { tsx } from '@dojo/widget-core//tsx';
import * as css from './centerCard.m.css';
import { Link } from '@dojo/routing/Link';
import { MY_TABS, getLinkUrl } from './../../pages/center/Center';

export interface CenterCardData {
    idUser?: number;
    avator?: string;
    nickname?: string;
    imgDir?:string;
    // age: number;
    // height: number;
    // edu: string;
    // salary: string;
    // job: string;
    quote: string;
    rank?: number;
    phone?: string;
    email?: string;
    loginTime?: Date;
    idIden?: number;
    idenStatus?: number;
    arrived?: boolean;
    credit?: number;
    bean: number;
}
export interface CenterCardProp {
    centerCardData: CenterCardData;
    arrive: () => any;
    publishMood?: () => void;
}
@theme(css)
export default class  CenterCard extends ThemedMixin(WidgetBase)<CenterCardProp> {

    private _baseImgUrl: string = './../../assets/';
    private _baseCenterUrl: string = '#/center/$0?id=$1';
    private _baseSettingsUrl: string = '#/settings';
    private _baseVipUrl: string = '#/vip';
    private _arrived: boolean = false;
    private _serverIP:string='http://119.29.76.240:3000'

    constructor(parameters: any) {
        super();
    }

    private _arrive(event: MouseEvent) {
        let {
            arrive
        } = this.properties;
        if(!this._arrived) {
            arrive()
            .then( res => {
                this.invalidate();
            })
            .catch( err => {
                console.error('签到失败！')
            })
        }
    }

    private _judgeArrived() {
        let {
            arrived
        } = this.properties.centerCardData;
        if(arrived) {
            let day1 = (new Date(arrived)).toLocaleDateString(),day2 = (new Date()).toLocaleDateString()
            let time = (day1 === day2);
            if(time) {
                this._arrived = true;
                return ;
            }
        }
        this._arrived = false;
    }
    private _writeMood(event: MouseEvent) {
        
    }

    protected render() {
        console.log('centerCard', this.properties);
        let {
            idUser,
            avator,
            nickname,
            rank,
            phone,
            email,
            imgDir,
            idenStatus,
            arrived,
            credit,
            bean,
        } = this.properties.centerCardData;
        let {publishMood} = this.properties;
        this._judgeArrived()
        return (
            <div classes={[this.theme(css.root), css.rootFixed]}>
                <div classes={css.inform}>
                    <Link to={getLinkUrl(this._baseCenterUrl, MY_TABS.MOOD, idUser)} isOutlet={false}><img src={this._serverIP + '/imgs' + (avator ? '/user/'+imgDir+'/'+avator : '/public/head.jpg')}/></Link>
                    <div>
                        <h3>
                            <Link classes={css.nickName} to={getLinkUrl(this._baseCenterUrl, MY_TABS.MOOD, idUser)} isOutlet={false}>{nickname}</Link>
                        </h3>
                        <div classes={css.icon}>
                            <Link title='vip' key='vip' to={this._baseVipUrl} isOutlet={false}><img src={this._baseImgUrl+(rank === 2?'vip.png':'notvip.png')}/></Link>
                            <Link title='实名认证' key='identity' to={this._baseSettingsUrl}  isOutlet={false}><img src={this._baseImgUrl + (idenStatus === 3?'identity.png':'notidentity.png')}/></Link>
                            <Link title='手机认证' key='phone' to={this._baseSettingsUrl} isOutlet={false}><img src={this._baseImgUrl+( phone ?'phone.png':'notphone.png')}/></Link>
                            <Link title='邮箱认证' key='email' to={this._baseSettingsUrl} isOutlet={false}><img src={this._baseImgUrl+( email ?'email.png':'notemail.png')}/></Link>
                        </div>
                        <div classes={css.credit}>
                            <Link title='积分金豆' key='credit' to={'#/center/' + MY_TABS.CREDIT} params={{id: idUser}} isOutlet={false}>
                                <img src={this._baseImgUrl + 'vip.png'}/>
                                <span>{credit + ''}</span>|
                                <img src={this._baseImgUrl + 'vip.png'}/>
                                <span>{bean + ''}</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div classes={css.funcEntry}>
                    {/* <a title='发表心情' onclick={this._writeMood} onclick={()=>{publishMood();}}><img src={this._baseImgUrl+'edit.png'}/></a> */}
                    <a title='发表心情' onclick={this._writeMood}><img src={this._baseImgUrl+'edit.png'}/></a>
                    <Link classes={css.receiveMsg} title='所获喜欢' key='like' to={'#/center/' + MY_TABS.EMAIL} params={{id: idUser}} isOutlet={false}><img src={this._baseImgUrl+'tolike.png'}/></Link>
                    <Link classes={css.receiveMsg} title='查看邮件' key='email' to={'#/center/' + MY_TABS.EMAIL} params={{idUser: idUser}} isOutlet={false}><img src={this._baseImgUrl+'notemail.png'}/></Link>
                </div>
                <div classes={css.btns}>
                    <a classes={this._arrived ? css.arrived : ''} onclick={this._arrive}>{this._arrived ? '今日已签到' : '签到'}</a>
                    <Link key='setVip' to={this._baseVipUrl} isOutlet={false}>{rank === 2?'vip续费':'开通vip'}</Link>
                </div>
            </div>
        );
    }
}