import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin } from '@dojo/widget-core/mixins/Themed';
import { Link } from '@dojo/routing/Link';
import * as css from './center.m.css';
import { tsx } from '@dojo/widget-core//tsx';
import InformBlock, { informBlockProp } from './../../widgets/informBlock/InformBlock';
import CenterDesc from './../../widgets/centerDesc/CenterDesc';

export interface CenterProp {
    tab: string;
}
export const MY_TABS = {
    MOOD: 'myMood',
    ALBUM: 'myAlbums',
    INFORM: 'myInform',
    EMAIL: 'myEmails',
    ACTIVITY: 'myActivities',
    CREDIT: 'myCredits'
}
export default class Center extends ThemedMixin(WidgetBase)<CenterProp>{
    private _belongToLogger: Boolean = true;
    // private _tabs = {
    //     activity: 'myActivities',
    //     email: 'myEmails',
    //     inform: 'myInform',
    //     album: 'myAlbums',
    //     mood: 'myMood',
    //     credit: 'myCredits'
    // }
    private _baseURL = '#/center?tab=';
    private _informBlockProp: informBlockProp = {
        initState:'edit',
        editable:true,
        readable:true,
        informs:[
            {
                title:'基本资料',
                fields:[
                    {
                        type: 'select',
                        label: '姓名：',
                        result: {
                            label: 'foo',
                            value: '11'
                        },
                        choises: [
                            {
                                label: 'foo',
                                value: '11'
                            },
                            {
                                label: 'boo',
                                value: '22'
                            },
                            {
                                label: 'baz',
                                value: '33'
                            }
                        ]
                    },
                    {
                        type: 'textinput',
                        label: '留言：',
                        key: 'msg',
                        value: 'hello!'
                    },
                    {
                        type: 'textarea',
                        label: '留言：',
                        key: 'msg',
                        value: 'hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：'
                    }
                ]
            },
            {
                title:'详细资料',
                fields:[
                    {
                        type: 'select',
                        label: '姓名：',
                        result: {
                            label: 'foo',
                            value: '11'
                        },
                        choises: [
                            {
                                label: 'foo',
                                value: '11'
                            },
                            {
                                label: 'boo',
                                value: '22'
                            },
                            {
                                label: 'baz',
                                value: '33'
                            }
                        ]
                    },
                    {
                        type: 'textinput',
                        label: '留言：',
                        key: 'msg',
                        value: 'hello!'
                    },
                    {
                        type: 'textarea',
                        label: '留言：',
                        key: 'msg',
                        value: 'hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：'
                    }
                ]
            }
        ]
    };
    protected renderMyInform() {
        let { informs, initState, editable, readable } = this._informBlockProp;
        return (
            informs ? informs.map((inform: any, i: number) => {
                return (
                    <div classes={css.inform} key='myInform'>
                        <label for={'inform' + i}>{inform.title}</label>
                        <input type='radio' name='inform' checked={i === 0} id={'inform' + i}/>
                        <InformBlock extraClasses={{'root':css.informBlock}} initState={initState} fields={inform.fields} editable={editable} readable={readable}></InformBlock>
                    </div>
                );
            }) : null
        );
    }
    protected renderTab() {
        console.log('tab', this.properties.tab);
        switch( this.properties.tab ) {
            case MY_TABS.MOOD: return null;
            case MY_TABS.ALBUM: return null;
            case MY_TABS.INFORM: return this.renderMyInform();
            case MY_TABS.EMAIL: return null;
            case MY_TABS.ACTIVITY: return null;
            case MY_TABS.CREDIT: return null;
        }
    }
    private _showPrivateNav() {
        return [
            <Link classes={css.link} key={MY_TABS.ACTIVITY} to={this._baseURL + MY_TABS.ACTIVITY} isOutlet={false}>我的活动</Link>,
            <Link classes={css.link} key={MY_TABS.EMAIL} to={this._baseURL + MY_TABS.EMAIL} isOutlet={false}>我的邮件</Link>,
            <Link classes={css.link} key={MY_TABS.CREDIT} to={this._baseURL + MY_TABS.CREDIT} isOutlet={false}>我的积分</Link>
        ]
    }
    protected render() {
        return (
            <div classes={css.root}>
                <CenterDesc></CenterDesc>
                <div>
                    
                    <nav classes={css.myNav}>
                        <Link classes={css.link} key={MY_TABS.MOOD} to={this._baseURL + MY_TABS.MOOD} isOutlet={false}>我的心情</Link>
                        <Link classes={css.link} key={MY_TABS.ALBUM} to={this._baseURL + MY_TABS.ALBUM} isOutlet={false}>我的相册</Link>
                        <Link classes={css.link} key={MY_TABS.INFORM} to={this._baseURL + MY_TABS.INFORM} isOutlet={false}>我的资料</Link>
                        {this._belongToLogger ? (this._showPrivateNav()) : null }
                    </nav>
                    <section>
                        {this.renderTab()}
                    </section>
                </div>
            </div>

        );
    }
} 