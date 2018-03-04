import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { tsx } from '@dojo/widget-core//tsx';
import * as css from './centerCard.m.css';
import { Link } from '@dojo/routing/Link';
import { MY_TABS, getLinkUrl } from './../../pages/center/Center';

export interface CenterCardData {
    id?: string;
    headImgUrl?: string;
    nickName?: string;
    // age: number;
    // height: number;
    // edu: string;
    // salary: string;
    // job: string;
    // quote: string;
    isVip?: boolean;
    hasPhone?: boolean;
    hasEmail?: boolean;
    identified?: boolean;
    arrived?: boolean;
    credits?: number;
    beans: number;
}
export interface CenterCardProp {
    centerCardData: CenterCardData;
    arrive: () => void;
    publishMood?: () => void;
}
@theme(css)
export default class  CenterCard extends ThemedMixin(WidgetBase)<CenterCardProp> {

    private _baseImgUrl: string = './../../assets/';
    private _baseCenterUrl: string = '#/center/$1?id=$2';
    private _baseSettingsUrl: string = '#/settings';
    private _baseVipUrl: string = '#/vip';

    constructor(parameters: any) {
        super();
    }

    private _arrive(event: MouseEvent) {
        let {
            arrive
        } = this.properties;
        arrive();
    }

    private _writeMood(event: MouseEvent) {
        
    }

    protected render() {
        console.log('centerCard', this.properties);
        let {
            id,
            headImgUrl,
            nickName,
            isVip,
            hasPhone,
            hasEmail,
            identified,
            arrived,
            credits,
            beans,
        } = this.properties.centerCardData;
        let {publishMood} = this.properties;
        return (
            <div classes={[this.theme(css.root), css.rootFixed]}>
                <div classes={css.inform}>
                    <Link to={getLinkUrl(this._baseCenterUrl, MY_TABS.MOOD, id)} isOutlet={false}><img src={headImgUrl}/></Link>
                    <div>
                        <h3>
                            <Link classes={css.nickName} to={getLinkUrl(this._baseCenterUrl, MY_TABS.MOOD, id)} isOutlet={false}>{nickName}</Link>
                        </h3>
                        <div classes={css.icon}>
                            <Link title='vip' key='vip' to={this._baseVipUrl} isOutlet={false}><img src={this._baseImgUrl+(isVip?'vip.png':'notvip.png')}/></Link>
                            <Link title='实名认证' key='identity' to={this._baseSettingsUrl}  isOutlet={false}><img src={this._baseImgUrl + (identified?'identity.png':'notidentity.png')}/></Link>
                            <Link title='手机认证' key='phone' to={this._baseSettingsUrl} isOutlet={false}><img src={this._baseImgUrl+(hasPhone?'phone.png':'notphone.png')}/></Link>
                            <Link title='邮箱认证' key='email' to={this._baseSettingsUrl} isOutlet={false}><img src={this._baseImgUrl+(hasEmail?'email.png':'notemail.png')}/></Link>
                        </div>
                        <div classes={css.credit}>
                            <Link title='积分金豆' key='credit' to={'#/center/' + MY_TABS.CREDIT} params={{id: id}} isOutlet={false}>
                                <img src={this._baseImgUrl + 'vip.png'}/>
                                <span>{credits + ''}</span>|
                                <img src={this._baseImgUrl + 'vip.png'}/>
                                <span>{beans + ''}</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div classes={css.funcEntry}>
                    {/* <a title='发表心情' onclick={this._writeMood} onclick={()=>{publishMood();}}><img src={this._baseImgUrl+'edit.png'}/></a> */}
                    <a title='发表心情' onclick={this._writeMood}><img src={this._baseImgUrl+'edit.png'}/></a>
                    <Link classes={css.receiveMsg} title='所获喜欢' key='like' to={'#/center/' + MY_TABS.EMAIL} params={{id: id}} isOutlet={false}><img src={this._baseImgUrl+'tolike.png'}/></Link>
                    <Link classes={css.receiveMsg} title='查看邮件' key='email' to={'#/center/' + MY_TABS.EMAIL} params={{id: id}} isOutlet={false}><img src={this._baseImgUrl+'notemail.png'}/></Link>
                </div>
                <div classes={css.btns}>
                    <a classes={arrived ? css.arrived : ''} onclick={this._arrive}>{arrived?'今日已签到':'签到'}</a>
                    <Link key='setVip' to={this._baseVipUrl} isOutlet={false}>{isVip?'vip续费':'开通vip'}</Link>
                </div>
            </div>
        );
    }
}