import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin } from '@dojo/widget-core/mixins/Themed';
import * as css from './settings.m.css';
import { tsx } from '@dojo/widget-core//tsx';

export default class Settings extends ThemedMixin(WidgetBase) {
    private _pswData = {
        oldPsw: ''
    }
    private _changePsw() {
        
    }
    private _setPrivateSetting() {
        
    }
    protected render() {
        return (
            <div classes={css.root}>
                <div classes={css.content}>
                    {/* 实名认证 */}
                    <section classes={css.sec}>
                        <h3>实名认证</h3>
                    </section>
                    {/* 修改密码 */}
                    <section classes={css.sec}>
                        <h3>修改密码</h3>
                        <div>
                            <label classes={css.label}>原密码：</label><input classes={css.input} type="password"/><br/>
                            <label classes={css.label}>新密码：</label><input classes={css.input} type="password"/><br/>
                            <label classes={css.label}>确认密码：</label><input classes={css.input} type="password"/><br/>
                            <label classes={css.label}></label><span classes={css.btn} onclick={this._changePsw}>提交修改</span>
                        </div>
                    </section>
                    {/* 隐私设置 */}
                    <section classes={css.sec}>
                        <h3>隐私设置</h3>
                        <div>
                            <label classes={css.label2}>信息开放给非实名用户：</label>允许<input type="radio" name="authen"/> 不允许<input type="radio" name="authen"/><br/>
                            <label classes={css.label2}>开放给用户类型：</label><input />
                            <input type='button' onclick={this._setPrivateSetting}/>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}
