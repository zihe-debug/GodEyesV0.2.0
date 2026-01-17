const p={HEADERS:[{type:"server",name:"Apache",pattern:/apache\/?([\d\.]+)?/i,header:"server",value:"version",description:""},{type:"server",name:"Apache Tomcat",pattern:/apache-(coyote)\/?([\d\.]+)?/i,header:"server",value:"component,version",extType:"technology",extName:"Java",description:""},{type:"server",name:"Nginx",pattern:/nginx\/?([\d\.]+)?/i,header:"server",value:"version",description:""},{type:"server",name:"IIS",pattern:/microsoft-iis\/?([\d\.]+)?/i,header:"server",value:"version",extType:"os",extName:"Windows",description:""},{type:"server",name:"Jetty",pattern:/jetty\s?\/?\(?([0-9a-zA-Z.-]*)\)?/i,header:"server",value:"version",extType:"technology",extName:"Java",description:""},{type:"server",name:"Resin",pattern:/resin\/?([\d\.]+)?/i,header:"server",value:"version",description:""},{type:"server",name:"Cloudflare",pattern:/cloudflare\/?([\d\.]+)?/i,header:"server",value:"version",description:""},{type:"server",name:"Varnish",pattern:/varnish\/?([\d\.]+)?/i,header:"server",value:"version",description:""},{type:"server",name:"OpenResty",pattern:/openresty\/?([\d\.]+)?/i,header:"server",value:"version",extType:"server",extName:"Nginx",description:""},{type:"server",name:"Tengine",pattern:/tengine\/?([\d\.]+)?/i,header:"server",value:"version",description:""},{type:"server",name:"BWS",pattern:/bws\/?([\d\.]+)?/i,header:"server",value:"version",description:""},{type:"server",name:"Zeus",pattern:/zeus\/?([\d\.]+)?/i,header:"server",value:"version",description:""},{type:"server",name:"Server",pattern:/waf|server\/?([\d\.]+)?/i,header:"server",value:"version",description:""},{type:"component",name:"OpenSSL",pattern:/openssl\s?\/?\(?([0-9a-zA-Z.-]*)\)?/i,header:"server",value:"version",description:""},{type:"component",name:"Mod_wsgi",pattern:/mod_wsgi+\s?\/?\(?([0-9a-zA-Z.-]*)\)?/i,header:"server",value:"version",description:""},{type:"component",name:"Mod_fcgid",pattern:/mod_fcgid+\s?\/?\(?([0-9a-zA-Z.-]*)\)?/i,header:"server",value:"version",description:""},{type:"component",name:"Mod_log_rotate",pattern:/mod_log_rotate+\s?\/?\(?([0-9a-zA-Z.-]*)\)?/i,header:"server",value:"version",description:""},{type:"os",name:"Windows",pattern:/win64|win32|win10|win7|win8|win11/i,header:"server",description:""},{type:"os",name:"Ubuntu",pattern:/ubuntu/i,header:"server",description:""},{type:"os",name:"Unix",pattern:/unix/i,header:"server",description:""},{type:"framework",name:"Spring",pattern:/([a-zA-Z0-9\.\-]+):([a-zA-Z0-9\-]+):(\d+)/i,header:"x-application-context",value:"app,env,port",extType:"technology",extName:"Java",description:""},{type:"framework",name:"JFinal",pattern:/jfinal\s?\/?([\d\.]+)?/i,header:"server",value:"version",extType:"technology",extName:"Java",description:""},{type:"framework",name:"ASP.NET",pattern:/[0-9.]+/i,header:"x-aspnet-version",value:"version",description:""},{type:"framework",name:"ASP.NET",pattern:/asp.net/i,header:"x-powered-by",description:""},{type:"framework",name:"ASP.NET MVC",pattern:/[0-9.]+/i,header:"x-aspnetmvc-version",value:"version",description:""},{type:"framework",name:"Express",pattern:/express/i,header:"x-powered-by",extType:"technology",extName:"Node.js",description:""},{type:"technology",name:"PHP",pattern:/php\/?([\d\.]+)?/i,header:"x-powered-by",value:"version",description:""},{type:"technology",name:"PHP",pattern:/PHPSESSID/i,header:"set-cookie",value:"version",description:""},{type:"technology",name:"Java",pattern:/java/i,header:"x-powered-by",description:""},{type:"technology",name:"Java",pattern:/JSESSIONID|jeesite/i,header:"set-cookie",description:""},{type:"technology",name:"Python",pattern:/python\/?([\d\.]+)?/i,header:"server",value:"version",description:""},{type:"security",name:"安全狗",pattern:/^waf\/?([\d\.]+)?$/i,header:"x-powered-by",value:"version",description:""},{type:"security",name:"Janusec",pattern:/janusec/i,header:"x-powered-by",description:""},{type:"security",name:"360",pattern:/([a-zA-Z0-9\-\.]+)\s([0-9.]+)\s([A-Za-z0-9]+)$/i,header:"x-safe-firewall",value:"app,version,appType",description:""},{type:"security",name:"HSTS",pattern:/max-age=(\d+)/i,header:"strict-transport-security",value:"time",description:""},{type:"panel",name:"Plesk",pattern:/plesk/i,header:"x-powered-by",description:""}],COOKIES:[{type:"technology",name:"PHP",match:/PHPSESSID/i},{type:"framework",name:"ASP.NET",match:/ASP\.NET_SessionId|ASPSESSIONID/i},{type:"technology",name:"Java",match:/JSESSIONID|jeesite/i}],ANALYTICS:{baidu:{pattern:"*://hm.baidu.com/hm.js*",name:"百度统计",description:"通过网络请求识别到百度统计服务，网站的用户访问数据会被百度记录",version:"Baidu Analytics"},yahoo:{pattern:"*://analytics.yahoo.com/*",name:"雅虎统计",description:"通过网络请求识别到雅虎统计服务，网站的用户访问数据会被雅虎记录",version:"Yahoo Analytics"},google:{pattern:"*://www.google-analytics.com/*",name:"谷歌统计",description:"通过网络请求识别到谷歌统计服务，网站的用户访问数据会被谷歌记录",version:"Google Analytics"}},DESCRIPTIONS:[{name:"framework",description:"框架"},{name:"technology",description:"语言"},{name:"security",description:"(安全应用/策略)"},{name:"server",description:"服务器"},{name:"os",description:"操作系统"},{name:"app",description:"应用"},{name:"env",description:"环境"},{name:"port",description:"端口"},{name:"version",description:"版本"},{name:"builder",description:"构建工具"},{name:"appType",description:"应用类型"},{name:"time",description:"时间"},{name:"component",description:"组件"},{name:"panel",description:"面板"}]},f=new Map,m={};chrome.webNavigation.onCommitted.addListener(e=>{const{tabId:t}=e;m[t]&&m[t].clear()});function x(e,t){f.set(e,t),chrome.storage.session.set({[`tab_${e}`]:t})}function S(e,t){if(f.has(e)){t(f.get(e));return}chrome.storage.session.get(`tab_${e}`,n=>{const a=n[`tab_${e}`]||0;f.set(e,a),t(a)})}function w(e,t){const n=t>0;chrome.action.setBadgeText({text:n?String(t):"",tabId:e}),chrome.action.setBadgeBackgroundColor({color:n?"#4dabf7":"#666666",tabId:e})}function T(e,t){const a=["domains","absoluteApis","apis","moduleFiles","docFiles","ips","phones","emails","idcards","jwts","imageFiles","jsFiles","vueFiles","urls","githubUrls","companies","credentials","cookies","idKeys"].reduce((r,i)=>{const o=e[i];return r+(Array.isArray(o)&&o.length>0?1:0)},0);x(t,a),chrome.tabs.query({active:!0,currentWindow:!0},r=>{r?.[0]?.id===t&&w(t,a)})}chrome.tabs.onActivated.addListener(({tabId:e})=>{S(e,t=>{w(e,t)})});chrome.tabs.onRemoved.addListener(e=>{f.delete(e),chrome.storage.session.remove(`tab_${e}`),chrome.storage.session.remove(`analysis_${e}`),m[e]&&m[e].clear(),Object.values(v).forEach(t=>t.delete(e)),u.delete(e)});async function I(e){const t=await fetch(e,{headers:{Accept:"*/*","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"},credentials:"omit"});if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return await t.text()}async function b(e,t){const[n]=await chrome.scripting.executeScript({target:{tabId:e},func:a=>fetch(a,{credentials:"omit"}).then(r=>r.text()),args:[t]});return n?.result??null}async function A(e,t,n){try{const a=await I(e.url);n({content:a})}catch(a){if(console.warn("Primary fetch failed:",a.message),t.tab?.id)try{const r=await b(t.tab.id,e.url);n({content:r})}catch(r){console.warn("Fallback fetch via tab failed:",r.message),n({content:null})}else n({content:null})}}let u=new Map;const v={baidu:new Map,yahoo:new Map,google:new Map};

