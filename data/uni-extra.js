/*
 * uni-extra.js —— 扩充批次 ③：知名单学科双一流与遗漏 211（已深化）
 * 字段 schema 见 universities.js。分数为 2025 重庆·参考整理值。
 */
window.UNIVERSITIES.push(

  // ----- 理工 / 信息 / 行业特色 -----
  { id:'bjut', name:'北京工业大学', en:'Beijing University of Technology', abbr:'北工大', enAbbr:'BJUT', province:'北京', city:'北京', lng:116.483, lat:39.874, founded:1960,
    type:'理工', admin:'北京市', tags:['211','双一流'], tier:4,
    firstClass:['土木工程'], aplus:[], a:[], aminus:['土木工程','材料科学与工程'],
    score:{ wl:{min:595,rank:20000}, ls:null },
    emp:'北京市属唯一 211，土木、材料与电子较强，留京就业认可度高，市政与制造业去向广。',
    intro:'1960 年创建，北京市属重点 211。土木工程为双一流学科，依托首都区位，在城市建设与电子信息领域就业优势明显。' },

  { id:'njupt', name:'南京邮电大学', en:'Nanjing University of Posts and Telecommunications', abbr:'南邮', enAbbr:'NJUPT', province:'江苏', city:'南京', lng:118.791, lat:32.113, founded:1942,
    type:'理工', admin:'江苏省', tags:['双一流'], tier:5,
    firstClass:['电子科学与技术'], aplus:[], a:[], aminus:['电子科学与技术','信息与通信工程'],
    score:{ wl:{min:595,rank:20000}, ls:null },
    emp:'信息通信行业特色双一流，通信、电子与计算机就业好，长三角 IT 与通信企业去向集中。',
    intro:'1942 年发端于抗日烽火中的战邮干部培训班，信息通信特色鲜明的双一流。电子科学与技术为建设学科，通信与物联网见长。' },

  { id:'nuist', name:'南京信息工程大学', en:'Nanjing University of Information Science and Technology', abbr:'南信大', enAbbr:'NUIST', province:'江苏', city:'南京', lng:118.715, lat:32.207, founded:1960,
    type:'理工', admin:'江苏省', tags:['双一流'], tier:5,
    firstClass:['大气科学'], aplus:['大气科学'], a:[], aminus:[],
    score:{ wl:{min:575,rank:29000}, ls:null },
    emp:'大气科学全国第一，气象系统、环境、人工智能与遥感行业去向对口，行业认可度极高。',
    intro:'1960 年创建，原「南京气象学院」，气象行业特色双一流。大气科学评估 A+、全国第一，是中国气象人才培养的核心基地。' },

  { id:'cdut', name:'成都理工大学', en:'Chengdu University of Technology', abbr:'成理', enAbbr:'CDUT', province:'四川', city:'成都', lng:104.148, lat:30.679, founded:1956,
    type:'理工', admin:'四川省', tags:['双一流'], tier:5,
    firstClass:['地质学'], aplus:[], a:[], aminus:['地质学','地质资源与地质工程'],
    score:{ wl:{min:565,rank:34000}, ls:null },
    emp:'地质与能源行业特色双一流，地质灾害防治、油气勘探与自然资源行业去向。',
    intro:'1956 年创建，地质行业特色双一流。地质学为建设学科，地质灾害防治与地质环境保护国家重点实验室坐落于此。' },

  { id:'tjpu', name:'天津工业大学', en:'Tiangong University', abbr:'天工大', enAbbr:'TGU', province:'天津', city:'天津', lng:117.101, lat:39.382, founded:1912,
    type:'理工', admin:'天津市', tags:['双一流'], tier:5,
    firstClass:['纺织科学与工程'], aplus:[], a:[], aminus:['纺织科学与工程','材料科学与工程'],
    score:{ wl:{min:565,rank:34000}, ls:null },
    emp:'纺织与材料行业特色双一流，先进纺织复合材料、膜技术与制造行业去向。',
    intro:'1912 年发端，纺织行业特色双一流。纺织科学与工程为建设学科，先进纺织复合材料与分离膜技术研究领先。' },

  // ----- 综合（2022 新增双一流） -----
  { id:'xtu', name:'湘潭大学', en:'Xiangtan University', abbr:'湘大', enAbbr:'XTU', province:'湖南', city:'湘潭', lng:112.901, lat:27.871, founded:1958,
    type:'综合', admin:'湖南省', tags:['双一流'], tier:5,
    firstClass:['数学'], aplus:[], a:[], aminus:['数学'],
    score:{ wl:{min:568,rank:32000}, ls:{min:570,rank:6800} },
    emp:'毛主席倡办的综合双一流，数学、材料与法学较强，湖南及中部就业认可度高。',
    intro:'1958 年由毛泽东亲笔题名并倡办，综合性双一流。数学为建设学科，计算数学与材料、法学（公共管理）亦有特色。' },

  { id:'sxu', name:'山西大学', en:'Shanxi University', abbr:'山大(晋)', enAbbr:'SXU', province:'山西', city:'太原', lng:112.580, lat:37.802, founded:1902,
    type:'综合', admin:'山西省', tags:['双一流'], tier:5,
    firstClass:['哲学','物理学'], aplus:[], a:[], aminus:['哲学','物理学'],
    score:{ wl:{min:570,rank:31000}, ls:{min:572,rank:6500} },
    emp:'百年综合双一流，哲学与物理学（光量子）有特色，山西选调与事业单位去向广。',
    intro:'1902 年山西大学堂发端，中国最早的三所国立大学之一。哲学与物理学为建设学科，量子光学研究在国内具有重要影响。' },

  // ----- 医药（中医药为主） -----
  { id:'shutcm', name:'上海中医药大学', en:'Shanghai University of Traditional Chinese Medicine', abbr:'上中医', enAbbr:'SHUTCM', province:'上海', city:'上海', lng:121.504, lat:31.201, founded:1956,
    type:'医药', admin:'上海市', tags:['双一流'], tier:5,
    firstClass:['中医学','中药学'], aplus:[], a:[], aminus:['中药学','中西医结合','中医学'],
    score:{ wl:{min:578,rank:27000}, ls:null },
    emp:'中医药双一流标杆，地处上海，中医医院、药企与中医药科研去向佳。',
    intro:'1956 年创建，中医药领域第一方阵的双一流。中药学与中西医结合实力突出，依托上海在中医药现代化与国际化方面领先。' },

  { id:'gzucm', name:'广州中医药大学', en:'Guangzhou University of Chinese Medicine', abbr:'广中医', enAbbr:'GZUCM', province:'广东', city:'广州', lng:113.411, lat:23.160, founded:1956,
    type:'医药', admin:'广东省', tags:['双一流'], tier:5,
    firstClass:['中医学'], aplus:[], a:[], aminus:['中医学','中西医结合'],
    score:{ wl:{min:575,rank:29000}, ls:null },
    emp:'中医临床强校双一流，岭南中医、中医院与中药企业去向，临床实践氛围浓。',
    intro:'1956 年创建，岭南中医药重镇、双一流。中医学为建设学科，临床（尤其热带病、针灸）实力突出，附属医院规模大。' },

  { id:'njucm', name:'南京中医药大学', en:'Nanjing University of Chinese Medicine', abbr:'南中医', enAbbr:'NJUCM', province:'江苏', city:'南京', lng:118.903, lat:31.923, founded:1954,
    type:'医药', admin:'江苏省', tags:['双一流'], tier:5,
    firstClass:['中药学'], aplus:[], a:[], aminus:['中药学','中医学'],
    score:{ wl:{min:570,rank:31000}, ls:null },
    emp:'「高等中医教育的摇篮」双一流，中药、针灸推拿与中医院去向，行业历史地位高。',
    intro:'1954 年创建，参与编写了新中国第一批中医教材，被誉为「高等中医教育的摇篮」。中药学为建设学科，针灸推拿享有盛誉。' },

  { id:'cdutcm', name:'成都中医药大学', en:'Chengdu University of Traditional Chinese Medicine', abbr:'成中医', enAbbr:'CDUTCM', province:'四川', city:'成都', lng:103.992, lat:30.715, founded:1956,
    type:'医药', admin:'四川省', tags:['双一流'], tier:5,
    firstClass:['中药学'], aplus:[], a:[], aminus:['中药学'],
    score:{ wl:{min:560,rank:37000}, ls:null },
    emp:'西南中医药双一流，中药资源、中医临床与药企去向，西南地区认可度高。',
    intro:'1956 年创建，西南地区中医药龙头、双一流。中药学为建设学科，中药资源与鉴定、针灸推拿在业内享有声誉。' },

  { id:'gzhmu', name:'广州医科大学', en:'Guangzhou Medical University', abbr:'广医', enAbbr:'GZHMU', province:'广东', city:'广州', lng:113.342, lat:23.131, founded:1958,
    type:'医药', admin:'广东省', tags:['双一流'], tier:5,
    firstClass:['临床医学'], aplus:[], a:[], aminus:['临床医学'],
    score:{ wl:{min:575,rank:29000}, ls:null },
    emp:'以呼吸病学（钟南山团队）闻名的医科双一流，临床就业好，华南三甲医院去向。',
    intro:'1958 年创建，因呼吸病学与钟南山院士声名鹊起的医科双一流。临床医学为建设学科，呼吸疾病国家重点实验室是其金字招牌。' },

  // ----- 艺术 / 体育（多为校考 / 提前批录取） -----
  { id:'cnsd', name:'中央戏剧学院', en:'The Central Academy of Drama', abbr:'中戏', enAbbr:'CAD', province:'北京', city:'北京', lng:116.395, lat:39.931, founded:1950,
    type:'艺术', admin:'教育部', tags:['双一流'], tier:4,
    firstClass:['戏剧与影视学'], aplus:['戏剧与影视学'], a:[], aminus:[],
    score:{ wl:null, ls:null },
    emp:'戏剧影视「最高学府」，戏剧与影视学评估 A+，演艺界、影视行业与院团名家辈出。',
    intro:'1950 年创建，中国戏剧影视教育的最高殿堂。戏剧与影视学评估 A+，表演、导演与戏剧文学专业培养了大批演艺名家（校考录取）。' },

  { id:'shcm', name:'上海音乐学院', en:'Shanghai Conservatory of Music', abbr:'上音', enAbbr:'SHCM', province:'上海', city:'上海', lng:121.461, lat:31.209, founded:1927,
    type:'艺术', admin:'上海市', tags:['双一流'], tier:5,
    firstClass:['音乐与舞蹈学'], aplus:[], a:['音乐与舞蹈学'], aminus:[],
    score:{ wl:null, ls:null },
    emp:'中国最早的高等音乐学府之一，音乐与舞蹈学评估 A，演奏、作曲与音乐产业去向。',
    intro:'1927 年蔡元培、萧友梅创办，中国历史最久的高等音乐学府之一。音乐与舞蹈学评估 A，作曲与表演传统深厚（校考录取）。' },

  { id:'ccmusic', name:'中国音乐学院', en:'China Conservatory of Music', abbr:'国音', enAbbr:'CCM', province:'北京', city:'北京', lng:116.394, lat:39.992, founded:1964,
    type:'艺术', admin:'北京市', tags:['双一流'], tier:5,
    firstClass:['音乐与舞蹈学'], aplus:[], a:['音乐与舞蹈学'], aminus:[],
    score:{ wl:null, ls:null },
    emp:'以中国民族音乐为特色的双一流，民乐、声乐与音乐教育、院团去向。',
    intro:'1964 年创建，以中国民族音乐教育与研究著称的双一流。民族声乐、民族器乐与作曲特色鲜明，被誉为「中国音乐家的摇篮」（校考录取）。' },

  { id:'sus', name:'上海体育大学', en:'Shanghai University of Sport', abbr:'上体', enAbbr:'SUS', province:'上海', city:'上海', lng:121.512, lat:31.304, founded:1952,
    type:'体育', admin:'上海市', tags:['双一流'], tier:5,
    firstClass:['体育学'], aplus:[], a:[], aminus:['体育学'],
    score:{ wl:null, ls:null },
    emp:'体育学双一流，运动科学、体育新闻、运动康复与体育产业去向，地处上海平台高。',
    intro:'1952 年创建，体育院校中的双一流。体育学学科实力突出，运动人体科学、武术与体育新闻特色鲜明（多为提前批 / 单招录取）。' },

);
