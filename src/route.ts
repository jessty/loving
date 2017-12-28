

export const routeConfig = [
	{
		path: '/login',
		outlet: 'login'
	},
    {
		path: '/',
		outlet: 'frame',
		children: [
            {
                path: 'home',
				outlet: 'home'
            },
			{
				path: 'center',
				outlet: 'center'
			},
			{
				path: 'activity',
				outlet: 'activity'
            },
			{
				path: 'news',
				outlet: 'news'
			}
		]
	},
   
];

export default routeConfig;