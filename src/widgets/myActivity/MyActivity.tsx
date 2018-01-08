import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { tsx } from '@dojo/widget-core//tsx';
import * as css from './myActivity.m.css';
import { Link } from '@dojo/routing/Link';

export interface MyActivityProp {
    mood?: Array<any>;
    isOwner?: boolean;
}
@theme(css)
export default class MyActivity extends ThemedMixin(WidgetBase)<MyActivityProp> {
    private _date: Date = new Date('2018-1-6 13:00:10');
    private _baseImgUrl: string = './../../assets/';
    private _isOwner: boolean = false;
    private _invalid: boolean = false;
    private _deleteMood() {
        
    }
    private _renderActivity(activity: any) {
        return (
            <li classes={css.activity}>
                <h3>{activity.title}</h3>
                <div classes={css.inform}>
                    <p><span>Time:</span>{activity.time}</p>
                    <p><span>Address:</span>{activity.address}</p>
                    <p><span>Money:</span>{activity.money + ''}</p>
                    <p><span>Member:</span>{activity.member + ''}</p>
                    <p><span>State</span>{activity.state}</p>
                </div>
                <div classes={css.footBtns}>
                    {this._invalid ? (
                        <a >evaluate</a>
                    ) : (
                        <a >not join</a>
                    )}
                    <Link to={'#/activity?id=' + activity.id} isOutlet={false}>details</Link>
                </div>
            </li>
        );
    }
    protected render() {
        this._invalid = this._date < new Date();
        let activities = [
            {
                id: 1234,
                title: '回首间，我微笑。',
                time: this._date.toLocaleString(),
                address: 'park',
                money: 21,
                member: 1,
                state: 'weicanyu'
            },
            {
                id: 1234,
                title: '回首间，我微笑。',
                time: this._date.toLocaleString(),
                address: 'park',
                money: 21,
                member: 1,
                state: 'weicanyu'
            },
            {
                id: 1234,
                title: '回首间，我微笑。',
                time: this._date.toLocaleString(),
                address: 'park',
                money: 21,
                member: 1,
                state: 'weicanyu'
            }

        ];
        return (
            <ul classes={[this.theme(css.root), css.rootFixed]}>
                <label classes={css.date}>{this._date.toLocaleDateString()}</label>
                {activities.map((activity: any) => {
                        return this._renderActivity(activity);
                })}
            </ul>
        );
    }
}