/* ============================================================
   heroes.js  v1  —— 偉人資料庫（共用資料層）
   ------------------------------------------------------------
   這個檔案「只放資料，不放遊戲規則」。
   任何一款歷史遊戲都可以讀這一份，資料查一次、遊戲共用。

   欄位說明：
     id       程式用的代號（英文，不重複）
     name     顯示名字
     job      職業（決定四招的框架）
     era      年代文字（給人看的）
     year     代表年份（負數＝西元前，程式用來排序）
     region   地區（亞洲／歐洲／美洲／西亞／非洲）
     conf     年代可信度：高／中／低（西元前的人物本來就模糊，老實標）
     atk/def/int   攻擊／防禦／智慧（三個數字，小學生也看得懂）
     skills   四招，每招有 type（招式種類）與 val（強度）
     fact     一句史實（給小孩偷渡教育用的）

   招式種類 type：
     hit    普通攻擊，傷害看「攻擊」
     brain  智慧攻擊，傷害看「智慧」
     guard  護盾，擋下接下來的傷害
     heal   回血
     weak   削弱，讓對手攻擊力下降
   ============================================================ */

(function (root) {
  'use strict';

  // ---- 24 位偉人 ----
  var LIST = [

    /* ========== ⚔️ 武將：攻高、智低，前期壓著打 ========== */
    {
      id: 'zhangfei', name: '張飛', job: '武將',
      era: '東漢–三國', year: 190, region: '亞洲', conf: '高',
      atk: 9, def: 6, int: 3,
      skills: [
        { n: '當陽怒吼', type: 'weak', val: 2 },   // 大吼一聲，對手嚇到攻擊力掉
        { n: '丈八蛇矛', type: 'hit', val: 1.85 },  // 招牌武器，重擊
        { n: '猛張飛', type: 'hit', val: 1.45 },    // 連續猛攻
        { n: '義釋嚴顏', type: 'heal', val: 10 }    // 放對手一馬，自己休息回血
      ],
      fact: '長坂坡上他一個人斷後，曹操大軍沒人敢上前。'
    },
    {
      id: 'yuefei', name: '岳飛', job: '武將',
      era: '南宋', year: 1120, region: '亞洲', conf: '高',
      atk: 8, def: 7, int: 4,
      skills: [
        { n: '岳家軍', type: 'guard', val: 14 },
        { n: '還我河山', type: 'hit', val: 1.8 },
        { n: '破連環馬', type: 'hit', val: 1.7 },
        { n: '精忠報國', type: 'heal', val: 9 }
      ],
      fact: '他的軍隊有句話：凍死不拆屋，餓死不擄掠。'
    },
    {
      id: 'spartacus', name: '斯巴達克斯', job: '武將',
      era: '羅馬共和', year: -90, region: '歐洲', conf: '中',
      atk: 10, def: 5, int: 4,
      skills: [
        { n: '角鬥場絕技', type: 'hit', val: 1.65 },
        { n: '奴隸起義', type: 'weak', val: 2 },
        { n: '維蘇威突圍', type: 'hit', val: 1.8 },
        { n: '不屈之志', type: 'heal', val: 7 }
      ],
      fact: '他是被抓來的角鬥士，帶著奴隸造反，打敗了好幾支羅馬正規軍。'
    },

    /* ========== 🧠 軍師：智高、攻低，用腦袋打人 ========== */
    {
      id: 'zhugeliang', name: '諸葛亮', job: '軍師',
      era: '三國', year: 210, region: '亞洲', conf: '高',
      atk: 4, def: 5, int: 10,
      skills: [
        { n: '空城計', type: 'guard', val: 14 },
        { n: '借東風', type: 'brain', val: 1.95 },
        { n: '木牛流馬', type: 'heal', val: 13 },
        { n: '八陣圖', type: 'brain', val: 1.9 }
      ],
      fact: '他發明的木牛流馬，是史書記載的運糧機械。'
    },
    {
      id: 'sunwu', name: '孫武', job: '軍師',
      era: '春秋', year: -520, region: '亞洲', conf: '中',
      atk: 5, def: 5, int: 10,
      skills: [
        { n: '知己知彼', type: 'weak', val: 4 },
        { n: '兵者詭道', type: 'brain', val: 1.85 },
        { n: '出其不意', type: 'brain', val: 2.05 },
        { n: '三令五申', type: 'guard', val: 14 }
      ],
      fact: '吳王要他示範練兵，他把宮女編成隊伍，真的練成了。'
    },
    {
      id: 'machiavelli', name: '馬基維利', job: '軍師',
      era: '文藝復興', year: 1500, region: '歐洲', conf: '高',
      atk: 5, def: 4, int: 10,
      skills: [
        { n: '君主論', type: 'brain', val: 2.5 },
        { n: '恐懼勝於愛', type: 'weak', val: 5 },
        { n: '兩面手法', type: 'brain', val: 2.2 },
        { n: '見風轉舵', type: 'heal', val: 14 }
      ],
      fact: '他寫的《君主論》講權力怎麼運作，講得太直白，被罵了五百年。'
    },

    /* ========== 👑 君王：防高、耐打，拖到對手沒力 ========== */
    {
      id: 'hammurabi', name: '漢摩拉比', job: '君王',
      era: '古巴比倫', year: -1780, region: '西亞', conf: '低',
      atk: 6, def: 9, int: 5,
      skills: [
        { n: '以牙還牙', type: 'hit', val: 2.6 },
        { n: '石柱法典', type: 'guard', val: 21 },
        { n: '判你有罪', type: 'weak', val: 4 },
        { n: '王之威嚴', type: 'heal', val: 12 }
      ],
      fact: '他把法律刻在黑色石柱上公開展示，這樣人人都知道規則是什麼。'
    },
    {
      id: 'elizabeth1', name: '伊莉莎白一世', job: '君王',
      era: '都鐸王朝', year: 1580, region: '歐洲', conf: '高',
      atk: 6, def: 8, int: 7,
      skills: [
        { n: '黃金演說', type: 'brain', val: 2.15 },
        { n: '無敵艦隊之敗', type: 'hit', val: 2.3 },
        { n: '我嫁給國家', type: 'guard', val: 19 },
        { n: '女王的凝視', type: 'weak', val: 3 }
      ],
      fact: '她一輩子不結婚，說「我已經嫁給英格蘭了」。'
    },
    {
      id: 'pakal', name: '帕卡爾二世', job: '君王',
      era: '馬雅古典期', year: 650, region: '美洲', conf: '中',
      atk: 6, def: 9, int: 5,
      skills: [
        { n: '神廟工程', type: 'guard', val: 20 },
        { n: '馬雅曆法', type: 'brain', val: 2 },
        { n: '翡翠面具', type: 'heal', val: 14 },
        { n: '王座加冕', type: 'hit', val: 2.35 }
      ],
      fact: '他當了六十八年的王，蓋出馬雅最漂亮的神廟。'
    },

    /* ========== 🔬 科學家：智爆表，越打越痛 ========== */
    {
      id: 'curie', name: '居禮夫人', job: '科學家',
      era: '十九–二十世紀', year: 1900, region: '歐洲', conf: '高',
      atk: 4, def: 4, int: 11,
      skills: [
        { n: '鐳的光芒', type: 'brain', val: 1.9 },
        { n: '兩座諾貝爾', type: 'brain', val: 1.8 },
        { n: '移動 X 光車', type: 'heal', val: 12 },
        { n: '不申請專利', type: 'guard', val: 11 }
      ],
      fact: '一戰時她把 X 光機裝上卡車開到前線，幫傷兵照出彈片的位置。'
    },
    {
      id: 'franklin', name: '富蘭克林', job: '科學家',
      era: '美國建國時期', year: 1760, region: '美洲', conf: '高',
      atk: 5, def: 4, int: 10,
      skills: [
        { n: '風箏引雷', type: 'brain', val: 2.4 },
        { n: '避雷針', type: 'guard', val: 18 },
        { n: '雙焦眼鏡', type: 'brain', val: 2.1 },
        { n: '印刷機開嘲諷', type: 'weak', val: 5 }
      ],
      fact: '他在雷雨天放風箏，證明閃電就是電，然後發明了避雷針。'
    },
    {
      id: 'zhangheng', name: '張衡', job: '科學家',
      era: '東漢', year: 120, region: '亞洲', conf: '高',
      atk: 4, def: 5, int: 10,
      skills: [
        { n: '地動儀', type: 'brain', val: 2.25 },
        { n: '渾天儀', type: 'brain', val: 1.9 },
        { n: '候風偵測', type: 'weak', val: 4 },
        { n: '二京賦', type: 'heal', val: 13 }
      ],
      fact: '他做的地動儀，在洛陽就偵測到幾百公里外的地震。'
    },

    /* ========== 💊 醫者：回血怪，磨死對手 ========== */
    {
      id: 'huatuo', name: '華佗', job: '醫者',
      era: '東漢末', year: 190, region: '亞洲', conf: '中',
      atk: 5, def: 6, int: 9,
      skills: [
        { n: '麻沸散', type: 'weak', val: 4 },
        { n: '刮骨療毒', type: 'heal', val: 16 },
        { n: '五禽戲', type: 'guard', val: 14 },
        { n: '青囊絕學', type: 'brain', val: 1.95 }
      ],
      fact: '他用麻沸散讓病人睡著再開刀，是最早的麻醉紀錄之一。'
    },
    {
      id: 'nightingale', name: '南丁格爾', job: '醫者',
      era: '維多利亞時代', year: 1860, region: '歐洲', conf: '高',
      atk: 4, def: 7, int: 9,
      skills: [
        { n: '提燈夜巡', type: 'heal', val: 16 },
        { n: '洗手革命', type: 'guard', val: 16 },
        { n: '玫瑰圖表', type: 'brain', val: 1.9 },
        { n: '野戰醫院', type: 'heal', val: 11 }
      ],
      fact: '她發現士兵死於髒亂比死於打仗還多，用畫圖說服長官改善衛生。'
    },
    {
      id: 'avicenna', name: '伊本西那', job: '醫者',
      era: '伊斯蘭黃金時代', year: 1010, region: '西亞', conf: '高',
      atk: 5, def: 6, int: 9,
      skills: [
        { n: '醫典', type: 'brain', val: 2.3 },
        { n: '傳染病論', type: 'weak', val: 5 },
        { n: '診脈', type: 'heal', val: 16 },
        { n: '哲學辯論', type: 'guard', val: 14 }
      ],
      fact: '他寫的《醫典》，被歐洲的醫學院當課本用了六百年。'
    },

    /* ========== ⛵ 航海家：攻防平均，最沒有弱點 ========== */
    {
      id: 'zhenghe', name: '鄭和', job: '航海家',
      era: '明朝', year: 1410, region: '亞洲', conf: '高',
      atk: 7, def: 8, int: 6,
      skills: [
        { n: '寶船艦隊', type: 'hit', val: 2.3 },
        { n: '七下西洋', type: 'guard', val: 18 },
        { n: '羅盤導航', type: 'weak', val: 5 },
        { n: '萬國來朝', type: 'heal', val: 14 }
      ],
      fact: '他的船隊有兩百多艘船，比哥倫布早了將近一百年出海。'
    },
    {
      id: 'magellan', name: '麥哲倫', job: '航海家',
      era: '大航海時代', year: 1510, region: '歐洲', conf: '高',
      atk: 8, def: 6, int: 6,
      skills: [
        { n: '海峽突破', type: 'hit', val: 1.8 },
        { n: '環球航行', type: 'hit', val: 1.55 },
        { n: '星象定位', type: 'guard', val: 12 },
        { n: '補給調度', type: 'heal', val: 10 }
      ],
      fact: '他的船隊第一次繞地球一圈，證明了地球是圓的。'
    },
    {
      id: 'ibnbattuta', name: '伊本白圖泰', job: '航海家',
      era: '中世紀', year: 1340, region: '非洲', conf: '高',
      atk: 7, def: 6, int: 7,
      skills: [
        { n: '十二萬公里', type: 'hit', val: 2.45 },
        { n: '沙漠穿越', type: 'guard', val: 17 },
        { n: '遊記見聞', type: 'weak', val: 6 },
        { n: '通商之道', type: 'heal', val: 14 }
      ],
      fact: '他花三十年走了十二萬公里，是那個年代走最遠的人。'
    },

    /* ========== ✒️ 文人：嘴砲流，專門削弱對手 ========== */
    {
      id: 'libai', name: '李白', job: '文人',
      era: '唐朝', year: 750, region: '亞洲', conf: '高',
      atk: 6, def: 4, int: 10,
      skills: [
        { n: '斗酒詩百篇', type: 'brain', val: 2.45 },
        { n: '天生我材', type: 'heal', val: 14 },
        { n: '千金散盡', type: 'weak', val: 5 },
        { n: '醉臥沙場', type: 'brain', val: 2.4 }
      ],
      fact: '杜甫寫他：喝一斗酒能作一百首詩，醉倒在長安的酒店裡。'
    },
    {
      id: 'shakespeare', name: '莎士比亞', job: '文人',
      era: '伊莉莎白時代', year: 1600, region: '歐洲', conf: '高',
      atk: 5, def: 5, int: 10,
      skills: [
        { n: '生存還是毀滅', type: 'brain', val: 2.2 },
        { n: '一針見血', type: 'weak', val: 5 },
        { n: '十四行詩', type: 'heal', val: 14 },
        { n: '全世界是舞台', type: 'guard', val: 15 }
      ],
      fact: '英文裡很多常用字是他造出來的，例如 lonely（孤單）。'
    },
    {
      id: 'twain', name: '馬克吐溫', job: '文人',
      era: '十九世紀美國', year: 1880, region: '美洲', conf: '高',
      atk: 5, def: 5, int: 10,
      skills: [
        { n: '毒舌開火', type: 'weak', val: 6 },
        { n: '湯姆歷險', type: 'brain', val: 2 },
        { n: '密西西比河', type: 'heal', val: 13 },
        { n: '幽默演講', type: 'brain', val: 2 }
      ],
      fact: '他當過領航員、礦工、記者，最後靠一本《湯姆歷險記》紅遍全世界。'
    },

    /* ========== 🔨 工匠：防最高，打不死 ========== */
    {
      id: 'luban', name: '魯班', job: '工匠',
      era: '春秋', year: -480, region: '亞洲', conf: '低',
      atk: 6, def: 8, int: 7,
      skills: [
        { n: '木鳥飛三日', type: 'brain', val: 2.25 },
        { n: '雲梯', type: 'hit', val: 2.25 },
        { n: '墨斗放線', type: 'guard', val: 19 },
        { n: '機關術', type: 'weak', val: 5 }
      ],
      fact: '傳說他做的木鳥能飛三天，鋸子也是他從草葉割手想出來的。'
    },
    {
      id: 'imhotep', name: '印和闐', job: '工匠',
      era: '古埃及', year: -2600, region: '非洲', conf: '低',
      atk: 5, def: 10, int: 6,
      skills: [
        { n: '階梯金字塔', type: 'guard', val: 18 },
        { n: '石造工法', type: 'hit', val: 1.85 },
        { n: '醫神之名', type: 'heal', val: 14 },
        { n: '永恆之石', type: 'guard', val: 14 }
      ],
      fact: '他蓋了世界第一座金字塔，後來埃及人乾脆把他當成神來拜。'
    },
    {
      id: 'davinci', name: '達文西', job: '工匠',
      era: '文藝復興', year: 1500, region: '歐洲', conf: '高',
      atk: 6, def: 6, int: 9,
      skills: [
        { n: '飛行器手稿', type: 'brain', val: 2.2 },
        { n: '裝甲車設計', type: 'guard', val: 16 },
        { n: '蒙娜麗莎', type: 'weak', val: 4 },
        { n: '鏡像筆記', type: 'brain', val: 1.9 }
      ],
      fact: '他的筆記是反著寫的，要拿鏡子照才看得懂。'
    }
  ];

  // ---- 對外提供的小工具（讓遊戲少寫程式）----
  var HEROES = {
    version: 1,
    list: LIST,
    // 依 id 找人
    byId: function (id) {
      for (var i = 0; i < LIST.length; i++) if (LIST[i].id === id) return LIST[i];
      return null;
    },
    // 所有職業
    jobs: function () {
      var s = [];
      LIST.forEach(function (h) { if (s.indexOf(h.job) < 0) s.push(h.job); });
      return s;
    },
    // 所有地區
    regions: function () {
      var s = [];
      LIST.forEach(function (h) { if (s.indexOf(h.region) < 0) s.push(h.region); });
      return s;
    },
    // 年代文字：負數要顯示成「西元前」
    yearLabel: function (h) {
      return h.year < 0 ? ('西元前 ' + Math.abs(h.year) + ' 年前後') : ('西元 ' + h.year + ' 年前後');
    }
  };

  root.HEROES = HEROES;
  if (typeof module !== 'undefined' && module.exports) module.exports = HEROES;

})(typeof window !== 'undefined' ? window : globalThis);
