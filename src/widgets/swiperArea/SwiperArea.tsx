import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { tsx } from '@dojo/widget-core//tsx';
import * as css from './swiperArea.m.css';
import { Link } from '@dojo/routing/Link';
const Swiper = window.Swiper;

export interface SwiperAreaProp {
    imgs: Array<any>;
}
// clickable: boolean;
// href: string;
// src: string;
// alt: string;
// title: string;
@theme(css)
export default class SwiperArea extends ThemedMixin(WidgetBase)<SwiperAreaProp> {
    private _swiper: any;
    onAttach() {
        this._swiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
          });
          this._swiper.autoplay.start();
    }
    onDetach() {
        this._swiper = undefined;
    }
    protected render() {
        let {imgs} = this.properties;
        return (
            <div classes={[this.theme(css.root), 'swiper-container']}>
                <div classes={['swiper-wrapper']}>
                {imgs.map((img, i) => (
                    <div classes={[css.swiperSlide, 'swiper-slide']} key={'swiper-slide' + i}>
                        {/* <a href={img.clickable ? img.href : 'javascript:void;'}>
                            <img src={img.src} alt={img.alt} title={img.title}/>
                        </a> */}
                        <Link to={img.clickable ? img.href : 'javascript:void;'} isOutlet={false}>
                            <img src={img.src} alt={img.alt} title={img.title}/>
                        </Link>
                    </div>
                ))}
                </div>
                {/* <!-- Add Pagination --> */}
                <div classes={[css.swiperBtn, 'swiper-button-next']}></div>
                <div classes={[css.swiperBtn, 'swiper-button-prev']}></div>
                <div class='swiper-pagination'></div>
            </div>
        );
    }

}