// 信息搜集模式
const scannerPatterns = {
  domains: /\b(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}\b/g,
  absoluteApis: /\/api\/[a-zA-Z0-9\-_\/\.]*/g,
  apis: /\/[a-zA-Z0-9\-_]+\/[a-zA-Z0-9\-_]+/g,
  moduleFiles: /\.(dll|so|dylib|class|jar|war|ear|sar|lib|a|lib\.a)\b/gi,
  docFiles: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|rtf|odt|ods|odp|md|markdown|csv)\b/gi,
  credentials: /(user(name)?|login|account|acct|pass(word)?|pwd)\s*[=:]\s*["'][^"']*["']/gi,
  idKeys: /(access|api|secret|private|public|auth|token|key)\s*[=:]\s*["'][^"']*["']/gi,
  phones: /(\+?86\s*[-\.]?)?(1[3-9]\d{9})/g,
  emails: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  idcards: /(\d{17}[\dXx])|(\d{15})/g,
  ips: /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g,
  jwts: /[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*/g,
  imageFiles: /\.(jpg|jpeg|png|gif|bmp|svg|webp|ico|tiff|tif|psd|ai|eps|raw|cr2|nef|orf|sr2|mp3|wav|ogg|flac|aac|wma|mp4|avi|mkv|mov|wmv|flv|webm|m4a|flv|f4v|f4p|f4a|f4b)\b/gi,
  jsFiles: /\.(js|jsx|ts|tsx|vue|css|scss|sass|less|html|htm|xml|json)\b/gi,
  vueFiles: /\.vue\b/gi,
  urls: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g,
  githubUrls: /https?:\/\/(www\.)?github\.com\/[A-Za-z0-9\-_]+\/[A-Za-z0-9\-_]+/g
};function P(e,t){if(v[t].get(e.tabId))return;let n=y(e.tabId);v[t].set(e.tabId,!0),n.analytics.push({type:"analytics",name:p.ANALYTICS[t].name,description:p.ANALYTICS[t].description,version:p.ANALYTICS[t].version}),u.set(e.tabId,n)}const N=Object.entries(p.ANALYTICS).map(([e,t])=>({pattern:t.pattern,type:e}));chrome.webRequest.onBeforeRequest.addListener(e=>{const t=N.find(s=>e.url.match(new RegExp(s.pattern.replace(/[*]/g,".*"))));t&&P(e,t.type);const{tabId:n,url:a,type:r}=e;if(r!=="script"||n<0)return;const i=new URL(e.initiator||""),o=new URL(a);i.hostname===o.hostname&&(m[n]||(m[n]=new Set),m[n].add(a))},{urls:["<all_urls>"]},[]);function E(e){for(const t of p.COOKIES)if(t.match.test(e))return{type:t.type,name:t.name,description:`通过cookie识别到网站使用${t.name}作为服务端${p.DESCRIPTIONS.find(n=>n.name===t.type)?.description}`};return null}function C(e,t){let n=y(t);const a=new Map(e.map(r=>[r.name.toLowerCase(),r.value||""]));for(const r of p.HEADERS){if(!r.header)continue;const i=a.get(r.header.toLowerCase());if(i){const o=i.match(r.pattern);if(o&&!n.nameMap.has(r.name)){const s={...r};if(s.description=`通过${s.header}识别到网站使用${s.name}${p.DESCRIPTIONS.find(n=>n.name===r.type)?.description}`,r.extType&&!u.get(t)?.nameMap.has(r.extName)){const c={type:r.extType,name:r.extName||"",header:r.header,description:`通过${r.header}识别到网站使用${r.extName}${p.DESCRIPTIONS.find(d=>d.name===r.extType)?.description}`};n[r.extType].push(c),n.nameMap.set(r.extName,!0)}let l=1;if(r.value)if(o.length>1)for(const c of r.value.split(","))s[c]=o[l]?o[l]:null,s.description+=`，${p.DESCRIPTIONS.find(d=>d.name===c)?.description}为${s[c]||"未知"}`,l++;else s[r.value]=o[0]?o[0]:null,s.description+=`，${p.DESCRIPTIONS.find(c=>c.name===r.value)?.description}为${s[r.value]||"未知"}`;n[r.type].push(s),n.nameMap.set(r.name,!0)}}}return n}function y(e){if(u.has(e))return u.get(e);let t={server:[],component:[],technology:[],security:[],analytics:[],builder:[],framework:[],os:[],panel:[],cdn:[],nameMap:new Map};return u.set(e,t),t}

