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
import axios from './../../support/axios';
// import class from './../../widgets/centerCard/CenterCard';
export interface CenterProp {
    id: string;
    tab: string;
    logger: any;
    search:()=>void;
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
    constructor(){
        super();
        // this._initialize()
        this._roll()
    }
    private _serverIP:string='http://119.29.76.240:3000'
    // 弹窗
    private _popEle: any;
    private _showPop: boolean = false;
    private _swiper: any;
    private _once: number = 2;
    private _idUser: number|string = 0;
    private _initialized:boolean=false;
    private _albums:any=[];
    private _inform:any=[];
    private _moods:any=[];
    private _belongToLogger: boolean = false;
    private _baseURL = '#/center/$0?id=$1';
    private _timer: any;
    private _ownerData:any={};
    private _loggerData:any={};

    private _writeArea:any={};
    private _recievedEmail:any=[];
    private _sendEmail:any= [];
    private _activeEmailPart:string = '.receiveLs';
    private _readingEmail:any={};
    private _readingType:string;
    

    private _mood:any={
        mood:'',
        imgs:[],
        moodTime:''
    };
    private _moodInitImgs:any=[]

    private _initialize() {
        let {
            logger
        } = this.properties;
        this._loggerData = logger.idUser ? logger : this._getSessionData()

        let i = location.href.indexOf('?');
        if(i === -1 && location.hash === '#/center') {
            this._idUser = this._loggerData.idUser;
        }else {
            this._idUser = location.href.substr(i).split('=')[1];
        }
        // judge whether is logger itself
        this._belongToLogger = (+this._idUser === +this._loggerData.idUser);

        Promise.all([this.getAllInform(),this._getAccount(), this.getMoods()])
        .then(values=>{
            this._ownerData =Object.assign({}, values[0][0].values, values[1])
            this.invalidate();
        })
        .catch(err=> {
            alert(err.response.data.msg)
        })
    }

    private _getSessionData() {
        let datastr = sessionStorage.getItem('user-data');
        return JSON.parse(datastr)
    }
    private async _getAccount(){
        let res = await axios.post('/setting/account',{idUser:this._idUser})
        if(res.status ==200) {
            return res.data.data;
        }
    }
    public async getMoods() {
        let res = await axios.get(`/mood?idUser=${this._idUser}`);
        if(res.status === 200) {
            let {imgDir, mood : moods} = res.data.data;
            let date = '';
            this._moods = [];
            if(moods.length > 0) {
                date = moods[0].moodTime.substr(0,  moods[0].moodTime.indexOf('T'));
                this._moods.push({
                    date: date,
                    submood: []
                });
            }
            

            moods.forEach((mood: any) => {
                mood.imgs.forEach((img: any) => {
                    img.imgUrl = this._serverIP + '/imgs/user/' + imgDir + '/' + img.imgUrl;
                })
                let i = mood.moodTime.indexOf('T')
                let d = mood.moodTime.substr(0, i), t = mood.moodTime.substr(i+1, mood.moodTime.length-1)
                if(date === d) {
                    mood.time = t
                    this._moods[this._moods.length-1].submood.push(mood)
                }else {
                    date = d;
                    this._moods.push({
                        date: d,
                        submood: []
                    })
                }
            })

            this.invalidate();
        }
    }

