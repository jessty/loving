import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { tsx } from '@dojo/widget-core//tsx';
import * as css from './moodCard.m.css';

export interface MoodCardProp {
    mood?: Array<any>;
    isOwner?: boolean;
    viewImgs?: (img: any, i: number, imgs: Array<any>) => void;
}
@theme(css)
export default class MoodCard extends ThemedMixin(WidgetBase)<MoodCardProp> {
    // private _date: Date = new Date('2018-1-6 13:00:10');
    private _baseImgUrl: string = './../../assets/';
    private _isOwner: boolean = false;
    private _deleteMood() {
        
    }
    private _renderSubMoods(subMood: any) {
        let {viewImgs} = this.properties;
        return (
            <li classes={css.subMood}>
                <p>{subMood.mood}</p>
                <div classes={css.imgs}>
                    {subMood.imgs.length === 0 ? null : subMood.imgs.map((img: any,i: number, imgs: Array<any>) => (
                        <img title='' data-idImg={img.idImg} src={img.imgUrl} onclick={()=>{viewImgs ? viewImgs(img.imgUrl, i, imgs):null}}/>
                    ))}
                </div>
                <div classes={css.footSpans}>
                    <span classes={css.time}>{subMood.time}</span>
                    {this._isOwner ? null : (
                    <span><img src={this._baseImgUrl+'email.png'} /></span>
                    )}
                    <span data-idLike={subMood.idLike}><img src={this._baseImgUrl+'like.png'} />{subMood.likeNum + ''}</span>
                    
                </div>
                {this._isOwner ? (
                <sapn classes={css.deleteIcon} onclick={this._deleteMood}>X</sapn>
                ) : null}
            </li>
        );
    }
    protected render() {
        // let {mood} = this.properties;
        // let mood = [
        //     {
        //         id: 1234,
        //         words: '在一回首间，才忽然发现，原来，我一生的种种努力，不过只为了周遭的人对我满意而已。为了搏得他人的称许与微笑，我战战兢兢地将自己套入所有的模式所有的桎梏。走到途中才忽然发现，我只剩下一副模糊的面目，和一条不能回头的路。',
        //         imgs: [
        //             this._baseImgUrl + 'pic1.jpg',
        //             this._baseImgUrl + 'pic2.jpg',
        //             this._baseImgUrl + 'pic3.jpg'
        //         ],
        //         likes: 20,
        //         time: this._date.toLocaleTimeString()
        //     },
        //     {
        //         id: 1234,
        //         words: '在一回首间，才忽然发现，原来，我一生的种种努力，不过只为了周遭的人对我满意而已。为了搏得他人的称许与微笑，我战战兢兢地将自己套入所有的模式所有的桎梏。走到途中才忽然发现，我只剩下一副模糊的面目，和一条不能回头的路。',
        //         imgs: [
        //             this._baseImgUrl + 'pic4.jpg',
        //             this._baseImgUrl + 'pic2.jpg',
        //             this._baseImgUrl + 'pic.jpg'
        //         ],
        //         likes: 80,
        //         time: this._date.toLocaleTimeString()
        //     },
        //     {
        //         id: 1234,
        //         words: '在一回首间，才忽然发现，原来，我一生的种种努力，不过只为了周遭的人对我满意而已。为了搏得他人的称许与微笑，我战战兢兢地将自己套入所有的模式所有的桎梏。走到途中才忽然发现，我只剩下一副模糊的面目，和一条不能回头的路。',
        //         imgs: [
        //             this._baseImgUrl + 'pic2.jpg',
        //             this._baseImgUrl + 'pic3.jpg',
        //             this._baseImgUrl + 'pic2.jpg'
        //         ],
        //         likes: 100,
        //         time: this._date.toLocaleTimeString()
        //     }

        // ];
        let {
            mood={date:'hello',submood:[]}
        } = this.properties;
        return (
            <ul classes={[this.theme(css.root),css.rootFixed]}>
                <label classes={css.date}>{mood.date}</label>
                {mood.submood.map((subMood: any) => {
                        return this._renderSubMoods(subMood);
                })}
            </ul>
        );
    }
}