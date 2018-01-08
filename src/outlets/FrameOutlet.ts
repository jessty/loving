import { Outlet } from '@dojo/routing/Outlet';
import Frame from './../pages/frame/Frame';
// import Home from './../widgets/home/Home';
import { MapParamsOptions } from '@dojo/routing/interfaces';

export const FrameOutlet = Outlet(Frame, 'frame', (options: MapParamsOptions) => {
    console.log('option', options);
    let { hash } = document.location;
    let regExp = /^#\/$/;
    if(hash === '' || regExp.test(hash)) {
        document.location.hash = '#/home';
    }else {
        regExp = /^#\/([a-zA-Z]+)\/{0,1}/;
        let result = regExp.exec(hash);
        if(result) {
            return {subpath: result[1]};
        }else {
            throw Error('Error: FrameOutlet can not get subpath');
            // document.location.hash = '#/home';
        }
        
    }
});
export default FrameOutlet;