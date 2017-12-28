import { Outlet } from '@dojo/routing/Outlet';
import Frame from './../widgets/frame/Frame';
// import Home from './../widgets/home/Home';
import { MapParamsOptions } from '@dojo/routing/interfaces';

export const FrameOutlet = Outlet(Frame, 'frame', (options: MapParamsOptions) => {
    let { hash } = document.location;
    let regExp = /^#\/$/;
    if(hash == '' || regExp.test(hash)) {
        document.location.hash = '#/home';
    }
});
export default FrameOutlet;