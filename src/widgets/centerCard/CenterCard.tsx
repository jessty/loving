import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { tsx } from '@dojo/widget-core//tsx';
import * as css from './centerCard.m.css';
import { Link } from '@dojo/routing/Link';
import { MY_TABS, getLinkUrl } from './../../pages/center/Center';

export interface VisitingCardProp {
    name?: string;
}


@theme(css)
export default class  VisitingCard extends ThemedMixin(WidgetBase) {
    private _headImgUrl: string = './../../assets/pic1.jpg';
    private _id: string = '12345';
    private _nickName: string = '明星';
    // private _age: number = 22;
    // private _height: number = 175;
    // private _edu: string = 'hello';
    // private _salary: string = '9000-15000';
    // private _job: string = 'hello';
    // private _quote: string = 'hello';
    private _isVip: boolean = true;
    private _hasPhone: boolean = true;
    private _hasEmail: boolean = true;
    private _identified: boolean = true;
    private _arrived: boolean = true;
    private _credits: number = 9999;
    private _baseImgUrl: string = './../../assets/';
    private _baseCenterUrl: string = '#/center/$1?id=$2';
    private _baseSettingsUrl: string = '#/settings';
    private _baseVipUrl: string = '#/vip/$2';
    
    
    constructor(parameters: any) {
        super();
    }
    private _arrive(event: MouseEvent) {

    }
    protected render() {
        return (
            <div classes={[this.theme(css.root), css.rootFixed]}>
                <div classes={css.inform}>
                    <Link to={getLinkUrl(this._baseCenterUrl, MY_TABS.MOOD, this._id)} isOutlet={false}><img src={this._headImgUrl}/></Link>
                    <div>
                        <h3>
                            <Link classes={css.nickName} to={getLinkUrl(this._baseCenterUrl, MY_TABS.MOOD, this._id)} isOutlet={false}>{this._nickName}</Link>
                        </h3>
                        <div classes={css.icon}>
                            <Link key='vip' to={this._baseVipUrl} isOutlet={false}><img src={this._baseImgUrl+(this._isVip?'vip.png':'notvip.png')}/></Link>
                            <Link key='identity' to={this._baseSettingsUrl}  isOutlet={false}><img src={this._baseImgUrl + (this._identified?'identity.png':'notidentity.png')}/></Link>
                            <Link key='phone' to={this._baseSettingsUrl} isOutlet={false}><img src={this._baseImgUrl+(this._hasPhone?'phone.png':'notphone.png')}/></Link>
                            <Link key='email' to={this._baseSettingsUrl} isOutlet={false}><img src={this._baseImgUrl+(this._hasEmail?'email.png':'notemail.png')}/></Link>
                        </div>
                        <div classes={css.credit}>
                            <img src={this._baseImgUrl + 'vip.png'}/>
                            <span>{this._credits+''}</span>|
                            <img src={this._baseImgUrl + 'vip.png'}/>
                            <span>{this._credits+''}</span>
                        </div>
                    </div>
                </div>
                <div classes={css.funcEntry}>
                    <a title='发表心情'><img src={this._baseImgUrl+'edit.png'}/></a>
                    <Link classes={css.receiveMsg} title='所获喜欢' key='like' to={getLinkUrl('#/center/', MY_TABS.EMAIL)} params={{id: this._id}} isOutlet={false}><img src={this._baseImgUrl+'tolike.png'}/></Link>
                    <Link classes={css.receiveMsg} title='查看邮件' key='email' to={getLinkUrl('#/center/', MY_TABS.EMAIL)} params={{id: this._id}} isOutlet={false}><img src={this._baseImgUrl+'notemail.png'}/></Link>
                </div>
                <div classes={css.btns}>
                    <a onclick={this._arrive}>{this._arrived?'今日已签到':'签到'}</a>
                    <Link key='setVip' to={this._baseVipUrl} isOutlet={false}>{this._isVip?'vip续费':'开通vip'}</Link>
                </div>
                
                {/* <div classes={css.portrait}><img src={this._headImgUrl}/></div>
                <div>
                    <h3 classes={css.nickName}>
                        <span>{this._nickName}</span>
                        <img src={this._baseImgUrl + (this._isVip ? '' : 'not') + 'vip.png'}/>
                        <img src={this._baseImgUrl + (this._identified ? '' : 'not') + 'identity.png'}/>
                        <img src={this._baseImgUrl + (this._hasPhone ? '' : 'not') + 'phone.png'}/>
                    </h3>
                    <p classes={css.basicInform}>
                        <span>{this._age + '岁'}</span>|
                        <span>{this._height + 'cm'}</span>|
                        <span>{this._edu}</span>|
                        <span>{this._salary}</span>|
                        <span>{this._job}</span>
                    </p>
                    
                    {this._quote ? (
                        <div classes={css.otherInform}>
                            <label>内心独白：</label>
                            <blockquote classes={css.basicInform}>
                                {this._quote}
                            </blockquote>
                        </div>
                        ) : (
                        <div classes={css.otherInform}>
                            <label>希望你：</label>
                            <p classes={css.basicInform}>
                                <span>{this._age + ''}</span>|
                                <span>{this._height + 'cm'}</span>|
                                <span>{this._edu}</span>|
                                <span>{this._salary}</span>|
                                <span>{this._job}</span>
                            </p>
                        </div>
                        )
                    }
                </div>
                <span classes={css.like}></span>
                <span classes={css.contact}></span> */}
            </div>
        );
    }
}