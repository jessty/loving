import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { Link } from '@dojo/routing/Link';
import { tsx } from '@dojo/widget-core//tsx';
import { HomeOutlet } from './../../outlets/HomeOutlet';
import { CenterOutlet } from './../../outlets/center/CenterOutlet';
import { ActivityOutlet } from './../../outlets/ActivityOutlet';
import { NewsAreaOutlet } from './../../outlets/NewsAreaOutlet';
import * as css from './frame.m.css';

@theme(css)
export default class Frame extends ThemedMixin(WidgetBase) {
    protected render() {
        return (
            <div classes={css.root}>
                <div classes={css.navFixed}>
                    <nav>
                        <Link classes={css.logo} key='logo' to='home'></Link>
                        <a classes={[css.link, css.userSetting]}><img src='./../../assets/user-setting.svg'/></a>
                        <Link classes={css.link} key='news' to='news'>龙爱私房菜</Link>
                        <Link classes={css.link} key='activity' to='activity'>交友活动</Link>
                        <Link classes={css.link} key='center' to='center'>个人中心</Link>
                        <Link classes={css.link} key='login' to='login'>登录注册</Link>
                        <Link classes={css.link} key='home' to='home'>首页</Link>
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