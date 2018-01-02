import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { TypedTargetEvent } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
// import axois from 'axios';
import * as css from './login.m.css';
import { tsx } from '@dojo/widget-core//tsx';
import InformBlock from './../../widgets/informBlock/InformBlock';

export interface LoginProp {
    
}
export interface LoginData {
    account: string;
    psw: string;
    confirmPsw: string;
}
export const LoginBase = ThemedMixin(WidgetBase);

@theme(css)
export default class Login extends LoginBase<LoginProp> {
    private _fields = [
        {
            type: 'select',
            label: '姓名：',
            result: {
                label: 'foo',
                value: '11'
            },
            choises: [
                {
                    label: 'foo',
                    value: '11'
                },
                {
                    label: 'boo',
                    value: '22'
                },
                {
                    label: 'baz',
                    value: '33'
                }
            ]
        },
        {
            type: 'textinput',
            label: '留言：',
            key: 'msg',
            value: 'hello!'
        },
        {
            type: 'textarea',
            label: '留言：',
            key: 'msg',
            value: 'hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：hello!hello!hello!hello!hello!留言：留言：留言：'
        }
    ]
    private _signin: Boolean = false;
    private _formData: Partial<LoginData> = {};
    protected inputAccount({target:{value}}: TypedTargetEvent<HTMLInputElement>): void{
        this._formData.account = value;
    }
    protected inputPsw({target:{value}}: TypedTargetEvent<HTMLInputElement>): void{
        this._formData.psw = value;
    }
    protected inputConfirmPsw({target:{value}}: TypedTargetEvent<HTMLInputElement>): void{
        this._formData.confirmPsw = value;
    }
    private _submit(event: MouseEvent) {
        event.preventDefault();
        console.log('click');
    }
    private _changeState() {
        this._signin = !this._signin;
        this.invalidate();
    }

    private _renderLogin() {
        return (
            <div classes={this.theme(css.filedWrapper)}>
                <div classes={[this.theme(css.field)]}>
                    {/* <label>帐号：</label> */}
                    <input placeholder='手机或邮箱' require='true' onchange={this.inputAccount}/>
                </div>
                <div classes={[this.theme(css.field)]}>
                    {/* <label>密码：</label> */}
                    <input placeholder='密码' type='password' onchange={this.inputPsw} />
                </div>
                <div classes={[this.theme(css.field)]}>
                    <button classes={this.theme(css.btn)} onclick={this._submit}>登录</button>
                </div>
            </div>
        );
    }
    private _renderSignin() {
        return (
            <div classes={this.theme(css.filedWrapper)}>
                <div classes={[this.theme(css.field)]}>
                    <input placeholder='手机或邮箱' onchange={this.inputAccount}/>
                </div>
                <div classes={[this.theme(css.field)]}>
                    <input placeholder='密码' type='password' onchange={this.inputPsw} />
                </div>
                <div key='signin' classes={[this.theme(css.field)]}>
                    <input placeholder='确认密码' type='password' onchange={this.inputConfirmPsw} />
                </div>
                <div classes={[this.theme(css.field)]}>
                    <button classes={this.theme(css.btn)} onclick={this._submit}>注册</button>
                </div>
            </div>
        );
    }

    protected render() {
        return (
            <div classes={[this.theme(css.root), css.rootFixed]}>
                <div classes={[this.theme(css.form), css.signinBlock]}>
                    <div classes={[this.theme(css.head), css.headFixed]}>
                        <h1></h1>
                        {/* <img src=""/> */}
                        <h2>Find the love in the whole life</h2>
                    </div>
                    {this._signin ? this._renderSignin() : this._renderLogin()}
                    <div classes={[this.theme(css.foot), css.footFixed]}>
                        <p key='2'>
                        {this._signin ? '已有账号？' : '没有帐号？'}
                        <span classes={this.theme(css.textBtn)} onclick={this._changeState}>{this._signin ? '登录' : '注册'}</span>
                        </p>
                    </div>
                </div>
                <div classes={css.signinBlock}>
                    <InformBlock fields={this._fields}></InformBlock>
                </div>
                <div classes={css.signinBlock}>
                    <InformBlock fields={this._fields}></InformBlock>
                </div>
            </div>
        );
    }
}