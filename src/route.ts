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
				path: 'center/{tab}?{id}',
				outlet: 'center',
				children: [
					
				]
			},
			{
				path: 'center/{tab}',
				outlet: 'center',
				children: [
					
				]
			},
			{
				path: 'center',
				outlet: 'center',
				defaultParams: {tab: 'myMood'}
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
			},
			{
				path: 'settings',
				outlet: 'settings',
				children: [

				]
			}
		]
	},
];

export default routeConfig;