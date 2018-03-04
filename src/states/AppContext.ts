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
    private _user: Object;

	constructor() {

        super({});

        let visitingCardsData = [
            {
                id: '12345',
                headImgUrl: './../../assets/pic1.jpg',
                nickName: '小泷',
                age: 22,
                height: 175,
                edu: '本科',
                salary: '9000-15000',
                job: '白领',
                quote: '在一回首间，才忽然发现，原来，我一生的种种努力，不过只为了周遭的人对我满意而已。为了搏得他人的称许与微笑，我战战兢兢地将自己套入所有的模式所有的桎梏。走到途中才忽然发现，我只剩下一副模糊的面目，和一条不能回头的路。',
                isVip: true,
                hasPhone: true,
                identified: true,
                like: true,
                desiredAge: '22-30',
                desiredHeight: '175cm以上',
                desiredEdu: '本科',
                desiredSalary: '9000-15000',
                desiredJob: '程序员'
            },
            {
                id: '12341',
                headImgUrl: './../../assets/pic.jpg',
                nickName: 'STARBUCKS',
                age: 32,
                height: 185,
                edu: '博士',
                salary: '15000-20000',
                job: '私企高管',
                quote: '',
                isVip: true,
                hasPhone: true,
                identified: true,
                like: true,
                desiredAge: '22-30',
                desiredHeight: '175cm以上',
                desiredEdu: '本科',
                desiredSalary: '9000-15000',
                desiredJob: '程序员'
            },
            {
                id: '12342',
                headImgUrl: './../../assets/pic2.jpg',
                nickName: 'Wonderful',
                age: 20,
                height: 170,
                edu: '本科',
                salary: '2000-5000',
                job: '餐厅兼职',
                quote: '',
                isVip: false,
                hasPhone: false,
                identified: true,
                like: false,
                desiredAge: '18-22',
                desiredHeight: '160cm以上',
                desiredEdu: '本科',
                desiredSalary: '2000-15000',
                desiredJob: '求萌妹子'
            },
            {
                id: '12343',
                headImgUrl: './../../assets/pic3.jpg',
                nickName: 'Color',
                age: 22,
                height: 165,
                edu: '本科',
                salary: '2000-5000',
                job: '名企实习',
                quote: '',
                isVip: false,
                hasPhone: true,
                identified: false,
                like: false,
                desiredAge: '22岁以上',
                desiredHeight: '165cm以上',
                desiredEdu: '本科',
                desiredSalary: '2000-15000',
                desiredJob: '大叔控'
            },
            {
                id: '12349',
                headImgUrl: './../../assets/pic4.jpg',
                nickName: '告白气球',
                age: 22,
                height: 165,
                edu: '本科',
                salary: '2000-5000',
                job: '名企实习',
                quote: '',
                isVip: false,
                hasPhone: true,
                identified: true,
                like: false,
                desiredAge: '22岁以上',
                desiredHeight: '165cm以上',
                desiredEdu: '本科',
                desiredSalary: '2000-15000',
                desiredJob: '大叔控'
            },
            {
                id: '12348',
                headImgUrl: './../../assets/pic2.jpg',
                nickName: 'Jack',
                age: 22,
                height: 165,
                edu: '本科',
                salary: '2000-5000',
                job: '名企实习',
                quote: '',
                isVip: true,
                hasPhone: true,
                identified: false,
                like: false,
                desiredAge: '22岁以上',
                desiredHeight: '165cm以上',
                desiredEdu: '本科',
                desiredSalary: '2000-15000',
                desiredJob: '大叔控'
            },
        ]
        let centerCardData = {
            id : '12340',
            headImgUrl : './../../assets/pic1.jpg',
            nickName : 'Yomocy',
            isVip : true,
            hasPhone : true,
            hasEmail : true,
            identified : true,
            arrived : false,
            credits : 9999,
            beans : 1000
        };
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
        this._centerCardData = centerCardData;
        this._user = {}
	}
    public async login(formData: Object) {
        formData.loginTime = new Date();
        let res = await axios.post('/login', formData)
        if(res.status === 200) {
            window.location.href = '#/home';
            Object.assign(this._user, res.data);
        }
        return res.data
    }
    public async signup(formData: Object) {
        formData.signupTime = new Date();

        let res = await axios.post('/signup', formData);
        console.log('res', res);
        if ( res.status === 200 ) {
            let data = res.data.data;

            Object.assign(this._user, data);
            this._basicInformData.nickname = '用户-' + data.idUser;

            return this._basicInformData;
        }else {
            console.error('AppContext.ts: signup()', res);
            return undefined;
        }
    }
    public async fetchInform(table: string, idUser: number) {
        let res = await axios.get(`/inform/${table}`,{
            params:{idUser:idUser}
        })
        if(res.status === 200) {
            return res.data;
        }
    }
    public async updateInform(table: string , newData: Object, cb?:()=>{}) {
        newData.idUser = this._user.idUser;
        let res = await axios.post(`/inform/${table}`, newData);
        if (res.status === 200) {
            let data = res.data.data;
            return data;
        }
    }
    public async identify(inform: any) {
        inform.append('idenTime', new Date())
        let res = await axios.post('/identify', inform);
        if(res.status === 200) {
            let data = res.data.data;
            return data;
        }
    }

    /**
     * getAlbums
     */
    public async getAlbums(idUser: number|string, fn: any) {
        let res = await axios.get(`/album?idUser=${idUser}`);
        if(res.status === 200) {
            let {imgDir, albums} = res.data.data;
            albums.forEach(album => {
                album.imgs.forEach(img => {
                    img.imgUrl = 'http://localhost:3000/imgs/user/' + imgDir + '/' + img.imgUrl;
                })
            })
            this._albums = albums;
            this.emit({ type: 'invalidate' });
        }
    }
	get centerCardData(): CenterCardData {
		return this._centerCardData;
    }
    public arrive() {
        console.log('arrive',this._centerCardData);
        this._centerCardData = deepAssign({}, this._centerCardData, {arrived: true});
        this.emit({ type: 'invalidate' });
        console.log('arrive',this._centerCardData);
    }

	get visitingCardsData(): VisitingCardData[] {
		return this._visitingCardsData;
	}

	public updateVisitingCard(id: string, like: boolean): void {

        this._visitingCardsData = this._visitingCardsData.map((data) => {
            if(data.id === id) {
                let newData = deepAssign({}, data);
                newData.like = like;
                return newData;
            }else {
                return data;
            }
        });
        // 发送数据请求
        // axios.post();
        this.emit({ type: 'invalidate' });
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