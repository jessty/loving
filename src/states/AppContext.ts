import { deepAssign } from '@dojo/core/lang';
import { Injector } from '@dojo/widget-core/Injector';

import { VisitingCardData } from '../widgets/visitingCard/VisitingCard';
import { CenterCardData } from './../widgets/centerCard/CenterCard';
import axois from 'axios';
import ActivityContainer from './../pages/activity/ActivityContainer';

export default class HomeContext extends Injector {

    private _visitingCardsData: VisitingCardData[];
    private _centerCardData: CenterCardData;
    private _basicInformData: Object;
    private _activitySwipers: Array<any>;
    private _albums: Array<any>;

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
                nickName: '告白气球',
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
        ]
        let centerCardData = {
            id : '12340',
            headImgUrl : './../../assets/pic4.jpg',
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
            nickName: 'star',
            marital_status: 0,
            purpose: undefined,
            gender: undefined,
            birthday: '2018/1/14',
            weight: 175,
            height: 175,
            education: 2,
            salary: 2,
            livingplace: '广东广州'
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
                name: 'my live',
                imgs: ['./../../assets/pic.jpg', './../../assets/pic1.jpg', './../../assets/pic2.jpg'],
                imgsMaxNum: 7,
                action: 'http://localhost:8800'
            },
            {
                name: '你的名字',
                imgs: ['./../../assets/pic.jpg', './../../assets/pic1.jpg', './../../assets/pic2.jpg'],
                imgsMaxNum: 7,
                action: 'http://localhost:8800'
            },
            {
                name: '为热爱而生',
                imgs: ['./../../assets/pic.jpg', './../../assets/pic1.jpg', './../../assets/pic2.jpg'],
                imgsMaxNum: 7,
                action: 'http://localhost:8800'
            }
        ];
        this._albums = albums;
        this._activitySwipers = activitySwipers;
        this._basicInformData = basicInformData;
        this._visitingCardsData = visitingCardsData;
        this._centerCardData = centerCardData;
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
        // axois.post();
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