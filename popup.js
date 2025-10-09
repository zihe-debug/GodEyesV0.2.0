const T=[{id:"baidupc",name:"百度PC"},{id:"google",name:"Google"},{id:"360",name:"360搜索"},{id:"baidum",name:"百度移动"},{id:"sougou",name:"搜狗"},{id:"shenma",name:"神马"}];let h=null;

// 用于存储原始Cookie数据
let originalCookies = null;

// 用于存储scanner页面的当前侧边栏状态
let scannerSidebarState = {};

// 侧边栏配置 - 基础配置
const baseSidebarConfig = {
  scanner: [
    { id: 'domain-list', name: '域名', icon: '🌐' },
    { id: 'absolute-api-list', name: 'API接口(绝对路径)', icon: '🔗' },
    { id: 'api-list', name: 'API接口(相对路径)', icon: '🔗' },
    { id: 'module-list', name: '模块路径', icon: '📁' },
    { id: 'doc-list', name: '文档文件', icon: '📄' },
    { id: 'credentials-list', name: '用户名密码', icon: '🔑' },
    { id: 'cookie-list', name: 'Cookie', icon: '🍪' },
    { id: 'id-key-list', name: 'ID密钥', icon: '🔐' },
    { id: 'phone-list', name: '手机号码', icon: '📱' },
    { id: 'email-list', name: '邮箱', icon: '📧' },
    { id: 'idcard-list', name: '身份证号', icon: '💳' },
    { id: 'ip-list', name: 'IP地址', icon: '📍' },
    { id: 'company-list', name: '公司机构', icon: '🏢' },
    { id: 'jwt-list', name: 'JWT Token', icon: '🎫' },
    { id: 'image-list', name: '音频图片', icon: '🖼️' },
    { id: 'github-list', name: 'GitHub链接', icon: '💻' },
    { id: 'vue-list', name: 'Vue文件', icon: '💚' },
    { id: 'js-list', name: 'JS文件', icon: '📜' },
    { id: 'url-list', name: 'URL', icon: '🌐' }
  ],
  fingerprint: [
    { id: 'webserver-group', name: 'Web服务器', icon: '🖥️' },
    { id: 'technology-group', name: '技术栈', icon: '⚙️' },
    { id: 'framework-group', name: '框架', icon: '🏗️' },
    { id: 'cdn-group', name: 'CDN服务', icon: '📡' }
  ],
  analysis: [
    { id: 'basic-group', name: '基本信息', icon: '📋' },
    { id: 'weight-group', name: '权重信息', icon: '📊' },
    { id: 'ip-group', name: 'IP信息', icon: '📍' }
  ],
  config: [
    { id: 'whitelist-section', name: '白名单设置', icon: '📝' },
    { id: 'scan-options', name: '扫描选项', icon: '🔍' },
    { id: 'base-path-section', name: '基础路径配置', icon: '🔗' }
  ],
  cookie: [
    // 完全移除Cookie管理页面的侧边栏配置
  ],
  "url-multi": [
    // URL多开页面不需要侧边栏
  ]
};

// 根据扫描结果动态生成侧边栏配置
function getDynamicScannerSidebar(results) {
  // 确保results是一个对象
  if (!results || typeof results !== 'object') {
    results = {};
  }
  
  const scannerConfig = [];
  
  // 检查每个数据项是否存在且有数据
  if (results.domains && results.domains.length > 0) {
    scannerConfig.push({ id: 'domain-list', name: '域名', icon: '🌐' });
  }
  
  if (results.absoluteApis && results.absoluteApis.length > 0) {
    scannerConfig.push({ id: 'absolute-api-list', name: 'API接口(绝对路径)', icon: '🔗' });
  }
  
  if (results.apis && results.apis.length > 0) {
    scannerConfig.push({ id: 'api-list', name: 'API接口(相对路径)', icon: '🔗' });
  }
  
  if (results.moduleFiles && results.moduleFiles.length > 0) {
    scannerConfig.push({ id: 'module-list', name: '模块路径', icon: '📁' });
  }
  
  if (results.docFiles && results.docFiles.length > 0) {
    scannerConfig.push({ id: 'doc-list', name: '文档文件', icon: '📄' });
  }
  
  if (results.credentials && results.credentials.length > 0) {
    scannerConfig.push({ id: 'credentials-list', name: '用户名密码', icon: '🔑' });
  }
  
  if (results.cookies && results.cookies.length > 0) {
    scannerConfig.push({ id: 'cookie-list', name: 'Cookie', icon: '🍪' });
  }
  
  if (results.idKeys && results.idKeys.length > 0) {
    scannerConfig.push({ id: 'id-key-list', name: 'ID密钥', icon: '🔐' });
  }
  
  if (results.phones && results.phones.length > 0) {
    scannerConfig.push({ id: 'phone-list', name: '手机号码', icon: '📱' });
  }
  
  if (results.emails && results.emails.length > 0) {
    scannerConfig.push({ id: 'email-list', name: '邮箱', icon: '📧' });
  }
  
  if (results.idcards && results.idcards.length > 0) {
    scannerConfig.push({ id: 'idcard-list', name: '身份证号', icon: '💳' });
  }
  
  if (results.ips && results.ips.length > 0) {
    scannerConfig.push({ id: 'ip-list', name: 'IP地址', icon: '📍' });
  }
  
  if (results.companies && results.companies.length > 0) {
    scannerConfig.push({ id: 'company-list', name: '公司机构', icon: '🏢' });
  }
  
  if (results.jwts && results.jwts.length > 0) {
    scannerConfig.push({ id: 'jwt-list', name: 'JWT Token', icon: '🎫' });
  }
  
  if (results.imageFiles && results.imageFiles.length > 0) {
    scannerConfig.push({ id: 'image-list', name: '音频图片', icon: '🖼️' });
  }
  
  if (results.githubUrls && results.githubUrls.length > 0) {
    scannerConfig.push({ id: 'github-list', name: 'GitHub链接', icon: '💻' });
  }
  
  if (results.vueFiles && results.vueFiles.length > 0) {
    scannerConfig.push({ id: 'vue-list', name: 'Vue文件', icon: '💚' });
  }
  
  if (results.jsFiles && results.jsFiles.length > 0) {
    scannerConfig.push({ id: 'js-list', name: 'JS文件', icon: '📜' });
  }
  
  if (results.urls && results.urls.length > 0) {
    scannerConfig.push({ id: 'url-list', name: 'URL', icon: '🌐' });
  }
  
  return scannerConfig;
}

