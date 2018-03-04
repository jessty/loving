import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin } from '@dojo/widget-core/mixins/Themed';
import { Link } from '@dojo/routing/Link';
import * as css from './center.m.css';
import { tsx } from '@dojo/widget-core//tsx';
import InformBlock, { informBlockProp } from './../../widgets/informBlock/InformBlock';
import CenterDesc from './../../widgets/centerDesc/CenterDesc';
import MoodCard from './../../widgets/moodCard/MoodCard';
import MyActivity from './../../widgets/myActivity/MyActivity';
import Upload from './../../widgets/upload/Upload';
import { allTable } from './../../support/informTables';
import afterRender from "@dojo/widget-core/decorators/afterRender";
// import Swiper from 'swiper'

export interface CenterProp {
    id: string;
    tab: string;
    myInform: {
        basicInformData: Object;
    };
    myAlbums: {
        albums: Array<any>;
        getAlbums(idUser: string|number, fn: any): any
    };
}
export const MY_TABS = {
    MOOD: 'myMood',
    ALBUM: 'myAlbums',
    INFORM: 'myInform',
    EMAIL: 'myEmails',
    ACTIVITY: 'myActivities',
    CREDIT: 'myCredits'
}
export const getLinkUrl = function(baseUrl: string, ...params: any[]): string {
    // let params = Array.from(arguments);
    let url = baseUrl.replace(/\$(\d+)/g, (placeholder: any, i: any) => {
        return params[+i];
    });
    return url;
}
export default class Center extends ThemedMixin(WidgetBase)<CenterProp> {

// 弹窗
    private _popEle: any;
    private _showPop: boolean = false;
    private _swiper: any;
    private _once: number = 2;
    // onAttach() {
    //     this._swiper = new Swiper('.swiper-container', {
    //         navigation: {
    //             nextEl: '.swiper-button-next',
    //             prevEl: '.swiper-button-prev',
    //         },
    //         // pagination: {
    //         //     el: '.swiper-pagination',
    //         //     clickable: true,
    //         // },
    //       });
    //     //   this._swiper.autoplay.start();
    // }
    // onDetach() {
    //     // this._swiper = undefined;
    // }

    private _closePop({target, currentTarget}: MouseEvent) {
        if (target === currentTarget) {
            this._showPop = false;
            this._swiper = undefined;
            this.invalidate();
        }
    }
    @afterRender()
    protected myAfterRender(result: any) {
        // this._swiper = new Swiper('.swiper-container', {
        //     navigation: {
        //         nextEl: '.swiper-button-next',
        //         prevEl: '.swiper-button-prev',
        //     },
        // });
        // console.log('afterRender', this.properties);
        return result;
    }
    private _viewImgs(imgUrl: string, i: number, imgUrls: Array<string>) {
        this._showPop = true;
        this._popEle = imgUrls.map((imgUrl, i) => (
            <div classes={[css.swiperSlide, 'swiper-slide']} key={'swiper-slide' + i}>
                <img src={imgUrl}/>
            </div>
        ));

        this.invalidate();
        let index = i;
        this._swiper = new Swiper('.swiper-container', {
            initialSlide: i,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
                // pagination: {
                //     el: '.swiper-pagination',
                //     clickable: true,
                // },
        });
        console.log('initial slide', i, this._swiper);
    }
        // 弹窗
        
    private _belongToLogger: Boolean = true;
        // private _tabs = {
            //     activity: 'myActivities',
            //     email: 'myEmails',
    //     inform: 'myInform',
    //     album: 'myAlbums',
    //     mood: 'myMood',
    //     credit: 'myCredits'
    // }
    private _baseURL = '#/center/$0?id=$1';
    // private _informBlockProp: informBlockProp = {
    //     initState:'edit',
    //     editable:true,
    //     readable:true,
    //     informs:[
    //         {
    //             title:'基本资料',
    //             fields:[
    //                 {
    //                     type: 'select',
    //                     label: '姓名：',
    //                     result: {
    //                         label: 'foo',
    //                         value: '11'
    //                     },
    //                     choises: [
    //                         {
    //                             label: 'foo',
    //                             value: '11'
    //                         },
    //                         {
    //                             label: 'boo',
    //                             value: '22'
    //                         },
    //                         {
    //                             label: 'baz',
    //                             value: '33'
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     type: 'textinput',
    //                     label: '留言：',
    //                     key: 'msg',
    //                     value: 'hello!'
    //                 },
    //                 {
    //                     type: 'textarea',
    //                     label: '留言：',
    //                     key: 'msg',
    //                     value: 'hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：'
    //                 }
    //             ]
    //         },
    //         {
    //             title:'详细资料',
    //             fields:[
    //                 {
    //                     type: 'select',
    //                     label: '姓名：',
    //                     result: {
    //                         label: 'foo',
    //                         value: '11'
    //                     },
    //                     choises: [
    //                         {
    //                             label: 'foo',
    //                             value: '11'
    //                         },
    //                         {
    //                             label: 'boo',
    //                             value: '22'
    //                         },
    //                         {
    //                             label: 'baz',
    //                             value: '33'
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     type: 'textinput',
    //                     label: '留言：',
    //                     key: 'msg',
    //                     value: 'hello!'
    //                 },
    //                 {
    //                     type: 'textarea',
    //                     label: '留言：',
    //                     key: 'msg',
    //                     value: 'hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：'
    //                 }
    //             ]
    //         }
    //     ]
    // };

