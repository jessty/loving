import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { tsx } from '@dojo/widget-core//tsx';
import * as css from './upload.m.css';
import afterRender from "@dojo/widget-core/decorators/afterRender";
import beforeRender from "@dojo/widget-core/decorators/afterRender";
import beforeProperties from "@dojo/widget-core/decorators/afterRender";
// import afterRender from "@dojo/widget-core/decorators/afterRender";
import axois from 'axios';

export interface UploadProp {
    action: string;
    initImgs?: Array<string>;
    onceChoose?: boolean;
    accept: string;
    multiple: boolean;
}
@theme(css)
export default class Upload extends ThemedMixin(WidgetBase)<UploadProp> {
    private _imgs: Array<any> = [
        // {
        //     url: './../../assets/pic1.jpg',
        //     state: 'fail',//doing, succeed, fail
        //     process: 0.2,
        // },
        // {
        //     url: './../../assets/pic1.jpg',
        //     state: 'doing',//doing, succeed, fail
        //     process: 0.2,
        // }
    ]
    private _accept: string = 'image/*';
    private _random: number = 0;
    private _action: string = 'http://localhost:8800/';
    private _initial: boolean = false;
    private _onceChoose: boolean = true;
    private _once: number = 1;
    private _multiple: boolean = false;

    constructor() {
        super();
        console.log('constructor', this.properties);
    }

    private _upload(img: any) {
        let data = new FormData();
        data.append('img', img.binaryData);
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 5000,
            onUploadProgress: (process: any) => {
                if(!process.lengthComputable) {
                    return;
                }
                let { loaded, total } = process;
                let currentProcess = Number(((total - loaded) / total).toFixed(2));
                console.log('currentProcess', currentProcess);
                let span = Math.floor((currentProcess - img.process) * 10);
                if(span > 0) {
                    img.process = currentProcess;
                    this.invalidate();
                }
            }
        };
        axois.post(
            this._action,
            data,
            config
        ).then((res) => {
            console.log('res', res);
            let id = res.data.id;
            img.id = id;
            img.state = 'succeed';
            this.invalidate();
        }).catch((err) => {
            console.log('res', err);
            img.state = 'fail';
            img.process = 0;
            this.invalidate();
        });
    }

    private _reUpload({target}: MouseEvent) {
        let li = target.closest('li');
        let lis = Array.from(li.parentElement.children);
        let index = lis.indexOf(li);
        let img = this._imgs[index];
        img.state = 'doing';
        this.invalidate();
        this._upload(img);
    }
    private _chooseFile({target:{files}}: any) {
        // console.log(target.files);
        files = Array.from(files);
        files.forEach((file: File) => {
            let img = {
                id: undefined,
                name: file.name,
                url: URL.createObjectURL(file),
                state: 'doing',//doing, succeed, fail
                process: 0,
                binaryData: file
            };
            this._imgs.push(img);
            this._upload(img);
            this._onceChoose ? this._once-- : null;
            this.invalidate();
        });
        
        console.log('imgs', this._imgs);
    }
    private _renderImgCover(img: any, i: number) {
        if(img.state === 'fail') {
            return (
                <span classes={css.imgCover} onclick={this._reUpload}>
                    <span>上传失败<br/>点击重传</span>
                </span>
            );
        } else {
            return (
                <span classes={css.imgCover} onclick={() => {}}>
                    {`${img.process * 100}%`}
                </span>
            );
        }
    }
    protected initialize() {
        this._random === 0 ? (Math.random() * 1000 + 1) : this._random;
        
        console.log('afterConstructor', this.properties);
    }
    // @beforeProperties()
    // protected mybeforeProperties(properties: UploadProp) {
    //     console.log('beforeProp', this.properties);
    //     return properties;
    // }
    // @beforeRender()
    // protected myBeforeRender(renderFunc: () => any, prop: any, children: any[]) {
    //     console.log('beforeRender', this.properties);
    //     return renderFunc;
    // }
    // @afterRender()
    // protected myAfterRender(result: any) {
    //     console.log('afterRender', this.properties);
    //     return result;
    // }

    // onAttach() {
    //     // let {
    //     //     initImgs: _imgs,
    //     //     action: _action,
    //     //     onceChoose,
    //     //     accept: _accept
    //     // } = this.properties;
    //     // this.
    //     console.log('onAttach', this.properties);
    // }
    // onDetach() {
    //     console.log('onDetach', this.properties);
    // }
    protected render() {
        console.log('render', this.properties);
        this._initial ? null : this.initialize();
        // this._imgs =this.properties.initImgs ? this.properties.initImgs.map((img)=>{
        //     return Object.assign(img, {
        //         state: 'succeed',//doing, succeed, fail
        //         process: 1,
        //         binaryData: undefined
        //     });
        // }) : [];
        return (
            <ul classes={[this.theme(css.root), css.rootFixed]}>
                {this._imgs.map((img, i) => {
                    return (
                        <li key={`img${this._random}${i}`} classes={[this.theme(css.img), css.imgFixed]}>
                            <img classes={img.state !== 'succeed' ? css.imgBlur : ''} src={img.url}/>
                            {img.state !== 'succeed' ? (
                                this._renderImgCover(img, i)
                            ) : null}
                            {/* <span classes={css.deleteIcon}>X</span> */}
                        </li>
                    );
                })}
                {this._onceChoose && this._once === 0 ? null : (
                    <li classes={[this.theme(css.img), css.uploadBtn]}>
                        <input type='file' multiple={this._multiple} accept={this._accept} onchange={this._chooseFile}/>
                    </li>
                )}
            </ul>
        );
    }
}