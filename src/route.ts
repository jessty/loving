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
				outlet: 'home',
				children: [

				]
			},
			{
				path: 'center',
				outlet: 'center',
				defaultParams: {tab: 'myMood'}
			},
			{
				path: 'center?{tab}',
				outlet: 'center',
				children: [
					
				]
			},
			{
				path: 'activity',
				outlet: 'activity',
				children: [

				]
            },
			{
				path: 'news',
				outlet: 'news',
				children: [

				]
			}
		]
	},
];

export default routeConfig;