    public async getAlbums() {
        let res = await axios.get(`/album/all?idUser=${this._idUser}`);
        if(res.status === 200) {
            let {imgDir, albums} = res.data.data;
            albums.forEach((album: any) => {
                album.imgs.forEach((img: any) => {
                    img.imgUrl = this._serverIP+'/imgs/user/' + imgDir + '/' + img.imgUrl;
                })
            })
            this._albums = albums;
            this.invalidate();
        }
    }
    onAttach() {
        // this.getMoods()
        this._swiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // pagination: {
            //     el: '.swiper-pagination',
            //     clickable: true,
            // },
          });
        //   this._swiper.autoplay.start();
        this._initialize();
    }
    onDetach() {
        // this._swiper = undefined;
    }

    private _closePop({target, currentTarget}: MouseEvent) {
        if (target === currentTarget) {
            this._showPop = false;
            this._swiper = undefined;
            this.invalidate();
        }
    }
    @afterRender()
    protected myAfterRender(result: any) {
        this._swiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        console.log('afterRender', this.properties);
        return result;
    }
    private _viewImgs(img: any, i: number, imgs: Array<any>) {
        this._showPop = true;
        this._popEle = imgs.map((img, i) => (
            <div classes={[css.swiperSlide, 'swiper-slide']} key={'swiper-slide' + i}>
                <img src={img.imgUrl}/>
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
        
        // private _tabs = {
            //     activity: 'myActivities',
            //     email: 'myEmails',
    //     inform: 'myInform',
    //     album: 'myAlbums',
    //     mood: 'myMood',
    //     credit: 'myCredits'
    // }
    // // 获取相册列表

    private _renderMyActivity() {
        return (
            <div classes={css.moods}>
                <MyActivity></MyActivity>
            </div>
        );
    }
    private _createAlbum() {
        let el = document.getElementById('newAlbumName');
        let data = {
            albumName: el.value,
            albumTime: new Date()
        }
        axios.post('/album/create',data)
        .then(res => {
            if(res.status == 200) {
                let newAlbum = Object.assign(data,  {
                    "idAlbum": res.data.data.idAlbum,
                    "albumTime": data.albumTime.toISOString(),
                    "imgs": []
                  })
                this._albums.unshift(newAlbum)
                this.invalidate()
            }else {
    
            }
        })
        .catch(err=>{
            alert('creating album occurs error!')
        })



    }
    private _renderMyAlbum() {

        // if(this._albums.length==0) {
        //     this.getAlbums()
        // }
        let albums = this._albums;
        console.log('done')
        return (
            <div classes={css.moods} key={'ablumTab'}>
                {   
                    this._belongToLogger ? (
                        <div classes={css.createAlbumArea}  key={'newAlbumName'}>
                            <input id={'newAlbumName'} placeholder={'create a new album'} onclick={}/><span classes={css.spanBtn} onclick={()=>{this._createAlbum()}}>create</span>
                        </div>
                    ) : null
                }
                <ul classes={css.albumsWrap}>
                {albums.map((album, i) => (
                    <li key={i} classes={css.album}>
                        <h2>{album.albumName}</h2>
                        {/* <Upload name={'avator'} extraClasses={{'root': css.uploadRoot, 'img': css.uploadImg}} deliverFile={this._chooseFile.bind(this, 'avator')} numHint={false} multiple={false} accept='image/*'></Upload> */}
                        <Upload key={'uploag' + i} name={'imgs'} initImgs={album.imgs} action={this._serverIP + '/album/img'} params={album} multiple={false} accept='image/*' imgsMaxNum={7} clickItem={this._viewImgs.bind(this)}></Upload>
                    </li>
                ))}
                </ul>
            </div>
        );
    }

    private async _publishMood() {
        this._mood.moodTime = new Date()

        let form = new FormData()
        form.append('mood',this._mood.mood)
        this._mood.imgs.forEach((img:any) => {
            form.append('imgs', img)
        })
        form.append('moodTime', this._mood.moodTime)

        let res = await axios.post('/mood',form)
        if(res.status === 200) {
            this._mood = {
                mood:'',
                imgs:[],
                moodTime:''
            }
            await this.getMoods()
            this._moodInitImgs = [];
            this.invalidate()
        }
    }
    private _doMoodImg(img:any ,name:string) {
        this._mood.imgs.push(img)
    }
    private _renderMyMood() {
        return (
            <div classes={css.moods}>
            <div style={'color:transparent;'}>
                {this._belongToLogger ? (
                    <div classes={css.moodWritePad}>
                    
                        <div>
                            <textarea placeholder={'publish your mood today!'} onchange={e => this._mood.mood = e.target.value}></textarea>
                        </div>
                        <div classes={css.moodControls}>
                            <Upload name={'imgs'} reflesh={true} initImgs={this._moodInitImgs} numHint={false} multiple={false} accept='image/*' deliverFile={this._doMoodImg} imgsMaxNum={5}></Upload>
                            <span classes={css.spanBtn} onclick={()=> {this._publishMood()}}>publish</span>
                        </div>
                    </div>
                ) : null;}
            </div>
            {
                this._moods.map(mood => (
                    <MoodCard viewImgs={this._viewImgs.bind(this)} mood={mood} isOwner={this._belongToLogger}></MoodCard>
                ))
            }
            </div>
        );
    }
    private Tables = [
        'basic',
        'details',
        'family',
        'hobby',
        'loveStatus',
        'maritalExpec',
        'prefer',
        
      ];
    private _renderMyInform() {
        // let { informs, initState, editable, readable } = this._informBlockProp;
        let {myInform:{basicInformData}} = this.properties;
        return (
            allTable.map((table: any, i: number) => {
                return (
                    <div classes={css.inform} key='myInform'>
                        <label for={'inform' + i}>{table.title}</label>
                        <input type='radio' name='inform' checked={i === 0} id={'inform' + i}/>
                        <InformBlock initData={this._inform[i] ? this._inform[i].values : {}} extraClasses={{'root': css.informBlock}} initState={'read'} fields={table.fields} editable={this._belongToLogger} readable={true} onSubmit={this._submitInfrom.bind(this, this.Tables[i],i)}></InformBlock>
                    </div>
                );
            })
        );
    }
    // 获取用户所有资料信息
    public async getAllInform() {
        let res = await axios.get(`/inform/all?idUser=${this._idUser}`);
        if(res.status === 200) {
            this._inform = res.data.data;
            this.invalidate();
            return res.data.data;
        }
    }
    private async _submitInfrom(type: string, i :number, newInform: any) {
        let res = await axios.post(`/inform/${type}`, newInform);
        if (res.status === 200) {
            let data = res.data.data;
            Object.assign(this._inform[i], newInform)
            return data;
        }
    }

    // email function
    private _roll() {
        this._timer = setInterval(()=>{
            this._getEmail('received')
        }, 1000*30);
    }
    private async _getEmail(type:string){
        let res = await axios.get(`/email/${type}/list`)
        if(res.status ===200) {
            if(type === 'received') {

                if(this._recievedEmail.length !== res.data.data.length) {
                    let el = document.getElementById('receiveBar')
                    if(el&&!el.classList.contains(css.newcoming))
                        el.classList.add(css.newcoming)
                    this._recievedEmail = res.data.data;
                    this.invalidate();
                    return res.data.data
                }
            }else {
                this._sendEmail = res.data.data;
                this.invalidate()
                return res.data.data
            }
        }
    }
    private _showEmailPart(type: string) {
        return (e: MouseEvent)=>{
            if(this._activeEmailPart != type) {
                
                document.querySelector(this._activeEmailPart).classList.add(css.hide);
                document.querySelector(type).classList.remove(css.hide);
                if(type=='receiveLs' && e.target.classList.contains(css.newcoming)) {
                    e.target.classList.remove(css.newcoming)
                }
                this._activeEmailPart = type;
            }
        }
    }
    private _reading(type: string, i: number| string) {
        if(type=='received') {
            this._readingEmail = Object.assign({}, this._recievedEmail[i])
            this._readingEmail.userLink = this._readingEmail.emlFrom
        }else {
            this._readingEmail = Object.assign({}, this._sendEmail[i])
            this._readingEmail.userLink = this._readingEmail.emlTo
            
        }
        this._readingType = type;
        this._readingEmail.emlTime = (new Date(this._readingEmail.emlTime)).toLocaleDateString()
        this._showEmailPart('.emailContent')(null)
        this.invalidate();
    }
    private async _submitEmail() {
        Object.assign(this._writeArea, {
            emlTime: new Date()
        })
        let res = await axios.post('/email/',this._writeArea)
        if(res.status = 200) {
            this._getEmail('sent')
        }
    }
    private _renderMyEmail() {
        return (
            <section classes={css.emailSec}>
                <div classes={css.emailBar}>
                    <div id={'receiveBar'} classes={css.newcoming} onclick={this._showEmailPart('.receiveLs')}>recieve</div>
                    <div onclick={this._showEmailPart('.sendLs')}>send</div>
                    <div onclick={this._showEmailPart('.writeArea')}>write</div>
                </div>
                <div classes={css.emailPane}>
                    <ul classes={['receiveLs', css.emailList]}>
                    {
                        this._recievedEmail.map((email,i)=>(
                            <li key={i} onclick={()=>this._reading('received',i)}>
                                <span classes={css.emailMan}>{email.user}</span>
                                <span>{email.emlTitle}</span>
                                <span>{(new Date(email.emlTime)).toLocaleDateString()}</span>
                            </li>
                        ))
                    }
                    </ul>
                    <ul id={} classes={['sendLs', css.emailList, css.hide]} onclick={}>
                    {
                        this._sendEmail.map((email,i)=>(
                            <li key={i} onclick={()=>this._reading('sent', i)}>
                                <span classes={css.emailMan}>{email.user}</span>
                                <span>{email.emlTitle}</span>
                                <span>{(new Date(email.emlTime)).toLocaleDateString()}</span>
                            </li>
                        ))
                    }
                    </ul>

                    <div classes={['writeArea', css.emailList, css.writeArea, css.hide]}>
                        <div classes={css.eamilFiled}><span>To:</span><input type='text' onchange={e => this._writeArea.user = e.target.value}/></div>
                        <div classes={css.eamilFiled}><span>Title:</span><input type='text'onchange={e=>this._writeArea.emlTitle = e.target.value}/></div>
                        <div classes={css.eamilFiled}><span>Content:</span><textarea onchange={e=>this._writeArea.emlContent = e.target.value}></textarea></div>
                        <div classes={[css.writeBtnArea]}><span classes={css.spanBtn} onclick={()=>{this._submitEmail()}}>send</span></div>
                    </div>

                    <div classes={['emailContent', css.emailContent, css.hide]}>
                        <span>Title: {this._readingEmail.emlTitle}</span>
                        <span>
                            {this._readingType === 'received' ? 'From:' : 'To:'}<a href={'#/center/myMood?id='+this._readingEmail.userLink}>{this._readingEmail.user}</a>
                        </span>
                        <span>time:{this._readingEmail.emlTime}</span>
                        <p classes={[css.emailBody]}>{this._readingEmail.emlContent}</p>
                    </div>
                </div>
            </section>
        )
    }
    private _getTabData(tabName:string){
        switch(tabName) {
            case 'album': this.getAlbums();break;
            case 'mood': this.getMoods();break;
            case 'inform':  this.getAllInform();break;
            case 'email': {this._getEmail('received'); this._getEmail('sent')};break;
        }
    }
    protected renderTab() {
        console.log('tab', this.properties.tab);
        if(this._once != 1) {
            // this.properties.myAlbums.getAlbums(this.properties.id);
        }else {
            this._once--;
        }

        switch( this.properties.tab ) {
            case MY_TABS.MOOD: return this._renderMyMood();
            case MY_TABS.ALBUM: return this._renderMyAlbum();
            case MY_TABS.INFORM: return this._renderMyInform();
            case MY_TABS.EMAIL: return this._renderMyEmail()
            // case MY_TABS.ACTIVITY: return this._renderMyActivity();
            // case MY_TABS.CREDIT: return null;
        }
    }
    private _showPrivateNav(tab: string, id: string|number) {
        return [
            // <Link classes={[css.link, (tab === MY_TABS.ACTIVITY ? css.activeLink : '')]} key={MY_TABS.ACTIVITY} to={getLinkUrl(this._baseURL, MY_TABS.ACTIVITY, id)} isOutlet={false}>我的活动</Link>,
            <Link classes={[css.link, (tab === MY_TABS.EMAIL ? css.activeLink : '')]} key={MY_TABS.EMAIL} to={getLinkUrl(this._baseURL, MY_TABS.EMAIL, id)} isOutlet={false} onclick={this._getTabData.bind(this,'email')}>我的邮件</Link>,
            // <Link classes={[css.link, (tab === MY_TABS.CREDIT ? css.activeLink : '')]} key={MY_TABS.CREDIT} to={getLinkUrl(this._baseURL, MY_TABS.CREDIT, id)} isOutlet={false}>我的积分</Link>
        ]
    }
    protected render() {
        // this._initialized ?null : this._initialize()
        let id = this._idUser;
        let {tab, logger} = this.properties;
        return (
            <div classes={css.root}>
                <CenterDesc centerDescData={this._ownerData}></CenterDesc>
                <div>
                    
                    <nav classes={css.myNav}>
                        <Link classes={[css.link, (tab === MY_TABS.MOOD ? css.activeLink : '')]} key={MY_TABS.MOOD} to={getLinkUrl(this._baseURL, MY_TABS.MOOD, id)} isOutlet={false} onclick={this._getTabData.bind(this,'mood')}>心情</Link>
                        <Link classes={[css.link, (tab === MY_TABS.ALBUM ? css.activeLink : '')]} key={MY_TABS.ALBUM} to={getLinkUrl(this._baseURL, MY_TABS.ALBUM, id)} isOutlet={false} onclick={this._getTabData.bind(this,'album')}>相册</Link>
                        <Link classes={[css.link, (tab === MY_TABS.INFORM ? css.activeLink : '')]} key={MY_TABS.INFORM} to={getLinkUrl(this._baseURL, MY_TABS.INFORM, id)} isOutlet={false} onclick={this._getTabData.bind(this,'inform')}>资料</Link>
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