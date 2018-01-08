import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { Link } from '@dojo/routing/Link';
import { tsx } from '@dojo/widget-core//tsx';
import { HomeOutlet } from './../../outlets/HomeOutlet';
import { CenterOutlet } from './../../outlets/center/CenterOutlet';
import { ActivityOutlet } from './../../outlets/ActivityOutlet';
import { NewsAreaOutlet } from './../../outlets/NewsAreaOutlet';
import * as css from './frame.m.css';
export interface FrameProp {
    subpath: string;
}
@theme(css)
export default class Frame extends ThemedMixin(WidgetBase)<FrameProp> {
    protected render() {
        let {subpath} = this.properties;
        console.log('subpath',subpath);
        return (
            <div classes={css.root}>
                <div classes={css.navFixed}>
                    <nav>
                        <Link classes={css.logo} key='logo' to='home'></Link>
                        <Link classes={[css.link, css.settings,(subpath === 'settings' ? css.activeLink : '')]} key='settings' to='settings'></Link>
                        <Link classes={[css.link,(subpath === 'news' ? css.activeLink : '')]} key='news'  to='news'>龙爱私房菜</Link>
                        <Link classes={[css.link,(subpath === 'activity' ? css.activeLink : '')]} key='activity' to='activity'>交友活动</Link>
                        <Link classes={[css.link,(subpath === 'center' ? css.activeLink : '')]} key='center' to='center'>个人中心</Link>
                        <Link classes={[css.link,(subpath === 'login' ? css.activeLink : '')]} key='login' to='login'>登录注册</Link>
                        <Link classes={[css.link,(subpath === 'home' ? css.activeLink : '')]} key='home' to='home'>首页</Link>
                    </nav>
                 </div>
                <section>
                    <HomeOutlet></HomeOutlet>
                    <CenterOutlet></CenterOutlet>
                    <ActivityOutlet></ActivityOutlet>
                    <NewsAreaOutlet></NewsAreaOutlet>
                </section>
            </div>
        );
    }
}