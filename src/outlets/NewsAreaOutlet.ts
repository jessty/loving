import { Outlet } from '@dojo/routing/Outlet';
import NewsArea from './../pages/news/NewsArea';

export const NewsAreaOutlet = Outlet(NewsArea, 'news');
export default NewsAreaOutlet;