// 更新侧边栏
function updateSidebar(page, results = null) {
  const sidebar = document.querySelector('.sidebar');
  sidebar.innerHTML = '';
  
  // 对于URL多开页面，不显示任何侧边栏
  if (page === 'url-multi') {
    return;
  }
  
  let configToShow = [];
  
  if (page === 'scanner') {
    // 对于扫描页面，根据实际结果动态生成侧边栏
    // 即使results为null，也要调用getDynamicScannerSidebar以生成空数组
    configToShow = getDynamicScannerSidebar(results || {});
    // 保存当前scanner页面的侧边栏状态
    scannerSidebarState = results || {};
  } else if (baseSidebarConfig[page]) {
    // 对于其他页面，使用基础配置
    configToShow = baseSidebarConfig[page];
  }
  
  // 对于scanner页面，始终显示侧边栏（即使没有内容）
  // 对于其他页面，只有当configToShow有内容时才显示
  if (page === 'scanner' || configToShow.length > 0) {
    configToShow.forEach(item => {
      const button = document.createElement('button');
      button.className = 'sidebar-button';
      button.innerHTML = `
        <span class="icon">${item.icon}</span>
        ${item.name}
      `;
      button.dataset.target = item.id;
      button.addEventListener('click', () => {
        // 激活侧边栏按钮
        document.querySelectorAll('.sidebar-button').forEach(btn => {
          btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // 滚动到对应内容
        let targetElement = null;
        
        // 对于信息收集页面，需要特殊处理
        if (page === 'scanner') {
          // 在信息收集页面中查找对应的.section元素
          const sections = document.querySelectorAll('.scanner-page .section');
          for (let section of sections) {
            // 检查section中的.content-wrapper是否有匹配的类名
            const contentWrapper = section.querySelector('.content-wrapper');
            if (contentWrapper && contentWrapper.classList.contains(item.id)) {
              targetElement = section;
              break;
            }
          }
        } else {
          // 对于其他页面，使用原有的查找方式
          targetElement = document.getElementById(item.id) || document.querySelector(`.${item.id}`);
        }
        
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      sidebar.appendChild(button);
    });
    
    // 默认激活第一个按钮（如果有的话）
    if (sidebar.children.length > 0) {
      sidebar.children[0].classList.add('active');
    }
  }
}

// 页面切换函数 - 保留原有逻辑
async function g(e){
  document.querySelectorAll(".nav-tab").forEach(t=>{
    t.classList.remove("active");
    t.dataset.page===e&&t.classList.add("active");
  });
  
  document.querySelectorAll(".page").forEach(t=>{
    t.style.display="none";
    t.classList.contains(`${e}-page`) && (t.style.display="block", k(e));
  });
  
  // 更新侧边栏（除了Cookie管理和URL多开页面）
  if (e !== 'cookie' && e !== 'url-multi') {
    // 对于信息搜集页面，使用保存的状态
    if (e === 'scanner') {
      updateSidebar(e, scannerSidebarState);
    } else {
      updateSidebar(e);
    }
    // 显示侧边栏
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.style.display = 'block';
    }
  } else {
    // 对于Cookie管理和URL多开页面，隐藏侧边栏
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.style.display = 'none';
    }
  }
}

// 初始化页面函数 - 保留原有逻辑
async function k(e){
  // 确保侧边栏在非Cookie和非URL多开页面时显示
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    if (e === 'cookie' || e === 'url-multi') {
      sidebar.style.display = 'none';
    } else {
      sidebar.style.display = 'block';
    }
  }
  
  switch(e){
    case"config":
      b();
      break;
    case"fingerprint":
      U();
      break;
    case"analysis":
      W();
      break;
    case"cookie":
      await initCookiePage();
      break;
    case"url-multi":
      initUrlMultiPage();
      break;
  }
}

function M(){
  const e=document.getElementById("whitelistInput");
  if(!e)return;
  const t=e.value.split(`
`).map(n=>n.trim()).filter(n=>n&&n.length>0);
  chrome.storage.local.set({customWhitelist:t},()=>{
    A("保存成功");
  });
}

function A(e){
  const t=document.getElementById("saveWhitelist");
  if(!t)return;
  const n=t.getBoundingClientRect();
  const i=document.createElement("div");
  i.className="copy-tooltip";
  i.textContent=e;
  i.style.left=`${n.left+n.width/2}px`;
  i.style.top=`${n.top-30}px`;
  document.body.appendChild(i);
  setTimeout(()=>i.remove(),1500);
}

function q(e,t){
  chrome.storage.local.get(["customWhitelist"],n=>{
    if(!n.customWhitelist||n.customWhitelist.length===0){
      t(!1);
      return;
    }
    const s=n.customWhitelist.map(a=>a.toLowerCase()).some(a=>e===a||e.endsWith(`.${a}`));
    t(s);
  });
}

function P(e){
  const t=[
    {id:"domain-list",data:e.domains,title:"域名"},
    {id:"absolute-api-list",data:e.absoluteApis,title:"API接口(绝对路径)",hasUrlCopy:!0},
    {id:"api-list",data:e.apis,title:"API接口(相对路径)",hasUrlCopy:!0},
    {id:"module-list",data:e.moduleFiles,title:"模块路径"},
    {id:"doc-list",data:e.docFiles,title:"文档文件"},
    {id:"credentials-list",data:e.credentials,title:"用户名密码"},
    {id:"cookie-list",data:e.cookies,title:"Cookie"},
    {id:"id-key-list",data:e.idKeys,title:"ID密钥"},
    {id:"phone-list",data:e.phones,title:"手机号码"},
    {id:"email-list",data:e.emails,title:"邮箱"},
    {id:"idcard-list",data:e.idcards,title:"身份证号"},
    {id:"ip-list",data:e.ips,title:"IP地址"},
    {id:"company-list",data:e.companies,title:"公司机构"},
    {id:"jwt-list",data:e.jwts,title:"JWT Token"},
    {id:"image-list",data:e.imageFiles,title:"音频图片"},
    {id:"github-list",data:e.githubUrls,title:"GitHub链接"},
    {id:"vue-list",data:e.vueFiles,title:"Vue文件"},
    {id:"js-list",data:e.jsFiles,title:"JS文件"},
    {id:"url-list",data:e.urls,title:"URL"}
  ];
  const n=document.querySelector(".scanner-page .container");
  let i="";
  t.forEach(({id:s,data:a,title:o,hasUrlCopy:d})=>{
    // 定义需要显示复制URL按钮的文件类型
    const showCopyUrlButton = (s === "module-list" || s === "doc-list" || s === "image-list" || s === "vue-list" || s === "js-list");
    // 对于GitHub链接和URL部分，直接使用"复制URL"文本
    const isUrlSection = (s === "github-list" || s === "url-list");
    const buttonText = isUrlSection ? '复制URL' : '复制全部';
    const buttonTitle = isUrlSection ? '复制URL' : '复制全部';
    
    a&&a.length>0&&(i+=`
        <div class="section">
          <div class="section-header">
            <div class="title-wrapper">
              <span class="title">${o}</span>
              <span class="count">(${a.length})</span>
            </div>
            <div class="button-group">
              <button class="copy-btn" title="${buttonTitle}">
                <svg viewBox="0 0 24 24"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                ${buttonText}
              </button>
              ${showCopyUrlButton || d?`
                <button class="copy-url-btn" title="复制URL" data-section="${s}">
                  <svg viewBox="0 0 24 24"><path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
                  复制URL
                </button>
              `:""}
            </div>
          </div>
          <div class="section-content">
            <div class="content-wrapper ${s}">
              ${Array.from(a).map(c=>`<div class="item" title="来源: ${c[1]}" data-source="${c[1]}" data-type="${s}">
                  ${c[0]}
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      `)});
      
  if (!i) {
    i = '<div class="no-results">未发现敏感信息</div>';
  }
  
  n.innerHTML = i;
  
  // 更新侧边栏，只显示有数据的模块
  // 即使e为undefined，也要传递一个空对象
  updateSidebar('scanner', e || {});
  
  // 绑定复制按钮事件
  n.querySelectorAll(".copy-btn").forEach(s=>{
    s.addEventListener("click",a=>{
      const o=a.target.closest(".section");
      const c=Array.from(o.querySelectorAll(".item")).map(l=>l.textContent.trim()).filter(Boolean).join(`
`);
      // 应用基础路径配置到复制全部按钮
      chrome.storage.local.get(["basePath"], storageResult => {
        const basePath = storageResult.basePath;
        if (basePath) {
          const urls = c.split('\n');
          const processedUrls = urls.map(url => applyBasePath(url, basePath)).join('\n');
          v(processedUrls, a.clientX, a.clientY);
        } else {
          v(c, a.clientX, a.clientY);
        }
      });
    });
  });
  
  // 绑定复制URL按钮事件
  n.querySelectorAll(".copy-url-btn").forEach(s=>{
    s.addEventListener("click",a=>{
      const o=a.target.closest(".section");
      const d=Array.from(o.querySelectorAll(".item"));
      const sectionType = s.dataset.section || o.querySelector(".content-wrapper").className.split(" ")[1];
      u().then(l=>{
        if(l&&l.url){
          const baseUrl = new URL(l.url).origin;
          const currentPageUrl = new URL(l.url);
          const fullUrls = d.map(I=>{
            const path = I.textContent.trim();
            // 对于不同类型的文件，生成完整的URL
            if (sectionType === "module-list" || sectionType === "doc-list" || sectionType === "image-list" || sectionType === "vue-list" || sectionType === "js-list") {
              // 如果路径已经是完整URL，则直接返回
              if (path.startsWith('http://') || path.startsWith('https://')) {
                return path;
              }
              // 否则拼接基础URL和路径
              try {
                return new URL(path, currentPageUrl.href).href;
              } catch (e) {
                // 如果无法创建完整URL，则使用基础URL拼接路径
                const basePath = currentPageUrl.pathname.substring(0, currentPageUrl.pathname.lastIndexOf("/"));
                return baseUrl + (path.startsWith('/') ? path : basePath + "/" + path);
              }
            }
            // 对于API接口(绝对路径)，生成完整的URL
            if(sectionType==="absolute-api-list") {
              // 如果路径已经是完整URL，则直接返回
              if (path.startsWith('http://') || path.startsWith('https://')) {
                return path;
              }
              // 否则拼接基础URL和路径
              return baseUrl + path;
            }
            // 对于API接口(相对路径)，生成完整的URL
            if(sectionType==="api-list") {
              // 如果路径已经是完整URL，则直接返回
              if (path.startsWith('http://') || path.startsWith('https://')) {
                return path;
              }
              try {
                return new URL(path, currentPageUrl.href).href;
              } catch {
                const basePath = currentPageUrl.pathname.substring(0, currentPageUrl.pathname.lastIndexOf("/"));
                return baseUrl + basePath + "/" + path;
              }
            }
            // 对于URL部分，确保是完整的URL
            if(sectionType==="url-list" || sectionType==="github-list") {
              // 如果路径已经是完整URL，则直接返回
              if (path.startsWith('http://') || path.startsWith('https://')) {
                return path;
              }
              // 否则尝试创建完整URL
              try {
                return new URL(path, currentPageUrl.href).href;
              } catch {
                return baseUrl + (path.startsWith('/') ? path : "/" + path);
              }
            }
            return path;
          }).filter(Boolean).join(`
`);
          
          // 应用基础路径配置
          chrome.storage.local.get(["basePath"], storageResult => {
            const basePath = storageResult.basePath;
            if (basePath) {
              const urls = fullUrls.split('\n');
              const processedUrls = urls.map(url => applyBasePath(url, basePath)).join('\n');
              v(processedUrls, a.clientX, a.clientY);
            } else {
              v(fullUrls, a.clientX, a.clientY);
            }
          });
        }
      });
    });
  });
  
  // 绑定项目点击事件
  n.querySelectorAll(".item").forEach(s=>{
    s.addEventListener("click",a=>{
      const o=s.dataset.source;
      if(o){
        if(a.ctrlKey||a.metaKey){
          a.preventDefault();
          chrome.tabs.create({url:o});
          f("已在新标签页打开",a.clientX,a.clientY);
        }else{
          v(o,a.clientX,a.clientY);
        }
      }
    });
    
    s.addEventListener("contextmenu",a=>{
      a.preventDefault();
      v(s.textContent.trim(),a.clientX,a.clientY);
    });
  });
}

async function v(e,t,n){
  try{
    await navigator.clipboard.writeText(e);
    f("复制成功",t,n);
  }catch{
    f("复制失败",t,n);
  }
}

function f(e,t,n){
  const i=document.createElement("div");
  i.className="copy-tooltip";
  i.textContent=e;
  i.style.left=`${t}px`;
  i.style.top=`${n}px`;
  document.body.appendChild(i);
  setTimeout(()=>i.remove(),1500);
}

document.addEventListener("DOMContentLoaded",async ()=>{
  // 使用原有的页面切换逻辑
  const e=document.querySelector(".nav-tab.active").dataset.page;
  await g(e);
  
  const t=document.querySelector(".scanner-page .container");
  t.innerHTML='<div class="loading">正在扫描...</div>';
  u().then(n=>{
    if(n&&n.url){
      const i=new URL(n.url).hostname.toLowerCase();
      q(i,s=>{
        if(s){
          t.innerHTML='<div class="whitelisted">当前域名在白名单中，已跳过扫描</div>';
          y(100);
          // 即使跳过扫描，也要更新侧边栏以确保正确显示
          updateSidebar('scanner', {});
          return;
        }
        chrome.tabs.sendMessage(n.id,{type:"GET_RESULTS",tabId:n.id,from:"popup"});
      });
    }
  });
  b(),z();
});

function y(e){
  const t=document.querySelector(".progress-tab");
  t&&(t.textContent=`${e}%`);
}

chrome.runtime.onMessage.addListener(e=>{
  e.type==="SCAN_UPDATE"&&e.tabId===h&&(e.results&&(P(e.results), scannerSidebarState = e.results),y(e.results.progress[0][1]));
});

function b(){
  chrome.storage.local.get(["dynamicScan","deepScan","customWhitelist","basePath"],e=>{
    const t=document.getElementById("dynamicScan");
    const n=document.getElementById("deepScan");
    const i=document.getElementById("whitelistInput");
    const basePathInput = document.getElementById("basePathInput");
    
    t&&(t.checked=e.dynamicScan===!0);
    n&&(n.checked=e.deepScan===!0);
    i&&e.customWhitelist&&(i.value=e.customWhitelist.join(`
`));
    basePathInput&&e.basePath&&(basePathInput.value=e.basePath);
  });
  
  // 更新侧边栏
  updateSidebar('config');
}

// 添加保存基础路径的函数
function saveBasePath() {
  const basePathInput = document.getElementById("basePathInput");
  if (!basePathInput) return;
  
  const basePath = basePathInput.value.trim();
  
  chrome.storage.local.set({basePath: basePath}, ()=>{
    // 显示保存成功的提示信息
    const saveBtn = document.getElementById("saveBasePath");
    if (saveBtn) {
      const rect = saveBtn.getBoundingClientRect();
      const tooltip = document.createElement("div");
      tooltip.className = "copy-tooltip";
      tooltip.textContent = "基础路径保存成功";
      tooltip.style.left = `${rect.left + rect.width/2}px`;
      tooltip.style.top = `${rect.top - 30}px`;
      document.body.appendChild(tooltip);
      setTimeout(() => tooltip.remove(), 1500);
    }
  });
}

// 添加基础路径处理函数
function applyBasePath(path, basePath) {
  // 如果没有配置基础路径，直接返回原路径
  if (!basePath) return path;
  
  // 如果是完整URL (http:// 或 https://)
  if (path.startsWith('http://') || path.startsWith('https://')) {
    try {
      const url = new URL(path);
      // 在路径部分添加基础路径（如果还没有的话）
      if (!url.pathname.startsWith(basePath + '/') && url.pathname !== basePath) {
        // 确保基础路径以/开头但不以/结尾
        const normalizedBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
        // 确保路径以/开头
        const normalizedPath = url.pathname.startsWith('/') ? url.pathname : '/' + url.pathname;
        url.pathname = normalizedBasePath + normalizedPath;
      }
      return url.toString();
    } catch (e) {
      // 如果URL解析失败，返回原路径
      return path;
    }
  } 
  // 如果是相对路径
  else {
    // 确保基础路径和路径的格式正确
    const normalizedBasePath = basePath.startsWith('/') ? basePath : '/' + basePath;
    const normalizedPath = path.startsWith('/') ? path : '/' + path;
    
    // 如果路径已经以基础路径开头，则不重复添加
    if (normalizedPath.startsWith(normalizedBasePath + '/') || normalizedPath === normalizedBasePath) {
      return normalizedPath;
    }
    
    // 合并基础路径和路径
    return normalizedBasePath + (normalizedPath.startsWith('/') ? normalizedPath.substring(1) : normalizedPath);
  }
}

// 测试基础路径功能的函数（仅用于调试）
function testBasePath() {
  const testCases = [
    { path: "/users", basePath: "/api", expected: "/api/users" },
    { path: "https://example.com", basePath: "/api", expected: "https://example.com/api" },
    { path: "http://example.com", basePath: "/api", expected: "http://example.com/api" },
    { path: "/api/users", basePath: "/api", expected: "/api/users" }, // 已经包含基础路径
    { path: "https://example.com/users", basePath: "/api", expected: "https://example.com/api/users" }
  ];
  
  console.log("基础路径功能测试:");
  testCases.forEach((testCase, index) => {
    const result = applyBasePath(testCase.path, testCase.basePath);
    const passed = result === testCase.expected;
    console.log(`测试 ${index + 1}: ${passed ? "通过" : "失败"} 
      输入: ${testCase.path}, 基础路径: ${testCase.basePath}
      期望: ${testCase.expected}
      实际: ${result}`);
  });
}

function x(e){
  const t=document.querySelector(".fingerprint-section");
  t.innerHTML="";
  let n=!1;
  for(const i in e)if(e[i]&&e[i].length>0){n=!0;break}
  if(!n){
    t.innerHTML=`
      <div class="notice">
        暂未识别到指纹
      </div>
    `;
    // 更新侧边栏
    updateSidebar('fingerprint');
    return;
  }
  for(const[i,s]of Object.entries(e))if(!(s.length===0||i==="nameMap"))for(const a of s)H(t,{type:i,name:a.name,description:a.description,value:a.version||a.name});
  
  // 更新侧边栏
  updateSidebar('fingerprint');
}

function H(e,t){
  const n=document.createElement("div");
  n.className=`fingerprint-group ${t.type}-group`;
  n.innerHTML=`
    <h3>
      <span class="tag ${t.type}-tag">${t.type[0].toUpperCase()+t.type.slice(1)}</span>
      ${t.name}
    </h3>
    <div class="fingerprint-item">
      <div class="fingerprint-label">${t.description}</div>
      <div class="fingerprint-value server-value detected">${t.value}</div>
    </div>
  `;
  e.appendChild(n);
}

function U(){
  u().then(e=>{
    e&&(console.log("Requesting fingerprints for tab:",e.id),chrome.runtime.sendMessage({type:"GET_FINGERPRINTS",tabId:e.id,from:"popup",to:"background"},t=>{
      console.log("Received response:",t);
      t&&x(t);
    }));
  });
}

function W(){
  const e=document.querySelector(".analysis-section");
  e.innerHTML='<div class="loading">正在获取网站信息...</div>';
  let t=null;
  return u().then(n=>{
    if(n&&n.url){
      const i=new URL(n.url).hostname;
      t=setTimeout(()=>{
        e.innerHTML='<div class="error">请求超时，请重试</div>';
      },1e4);
      chrome.runtime.sendMessage({type:"GET_SITE_ANALYSIS",domain:i,tabId:n.id,from:"popup",to:"background"},s=>{
        if(t&&clearTimeout(t),!s){
          e.innerHTML='<div class="error">获取网站信息失败</div>';
          return;
        }
        if(s.isPrivateIP){
          e.innerHTML='<div class="notice">内网地址无需解析</div>';
          return;
        }
        D(s,i);
      });
    }
  }),()=>{t&&clearTimeout(t)};
}

function D(e,t){
  const n=document.querySelector(".analysis-section");
  const i=e.icp;
  n.innerHTML=`
    <!-- 基本信息 -->
    <div class="analysis-group basic-group">
      <h3>基本信息</h3>
      <div class="basic-info">
        <div class="info-item">
          <span class="info-label">域名</span>
          <span class="info-value">${i?.domain||t}</span>
        </div>
        <div class="info-item">
          <span class="info-label">备案号</span>
          <span class="info-value">${i?.icp||"暂无备案信息"}</span>
        </div>
        <div class="info-item">
          <span class="info-label">主办单位</span>
          <span class="info-value">${i?.unit||"未知"}</span>
        </div>
        <div class="info-item">
          <span class="info-label">备案时间</span>
          <span class="info-value">${i?.time||"未知"}</span>
        </div>
      </div>
    </div>

    <!-- 域名权重信息 -->
    <div class="analysis-group weight-group">
      <h3>搜索引擎权重</h3>
      <div class="weight-grid"></div>
    </div>

    <!-- IP地址信息 -->
    <div class="analysis-group ip-group">
      <h3>IP信息</h3>
      <div class="ip-info"></div>
    </div>

    <!-- Whois信息 -->
    <div class="analysis-group whois-group">
      <h3>Whois信息</h3>
      <div class="whois-info"></div>
    </div>
  `;
  if(e.weight){
    const s=e.weight.data;
    R(s);
  }
  if(e.ip){
    const s=e.ip.data;
    F(s);
  }
  
  // 添加Whois信息处理
  if(e.whois){
    const s=e.whois.data;
    I(s);
  }
  
  // 更新侧边栏
  updateSidebar('analysis');
}

function N(e,t){
  const n=document.createDocumentFragment();
  t.forEach(i=>n.appendChild(i));
  e.innerHTML="";
  e.appendChild(n);
}

function R(e){
  const t=document.querySelector(".weight-grid");
  if(e?.error){
    t.textContent=e.error;
    return;
  }
  const n=T.map(i=>{
    const s=document.createElement("div");
    s.className="weight-item";
    const a=e[i.id]||"n";
    const o=a;
    const d=a;
    const c=document.createElement("img");
    c.className="weight-img";
    c.dataset.engine=i.id;
    c.dataset.src=`https://api.mir6.com/data/quanzhong_img/${i.id}/${d}.png`;
    c.alt=i.name;
    const l=document.createElement("span");
    l.className="weight-label";
    l.textContent=i.name;
    const p=document.createElement("span");
    p.className="weight-value";
    p.textContent=o;
    s.append(c,l,p);
    const r=new Image();
    r.src=c.dataset.src;
    r.onload=()=>{
      c.src=r.src;
      c.classList.add("loaded");
    };
    r.onerror=()=>{
      c.src=`https://api.mir6.com/data/quanzhong_img/${i.id}/0.png`;
      c.classList.add("loaded");
    };
    return s;
  });
  N(t,n);
}

function F(e){
  const t=document.querySelector(".ip-info");
  t.innerHTML=`
    <div class="info-item">
      <span class="info-label">IPv4/6</span>
      <span class="info-value">${e.ip||"无"}</span>
    </div>
    <div class="info-item">
      <span class="info-label">地理位置</span>
      <span class="info-value">${e.location||"无"}</span>
    </div>
    <div class="info-item">
      <span class="info-label">邮政编码</span>
      <span class="info-value">${e.zipcode||"无"}</span>
    </div>
    <div class="info-item">
      <span class="info-label">运营商</span>
      <span class="info-value">${e.isp||"无"}</span>
    </div>
  `;
}

function I(e){
  const t=document.querySelector(".whois-info");
  t.innerHTML=`
    <div class="info-item">
      <span class="info-label">注册商</span>
      <span class="info-value">${e.registrar||"无"}</span>
    </div>
    <div class="info-item">
      <span class="info-label">注册时间</span>
      <span class="info-value">${e.creation_date||"无"}</span>
    </div>
    <div class="info-item">
      <span class="info-label">过期时间</span>
      <span class="info-value">${e.expiration_date||"无"}</span>
    </div>
    <div class="info-item">
      <span class="info-label">更新时间</span>
      <span class="info-value">${e.updated_date||"无"}</span>
    </div>
  `;
}

const _={
  "click .nav-tab":S,
  "change #dynamicScan":E,
  "change #deepScan":B,
  "error .weight-img":L,
  "click #saveWhitelist":()=>M(),
  "click #saveBasePath":()=>saveBasePath(),
  "click #getCookieBtn":()=>getCurrentCookie(),
  "click #saveCookieBtn":(e)=>{
    e.preventDefault();
    e.stopPropagation();
    saveCookie();
    return false;
  },
  "click #restoreCookieBtn":(e)=>{
    e.preventDefault();
    e.stopPropagation();
    restoreCookie();
    return false;
  },
  "click #reRequestBtn":(e)=>{
    e.preventDefault();
    e.stopPropagation();
    reRequestWithCookie();
    return false;
  },
  "click #clearUrls":(e)=>{
    e.preventDefault();
    e.stopPropagation();
    clearUrls();
    return false;
  },
  "click #openAllUrls":(e)=>{
    e.preventDefault();
    e.stopPropagation();
    openAllUrls();
    return false;
  }
};

function z(){
  document.body.removeEventListener("click",S);
  document.body.removeEventListener("change",E);
  document.body.removeEventListener("error",L);
  Object.entries(_).forEach(([e,t])=>{
    const[n,i]=e.split(" ");
    document.body.addEventListener(n,async s=>{
      if(!i||s.target.matches(i)){
        if(typeof t === 'function' && t.constructor.name === 'AsyncFunction'){
          await t(s);
        } else {
          t(s);
        }
      }
    });
  });
}

async function S(e){
  const t=e.target.closest(".nav-tab");
  if(t){
    const n=t.dataset.page;
    await g(n);
  }
}

async function u(){
  const e=await chrome.tabs.query({active:!0,currentWindow:!0});
  return h=e[0].id,e[0];
}

function E(e){
  const t=e.target.checked;
  chrome.storage.local.set({dynamicScan:t});
  u().then(n=>{
    n&&chrome.tabs.sendMessage(n.id,{type:"UPDATE_DYNAMIC_SCAN",enabled:t});
  });
}

function B(e){
  const t=e.target.checked;
  chrome.storage.local.set({deepScan:t});
  u().then(n=>{
    n&&chrome.tabs.sendMessage(n.id,{type:"UPDATE_DEEP_SCAN",enabled:t});
  });
}

function L(e){
  if(e.target.classList.contains("weight-img")){
    const t=e.target.dataset.engine;
    e.target.src=`https://api.mir6.com/data/quanzhong_img/${t}/0.png`;
  }
}

// Cookie管理页面初始化函数
async function initCookiePage() {
  // 完全取消侧边栏显示
  // 清空侧边栏内容
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.innerHTML = '';
    // 隐藏侧边栏
    sidebar.style.display = 'none';
  }
  
  // 从持久化存储中恢复原始Cookie数据
  try {
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    if (tabs && tabs[0]) {
      const url = new URL(tabs[0].url);
      const domain = url.hostname;
      const result = await chrome.storage.local.get([`originalCookies_${domain}`]);
      const savedCookies = result[`originalCookies_${domain}`];
      if (savedCookies) {
        originalCookies = savedCookies;
      }
    }
  } catch (error) {
    console.error('恢复原始Cookie数据失败:', error);
  }
  
  // 注意：按钮事件已经在全局事件监听器中处理，无需重复绑定
}

// 获取当前页面的Cookie
async function getCurrentCookie() {
  try {
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    const currentTab = tabs[0];
    const url = new URL(currentTab.url);
    const domain = url.hostname;
    
    // 显示加载状态
    const cookieContent = document.getElementById('cookieContent');
    cookieContent.placeholder = '正在获取Cookie...';
    cookieContent.value = '';
    
    // 获取Cookie
    const cookies = await chrome.cookies.getAll({domain: domain});
    
    // 备份原始Cookie数据到内存和持久化存储
    originalCookies = cookies;
    
    // 持久化保存原始Cookie数据
    await chrome.storage.local.set({
      [`originalCookies_${domain}`]: cookies
    });
    
    if (cookies && cookies.length > 0) {
      // 格式化为Burp格式
      const cookieString = formatCookiesForBurp(cookies);
      cookieContent.value = cookieString;
      cookieContent.placeholder = 'Cookie将显示在这里...';
      showCookieMessage(`Cookie获取成功，共 ${cookies.length} 个`, 'success');
    } else {
      cookieContent.value = '';
      cookieContent.placeholder = '当前页面没有Cookie';
      showCookieMessage('未找到Cookie', 'info');
    }
  } catch (error) {
    console.error('获取Cookie失败:', error);
    document.getElementById('cookieContent').placeholder = '获取Cookie失败: ' + error.message;
    showCookieMessage('获取Cookie失败: ' + error.message, 'error');
  }
}

// 保存Cookie
async function saveCookie() {
  try {
    console.log('开始保存Cookie');
    
    const cookieContent = document.getElementById('cookieContent').value;
    if (!cookieContent) {
      showCookieMessage('没有Cookie内容可保存', 'info');
      return;
    }
    
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    const currentTab = tabs[0];
    const url = new URL(currentTab.url);
    const domain = url.hostname;
    const isSecure = url.protocol === 'https:';
    
    console.log('当前域名:', domain);
    
    // 获取当前域名下的所有现有Cookie并备份
    const existingCookies = await chrome.cookies.getAll({domain: domain});
    
    // 备份当前Cookie作为新的原始Cookie数据
    originalCookies = existingCookies;
    
    // 持久化保存原始Cookie数据
    await chrome.storage.local.set({
      [`originalCookies_${domain}`]: existingCookies
    });
    
    let removedCount = 0;
    
    // 清除当前域名下的所有现有Cookie
    for (const cookie of existingCookies) {
      try {
        await chrome.cookies.remove({
          url: `${cookie.secure ? 'https' : 'http'}://${cookie.domain}${cookie.path}`,
          name: cookie.name
        });
        removedCount++;
      } catch (error) {
        console.error(`删除Cookie失败: ${cookie.name}`, error);
      }
    }
    
    // 解析并设置新的Cookie
    const cookies = parseCookiesFromBurpFormat(cookieContent);
    let setCount = 0;
    
    console.log('开始设置Cookie，数量:', cookies.length);
    
    for (const cookie of cookies) {
      try {
        console.log('正在设置Cookie:', cookie.name);
        await chrome.cookies.set({
          url: `${isSecure ? 'https' : 'http'}://${domain}`,
          name: cookie.name,
          value: cookie.value,
          domain: domain,
          path: '/',
          secure: isSecure,
          httpOnly: false,
          sameSite: 'lax'
        });
        setCount++;
        console.log('Cookie设置完成:', cookie.name);
      } catch (error) {
        console.error(`设置Cookie失败: ${cookie.name}`, error);
      }
    }
    
    console.log('所有Cookie设置完成，设置数量:', setCount);
    console.log('Cookie保存完成');
    console.log('保存操作完成，未触发页面刷新');
    console.log('如果页面刷新，请检查是否有其他代码触发了此行为');
    
    // 防止任何可能的页面刷新
    setTimeout(() => {
      showCookieMessage(`Cookie保存完成: ${removedCount}个已删除, ${setCount}个已设置`, 'success');
    }, 100);
  } catch (error) {
    console.error('保存Cookie失败:', error);
    showCookieMessage('保存Cookie失败: ' + error.message, 'error');
  }
}

// 恢复原始Cookie
async function restoreCookie() {
  try {
    console.log('开始恢复Cookie');
    
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    const currentTab = tabs[0];
    const url = new URL(currentTab.url);
    const domain = url.hostname;
    
    console.log('当前域名:', domain);
    
    // 如果内存中没有原始Cookie数据，尝试从持久化存储中获取
    let cookiesToRestore = originalCookies;
    if (!cookiesToRestore) {
      const result = await chrome.storage.local.get([`originalCookies_${domain}`]);
      cookiesToRestore = result[`originalCookies_${domain}`];
    }
    
    if (!cookiesToRestore) {
      showCookieMessage('没有备份的原始Cookie数据', 'info');
      return;
    }
    
    // 先清除当前域名下的所有现有Cookie
    const existingCookies = await chrome.cookies.getAll({domain: domain});
    let removedCount = 0;
    
    for (const cookie of existingCookies) {
      try {
        await chrome.cookies.remove({
          url: `${cookie.secure ? 'https' : 'http'}://${cookie.domain}${cookie.path}`,
          name: cookie.name
        });
        removedCount++;
      } catch (error) {
        console.error(`删除Cookie失败: ${cookie.name}`, error);
      }
    }
    
    // 重新设置原始Cookie
    let setCount = 0;
    
    console.log('开始恢复Cookie，数量:', cookiesToRestore.length);
    
    for (const cookie of cookiesToRestore) {
      try {
        console.log('正在恢复Cookie:', cookie.name);
        await chrome.cookies.set({
          url: `${cookie.secure ? 'https' : 'http'}://${cookie.domain}${cookie.path}`,
          name: cookie.name,
          value: cookie.value,
          domain: cookie.domain,
          path: cookie.path,
          secure: cookie.secure,
          httpOnly: cookie.httpOnly,
          sameSite: cookie.sameSite,
          expirationDate: cookie.expirationDate
        });
        setCount++;
        console.log('Cookie恢复完成:', cookie.name);
      } catch (error) {
        console.error(`恢复Cookie失败: ${cookie.name}`, error);
      }
    }
    
    console.log('所有Cookie恢复完成，恢复数量:', setCount);
    
    // 更新文本编辑区显示原始Cookie
    const cookieString = formatCookiesForBurp(cookiesToRestore);
    const cookieContent = document.getElementById('cookieContent');
    cookieContent.value = cookieString;
    cookieContent.placeholder = 'Cookie将显示在这里...';
    
    console.log('Cookie恢复完成');
    
    // 防止任何可能的页面刷新
    setTimeout(() => {
      showCookieMessage(`Cookie恢复完成: ${removedCount}个已删除, ${setCount}个已恢复`, 'success');
    }, 100);
  } catch (error) {
    console.error('恢复Cookie失败:', error);
    const cookieContent = document.getElementById('cookieContent');
    cookieContent.placeholder = '恢复Cookie失败: ' + error.message;
    showCookieMessage('恢复Cookie失败: ' + error.message, 'error');
  }
}

// 使用Cookie重新请求
async function reRequestWithCookie() {
  try {
    const cookieContent = document.getElementById('cookieContent').value;
    if (!cookieContent) {
      showCookieMessage('没有Cookie内容', 'info');
      return;
    }
    
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    const currentTab = tabs[0];
    const url = new URL(currentTab.url);
    const domain = url.hostname;
    const isSecure = url.protocol === 'https:';
    
    // 显示提示信息
    showCookieMessage('正在使用Cookie重新请求...', 'info');
    
    // 先清除当前域名下的所有现有Cookie
    const existingCookies = await chrome.cookies.getAll({domain: domain});
    let removedCount = 0;
    
    for (const cookie of existingCookies) {
      try {
        await chrome.cookies.remove({
          url: `${cookie.secure ? 'https' : 'http'}://${cookie.domain}${cookie.path}`,
          name: cookie.name
        });
        removedCount++;
      } catch (error) {
        console.error(`删除Cookie失败: ${cookie.name}`, error);
      }
    }
    
    // 解析并设置新的Cookie
    const cookies = parseCookiesFromBurpFormat(cookieContent);
    let setCount = 0;
    
    for (const cookie of cookies) {
      try {
        await chrome.cookies.set({
          url: `${isSecure ? 'https' : 'http'}://${domain}`,
          name: cookie.name,
          value: cookie.value,
          domain: domain,
          path: '/',
          secure: isSecure,
          httpOnly: false,
          sameSite: 'lax'
        });
        setCount++;
      } catch (error) {
        console.error(`设置Cookie失败: ${cookie.name}`, error);
      }
    }
    
    // 重新加载当前标签页使Cookie生效
    await chrome.tabs.reload(currentTab.id);
    
    showCookieMessage(`Cookie已应用并重新加载页面: ${removedCount}个已删除, ${setCount}个已设置`, 'success');
  } catch (error) {
    console.error('重新请求失败:', error);
    showCookieMessage('重新请求失败: ' + error.message, 'error');
  }
}

// 解析Burp格式的Cookie
function parseCookiesFromBurpFormat(cookieString) {
  // 支持多种格式的Cookie解析
  const cookies = [];
  
  // 按行分割，处理多行格式
  const lines = cookieString.split('\n');
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;
    
    // 处理Burp格式 (name1=value1; name2=value2)
    if (trimmedLine.includes('=') && trimmedLine.includes(';')) {
      const pairs = trimmedLine.split(';');
      pairs.forEach(pair => {
        const trimmed = pair.trim();
        if (trimmed) {
          const [name, ...valueParts] = trimmed.split('=');
          if (name) {
            const value = valueParts.join('=') || '';
            cookies.push({
              name: name.trim(),
              value: value.trim()
            });
          }
        }
      });
    }
    // 处理单行格式 (name1=value1)
    else if (trimmedLine.includes('=')) {
      const [name, ...valueParts] = trimmedLine.split('=');
      if (name) {
        const value = valueParts.join('=') || '';
        cookies.push({
          name: name.trim(),
          value: value.trim()
        });
      }
    }
  });
  
  return cookies;
}

