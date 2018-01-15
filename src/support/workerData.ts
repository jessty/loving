export const basicInformTable = {
	title: '基本资料',
	fields: {
		nickName: {
			type: 'textinput',
			label: '昵称：',
			value: 'star',
		},
		marital_status: {
			type: 'select',
			label: '婚姻状况：',
			value: undefined,
			choises: [ '未婚', '已婚', '离异', '丧偶']
		},
		purpose: {
			type: 'select',
			label: '寻找：',
			value: undefined,
			choises: [ '不定', '知己', '恋人', '伴侣']
		},
		gender: {
			type: 'select',
			label: '性别：',
			value: undefined,
			choises: [ '男', '女']
		},
		birthday: {
			type: 'textinput',
			label: '生日：',
			value: '2018/1/14'
		},
		weight: {
			type: 'textinput',
			label: '体重：',
			value: 175,
		},
		height: {
			type: 'textinput',
			label: '身高：',
			value: 175,
		},
		education: {
			type: 'select',
			label: '学历：',
			value: undefined,
			choises: [ '高中及以下', '中专', '大专', '本科', '硕士', '博士']
		},
		salary: {
			type: 'select',
			label: '月薪：',
			value: undefined,
			choises: [ '2000元以下', '2000-5000元', '5000-10000元', '10000-15000元', '15000-20000元', '20000-50000元', '50000元以上']
		},
		livingplace: {
			type: 'textinput',
			label: '现居地：',
			value: '广东广州',
		}
	}
};
export const allTable = [basicInformTable];
export const detailInformTable = [
	{
		type: 'textarea',
		label: '',
		value: '',
	},
	{
		type: 'select',
		label: '',
		choises: [
			{
				label: '',
				value: ''
			}
		]
	}
	{
		firstName: 'Tim',
		lastName: 'Jones',
		email: 'tim.jones@bizecorp.org',
		tasks: [
			'6267 - Untangle paperclips',
			'4384 - Shred documents',
			'9663 - Digitize 1985 archive'
		]
	},
	{
		firstName: 'Alicia',
		lastName: 'Fitzgerald'
	},
	{
		firstName: 'Hans',
		lastName: 'Mueller'
	}
];

// export default workerData;