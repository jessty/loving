import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { TypedTargetEvent } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
// import axois from 'axios';
import * as css from './login.m.css';
import { tsx } from '@dojo/widget-core//tsx';
import InformBlock from './../../widgets/informBlock/InformBlock';
import Upload from './../../widgets/upload/Upload';
import { basicInformTable } from './../../support/informTables';
import { Link } from '@dojo/routing/Link';

export interface LoginProp {
    login(form: Object): Promise<Object>;
    signup(form: Object): Promise<Object>;
    updateInform(table: string, inform: Object): Promise<Object>;
    identify(form: Object): Promise<Object>;
}
export interface logData {
    user: string;
    psw: string;
    confirmPsw: string;
    loginTime: Date;
    signupTime: Date;
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
    private _signup: Boolean = false;
    private _formData: Partial<logData> = {};
    private _initData: Object|undefined;
    private _idenData: Object;

    private _input({target}: TypedTargetEvent<HTMLInputElement>): void{
        let {name, value} = target;
        this._formData[name] = value;
    }
    private _submit(event: MouseEvent) {
        let { login, signup } = this.properties;
        if (this._signup) {
             signup(this._formData)
            .then((data) => {
                console.log(data);
                this._initData = data;
                this.invalidate();
                this._animateForword();
            })
            .catch((err) => {
                alert(err.response.data.msg);
            })

        } else {
            login(this._formData)
            .then((data) => {

            })
            .catch((err) => {
                alert(err.response.data.msg);
            })
        }
        event.preventDefault();
    }
    private _submitInform(inform: Object) {
        let {updateInform} = this.properties;
        updateInform('basic', inform)
        .then((data) => {
            console.log(data);
            this._animateForword();
        })
        .catch((err) => {
            console.error(err);
        });
    }
    private
    private _submitIden(inform: Object) {
        let {identify} = this.properties;
        identify(inform)
        .then((data) => {

        })
    }
    private _changeState() {
        this._signup = !this._signup;
        this.invalidate();
    }

    private _renderLogin() {
        return (
            <div classes={this.theme(css.filedWrapper)}>
                <div classes={[this.theme(css.field)]}>
                    <input placeholder='手机或邮箱' require='true' name='user' onchange={this._input}/>
                </div>
                <div classes={[this.theme(css.field)]}>
                    <input placeholder='密码' type='password' require='true' name='psw' onchange={this._input} />
                </div>
                <div classes={[this.theme(css.field)]}>
                    <button classes={this.theme(css.btn)} onclick={this._submit}>登录</button>
                </div>
            </div>
        );
    }
    private _rendersignup() {
        return (
            <div classes={this.theme(css.filedWrapper)}>
                <div classes={[this.theme(css.field)]}>
                    <input placeholder='手机或邮箱' require='true' name='user' onchange={this._input}/>
                </div>
                <div classes={[this.theme(css.field)]}>
                    <input placeholder='密码' type='password' require='true' name='psw' onchange={this._input} />
                </div>
                <div key='signup' classes={[this.theme(css.field)]}>
                    <input placeholder='确认密码' type='password' require='true' name='confirmPsw' onchange={this._input} />
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
                    {this._signup ? this._rendersignup() : this._renderLogin()}
                    <div classes={[this.theme(css.foot), css.footFixed]}>
                        <p key='2'>
                        {this._signup ? '已有账号？' : '没有帐号？'}
                        <span classes={this.theme(css.textBtn)} onclick={this._changeState}>{this._signup ? '登录' : '注册'}</span>
                        </p>
                    </div>
                </div>
                <div classes={[css.block, ...this._animateSecond()]}>
                    <h3>请填写{basicInformTable.title}</h3>
                    <InformBlock extraClasses={{'root': css.informBlock}} initState='edit' editable={true} readable={false} fields={basicInformTable.fields} initData={this._initData} onSubmit={this._submitInform}></InformBlock>
                </div>
                <div classes={[css.block, ...this._animateThird()]}>
                    <h3>实名认证</h3>
                    <h4>身份证正面</h4>
                    <Upload extraClasses={{'root': css.uploadRoot, 'img': css.uploadImg}} action='http://localhost:8800' multiple={false} accept='image/*'></Upload>
                    <h4>身份证背面</h4>
                    <Upload extraClasses={{'root': css.uploadRoot, 'img': css.uploadImg}} action='http://localhost:8800' multiple={false} accept='image/*'></Upload>
                    <a classes={[css.btn, css.finishBtn]} onclick={this}>提交</a> <Link classes={[css.btn, css.finishBtn]} key='home' to='home'>跳过</Link>
                </div>
            </div>
        );
    }
}