// 将Cookie格式化为Burp格式
function formatCookiesForBurp(cookies) {
  return cookies.map(cookie => {
    // 只包含name和value
    return `${cookie.name}=${cookie.value}`;
  }).join('; ');
}

// 显示Cookie操作消息
function showCookieMessage(message, type) {
  // 创建消息元素
  const messageEl = document.createElement('div');
  messageEl.className = `cookie-message ${type}`;
  messageEl.textContent = message;
  
  // 添加样式
  messageEl.style.position = 'fixed';
  messageEl.style.top = '50%';
  messageEl.style.left = '50%';
  messageEl.style.transform = 'translate(-50%, -50%)';
  messageEl.style.padding = '10px 20px';
  messageEl.style.borderRadius = '4px';
  messageEl.style.color = 'white';
  messageEl.style.fontWeight = '500';
  messageEl.style.zIndex = '9999';
  messageEl.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  
  // 根据类型设置背景色
  switch(type) {
    case 'success':
      messageEl.style.background = '#4caf50';
      break;
    case 'error':
      messageEl.style.background = '#f44336';
      break;
    case 'info':
      messageEl.style.background = '#2196f3';
      break;
    default:
      messageEl.style.background = '#666';
  }
  
  // 添加到页面
  document.body.appendChild(messageEl);
  
  // 3秒后移除
  setTimeout(() => {
    if (messageEl.parentNode) {
      messageEl.parentNode.removeChild(messageEl);
    }
  }, 3000);
}

