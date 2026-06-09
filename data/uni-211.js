/*
 * uni-211.js —— 扩充批次 ①：重点理工 / 综合类 211 与各省旗舰双一流（已深化）
 * 字段 schema 见 universities.js。分数为 2025 重庆·参考整理值，仅供定位。
 */
window.UNIVERSITIES.push(

  // ===== 北京 =====
  { id:'bupt', name:'北京邮电大学', en:'Beijing University of Posts and Telecommunications', abbr:'北邮', enAbbr:'BUPT', province:'北京', city:'北京', lng:116.356, lat:39.961, founded:1955,
    type:'理工', admin:'教育部', tags:['211','双一流','两电一邮'], tier:4,
    firstClass:['信息与通信工程','计算机科学与技术'], aplus:['信息与通信工程'], a:['计算机科学与技术'], aminus:['电子科学与技术','光学工程'],
    score:{ wl:{min:628,rank:8500}, ls:null },
    emp:'「两电一邮」之一，信息通信与计算机就业极强。华为、运营商与头部互联网大厂高薪去向集中，性价比口碑极佳。',
    intro:'1955 年创建，新中国第一所邮电高等学府，信息通信领域的行业王者。信息与通信工程全国顶尖，是 IT 与通信产业的「黄金跳板」。' },

  { id:'bjtu', name:'北京交通大学', en:'Beijing Jiaotong University', abbr:'北交大', enAbbr:'BJTU', province:'北京', city:'北京', lng:116.343, lat:39.951, founded:1896,
    type:'理工', admin:'教育部', tags:['211','双一流'], tier:4,
    firstClass:['系统科学'], aplus:['系统科学'], a:[], aminus:['交通运输工程','信息与通信工程','土木工程'],
    score:{ wl:{min:608,rank:14500}, ls:{min:585,rank:5500} },
    emp:'轨道交通与信息领域强，铁路系统、城轨与基建央企去向稳定，京内就业认可度高。',
    intro:'前身为 1896 年的铁路管理传习所，中国近代铁路与电信教育发祥地之一。系统科学全国第一，轨道交通与信息特色鲜明。' },

  { id:'ustb', name:'北京科技大学', en:'University of Science and Technology Beijing', abbr:'北科大', enAbbr:'USTB', province:'北京', city:'北京', lng:116.359, lat:39.991, founded:1952,
    type:'理工', admin:'教育部', tags:['211','双一流'], tier:4,
    firstClass:['科学技术史','冶金工程','材料科学与工程','矿业工程'], aplus:['科学技术史','冶金工程'], a:['材料科学与工程','矿业工程','安全科学与工程'], aminus:['机械工程','控制科学与工程'],
    score:{ wl:{min:600,rank:17000}, ls:null },
    emp:'冶金材料全国顶尖，钢铁、新材料与制造行业「黄埔军校」，深造率高。',
    intro:'1952 年由多校矿冶系科组建，原「北京钢铁学院」。冶金工程、材料科学全国领先，是钢铁与新材料行业的人才与科研重镇。' },

  { id:'buct', name:'北京化工大学', en:'Beijing University of Chemical Technology', abbr:'北化工', enAbbr:'BUCT', province:'北京', city:'北京', lng:116.349, lat:39.951, founded:1958,
    type:'理工', admin:'教育部', tags:['211','双一流'], tier:4,
    firstClass:['化学工程与技术'], aplus:[], a:['化学工程与技术'], aminus:['材料科学与工程','化学'],
    score:{ wl:{min:588,rank:23000}, ls:null },
    emp:'化工与材料强，能源化工、制药与新材料行业去向，深造比例较高。',
    intro:'1958 年创建的化工行业重点高校。化学工程与技术、高分子材料见长，在能源化工与生物制药领域优势突出。' },

  { id:'ncepu', name:'华北电力大学', en:'North China Electric Power University', abbr:'华电', enAbbr:'NCEPU', province:'北京', city:'北京', lng:116.349, lat:40.063, founded:1958,
    type:'理工', admin:'教育部', tags:['211','双一流'], tier:4,
    firstClass:['电气工程'], aplus:[], a:['电气工程'], aminus:['动力工程及工程热物理'],
    score:{ wl:{min:600,rank:17000}, ls:null },
    emp:'电力行业「黄埔军校」，国家电网、南方电网与五大发电集团去向极佳，电气专业就业含金量顶尖。',
    intro:'1958 年创建，电力系统行业特色名校（北京、保定两地办学）。电气工程与动力工程领先，与电力央企联系极为紧密。' },

  // ===== 河北 =====
  { id:'hebut', name:'河北工业大学', en:'Hebei University of Technology', abbr:'河工大', enAbbr:'HEBUT', province:'河北', city:'天津', lng:117.205, lat:39.155, founded:1903,
    type:'理工', admin:'河北省', tags:['211','双一流'], tier:5,
    firstClass:['电气工程'], aplus:[], a:[], aminus:['电气工程','材料科学与工程'],
    score:{ wl:{min:575,rank:29000}, ls:null },
    emp:'电气与材料较强，京津冀制造业与电力相关行业去向。',
    intro:'1903 年创建、校址却在天津的河北唯一 211，「校在津、籍在冀」颇具特色。电气工程为双一流建设学科。' },

  // ===== 山西 =====
  { id:'tyut', name:'太原理工大学', en:'Taiyuan University of Technology', abbr:'太理工', enAbbr:'TYUT', province:'山西', city:'太原', lng:112.523, lat:37.864, founded:1902,
    type:'理工', admin:'山西省', tags:['211','双一流'], tier:5,
    firstClass:['化学工程与技术'], aplus:[], a:[], aminus:['化学工程与技术','机械工程'],
    score:{ wl:{min:565,rank:34000}, ls:null },
    emp:'山西唯一 211，化工、材料、矿业与能源行业去向，省内认可度高。',
    intro:'前身为 1902 年的山西大学堂西学专斋，山西最高工科学府。能源化工、材料与采矿见长，服务山西能源产业转型。' },

  // ===== 内蒙古 =====
  { id:'imu', name:'内蒙古大学', en:'Inner Mongolia University', abbr:'内大', enAbbr:'IMU', province:'内蒙古', city:'呼和浩特', lng:111.661, lat:40.819, founded:1957,
    type:'综合', admin:'内蒙古自治区', tags:['211','双一流'], tier:5,
    firstClass:['生物学'], aplus:[], a:[], aminus:['生物学','民族学'],
    score:{ wl:{min:548,rank:44000}, ls:{min:545,rank:9500} },
    emp:'自治区旗舰综合大学，生物学（家畜生殖生物学）有特色，区内选调与事业单位去向广。',
    intro:'1957 年创建，新中国在少数民族地区设立的第一所综合大学，内蒙古唯一 211。生物学与蒙古学研究独具特色。' },

  // ===== 辽宁 =====
  { id:'dmu', name:'大连海事大学', en:'Dalian Maritime University', abbr:'海大(连)', enAbbr:'DMU', province:'辽宁', city:'大连', lng:121.534, lat:38.871, founded:1909,
    type:'理工', admin:'交通运输部', tags:['211','双一流'], tier:5,
    firstClass:['交通运输工程'], aplus:[], a:[], aminus:['交通运输工程'],
    score:{ wl:{min:580,rank:26000}, ls:{min:575,rank:6000} },
    emp:'航运界「最高学府」，远洋航海、航运管理与海事系统就业对口，海船船员就业稳定。',
    intro:'1909 年创建，交通运输部直属、国际海事组织认可的航海类「最高学府」，被誉为「航海家的摇篮」。' },

  { id:'lnu', name:'辽宁大学', en:'Liaoning University', abbr:'辽大', enAbbr:'LNU', province:'辽宁', city:'沈阳', lng:123.404, lat:41.806, founded:1948,
    type:'综合', admin:'辽宁省', tags:['211','双一流'], tier:5,
    firstClass:['应用经济学'], aplus:[], a:[], aminus:['应用经济学'],
    score:{ wl:{min:565,rank:34000}, ls:{min:560,rank:8000} },
    emp:'省属综合 211，应用经济学为特色，东北本地金融、财税与公务员去向认可度高。',
    intro:'1948 年创建，辽宁省属综合性 211。经济学传统深厚，文理经管均衡，是东北老工业基地的人文社科重镇。' },

  // ===== 吉林 =====
  { id:'ybu', name:'延边大学', en:'Yanbian University', abbr:'延大', enAbbr:'YBU', province:'吉林', city:'延吉', lng:129.514, lat:42.906, founded:1949,
    type:'综合', admin:'吉林省', tags:['211','双一流'], tier:5,
    firstClass:['外国语言文学（朝鲜语）'], aplus:[], a:[], aminus:['外国语言文学'],
    score:{ wl:{min:535,rank:50000}, ls:{min:535,rank:11000} },
    emp:'民族地区综合 211，朝鲜语 / 韩语与对朝韩经贸特色，东北亚相关方向就业有优势。',
    intro:'1949 年创建，地处中朝边境的民族特色综合性 211。朝鲜语言文学与朝鲜半岛研究独树一帜。' },

  // ===== 黑龙江 =====
  { id:'heu', name:'哈尔滨工程大学', en:'Harbin Engineering University', abbr:'哈工程', enAbbr:'HEU', province:'黑龙江', city:'哈尔滨', lng:126.677, lat:45.776, founded:1953,
    type:'理工', admin:'工业和信息化部', tags:['211','双一流','国防七子'], tier:4,
    firstClass:['船舶与海洋工程','控制科学与工程','核科学与技术'], aplus:[], a:['船舶与海洋工程'], aminus:['控制科学与工程','核科学与技术'],
    score:{ wl:{min:588,rank:23000}, ls:null },
    emp:'「三海一核」特色，船舶、海洋工程与核工业、军工系统就业对口，造船与海工央企去向稳定。',
    intro:'源自 1953 年「哈军工」海军工程系，「国防七子」之一。船舶与海洋工程顶尖，「三海一核」（船舶、海洋、海军、核能）特色鲜明。' },

  // ===== 上海 =====
  { id:'shu', name:'上海大学', en:'Shanghai University', abbr:'上大', enAbbr:'SHU', province:'上海', city:'上海', lng:121.391, lat:31.318, founded:1922,
    type:'综合', admin:'上海市', tags:['211','双一流'], tier:4,
    firstClass:['机械工程','美术学'], aplus:[], a:[], aminus:['社会学','美术学','机械工程'],
    score:{ wl:{min:608,rank:14500}, ls:{min:590,rank:4500} },
    emp:'地处上海的省部共建综合 211，影视、美术、社会学与材料有特色，区位带来广阔就业面。',
    intro:'1922 年创校、1994 年四校合并组建，钱伟长长期任校长。学科门类齐全，影视传媒、美术与社会学颇具影响，区位优势突出。' },

  { id:'ecust', name:'华东理工大学', en:'East China University of Science and Technology', abbr:'华理', enAbbr:'ECUST', province:'上海', city:'上海', lng:121.425, lat:31.158, founded:1952,
    type:'理工', admin:'教育部', tags:['211','双一流'], tier:4,
    firstClass:['化学工程与技术'], aplus:['化学工程与技术'], a:[], aminus:['材料科学与工程','控制科学与工程','化学'],
    score:{ wl:{min:600,rank:17000}, ls:null },
    emp:'化工领域王牌，制药、新材料、能源化工与精细化工就业好，地处上海平台高。',
    intro:'1952 年由多校化工系组建，原「华东化工学院」，被誉为「化学工程师的摇篮」。化学工程与技术全国顶尖，是化工高教的一面旗帜。' },

  { id:'dhu', name:'东华大学', en:'Donghua University', abbr:'东华', enAbbr:'DHU', province:'上海', city:'上海', lng:121.351, lat:31.201, founded:1951,
    type:'理工', admin:'教育部', tags:['211','双一流'], tier:5,
    firstClass:['纺织科学与工程'], aplus:['纺织科学与工程'], a:[], aminus:['材料科学与工程','设计学'],
    score:{ wl:{min:588,rank:23000}, ls:{min:582,rank:5200} },
    emp:'纺织与材料全国第一，服装设计知名，地处上海，时尚、材料与设计行业去向广。',
    intro:'1951 年创建，原「中国纺织大学」。纺织科学与工程世界一流，服装与服饰设计、纤维材料特色鲜明。' },

  // ===== 江苏 =====
  { id:'suda', name:'苏州大学', en:'Soochow University', abbr:'苏大', enAbbr:'SUDA', province:'江苏', city:'苏州', lng:120.638, lat:31.305, founded:1900,
    type:'综合', admin:'江苏省', tags:['211','双一流'], tier:4,
    firstClass:['材料科学与工程'], aplus:[], a:[], aminus:['设计学','软件工程','材料科学与工程'],
    score:{ wl:{min:605,rank:15500}, ls:{min:592,rank:4200} },
    emp:'地处苏州的省属综合 211 标杆，纺织、材料、医学与设计均衡，长三角民企与制造业去向广。',
    intro:'前身为 1900 年的东吴大学，省属 211 的「天花板」。学科门类齐全、科研经费充裕、区位优越，综合实力远超一般 211。' },

  { id:'nuaa', name:'南京航空航天大学', en:'Nanjing University of Aeronautics and Astronautics', abbr:'南航', enAbbr:'NUAA', province:'江苏', city:'南京', lng:118.795, lat:32.001, founded:1952,
    type:'理工', admin:'工业和信息化部', tags:['211','双一流','国防七子'], tier:4,
    firstClass:['航空宇航科学与技术','力学'], aplus:[], a:['航空宇航科学与技术'], aminus:['力学','机械工程','控制科学与工程'],
    score:{ wl:{min:608,rank:14500}, ls:null },
    emp:'航空航天与民航就业极佳，航空工业、商飞、航天院所与军工集团去向集中。',
    intro:'1952 年创建，「国防七子」之一。航空宇航科学与技术顶尖，直升机、无人机与民航维修特色鲜明，与航空航天工业深度绑定。' },

  { id:'njust', name:'南京理工大学', en:'Nanjing University of Science and Technology', abbr:'南理工', enAbbr:'NJUST', province:'江苏', city:'南京', lng:118.857, lat:32.027, founded:1953,
    type:'理工', admin:'工业和信息化部', tags:['211','双一流','国防七子'], tier:4,
    firstClass:['兵器科学与技术'], aplus:['兵器科学与技术'], a:[], aminus:['化学工程与技术','光学工程','机械工程'],
    score:{ wl:{min:605,rank:15500}, ls:null },
    emp:'兵器与光电信息强，国防军工集团、装备制造与兵器研究院所去向稳定。',
    intro:'源自 1953 年「哈军工」炮兵工程系，「国防七子」之一。兵器科学与技术全国第一，光电、含能材料与智能装备见长。' },

  { id:'hhu', name:'河海大学', en:'Hohai University', abbr:'河海', enAbbr:'HHU', province:'江苏', city:'南京', lng:118.788, lat:32.057, founded:1915,
    type:'理工', admin:'教育部', tags:['211','双一流'], tier:4,
    firstClass:['水利工程','环境科学与工程'], aplus:['水利工程'], a:[], aminus:['土木工程','环境科学与工程'],
    score:{ wl:{min:595,rank:20000}, ls:{min:585,rank:5500} },
    emp:'水利水电全国第一，水利系统、设计院、基建央企与电力企业去向稳定。',
    intro:'1915 年创建，中国第一所水利高等学府。水利工程全国第一，水文水资源与港口海岸工程领先，是治水兴邦的人才高地。' },

  { id:'jiangnan', name:'江南大学', en:'Jiangnan University', abbr:'江南大', enAbbr:'JNU', province:'江苏', city:'无锡', lng:120.272, lat:31.490, founded:1902,
    type:'综合', admin:'教育部', tags:['211','双一流'], tier:5,
    firstClass:['轻工技术与工程','食品科学与工程'], aplus:['食品科学与工程','轻工技术与工程'], a:[], aminus:['设计学','纺织科学与工程','控制科学与工程'],
    score:{ wl:{min:590,rank:22000}, ls:{min:583,rank:5000} },
    emp:'食品与轻工全国第一，食品、生物发酵、设计与快消行业去向极佳，地处无锡。',
    intro:'前身为 1902 年三江师范学堂，原「无锡轻工大学」。食品科学与工程、轻工技术与工程全国第一，工业设计亦享盛誉。' },

  { id:'cumt', name:'中国矿业大学', en:'China University of Mining and Technology', abbr:'矿大', enAbbr:'CUMT', province:'江苏', city:'徐州', lng:117.142, lat:34.218, founded:1909,
    type:'理工', admin:'教育部', tags:['211','双一流'], tier:5,
    firstClass:['矿业工程','安全科学与工程'], aplus:['矿业工程','安全科学与工程'], a:[], aminus:['地质资源与地质工程','测绘科学与技术','机械工程'],
    score:{ wl:{min:568,rank:32000}, ls:null },
    emp:'矿业与安全工程全国第一，能源、煤炭、安全与基建央企去向，行业认可度极高。',
    intro:'1909 年焦作路矿学堂发端，中国矿业教育的最高学府。矿业工程、安全科学与工程全国第一，是能源行业的人才与科研重镇。' },

  // ===== 浙江 =====
  { id:'nbu', name:'宁波大学', en:'Ningbo University', abbr:'宁大', enAbbr:'NBU', province:'浙江', city:'宁波', lng:121.567, lat:29.797, founded:1986,
    type:'综合', admin:'浙江省', tags:['211','双一流'], tier:5,
    firstClass:['力学'], aplus:[], a:[], aminus:['力学'],
    score:{ wl:{min:585,rank:24000}, ls:{min:580,rank:5800} },
    emp:'浙江省重点建设综合 211，力学与海洋、水产有特色，宁波及浙东民营经济就业活跃。',
    intro:'1986 年由包玉刚捐资创建，浙江省重点建设的综合性 211。力学为双一流学科，海洋与水产研究亦有特色，发展迅速。' },

  // ===== 安徽 =====
  { id:'hfut', name:'合肥工业大学', en:'Hefei University of Technology', abbr:'合工大', enAbbr:'HFUT', province:'安徽', city:'合肥', lng:117.219, lat:31.838, founded:1945,
    type:'理工', admin:'教育部', tags:['211','双一流'], tier:5,
    firstClass:['管理科学与工程'], aplus:[], a:[], aminus:['管理科学与工程','机械工程','电气工程'],
    score:{ wl:{min:590,rank:22000}, ls:null },
    emp:'车辆、电气、管理强，汽车（江汽、奇瑞等）、制造业与家电行业去向广。',
    intro:'1945 年创建的教育部直属工科 211。车辆工程、管理科学与工程见长，与安徽汽车与制造业产业链深度协同。' },

  { id:'ahu', name:'安徽大学', en:'Anhui University', abbr:'安大', enAbbr:'AHU', province:'安徽', city:'合肥', lng:117.201, lat:31.766, founded:1928,
    type:'综合', admin:'安徽省', tags:['211','双一流'], tier:5,
    firstClass:['材料科学与工程'], aplus:[], a:[], aminus:['计算机科学与技术','材料科学与工程'],
    score:{ wl:{min:575,rank:29000}, ls:{min:568,rank:7000} },
    emp:'安徽省属综合 211，电子信息、材料与汉语言文字学较强，省内认可度高。',
    intro:'1928 年创建，安徽省重点建设的综合性 211。材料科学与工程为双一流学科，徽学与汉语言文字研究有特色。' },

  // ===== 福建 =====
  { id:'fzu', name:'福州大学', en:'Fuzhou University', abbr:'福大', enAbbr:'FZU', province:'福建', city:'福州', lng:119.197, lat:26.062, founded:1958,
    type:'理工', admin:'福建省', tags:['211','双一流'], tier:5,
    firstClass:['化学'], aplus:[], a:[], aminus:['化学','土木工程'],
    score:{ wl:{min:570,rank:31000}, ls:null },
    emp:'福建省属理工 211，化学（催化）、土木与电气较强，海西经济区制造业去向。',
    intro:'1958 年创建，福建最高工科学府。化学（尤其工业催化）与土木工程见长，服务海峡西岸经济区建设。' },

  // ===== 江西 =====
  { id:'ncu', name:'南昌大学', en:'Nanchang University', abbr:'南大(昌)', enAbbr:'NCU', province:'江西', city:'南昌', lng:115.799, lat:28.659, founded:1921,
    type:'综合', admin:'江西省', tags:['211','双一流'], tier:5,
    firstClass:['材料科学与工程'], aplus:[], a:[], aminus:['材料科学与工程','食品科学与工程'],
    score:{ wl:{min:575,rank:29000}, ls:{min:570,rank:6800} },
    emp:'江西唯一 211，材料（半导体照明 LED）与食品有特色，省内就业认可度极高。',
    intro:'1921 年发端、1993 年合并组建，江西省旗舰综合大学。材料科学（硅基 LED）取得国家技术发明一等奖，食品科学亦强。' },

  // ===== 山东 =====
  { id:'upc', name:'中国石油大学（华东）', en:'China University of Petroleum (East China)', abbr:'石大(华东)', enAbbr:'UPC', province:'山东', city:'青岛', lng:120.130, lat:36.000, founded:1953,
    type:'理工', admin:'教育部', tags:['211','双一流'], tier:5,
    firstClass:['石油与天然气工程','地质资源与地质工程'], aplus:['石油与天然气工程'], a:['地质资源与地质工程'], aminus:['化学工程与技术'],
    score:{ wl:{min:575,rank:29000}, ls:null },
    emp:'石油石化行业「黄埔」，三桶油、油田服务与能源央企去向稳定，行业含金量高。',
    intro:'1953 年北京石油学院发端，石油石化行业特色名校（青岛办学）。石油与天然气工程全国顶尖，是能源行业的人才摇篮。' },

  // ===== 河南 =====
  { id:'zzu', name:'郑州大学', en:'Zhengzhou University', abbr:'郑大', enAbbr:'ZZU', province:'河南', city:'郑州', lng:113.535, lat:34.819, founded:1956,
    type:'综合', admin:'河南省', tags:['211','双一流'], tier:4,
    firstClass:['临床医学','材料科学与工程','化学'], aplus:[], a:[], aminus:['材料科学与工程','化学','临床医学'],
    score:{ wl:{min:585,rank:24000}, ls:{min:578,rank:6000} },
    emp:'河南唯一 211、超大体量综合校，临床医学与材料强，省内就业与升学认可度极高。',
    intro:'1956 年创建、2000 年三校合并，河南旗舰综合大学，在校生规模居全国前列。临床医学、材料与化学为建设学科，是中部人才高地。' },

  { id:'henu', name:'河南大学', en:'Henan University', abbr:'河大', enAbbr:'HENU', province:'河南', city:'开封', lng:114.307, lat:34.797, founded:1912,
    type:'综合', admin:'河南省', tags:['双一流'], tier:5,
    firstClass:['生物学'], aplus:[], a:[], aminus:['教育学','中国语言文学'],
    score:{ wl:{min:560,rank:37000}, ls:{min:560,rank:8000} },
    emp:'百年综合名校、双一流，文史、教育与生物较强，省内文教系统认可度高。',
    intro:'1912 年创建，历史悠久的综合性双一流（非 211 中的「实力派」）。文学、历史与教育学底蕴深厚，生物学为双一流学科。' },

  // ===== 湖北 =====
  { id:'whut', name:'武汉理工大学', en:'Wuhan University of Technology', abbr:'武理工', enAbbr:'WHUT', province:'湖北', city:'武汉', lng:114.350, lat:30.515, founded:1898,
    type:'理工', admin:'教育部', tags:['211','双一流'], tier:4,
    firstClass:['材料科学与工程'], aplus:['材料科学与工程'], a:[], aminus:['机械工程','交通运输工程'],
    score:{ wl:{min:595,rank:20000}, ls:null },
    emp:'材料学科顶尖，建材、汽车与航运三大行业特色，制造业与汽车产业去向广。',
    intro:'前身可溯至 1898 年，由原武汉工业、武汉交通、武汉汽车三校合并。材料科学与工程顶尖，建材 / 交通 / 汽车行业特色鲜明。' },

  { id:'cug', name:'中国地质大学（武汉）', en:'China University of Geosciences (Wuhan)', abbr:'地大(汉)', enAbbr:'CUG', province:'湖北', city:'武汉', lng:114.398, lat:30.524, founded:1952,
    type:'理工', admin:'教育部', tags:['211','双一流'], tier:5,
    firstClass:['地质学','地质资源与地质工程'], aplus:['地质学','地质资源与地质工程'], a:[], aminus:['海洋科学','测绘科学与技术','石油与天然气工程'],
    score:{ wl:{min:580,rank:26000}, ls:null },
    emp:'地质与资源全国第一，自然资源、矿产勘探、珠宝与能源行业去向对口。',
    intro:'1952 年北京地质学院发端，地球科学领域的最高学府之一。地质学、地质资源与地质工程全国第一，珠宝（GIC）特色鲜明。' },

  // ===== 广东 =====
  { id:'jnu', name:'暨南大学', en:'Jinan University', abbr:'暨大', enAbbr:'JNU', province:'广东', city:'广州', lng:113.342, lat:23.127, founded:1906,
    type:'综合', admin:'中央统战部', tags:['211','双一流'], tier:4,
    firstClass:['药学'], aplus:[], a:[], aminus:['新闻传播学','应用经济学','药学'],
    score:{ wl:{min:600,rank:17000}, ls:{min:592,rank:4200} },
    emp:'「华侨最高学府」，新闻、经管与药学强，粤港澳大湾区与海外华人圈就业广。',
    intro:'1906 年创建，中国第一所由国家创办的华侨学府，「华侨最高学府」。新闻传播、经济与药学见长，港澳台侨生云集，区位优越。' },

  // ===== 广西 =====
  { id:'gxu', name:'广西大学', en:'Guangxi University', abbr:'西大(桂)', enAbbr:'GXU', province:'广西', city:'南宁', lng:108.288, lat:22.857, founded:1928,
    type:'综合', admin:'广西壮族自治区', tags:['211','双一流'], tier:5,
    firstClass:['土木工程'], aplus:[], a:[], aminus:['土木工程'],
    score:{ wl:{min:555,rank:39000}, ls:{min:552,rank:9000} },
    emp:'广西唯一 211，土木、机械与轻工有特色，面向东盟，区内就业认可度高。',
    intro:'1928 年马君武创建，广西旗舰综合大学。土木工程为双一流学科，依托北部湾与中国—东盟合作具区位优势。' },

  // ===== 海南 =====
  { id:'hainu', name:'海南大学', en:'Hainan University', abbr:'海大(琼)', enAbbr:'HAINU', province:'海南', city:'海口', lng:110.317, lat:20.060, founded:1958,
    type:'综合', admin:'海南省', tags:['211','双一流'], tier:5,
    firstClass:['作物学'], aplus:[], a:[], aminus:['作物学'],
    score:{ wl:{min:560,rank:37000}, ls:{min:558,rank:8300} },
    emp:'海南唯一 211，热带农业、海洋与法学（自贸港）有前景，自贸港政策红利明显。',
    intro:'1958 年发端、2007 年合并组建，海南旗舰综合大学。作物学（热带农业）为双一流学科，受益于海南自由贸易港建设。' },

  // ===== 四川 =====
  { id:'swjtu', name:'西南交通大学', en:'Southwest Jiaotong University', abbr:'西南交大', enAbbr:'SWJTU', province:'四川', city:'成都', lng:103.987, lat:30.762, founded:1896,
    type:'理工', admin:'教育部', tags:['211','双一流'], tier:4,
    firstClass:['交通运输工程'], aplus:['交通运输工程'], a:[], aminus:['土木工程','机械工程','电气工程'],
    score:{ wl:{min:600,rank:17000}, ls:null },
    emp:'轨道交通与高铁全国顶尖，铁路局、中铁系统、城轨与基建央企去向稳定。',
    intro:'1896 年山海关北洋铁路官学堂发端，中国近代铁路与工程教育发源地之一。交通运输工程全国第一，「轨道交通的黄埔军校」。' },

  // ===== 重庆 =====
  { id:'swu', name:'西南大学', en:'Southwest University', abbr:'西南大', enAbbr:'SWU', province:'重庆', city:'重庆', lng:106.420, lat:29.815, founded:1906,
    type:'综合', admin:'教育部', tags:['211','双一流','部属师范'], tier:4,
    firstClass:['生物学'], aplus:[], a:[], aminus:['教育学','心理学','马克思主义理论','园艺学'],
    score:{ wl:{min:590,rank:22000}, ls:{min:582,rank:5200} },
    emp:'师范与农学合并的综合 211，公费师范、教育系统与农业相关就业广，重庆及西南认可度高。',
    intro:'2005 年由西南师范大学与西南农业大学合并，「部属六所师范」之一。教育、心理、生物与农学见长，是重庆第二所部属高校。' },

  // ===== 贵州 =====
  { id:'gzu', name:'贵州大学', en:'Guizhou University', abbr:'贵大', enAbbr:'GZU', province:'贵州', city:'贵阳', lng:106.667, lat:26.452, founded:1902,
    type:'综合', admin:'贵州省', tags:['211','双一流'], tier:5,
    firstClass:['植物保护'], aplus:[], a:[], aminus:['植物保护'],
    score:{ wl:{min:545,rank:46000}, ls:{min:545,rank:9500} },
    emp:'贵州唯一 211，植物保护与大数据相关专业有特色，省内选调与事业单位去向广。',
    intro:'1902 年贵州大学堂发端，贵州旗舰综合大学。植物保护为双一流学科，依托贵州大数据产业拓展信息相关学科。' },

  // ===== 云南 =====
  { id:'ynu', name:'云南大学', en:'Yunnan University', abbr:'云大', enAbbr:'YNU', province:'云南', city:'昆明', lng:102.689, lat:25.060, founded:1922,
    type:'综合', admin:'云南省', tags:['211','双一流'], tier:5,
    firstClass:['民族学','生态学'], aplus:[], a:[], aminus:['民族学','生态学'],
    score:{ wl:{min:575,rank:29000}, ls:{min:572,rank:6500} },
    emp:'西南老牌综合 211，民族学与生态学有特色，面向南亚东南亚，区内事业单位与选调去向广。',
    intro:'1922 年私立东陆大学发端，曾是民国时期实力很强的综合大学。民族学与生态学为双一流学科，面向南亚东南亚辐射。' },

  // ===== 陕西 =====
  { id:'xidian', name:'西安电子科技大学', en:'Xidian University', abbr:'西电', enAbbr:'XDU', province:'陕西', city:'西安', lng:108.838, lat:34.124, founded:1931,
    type:'理工', admin:'教育部', tags:['211','双一流','两电一邮'], tier:4,
    firstClass:['信息与通信工程','电子科学与技术'], aplus:['电子科学与技术'], a:['信息与通信工程'], aminus:['计算机科学与技术'],
    score:{ wl:{min:615,rank:12000}, ls:null },
    emp:'「两电一邮」之一，电子信息与计算机就业极强，华为、芯片与互联网大厂高薪去向集中。',
    intro:'源自 1931 年中央军委无线电学校，「两电一邮」之一。电子科学与技术、信息与通信工程全国顶尖，是雷达、通信与集成电路的人才重镇。' },

  { id:'chd', name:'长安大学', en:"Chang'an University", abbr:'长安大', enAbbr:'CHD', province:'陕西', city:'西安', lng:108.886, lat:34.243, founded:1951,
    type:'理工', admin:'教育部', tags:['211','双一流'], tier:5,
    firstClass:['交通运输工程'], aplus:[], a:[], aminus:['交通运输工程','地质资源与地质工程'],
    score:{ wl:{min:575,rank:29000}, ls:null },
    emp:'公路交通与汽车行业特色，交通系统、设计院与基建央企去向稳定。',
    intro:'2000 年由公路、地质、建筑三校合并，公路交通领域行业特色名校。被誉为「公路交通的黄埔军校」，在道桥与汽车领域优势突出。' },

  { id:'nwu', name:'西北大学', en:'Northwest University', abbr:'西大', enAbbr:'NWU', province:'陕西', city:'西安', lng:108.939, lat:34.157, founded:1902,
    type:'综合', admin:'陕西省', tags:['211','双一流'], tier:5,
    firstClass:['考古学','地质学'], aplus:['地质学'], a:[], aminus:['考古学','化学','理论经济学'],
    score:{ wl:{min:588,rank:23000}, ls:{min:582,rank:5200} },
    emp:'省属综合 211，地质、考古与经济学有传统，「中华石油英才的摇篮」，能源与文博系统去向。',
    intro:'1902 年陕西大学堂发端，西北历史最久的综合大学。地质学（早期生命与大陆动力学）世界知名，考古学全国领先。' },

  // ===== 新疆 =====
  { id:'xju', name:'新疆大学', en:'Xinjiang University', abbr:'新大', enAbbr:'XJU', province:'新疆', city:'乌鲁木齐', lng:87.601, lat:43.795, founded:1924,
    type:'综合', admin:'新疆维吾尔自治区', tags:['211','双一流'], tier:5,
    firstClass:['马克思主义理论','化学工程与技术'], aplus:[], a:[], aminus:['马克思主义理论'],
    score:{ wl:{min:540,rank:48000}, ls:{min:540,rank:10500} },
    emp:'新疆旗舰综合 211，面向中亚与「一带一路」，区内戍边、选调与能源行业就业有政策倾斜。',
    intro:'1924 年创建，新疆最高学府。马克思主义理论与化学工程为双一流学科，区位与稳定戍边特色鲜明。' },

  { id:'shzu', name:'石河子大学', en:'Shihezi University', abbr:'石大', enAbbr:'SHZU', province:'新疆', city:'石河子', lng:86.041, lat:44.306, founded:1949,
    type:'综合', admin:'新疆生产建设兵团', tags:['211','双一流'], tier:5,
    firstClass:['化学工程与技术'], aplus:[], a:[], aminus:[],
    score:{ wl:{min:525,rank:55000}, ls:{min:528,rank:13000} },
    emp:'兵团综合 211，农学与医学有特色，对口支援办学，兵团与基层就业有政策支持。',
    intro:'1949 年发端，新疆生产建设兵团举办的综合性 211，由北京大学等对口支援。农学与医学见长，扎根边疆办学。' },

  // ===== 宁夏 =====
  { id:'nxu', name:'宁夏大学', en:'Ningxia University', abbr:'宁大', enAbbr:'NXU', province:'宁夏', city:'银川', lng:106.149, lat:38.500, founded:1958,
    type:'综合', admin:'宁夏回族自治区', tags:['211','双一流'], tier:5,
    firstClass:['化学工程与技术'], aplus:[], a:[], aminus:[],
    score:{ wl:{min:530,rank:53000}, ls:{min:532,rank:12000} },
    emp:'宁夏唯一 211，旱区农业、葡萄酒与民族地区相关专业有特色，区内就业有政策支持。',
    intro:'1958 年创建，宁夏旗舰综合大学，西部地区重点建设 211。化学工程为双一流学科，旱区农业与葡萄与葡萄酒工程有特色。' },

  // ===== 青海 =====
  { id:'qhu', name:'青海大学', en:'Qinghai University', abbr:'青大', enAbbr:'QHU', province:'青海', city:'西宁', lng:101.756, lat:36.722, founded:1958,
    type:'综合', admin:'青海省', tags:['211','双一流'], tier:5,
    firstClass:['生态学'], aplus:[], a:[], aminus:[],
    score:{ wl:{min:520,rank:58000}, ls:{min:525,rank:14000} },
    emp:'青海唯一 211，高原医学、生态与农牧特色，由清华大学等对口支援，区内就业政策倾斜明显。',
    intro:'1958 年创建，青藏高原上的综合性 211，由清华大学等对口支援建设。生态学为双一流学科，高原医学与三江源研究独具特色。' },

  // ===== 西藏 =====
  { id:'tibetu', name:'西藏大学', en:'Tibet University', abbr:'藏大', enAbbr:'XZU', province:'西藏', city:'拉萨', lng:91.140, lat:29.645, founded:1985,
    type:'综合', admin:'西藏自治区', tags:['211','双一流'], tier:5,
    firstClass:['生态学'], aplus:[], a:[], aminus:[],
    score:{ wl:{min:510,rank:62000}, ls:{min:515,rank:16000} },
    emp:'西藏唯一 211，高原生态与民族文化特色，戍边、选调与区内事业单位就业政策支持力度大。',
    intro:'1985 年正式定名，雪域高原上的综合性 211。生态学为双一流学科，藏语言文学与高原生态研究独具特色。' },

);