    private _renderMyActivity() {
        return (
            <div classes={css.moods}>
                <MyActivity></MyActivity>
            </div>
        );
    }
    private _renderMyAlbum() {

        let {
            myAlbums: {
                albums
            }
        } = this.properties;
        console.log('done')
        return (
            <div classes={css.moods}>
                <ul classes={css.albumsWrap}>
                {albums.map((album) => (
                    <li classes={css.album}>
                        <h2>{album.albumName}</h2>
                        <Upload initImgs={album.imgs} action={'http://localhost:3000'} multiple={false} accept='image/*' imgsMaxNum={7} clickItem={this._viewImgs.bind(this)}></Upload>
                    </li>
                ))}
                </ul>
            </div>
        );
    }
    private _renderMyMood() {
        return (
            <div classes={css.moods}>
                <MoodCard viewImgs={this._viewImgs.bind(this)}></MoodCard>
                <MoodCard viewImgs={this._viewImgs.bind(this)}></MoodCard>
                <MoodCard viewImgs={this._viewImgs.bind(this)}></MoodCard>
            </div>
        );
    }
    private _renderMyInform() {
        // let { informs, initState, editable, readable } = this._informBlockProp;
        let {myInform:{basicInformData}} = this.properties;
        return (
            allTable.map((table: any, i: number) => {
                return (
                    <div classes={css.inform} key='myInform'>
                        <label for={'inform' + i}>{table.title}</label>
                        <input type='radio' name='inform' checked={i === 0} id={'inform' + i}/>
                        <InformBlock extraClasses={{'root': css.informBlock}} initState={'read'} fields={table.fields} editable={true} readable={true}></InformBlock>
                    </div>
                );
            })
        );
    }
    protected async renderTab() {
        console.log('tab', this.properties.tab);
        if(this._once != 1) {
            this.properties.myAlbums.getAlbums(this.properties.id);
        }else {
            this._once--;
        }

        switch( this.properties.tab ) {
            case MY_TABS.MOOD: return this._renderMyMood();
            case MY_TABS.ALBUM: return this._renderMyAlbum();
            case MY_TABS.INFORM: return this._renderMyInform();
            case MY_TABS.EMAIL: return null;
            case MY_TABS.ACTIVITY: return this._renderMyActivity();
            case MY_TABS.CREDIT: return null;
        }
    }
    private _showPrivateNav(tab: string, id: string) {
        return [
            <Link classes={[css.link, (tab === MY_TABS.ACTIVITY ? css.activeLink : '')]} key={MY_TABS.ACTIVITY} to={getLinkUrl(this._baseURL, MY_TABS.ACTIVITY, id)} isOutlet={false}>我的活动</Link>,
            <Link classes={[css.link, (tab === MY_TABS.EMAIL ? css.activeLink : '')]} key={MY_TABS.EMAIL} to={getLinkUrl(this._baseURL, MY_TABS.EMAIL, id)} isOutlet={false}>我的邮件</Link>,
            <Link classes={[css.link, (tab === MY_TABS.CREDIT ? css.activeLink : '')]} key={MY_TABS.CREDIT} to={getLinkUrl(this._baseURL, MY_TABS.CREDIT, id)} isOutlet={false}>我的积分</Link>
        ]
    }
    protected render() {
        let {tab, id} = this.properties;
        return (
            <div classes={css.root}>
                <CenterDesc></CenterDesc>
                <div>
                    
                    <nav classes={css.myNav}>
                        <Link classes={[css.link, (tab === MY_TABS.MOOD ? css.activeLink : '')]} key={MY_TABS.MOOD} to={getLinkUrl(this._baseURL, MY_TABS.MOOD, id)} isOutlet={false}>我的心情</Link>
                        <Link classes={[css.link, (tab === MY_TABS.ALBUM ? css.activeLink : '')]} key={MY_TABS.ALBUM} to={getLinkUrl(this._baseURL, MY_TABS.ALBUM, id)} isOutlet={false}>我的相册</Link>
                        <Link classes={[css.link, (tab === MY_TABS.INFORM ? css.activeLink : '')]} key={MY_TABS.INFORM} to={getLinkUrl(this._baseURL, MY_TABS.INFORM, id)} isOutlet={false}>我的资料</Link>
                        {this._belongToLogger ? (this._showPrivateNav(tab, id)) : null }
                    </nav>
                    <section classes={css.myContent}>
                        {this.renderTab()}
                    </section>
                </div>

                {/* // 弹窗 */}
                <div classes={[css.popLayer, this._showPop ? css.showPop : '']} onclick={this._closePop}>
                    <div classes={css.popContent}>
                        <div classes={[css.swiperContainer, 'swiper-container']}>
                            <div classes={[css.swiperWrap, 'swiper-wrapper']}>
                                {this._popEle}
                            </div>
                            {/* <!-- Add Pagination --> */}
                            <div classes={[css.swiperBtn, 'swiper-button-next']}></div>
                            <div classes={[css.swiperBtn, 'swiper-button-prev']}></div>
                            {/* <div class='swiper-pagination'></div> */}
                        </div>
                        
                        {/* <span classes={css.closePop} onclick={this._closePop}>X</span> */}
                    </div>
                </div>



            </div>

        );
    }
} 