// URL多开功能
async function clearUrls() {
  const urlMultiInput = document.getElementById('urlMultiInput');
  if (urlMultiInput) {
    urlMultiInput.value = '';
    showCookieMessage('输入已清空', 'info');
  }
}

async function openAllUrls() {
  try {
    const urlMultiInput = document.getElementById('urlMultiInput');
    const requestMethodSelect = document.getElementById('requestMethod');
    
    if (!urlMultiInput) {
      showCookieMessage('未找到输入框', 'error');
      return;
    }
    
    const requestMethod = requestMethodSelect ? requestMethodSelect.value : 'GET';
    const urls = urlMultiInput.value
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);
    
    if (urls.length === 0) {
      showCookieMessage('请输入至少一个URL', 'info');
      return;
    }
    
    // 验证URL格式
    const validUrls = [];
    const invalidUrls = [];
    
    for (const url of urls) {
      try {
        // 尝试创建URL对象来验证格式
        new URL(url);
        validUrls.push(url);
      } catch (e) {
        // 如果不是有效的URL，尝试添加http://前缀
        try {
          new URL(`http://${url}`);
          validUrls.push(`http://${url}`);
        } catch (e2) {
          invalidUrls.push(url);
        }
      }
    }
    
    // 如果有无效URL，提示用户
    if (invalidUrls.length > 0) {
      showCookieMessage(`以下URL格式无效并被跳过: ${invalidUrls.join(', ')}`, 'info');
    }
    
    if (validUrls.length === 0) {
      showCookieMessage('没有有效的URL可以打开', 'error');
      return;
    }
    
    // 批量打开URL
    let openedCount = 0;
    for (const url of validUrls) {
      try {
        if (requestMethod === 'POST') {
          // 对于POST请求，创建一个表单并提交
          await openUrlWithPost(url);
        } else {
          // 对于GET请求，直接打开URL
          await chrome.tabs.create({ url: url, active: false });
        }
        openedCount++;
      } catch (e) {
        console.error(`打开URL失败: ${url}`, e);
      }
    }
    
    showCookieMessage(`成功打开 ${openedCount} 个标签页`, 'success');
    
    // 清空输入框
    urlMultiInput.value = '';
  } catch (error) {
    console.error('批量打开URL失败:', error);
    showCookieMessage('批量打开URL失败: ' + error.message, 'error');
  }
}

// 使用POST方式打开URL
async function openUrlWithPost(url) {
  // 创建一个包含表单的HTML数据URI
  const formHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>POST Request</title>
    </head>
    <body>
      <form id="postForm" method="POST" action="${url}">
        <input type="submit" value="提交POST请求" style="display:none;">
      </form>
      <script>
        document.getElementById('postForm').submit();
      </script>
    </body>
    </html>
  `;
  
  // 创建数据URI
  const dataUri = `data:text/html;charset=utf-8,${encodeURIComponent(formHtml)}`;
  
  // 打开新标签页并提交POST请求
  await chrome.tabs.create({ url: dataUri, active: false });
}

// 初始化URL多开页面
function initUrlMultiPage() {
  // 确保侧边栏隐藏
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.style.display = 'none';
    // 清空侧边栏内容，确保不会显示任何按钮
    sidebar.innerHTML = '';
  }
}
