import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { TypedTargetEvent } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
// import axois from 'axios';
import * as css from './login.m.css';
import { tsx } from '@dojo/widget-core//tsx';
import InformBlock from './../../widgets/informBlock/InformBlock';
import Upload from './../../widgets/upload/Upload';

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
    private _animationState = 0;
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
        this._animateForword();
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
    private _animateFirst(): Array<string> {
        if(this._animationState >= 1) {
            return ['animated', 'bounceOutLeft'];
        }else {
            return ['animated'];
        }
    }
    private _animateSecond(): Array<string> {
        if(this._animationState === 0) {
            return ['animated', css.animateHidden];
        }else if(this._animationState === 1) {
            return ['animated', 'bounceInRight'];
        }else{
            return ['animated', 'bounceOutLeft'];
        }
    }
    private _animateThird(): Array<string> {
        if(this._animationState <= 1) {
            return ['animated', css.animateHidden];
        }else {
            return ['animated', 'bounceInRight'];
        }
    }
    private _animateForword() {
        this._animationState = (this._animationState + 1) % 3;
        this.invalidate();
    }
    private _animateBack() {
        if (this._animationState === 0) {
            return;
        }
        this._animationState = (this._animationState - 1) % 3;
        this.invalidate();
    }
    protected render() {
        return (
            <div classes={[this.theme(css.root), css.rootFixed]}>
                <div classes={[this.theme(css.form), css.block, ...this._animateFirst()]}>
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
                <div classes={[css.block, ...this._animateSecond()]}>
                    <h3>请填写基本资料</h3>
                    <InformBlock extraClasses={{'root': css.informBlock}} initState='edit' editable={true} readable={false} fields={this._fields} onSubmit={this._animateForword.bind(this)} onCancel={this._animateBack.bind(this)}></InformBlock>
                </div>
                <div classes={[css.block, ...this._animateThird()]}>
                    <h3>实名认证</h3>
                    <h4>身份证正面</h4>
                    <Upload extraClasses={{'root': css.uploadRoot, 'img': css.uploadImg}} action='http://localhost:8800' multiple={false} accept='image/*' onceChoose={false}></Upload>
                    <h4>身份证背面</h4>
                    <Upload extraClasses={{'root': css.uploadRoot, 'img': css.uploadImg}} action='http://localhost:8800' multiple={false} accept='image/*' onceChoose={false}></Upload>
                </div>
            </div>
        );
    }
}