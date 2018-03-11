import { deepAssign } from '@dojo/core/lang';
import { Injector } from '@dojo/widget-core/Injector';

import { VisitingCardData } from '../widgets/visitingCard/VisitingCard';
import { CenterCardData } from './../widgets/centerCard/CenterCard';
import axios from './../support/axios';
import ActivityContainer from './../pages/activity/ActivityContainer';

export default class HomeContext extends Injector {

    private _visitingCardsData: VisitingCardData[];
    private _centerCardData: CenterCardData;
    private _basicInformData: Object;
    private _activitySwipers: Array<any>;
    private _albums: Array<any>;
    private _user: CenterCardData;
    private _searchData: Object;
    private _searchDataName: string;
    private _serverIP:string='http://119.29.76.240:3000'

	constructor() {

        super({});

        let visitingCardsData = [
            // {
            //     idUser: '12345',
            //     avator: './../../assets/pic1.jpg',
            //     nickname: '小泷',
            //     birthday: '2010-1-1 00:00:00',
            //     age: 22,
            //     height: 175,
            //     education: 2,
            //     salary: 3,
            //     // job: '白领',
            //     quote: '在一回首间，才忽然发现，原来，我一生的种种努力，不过只为了周遭的人对我满意而已。为了搏得他人的称许与微笑，我战战兢兢地将自己套入所有的模式所有的桎梏。走到途中才忽然发现，我只剩下一副模糊的面目，和一条不能回头的路。',
            //     rank: 0,
            //     phone: null,
            //     idenStatus: 2,
            //     idLike: null,
            //     preAge: 2,
            //     preHeight: 2,
            //     preWeight: 1,
            //     preEdu: 1,
            //     preSalary: 1,
            //     preGender: 1,
            //     preLivingPlace: '广州'
            // }
        ]
        let basicInformData = {
            nickname: null,
            maritalStatus: 0,
            purpose: 0,
            gender: 0,
            birthday: null,
            weight: null,
            height: null,
            education: 0,
            salary: 0,
            livingPlace: null
        };
        let activitySwipers = [
            {
                clickable: false,
                href: '/home',
                src: './../assets/pic.jpg',
                alt: 'pic',
                title: 'pic'
            },
            {
                clickable: true,
                href: '/home',
                src: './../assets/pic1.jpg',
                alt: 'pic',
                title: 'pic'
            },
            {
                clickable: true,
                href: '/home',
                src: './../assets/pic2.jpg',
                alt: 'pic',
                title: 'pic'
            },
            {
                clickable: true,
                href: '/home',
                src: './../assets/pic3.jpg',
                alt: 'pic',
                title: 'pic'
            }
        ]
        let albums = [
            {
                idAlbum: 1,
                albumName: 'my live',
                imgs: [
                    {
                        idImg: 1,
                        imgUrl: './../../assets/pic.jpg'
                    },
                    {
                        idImg: 2,
                        imgUrl: './../../assets/pic1.jpg'
                    },
                    {
                        idImg: 3,
                        imgUrl: './../../assets/pic2.jpg'
                    }
                ],
                albumTime: '2017-1-1 10:00:00',
            },
            {
                idAlbum: 2,
                albumName: 'my live',
                imgs: [
                    {
                        idImg: 1,
                        imgUrl: './../../assets/pic.jpg'
                    },
                    {
                        idImg: 2,
                        imgUrl: './../../assets/pic1.jpg'
                    },
                    {
                        idImg: 3,
                        imgUrl: './../../assets/pic2.jpg'
                    }
                ],
                albumTime: '2017-1-1 10:00:00',
            },
            {
                idAlbum: 3,
                albumName: 'my live',
                imgs: [
                    {
                        idImg: 1,
                        imgDir: './../../assets/pic.jpg'
                    },
                    {
                        idImg: 2,
                        imgDir: './../../assets/pic1.jpg'
                    },
                    {
                        idImg: 3,
                        imgDir: './../../assets/pic2.jpg'
                    }
                ],
                albumTime: '2017-1-1 10:00:00',
            }
        ];
        this._albums = albums;
        this._activitySwipers = activitySwipers;
        this._basicInformData = basicInformData;
        this._visitingCardsData = visitingCardsData;
        this._centerCardData;
        this._user = {
        };


        
    }
// 登录
    public async login(formData: Object) {
        formData.loginTime = new Date();
        let res = await axios.post('/login', formData)
        if(res.status === 200) {
            window.location.href = '#/home';
            Object.assign(this._user, res.data.data);
            this._initSearchData(res.data.data.idUser);
            this._saveData(res.data.data);
            localStorage.setItem('id', res.data.data.idUser)
        }
        return res.data
    }
    // 注册
    public async signup(formData: Object) {
        formData.signupTime = new Date();
        
        let res = await axios.post('/signup', formData);
        
        if ( res.status === 200 ) {
            let data = res.data.data;
            
            Object.assign(this._user, data);
            this._basicInformData.nickname = '用户-' + data.idUser;
            this._initSearchData(data.idUser)
            localStorage.setItem('id', res.data.data.idUser)
            this._saveData(res.data.data);
            return this._basicInformData;
        }else {
            console.error('AppContext.ts: signup()', res);
            return undefined;
        }
    }
    private _saveData(userdata:any) {
        let datastr = JSON.stringify(userdata)
        sessionStorage.setItem('user-data', datastr);
    }
// 获取用户信息
    public async fetchInform(table: string, idUser: number) {
        let res = await axios.get(`/inform/${table}`,{
            params:{idUser:idUser}
        })
        if(res.status === 200) {
            return res.data;
        }
    }
// 更新用户信息
    public async updateInform(table: string , newData: Object, cb?:()=>{}) {
        newData.idUser = this._user.idUser;
        let res = await axios.post(`/inform/${table}`, newData);
        if (res.status === 200) {
            let data = res.data.data;
            return data;
        }
    }
// 实名认证
    public async identify(inform: any) {
        inform.set('idenTime', new Date())
        let res = await axios.post('/identify', inform);
        if(res.status === 200) {
            let data = res.data.data;
            return data;
        }
    }

// 上传头像和名言    
    public async updateAvator(inform: any) {
        let res = await axios.post('setting/avator', inform);
        if(res.status === 200) {
            this._user = Object.assign(this._user, res.data.data);
            return res.data.data;
        }
    }

// 获取相册列表
    public async getAlbums(idUser: number|string, fn: any) {
        let res = await axios.get(`/album/all?idUser=${idUser}`);
        if(res.status === 200) {
            let {imgDir, albums} = res.data.data;
            albums.forEach((album: any) => {
                album.imgs.forEach((img: any) => {
                    img.imgUrl = this._serverIP + '/imgs/user/' + imgDir + '/' + img.imgUrl;
                })
            })
            this._albums = albums;
            this.emit({ type: 'invalidate' });
        }
    }
// 获取用户所有资料信息
    public async getAllInform(idUser: number|string) {
        let res = await axios.get(`/inform/all?idUser=${idUser}`);
        if(res.status === 200) {
            let {imgDir, albums} = res.data.data;
            albums.forEach((album: any) => {
                album.imgs.forEach((img: any) => {
                    img.imgUrl = this._serverIP + '/imgs/user/' + imgDir + '/' + img.imgUrl;
                })
            })
            this._albums = albums;
            this.emit({ type: 'invalidate' });
        }
    }

