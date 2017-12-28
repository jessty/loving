import { Outlet } from '@dojo/routing/Outlet';
import NewsArea from './../widgets/news/NewsArea';

export const NewsAreaOutlet = Outlet(NewsArea, 'news');
export default NewsAreaOutlet;