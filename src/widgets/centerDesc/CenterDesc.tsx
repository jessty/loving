import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import {tsx} from '@dojo/widget-core//tsx';
import * as css from './centerDesc.m.css';

export interface CenterDescProp {
    centerDescData:any;
    // nickname: string;
    // gender?: string;
    // age?: number;
    // height?: number;
    // weight?: number;
    // credit:number;
    // phone:string;
    // email:string;
    // idenStatus:number|string;
    // rank:number;
    // // birthplace?: string;
    // // education?: string;
    // avator: string;
    // quote: string;
}

@theme(css)
export default class CenterDesc extends ThemedMixin(WidgetBase)<CenterDescProp> {
    // private _avator: string = './../../assets/pic1.jpg';
    // private _age: number = 22;
    // // private _weight: number = 60;
    // private _height: number = 165;
    // // private _quote: string = '来自星星的你~1111';
    // private _nickname: string = '明星';
    private _baseImgUrl: string = './../../assets/';
    // private rank: boolean = true;
    // private _hasPhone: boolean = true;
    // private _hasEmail: boolean = true;
    // private _identified: boolean = true;
    // private _quote: string = '刚更新了内心独白：如果说你是海上的烟火 我是浪花的泡沫 某一刻，你的光照亮了我 如果说你是遥远的星河 耀眼得让人想哭 我是追逐着你的眼眸 总在孤单时候眺望夜空';
    private _bgImgUrl: string = 'pic2.jpg';
    private _baseUrl: string = 'http://119.29.76.240:3000'
    protected render() {
        let {nickname,gender,age,height,weight,credit,phone,email,idenStatus, rank,avator, quote, imgDir} = this.properties.centerDescData;
        return (
            <div classes={css.root} style={`background-image:url(${this._baseImgUrl + this._bgImgUrl});`}>
                <div classes={css.portrait}>
                    <img classes={css.headImg} src={this._baseUrl+'/imgs' + (avator? '/user/'+ imgDir +'/'+ avator : '/public/head.jpg')}/>
                    <label classes={css.label}>{height + ''}</label>                        
                    <label classes={css.label}>{height + ''}</label>
                    <label classes={css.label}>{age + ''}</label>
                    <label classes={css.label}>{height + ''}</label>
                    <label classes={css.label}>{height + ''}</label>
                </div>
                <div classes={css.nickname}>
                    <span>{nickname}</span>
                    <img title={rank === 2?'vip会员':'普通会员'} src={this._baseImgUrl + (rank === 2 ? '':'not') + 'vip.png'}/>
                    <img title={idenStatus===3?'实名认证':'未实名'} src={this._baseImgUrl + (idenStatus===3? '':'not') + 'identity.png'}/>
                    <img title={(phone?'已':'未')+'认证手机'} src={this._baseImgUrl + (phone ? '':'not') + 'phone.png'}/>
                    <img title={(email?'已':'未')+'认证邮箱'} src={this._baseImgUrl + (email ? '':'not') + 'email.png'}/>

                </div>
                <blockquote classes={css.quote}>{quote}</blockquote>
                {/* <div classes={css.infoArea}>
                    <p classes={css.info_name}>{this._nickname}</p>
                    <p>
                        <span classes={css.info_more}>{'年龄'+this._age}</span>
                        <span classes={css.info_more}>{'体重'+this._weight}</span>
                        <span classes={css.info_more}>{'身高'+this._height}</span>
                    </p>
                    <p class={css.info_quote}>简介： {this._quote}</p>
                </div> */}
            </div>
        );
    }
}