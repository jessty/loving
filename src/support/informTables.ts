export const basicInformTable = {
	title: '基本资料',
	fields: {
		nickname: {
			type: 'textinput',
			label: '昵称：',
			value: 'star',
		},
		maritalStatus: {
			type: 'select',
			label: '婚姻状况：',
			value: 0,
			choises: [ '未选', '未婚', '已婚', '离异', '丧偶']
		},
		purpose: {
			type: 'select',
			label: '寻找：',
			value: 0,
			choises: [ '未选', '不定', '知己', '恋人', '伴侣']
		},
		gender: {
			type: 'select',
			label: '性别：',
			value: 0,
			choises: [ '未选', '男', '女']
		},
		birthday: {
			type: 'textinput',
			label: '生日：',
			value: null
		},
		weight: {
			type: 'textinput',
			label: '体重：',
			value: null,
		},
		height: {
			type: 'textinput',
			label: '身高：',
			value: null,
		},
		education: {
			type: 'select',
			label: '学历：',
			value: 0,
			choises: ['未选', '高中及以下', '中专', '大专', '本科', '硕士', '博士']
		},
		salary: {
			type: 'select',
			label: '月薪：',
			value: 0,
			choises: [ '未选', '2000元以下', '2000-5000元', '5000-10000元', '10000-15000元', '15000-20000元', '20000-50000元', '50000元以上']
		},
		livingPlace: {
			type: 'textinput',
			label: '现居地：',
			value: null
		}
	}
};

export const detailInformTable = {
	title: '详细资料',
	fields: {
		birthplace: {
			type: 'textinput',
			label: '出生地：',
			value: null,
		},
		domicile: {
			type: 'textinput',
			label: '户口地：',
			value: null,
		},
		nation: {
			type: 'select',
			label: '月薪：',
			value: 0,
			choises: [ '未选',
			'汉族', '壮族', '满族', '回族', '苗族', '维吾尔族',
			'土家族', '彝族', '蒙古族', '藏族', '布依族', '侗族',
			'瑶族', '朝鲜族', '白族', '哈尼族', '哈萨克族', '黎族',
			'傣族', '畲族', '傈僳族', '仡佬族', '东乡族', '高山族',
			'拉祜族', '水族', '佤族', '纳西族', '羌族', '土族',
			'仫佬族', '锡伯族', '柯尔克孜族', '达斡尔族', '景颇族', '毛南族',
			'撒拉族', '塔吉克族', '阿昌族', '普米族', '鄂温克族', '怒族',
			'京族', '基诺族', '德昂族', '保安族', '俄罗斯族', '裕固族',
			'乌兹别克族', '门巴族', '鄂伦春族', '独龙族', '塔塔尔族', '赫哲族',
			'珞巴族', '布朗族']
		},
		blood: {
			type: 'select',
			label: '血型：',
			value: 0,
			choises: [ '未选', 'A型', 'B型', 'AB型', 'O型', '其他血型']
		},
		religion: {
			type: 'select',
			label: '宗教信仰：',
			value: 0,
			choises: [ '未选', '无', '佛教', '基督教', '天主教', '伊斯兰教', '犹太教', '其他宗教']
		},
		houseStatus: {
			type: 'select',
			label: '住房状况：',
			value: 0,
			choises: [ '未选', '已购', '租房', '单位宿舍', '家人同住']
		},
		carStatus: {
			type: 'select',
			label: '车辆状况：',
			value: 0,
			choises: [ '未选', '未购车', '已购车', '不透露']
		}
	}
};

export const familyInformTable = {
	title: '家庭状况',
	fields: {
		parent: {
			type: 'select',
			label: '家庭状况：',
			value: 0,
			choises: [ '未选', '单亲家庭', '双亲家庭']
		},
		familyRank: {
			type: 'select',
			label: '家中排行：',
			value: 0,
			choises: [ '未选', '老大', '老二', '老三', '其他', '老幺']
		},
		child: {
			type: 'select',
			label: '子女情况：',
			value: 0,
			choises: [ '未选', '无', '有，归自己', '有，归对方']
		},
		address: {
			type: 'textinput',
			label: '家庭住址：',
			value: null,
		},
	}
};

export const loveStatusTable = {
	title: '恋爱状况',
	fields: {
		singleDuration: {
			type: 'select',
			label: '单身时间：',
			value: 0,
			choises: [ '未选', '一直单身', '三个月以内', '一年以内', '三年以内', '其他']
		},
		loveTimes: {
			type: 'select',
			label: '恋爱次数：',
			value: 0,
			choises: [ '未选', '无', '1~2次', '3次以上']
		},
		reson: {
			type: 'textarea',
			label: '上次失败原因：',
			value: null
		},
		loveFactors: {
			type: 'textarea',
			label: '恋爱因素：',
			value: null
		}
	}
};

export const habitHobbyTable = {
	title: '兴趣爱好',
	fields: {
		smoke: {
			type: 'select',
			label: '是否吸烟：',
			value: 0,
			choises: [ '未选', '不吸烟', '偶尔吸烟', '经常吸烟']
		},
		drink: {
			type: 'select',
			label: '是否饮酒：',
			value: 0,
			choises: [ '未选', '不饮酒', '偶尔饮酒', '经常饮酒']
		},
		schedule: {
			type: 'select',
			label: '作息习惯：',
			value: 0,
			choises: [ '未选', '作息规律', '偶尔熬夜', '经常熬夜']
		},
		housework: {
			type: 'select',
			label: '是否做家务：',
			value: 0,
			choises: [ '未选', '经常做家务', '偶尔做家务', '很少做家务']
		},
		cooking: {
			type: 'select',
			label: '烹饪：',
			value: 0,
			choises: [ '未选', '经常烹饪', '偶尔烹饪', '很少烹饪']
		},
		pet: {
			type: 'select',
			label: '是否养宠物：',
			value: 0,
			choises: [ '未选', '是', '否']
		},
		travel: {
			type: 'select',
			label: '外出旅游：',
			value: 0,
			choises: [ '未选', '经常', '偶尔', '很少']
		},
		sports: {
			type: 'textarea',
			label: '体育爱好：',
			value: null,
		},
		books: {
			type: 'textarea',
			label: '书籍喜好：',
			value: null,
		},
		movies: {
			type: 'textarea',
			label: '电影喜好：',
			value: null,
		},
		music: {
			type: 'textarea',
			label: '音乐喜好：',
			value: null,
		}
	}
};

export const maritalExpectationIDTable = {
	title: '婚姻期望',
	fields: {
		maritalTime: {
			type: 'select',
			label: '结婚时间：',
			value: 0,
			choises: [ '未选', '一年内', '三年内', '看情况']
		},
		withParent: {
			type: 'select',
			label: '婚后父母情况：',
			value: 0,
			choises: [ '未选', '单独居住', '与父母同住', '看情况']
		},
		childrenNum: {
			type: 'select',
			label: '孩子个数：',
			value: 0,
			choises: [ '未选', '1~2个', '更多', '看情况']
		},
		wedding: {
			type: 'textarea',
			label: '期望婚礼：',
			value: null
		},
		opion: {
			type: 'textarea',
			label: '婚姻观点：',
			value: null
		}
	}
};

export const allTable = [basicInformTable, detailInformTable, familyInformTable, habitHobbyTable, loveStatusTable, maritalExpectationIDTable];