// 扫描页面内容
async function scanPageContent(tabId, url) {
  console.log('[Background] 开始扫描页面内容:', url);
  
  try {
    // 获取页面内容
    const results = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => ({
        content: document.documentElement.innerHTML,
        title: document.title,
        url: window.location.href
      })
    });
    
    if (!results || results.length === 0 || !results[0].result) {
      throw new Error('无法获取页面内容');
    }
    
    const pageData = results[0].result;
    console.log('[Background] 获取页面内容成功，内容长度:', pageData.content.length);
    
    // 初始化扫描结果
    const scanResults = {
      domains: [],
      absoluteApis: [],
      apis: [],
      moduleFiles: [],
      docFiles: [],
      credentials: [],
      cookies: [],
      idKeys: [],
      phones: [],
      emails: [],
      idcards: [],
      ips: [],
      companies: [],
      jwts: [],
      imageFiles: [],
      jsFiles: [],
      vueFiles: [],
      urls: [],
      githubUrls: [],
      progress: [[0, 100]]
    };
    
    // 执行扫描
    Object.keys(scannerPatterns).forEach(key => {
      try {
        const pattern = scannerPatterns[key];
        const matches = pageData.content.match(pattern) || [];
        console.log(`[Background] ${key} 匹配数量:`, matches.length);
        
        // 去重并存储结果
        const uniqueMatches = [...new Set(matches)];
        scanResults[key] = uniqueMatches.map(match => [match, pageData.url]);
      } catch (error) {
        console.error(`[Background] 扫描 ${key} 时出错:`, error);
      }
    });
    
    console.log('[Background] 扫描完成');
    return scanResults;
  } catch (error) {
    console.error('[Background] 扫描页面内容时出错:', error);
    throw error;
  }
}chrome.webRequest.onHeadersReceived.addListener(e=>e.type!=="main_frame"?{responseHeaders:e.responseHeaders}:e.responseHeaders?(setTimeout(()=>{const t=C(e.responseHeaders,e.tabId);u.set(e.tabId,t),chrome.cookies.getAll({url:e.url},n=>{if(n.length>0){const a=n.map(i=>i.name).join(";"),r=E(a);r&&!t.nameMap.has(r.name)&&(t[r.type].push(r),t.nameMap.set(r.name,!0))}})},0),{responseHeaders:e.responseHeaders}):{responseHeaders:e.responseHeaders},{urls:["<all_urls>"]},["responseHeaders"]);function $(e,t,n){const a=[];let r=1e4;try{for(const i of t){const{pattern:o}=i;let s;try{const d=o.match(/^\/(.+)\/([gimuy]*)$/);if(d)s=new RegExp(d[1],d[2]);else continue}catch(d){console.error(`无效的正则表达式: ${o}`,d);continue}let l=0,c;for(;(c=s.exec(e))!==null;){if(s.lastIndex<=l){console.warn(`检测到可能的无限循环: ${n} Pattern`);break}if(l=s.lastIndex,--r<=0){console.warn(`达到最大迭代次数: ${n}`);break}a.push({match:c[0]})}s.lastIndex=0}}catch(i){console.error(`${n} 匹配出错:`,i)}return a}chrome.runtime.onMessage.addListener((e,t,n)=>{if(e.to!=="background")return!1;try{switch(e.type){case"UPDATE_BUILDER":{if(!t.tab?.id)return!1;let a=y(t.tab.id);if(!a.nameMap.has(e.finger.name)){if(e.finger.extType&&!a.nameMap.has(e.finger.extName)){const r={type:e.finger.extType,name:e.finger.extName||"",header:e.finger.name,description:`通过${e.finger.name}识别到网站使用${e.finger.extName}${p.DESCRIPTIONS.find(i=>i.name===e.finger.extType)?.description||""}`};a[e.finger.extType].push(r),a.nameMap.set(e.finger.extName,!0)}a.nameMap.set(e.finger.name,!0),a[e.finger.type].push(e.finger),u.set(t.tab.id,a)}return!0}case"GET_FINGERPRINTS":{const a=y(e.tabId);return n(a),!0}case"FETCH_JS":return A(e,t,n),!0;case"REGISTER_CONTENT":{if(!t.tab?.id)return!1;const a=Array.from(m[t.tab.id]||[]);return n({tabJs:a,tabId:t.tab.id}),!0}case"UPDATE_BADGE":return T(e.results,e.tabId),!0;case"GET_TAB_ID":return n({tabId:t.tab?.id}),!0;case"REGEX_MATCH":{const{chunk:a,patterns:r,patternType:i}=e,o=$(a,r,i);return n({matches:o}),!0}case"GET_SITE_ANALYSIS":{const a=L(e.domain),r=e.tabId;return h?!0:(h=!0,H(a)?(h=!1,n({weight:null,ip:null,icp:null,isComplete:!0,isPrivateIP:!0}),!0):(k(r).then(i=>{if(i.isComplete){h=!1,n(i);return}Promise.all([i.weight||O(a),i.ip||j(e.domain),i.icp||F(a)]).then(([o,s,l])=>{h=!1,_(r,o,s,l),n({weight:o?.data||null,ip:s?.data||null,icp:l?.data||null,isComplete:!0,isPrivateIP:!1})}).catch(o=>{h=!1,console.error("分析请求失败:",o),n(null)})}),!0))}case"GET_RESULTS":{if(!t.tab?.id)return!1;// 直接在background中执行信息搜集，避免内容脚本通信问题
scanPageContent(t.tab.id, t.tab.url).then(results => {console.log('[Background] 信息搜集完成');n({ results: results, success: true });}).catch(error => {console.error('[Background] 信息搜集失败:', error);n({ success: false, error: error.message });});return!0}case"TRIGGER_FINGERPRINT_SCAN":{if(!t.tab?.id)return!1;chrome.tabs.sendMessage(t.tab.id, { type: 'FINGERPRINT_SCAN_PAGE' }, (response) => {if (chrome.runtime.lastError) {console.log('[Background] 发送扫描消息失败:', chrome.runtime.lastError.message);n({ success: false, error: chrome.runtime.lastError.message });} else {console.log('[Background] 指纹扫描消息已发送');n({ success: true });}});return!0}}}catch(a){return console.error("消息处理出错:",a),n(null),!0}});function k(e){return new Promise(t=>{const n=`analysis_${e}`;chrome.storage.session.get(n,a=>{const r=a[n];if(!r)return t(M());t({weight:r.weight?.data||null,ip:r.ip?.data||null,icp:r.icp?.data||null,isComplete:!!(r.weight&&r.ip&&r.icp)})})})}function _(e,t,n,a){const r=`analysis_${e}`;chrome.storage.session.set({[r]:{weight:t?{data:t.data}:null,ip:n?{data:n.data}:null,icp:a?{data:a.data}:null}})}function M(){return{weight:null,ip:null,icp:null,isComplete:!1}}function H(e){if(/^\d{1,3}(\.\d{1,3}){3}$/.test(e)){const n=e.split("."),a=parseInt(n[0]),r=parseInt(n[1]);return a===10||a===172&&r>=16&&r<=31||a===192&&r===168||e==="127.0.0.1"}return!1}function L(e){const t=["com.cn","edu.cn","gov.cn","org.cn","net.cn","co.jp","co.uk","co.kr","com.hk"],n=e.split(".");if(n.length<=2)return e;for(const a of t)if(e.endsWith(`.${a}`))return n.slice(-(a.split(".").length+1)).join(".");return n.slice(-2).join(".")}async function g(e){const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status}`);return{data:await t.json()}}async function O(e){const t=`https://api.mir6.com/api/bdqz?myKey=84fbd322b048f19626e861932ec7d572&domain=${e}&type=json`;try{return await g(t)}catch(n){return console.error("域名权重查询失败:",n),null}}async function j(e){const t=`https://api.mir6.com/api/ip_json?myKey=7f5860bc55587662c37cf678a7871ad0&ip=${e}`;try{return await g(t)}catch(n){return console.error("IP 查询失败:",n),null}}async function F(e){if(/^\d{1,3}(\.\d{1,3}){3}$/.test(e))return{data:{icp:"IP地址不适用",unit:"IP地址不适用",time:"IP地址不适用"}};const n=`https://cn.apihz.cn/api/wangzhan/icp.php?id=10006978&key=c7e331a036de5934b6687b7a43fa5d99&domain=${e}`;try{const a=await g(n);return a?.data?.code===404?{data:{icp:"未查询到备案信息",unit:"未知",time:"未知"}}:a}catch(a){return console.error("备案查询失败:",a),null}}let h=!1;

// 当标签页更新时重新扫描（已禁用，改为在popup中直接执行信息搜集）
/*
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    // 页面加载完成后，自动执行信息搜集
    console.log('[Background] 标签页加载完成，开始自动信息搜集', tabId, tab.url);
    
    // 添加延迟确保页面完全加载
    setTimeout(() => {
      scanPageContent(tabId, tab.url).then(results => {
        console.log('[Background] 自动信息搜集完成', tabId);
        // 将结果存储到session storage中，供popup页面读取
        chrome.storage.session.set({[`scanResults_${tabId}`]: results}, () => {
          console.log('[Background] 扫描结果已存储', tabId);
          // 同时发送消息通知popup页面有新结果
          chrome.runtime.sendMessage({
            type: "SCAN_RESULTS_READY",
            tabId: tabId,
            results: results
          });
        });
      }).catch(error => {
        console.error('[Background] 自动信息搜集失败:', tabId, error);
        // 存储错误信息
        chrome.storage.session.set({[`scanError_${tabId}`]: error.message}, () => {
          console.log('[Background] 错误信息已存储', tabId);
        });
      });
    }, 1000); // 延迟1秒确保页面完全加载
  }
});
*/


