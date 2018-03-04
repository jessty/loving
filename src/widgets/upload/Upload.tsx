import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { tsx } from '@dojo/widget-core//tsx';
import * as css from './upload.m.css';
// import afterRender from "@dojo/widget-core/decorators/afterRender";
import axois from 'axios';

export interface UploadProp {
    action: string;
    initImgs?: Array<string>;
    imgsMaxNum?: number;
    accept: string;
    multiple?: boolean;
    clickItem?: (item: any, i: number, items: Array<any>) => void;
    numHint?:boolean;
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
    private _action: string;
    private _imgsMaxNum: number = 1;
    private _leftNum: number = 1;
    private _accept: string;
    private _multiple: boolean = false;
    // private _once: number = 1;
    private _random: number = 0;
    private _initial: boolean = false;
    private _numHint: boolean = true;

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
            this._leftNum--;
            this.invalidate();
        });

        console.log('imgs',this._leftNum , this._imgs);
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
        this._initial = true;
        let {
            initImgs,
            imgsMaxNum,
        } = this.properties;

        if(initImgs) {
            initImgs.forEach(img => {
                let imgInform = Object.assign(img, {
                    name: '',
                    state: 'succeed',//doing, succeed, fail
                    process: 1,
                    binaryData: undefined
                });
                this._imgs.push(imgInform);
            });
            let length = initImgs.length;
            let maxNum = imgsMaxNum ? imgsMaxNum : this._imgsMaxNum;
            if(maxNum < length) {
                throw Error(`ImgsMaxNum:${maxNum} should be larger than initImgs.length:${length}!`);
            }
            this._imgsMaxNum = maxNum;
            this._leftNum = maxNum - length;
        } else {
            this._imgsMaxNum = imgsMaxNum ? imgsMaxNum : this._imgsMaxNum;
            this._leftNum = this._imgsMaxNum;
        }

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
    private _clickItem(img: any, i: number, imgs: Array<any>) {
        let {clickItem} = this.properties;
        let imgUrl = img.url;
        let imgUrls = imgs.map((img) => img.url);
        clickItem ? clickItem(imgUrl, i, imgUrls) : null;
    }
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
        // console.log('upload', this._onceChoose && this._once === 0, this._onceChoose, this._once );
        let {
            action,
            accept,
            multiple,
            numHint
        } = this.properties;

        this._action = action;
        this._accept = accept;
        this._multiple = multiple || false;
        this._numHint = numHint || true;

        return (
            <ul classes={[this.theme(css.root), css.rootFixed]}>
                {this._imgs.map((img, i, imgs) => (
                    <li key={`img${this._random}${i}`} classes={[this.theme(css.img), css.imgFixed]}>
                        <img classes={img.state !== 'succeed' ? css.imgBlur : ''} src={img.url} onclick={()=>{this._clickItem(img, i, imgs)}}/>
                        {this._numHint && img.state !== 'succeed' ? (
                            this._renderImgCover(img, i)
                        ) : null}
                        {/* <span classes={css.deleteIcon}>X</span> */}
                    </li>
                ))}
                { this._leftNum <= 0 ? null : (
                    <li classes={[this.theme(css.img), css.uploadBtn]}>
                        <input type='file' multiple={this._multiple} accept={this._accept} onchange={this._chooseFile.bind(this)}/>
                    </li>
                )}
                <div>

                </div>
            </ul>
        );
    }
}