	get centerCardData(): CenterCardData {
		return this._user;
    }
    public async arrive() {
        console.log('arrive',this._centerCardData);
        let res = await axios.post('/arrive', {
            arrived: new Date()
        })
        if(res.status === 200) {
            this._centerCardData = deepAssign({}, this._centerCardData, {arrived: true});
            this.emit({type: 'invalidate' });
            return res.data;
        }

        console.log('arrive',this._centerCardData);
    }

    // 首页推荐卡片相关
	get visitingCardsData(): VisitingCardData[] {
		return this._visitingCardsData;
	}

	public updateVisitingCard(id: number): void {

        // 发送数据请求
        // axios.post('/user/like', {
        //     idLiked: id,
        //     likeType: 1,
        //     likeTime: new Date()
        // }).then((res) => {
        //     if(res.status === 200) {
        //         this._visitingCardsData = this._visitingCardsData.map((data) => {
        //             if(data.idUser === id) {
        //                 let newData = deepAssign({}, data);
        //                 newData.idLike = !newData.idLike;
        //                 return newData;
        //             }else {
        //                 return data;
        //             }
        //         });
        //         this.emit({ type: 'invalidate' });
        //     }
        // }).catch((err) => {
        //     console.error(err);
        //     alert(err);
        // });
	}


    // 首页推荐搜索相关
    get searchData(){
        return this._searchData;
    }
    private _initSearchData(id:number|string) {
        this._searchDataName = 'search-data'+ id
        let searchData = this.readSearchData(this._searchDataName);
        if(searchData) {
            this._searchData = searchData;
        }else {
            this._searchData = {
                gender: 0,
                birthday: 0,
                height: 0,
                weight: 0,
                education: 0,
                livingPlace: '',
                idenStatus: 0,
                rank: 0
            }
        }
        this.search(this._searchData)
    }
    public readSearchData(name: string) {
        let dataStr = localStorage.getItem(name);
        return JSON.parse(dataStr);
    }
    private _saveSearchData(data: Object) {
        
        if(localStorage.getItem(this._searchDataName)) {
            localStorage.removeItem(this._searchDataName);
        }
        let dataStr = JSON.stringify(data);

        localStorage.setItem(this._searchDataName, dataStr);
    }
    public search(searchData: Object|undefined) {
        this._searchData = Object.assign({},this._searchData, searchData)
        axios.post('/inform/search', this._searchData)
        .then((res) => {
            if(res.status === 200) {
                this._visitingCardsData = res.data.data;
                this.emit({ type: 'invalidate' });
            }
        })
        .catch(err => {
            alert('获取推荐信息失败')
        })
        this._saveSearchData(this._searchData)
    }



    get basicInformData(): Object {
        return this._basicInformData;
    }

    get activitySwipers(): Array<any>{
        return this._activitySwipers;
    }

    get albums(): Array<any> {
        return this._albums;
    }
	get(): HomeContext {
		return this;
	}
}