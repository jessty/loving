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
			value: '广东广州'
		}
	}
};

export const detailInformTable = {
	title: '详细资料',
	fields:{
		birthplace: {
			type: 'textinput',
			label: '出生地：',
			value: '广东广州',
		},
		domicile: {
			type: 'textinput',
			label: '户口地：',
			value: '广东广州',
		},
		nation: {
			type: 'select',
			label: '月薪：',
			value: undefined,
			choises: [ '2000元以下', '2000-5000元', '5000-10000元', '10000-15000元', '15000-20000元', '20000-50000元', '50000元以上']
		},
		blood: {
			type: 'select',
			label: '血型：',
			value: undefined,
			choises: [ 'A型', 'B型', 'AB型', 'O型', '其他血型']
		},
		religion: {
			type: 'select',
			label: '宗教信仰：',
			value: undefined,
			choises: [ '无', '佛教', '基督教', '天主教', '伊斯兰教', '犹太教', '其他宗教']
		},
		"house_status": {
			type: 'select',
			label: '住房状况：',
			value: undefined,
			choises: [ '已购', '租房', '单位宿舍', '家人同住']
		},
		"car_status": {
			type: 'select',
			label: '车辆状况：',
			value: undefined,
			choises: [ '未购车', '已购车', '不透露']
		}
	}
};

export const familyInformTable = {
	title: '家庭状况',
	fields: {
		parent: {
			type: 'select',
			label: '家庭状况：',
			value: undefined,
			choises: [ '单亲家庭', '双亲家庭']
		},
		rank: {
			type: 'select',
			label: '家中排行：',
			value: undefined,
			choises: [ '老大', '老二', '老三', '其他', '老幺']
		},
		child: {
			type: 'select',
			label: '子女情况：',
			value: undefined,
			choises: [ '无', '有，归自己', '有，归对方']
		},
		address: {
			type: 'textinput',
			label: '家庭住址：',
			value: '广东广州',
		},
	}
};

export const loveStatusTable = {
	title: '恋爱状况',
	fields: {
		"single_duration": {
			type: 'select',
			label: '单身时间：',
			value: undefined,
			choises: [ '一直单身', '三个月以内', '一年以内', '三年以内', '其他']
		},
		"love_times": {
			type: 'select',
			label: '恋爱次数：',
			value: undefined,
			choises: [ '无', '1~2次', '3次以上']
		},
		reson: {
			type: 'textarea',
			label: '上次失败原因：',
			value: "undefined"
		},
		"love_factor": {
			type: 'textarea',
			label: '恋爱因素：',
			value: "undefined"
		}
	}
};

export const habitHobbyTable = {
	title: '兴趣爱好',
	fields: {
		smoke: {
			type: 'select',
			label: '是否吸烟：',
			value: undefined,
			choises: [ '不吸烟', '偶尔吸烟', '经常吸烟']
		},
		drink: {
			type: 'select',
			label: '是否饮酒：',
			value: undefined,
			choises: [ '不饮酒', '偶尔饮酒', '经常饮酒']
		},
		schedule: {
			type: 'select',
			label: '作息习惯：',
			value: undefined,
			choises: [ '作息规律', '偶尔熬夜', '经常熬夜']
		},
		housework: {
			type: 'select',
			label: '是否做家务：',
			value: undefined,
			choises: [ '经常做家务', '偶尔做家务', '很少做家务']
		},
		cooking: {
			type: 'select',
			label: '烹饪：',
			value: undefined,
			choises: [ '经常烹饪', '偶尔烹饪', '很少烹饪']
		},
		pet: {
			type: 'select',
			label: '是否养宠物：',
			value: undefined,
			choises: [ '是', '否']
		},
		travel: {
			type: 'select',
			label: '外出旅游：',
			value: undefined,
			choises: [ '经常', '偶尔', '很少']
		},
		sport: {
			type: 'textarea',
			label: '体育爱好：',
			value: '',
		},
		book: {
			type: 'textarea',
			label: '书籍喜好：',
			value: '',
		},
		movie: {
			type: 'textarea',
			label: '电影喜好：',
			value: '',
		},
		music: {
			type: 'textarea',
			label: '音乐喜好：',
			value: '',
		}
	}
};

export const maritalExpectationIDTable = {
	title: '婚姻期望',
	fields: {
		"marital_time": {
			type: 'select',
			label: '结婚时间：',
			value: undefined,
			choises: [ '看情况', '一年内', '三年内']
		},
		"live_with_parent": {
			type: 'select',
			label: '婚后父母情况：',
			value: undefined,
			choises: [ '未定', '单独居住', '与父母同住']
		},
		"children_num": {
			type: 'select',
			label: '孩子个数：',
			value: undefined,
			choises: [ '未定', '1~2个', '更多']
		},
		"wedding": {
			type: 'textarea',
			label: '期望婚礼：',
			value: ''
		},
		"opion": {
			type: 'textarea',
			label: '婚姻观点：',
			value: ''
		}
	}
};

export const allTable = [basicInformTable, detailInformTable, familyInformTable, habitHobbyTable, loveStatusTable, maritalExpectationIDTable];