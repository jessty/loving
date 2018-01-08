import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { tsx } from '@dojo/widget-core//tsx';
import * as css from './visitingCard.m.css';
import { Link } from '@dojo/routing/Link';

export interface VisitingCardProp {
    name?: string;
}


@theme(css)
export default class  VisitingCard extends ThemedMixin(WidgetBase) {
    private _id: string = '12345'
    private _headImgUrl: string = './../../assets/pic1.jpg';
    private _nickName: string = '明星';
    private _age: number = 22;
    private _height: number = 175;
    private _edu: string = 'hello';
    private _salary: string = '9000-15000';
    private _job: string = 'hello';
    private _quote: string = '在一回首间，才忽然发现，原来，我一生的种种努力，不过只为了周遭的人对我满意而已。为了搏得他人的称许与微笑，我战战兢兢地将自己套入所有的模式所有的桎梏。走到途中才忽然发现，我只剩下一副模糊的面目，和一条不能回头的路。';
    private _isVip: boolean = true;
    private _hasPhone: boolean = true;
    private _identified: boolean = true;
    private _baseImgUrl: string = './../../assets/';
    private _like: boolean = true;
    
    constructor(parameters: any) {
        super();
    }
    private _jumpToCenter({target}: any) {
        if(target.dataset['fire'] === 'ignore') 
            return;
        
        console.error('root click', target.dataset['fire']);
    }
    private _toggleLike(event: MouseEvent) {
        this._like = !this._like;
        this.invalidate();
    }
    protected render() {
        return (
            <div classes={[this.theme(css.root), css.rootFixed]} onclick={this._jumpToCenter}>
                <div classes={css.portrait}>
                    <Link to={'#/center/myMood?id=' + this._id} params={{tab: 'myCenter', id: this._id}} isOutlet={false}>
                        <img src={this._headImgUrl}/>
                    </Link>    
                </div>
                <div>
                    <h3 classes={css.nickName}>
                        <Link to={'#/center/myMood?id=' + this._id} params={{tab: 'myCenter', id: this._id}} isOutlet={false}>{this._nickName}</Link>
                        {/* <span>{this._nickName}</span> */}
                        <img src={this._baseImgUrl + (this._isVip ? '' : 'not') + 'vip.png'}/>
                        <img src={this._baseImgUrl + (this._identified ? '' : 'not') + 'identity.png'}/>
                        <img src={this._baseImgUrl + (this._hasPhone ? '' : 'not') + 'phone.png'}/>
                        <img classes={css.like} data-fire='ignore' src={this._baseImgUrl+ (this._like ? this._baseImgUrl + 'like.png' : 'tolike.png')} onclick={this._toggleLike}></img>
                        <img classes={css.contact} data-fire='ignore' src={this._baseImgUrl + 'contact.png'}></img>
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
                            <blockquote classes={css.basicInform} style='-webkit-box-orient: vertical;'>
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
            </div>
        );
    }
}