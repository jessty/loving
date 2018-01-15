import { deepAssign } from '@dojo/core/lang';
import { Injector } from '@dojo/widget-core/Injector';

import { VisitingCardData } from '../widgets/visitingCard/VisitingCard';
import { CenterCardData } from './../widgets/centerCard/CenterCard';
import axois from 'axios';

export default class HomeContext extends Injector {

    private _visitingCardsData: VisitingCardData[];
    private _centerCardData: CenterCardData;
    private _basicInformData: Object;

	constructor() {

        super({});

        let visitingCardData = {
            id: '12345',
            headImgUrl: './../../assets/pic1.jpg',
            nickName: '明星',
            age: 22,
            height: 175,
            edu: '本科',
            salary: '9000-15000',
            job: '程序员',
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
        };
        let centerCardData = {
            id: '12345',
            headImgUrl: './../../assets/pic1.jpg',
            nickName: '明星',
            isVip: true,
            hasPhone: true,
            hasEmail: true,
            identified: true,
            arrived: false,
            credits: 9999,
            beans: 1000,
        }
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
        this._basicInformData = basicInformData;
        this._visitingCardsData = [visitingCardData, visitingCardData, visitingCardData];
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

	get(): HomeContext {
		return this;
	}
}