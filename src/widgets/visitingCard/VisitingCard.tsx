import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { tsx } from '@dojo/widget-core//tsx';
import * as css from './visitingCard.m.css';
import { Link } from '@dojo/routing/Link';

export interface VisitingCardProp {
    clickLike?: (id: string, like: boolean) => void;
    sendEmail?: (id: string) => void;
    visitingCardData: VisitingCardData;
    // desiredInform?: DesiredInform;
}
export interface VisitingCardData {
    id: string;
    headImgUrl: string;
    nickName: string;
    age: number;
    height: number;
    edu: string;
    salary: string;
    job: string;
    quote: string;
    isVip: boolean;
    hasPhone: boolean;
    identified: boolean;
    like: boolean;
    desiredAge: string;
    desiredHeight: string;
    desiredEdu: string;
    desiredSalary: string;
    desiredJob: string;
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
    private _baseImgUrl: string = './../../assets/';

    constructor(parameters: any) {
        super();
    }

    private _toggleLike(event: MouseEvent) {
        let {
            visitingCardData:{id, like},
            clickLike,
        } = this.properties;
        clickLike ? clickLike(id, !like) : null;
        console.log(this.properties.visitingCardData);
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
            quote,
            desiredAge,
            desiredHeight,
            desiredEdu,
            desiredSalary,
            desiredJob,
        } = this.properties.visitingCardData;
        if (quote) {
            return (
                <div classes={css.otherInform}>
                    <label>内心独白：</label>
                    <blockquote classes={css.basicInform} style='-webkit-box-orient: vertical;'>
                        {quote}
                    </blockquote>
                </div>
            );
        }else {
            return (
                <div classes={css.otherInform}>
                    <label>希望你：</label>
                    <p classes={css.basicInform}>
                        <span>{desiredAge + ''}</span>|
                        <span>{desiredHeight + 'cm'}</span>|
                        <span>{desiredEdu}</span>|
                        <span>{desiredSalary}</span>|
                        <span>{desiredJob}</span>
                    </p>
                </div>
            )
        }
    }
    
    protected render() {
        console.log('render VisitingCard', this.properties.visitingCardData);
        let {
            id,
            headImgUrl,
            nickName,
            age,
            height,
            edu,
            salary,
            job,
            isVip,
            hasPhone,
            identified,
            like,
        } = this.properties.visitingCardData;

        return (
            <div classes={[this.theme(css.root), css.rootFixed]}>
                <div classes={css.portrait}>
                    <Link to={'#/center/myMood?id=' + id} params={{tab: 'myCenter', id: id}} isOutlet={false}>
                        <img src={headImgUrl}/>
                    </Link>    
                </div>
                <div>
                    <h3 classes={css.nickName}>
                        <Link to={'#/center/myMood?id=' + id} params={{tab: 'myCenter', id: id}} isOutlet={false}>{nickName}</Link>
                        <img src={this._baseImgUrl + (isVip ? '' : 'not') + 'vip.png'}/>
                        <img src={this._baseImgUrl + (identified ? '' : 'not') + 'identity.png'}/>
                        <img src={this._baseImgUrl + (hasPhone ? '' : 'not') + 'phone.png'}/>
                        <img classes={css.like} data-fire='ignore' src={this._baseImgUrl + (like ? this._baseImgUrl + 'like.png' : 'tolike.png')} onclick={this._toggleLike}/>
                        <img classes={css.contact} data-fire='ignore' src={this._baseImgUrl + 'contact.png'} onclick={this._sendEmail}/>
                    </h3>
                    <p classes={css.basicInform}>
                        <span>{age + '岁'}</span>|
                        <span>{height + 'cm'}</span>|
                        <span>{edu}</span>|
                        <span>{salary}</span>|
                        <span>{job}</span>
                    </p>
                    {this._renderQuote()}
                </div>
            </div>
        );
    }
}