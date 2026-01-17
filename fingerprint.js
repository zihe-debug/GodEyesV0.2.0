(function() {
  // 指纹识别模块
  let fingerprints = null;
  let isInitialized = false;

  //console.log('[Fingerprint] fingerprint.js 已加载');

  // 添加一个全局标志，表示内容脚本已加载
  window.fingerprintScriptLoaded = true;

// 初始化指纹库
async function initFingerprints() {
  try {
    console.log('[Fingerprint] 开始加载指纹库');
    // 加载内置指纹库
    // 首先尝试加载测试指纹库，如果不存在则加载完整指纹库
    let fingerprintUrl = chrome.runtime.getURL('test_finger.json');
    try {
      console.log('[Fingerprint] 尝试加载测试指纹库:', fingerprintUrl);
      const testResponse = await fetch(fingerprintUrl);
      console.log('[Fingerprint] 测试指纹库响应状态:', testResponse.status);
      if (!testResponse.ok) {
        console.log('[Fingerprint] 测试指纹库加载失败，尝试加载完整指纹库');
        fingerprintUrl = chrome.runtime.getURL('finger.json');
      } else {
        console.log('[Fingerprint] 测试指纹库加载成功');
      }
    } catch (e) {
      console.log('[Fingerprint] 测试指纹库加载异常，尝试加载完整指纹库:', e.message);
      fingerprintUrl = chrome.runtime.getURL('finger.json');
    }
    console.log('[Fingerprint] 最终指纹库URL:', fingerprintUrl);
    
    const response = await fetch(fingerprintUrl);
    console.log('[Fingerprint] fetch响应状态:', response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(`Failed to load fingerprint library: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('[Fingerprint] 指纹库JSON解析完成');
    
    // 检查数据格式
    if (!data || !Array.isArray(data.fingerprint)) {
      throw new Error('指纹库数据格式不正确');
    }
    
    // 合并自定义指纹（如果有的话）
    const customData = await new Promise(resolve => {
      chrome.storage.local.get(['customFingerprints'], (result) => {
        console.log('[Fingerprint] 自定义指纹数据:', result);
        resolve(result);
      });
    });
    
    fingerprints = data.fingerprint;
    console.log('[Fingerprint] 内置指纹数量:', fingerprints.length);
    
    if (customData.customFingerprints && customData.customFingerprints.length > 0) {
      fingerprints = fingerprints.concat(customData.customFingerprints);
      console.log('[Fingerprint] 合并自定义指纹后总数:', fingerprints.length);
    }
    
    isInitialized = true;
    console.log('[Fingerprint] 指纹库加载完成，共', fingerprints.length, '条指纹');
    return true;
  } catch (error) {
    console.error('[Fingerprint] 加载指纹库失败:', error);
    isInitialized = false;
    fingerprints = null;
    // 提供更具体的错误信息
    let errorMessage = '加载指纹库失败';
    if (error instanceof TypeError && error.message.includes('fetch')) {
      errorMessage = '无法加载指纹库文件，请检查文件是否存在且可访问';
    } else if (error.message) {
      errorMessage = `加载指纹库失败: ${error.message}`;
    }
    throw new Error(errorMessage);
  }
}

// 扫描当前页面（优化版本）
async function scanCurrentPage() {
  try {
    console.log('[Fingerprint] 开始扫描页面');
    
    // 确保指纹库已加载
    if (!isInitialized || !fingerprints) {
      console.log('[Fingerprint] 指纹库未初始化，开始初始化');
      const initResult = await initFingerprints();
      console.log('[Fingerprint] 指纹库初始化结果:', initResult);
      
      if (!initResult) {
        throw new Error('指纹库初始化失败');
      }
    }
    
    // 检查指纹库是否有效
    if (!fingerprints || !Array.isArray(fingerprints)) {
      throw new Error('指纹库数据无效');
    }
    
    console.log('[Fingerprint] 指纹库检查通过，指纹数量:', fingerprints.length);
    
    const pageContent = document.documentElement.innerHTML;
    const pageTitle = document.title;
    
    console.log('[Fingerprint] 页面标题:', pageTitle);
    console.log('[Fingerprint] 页面内容长度:', pageContent.length);
    
    // 检查页面内容是否有效
    if (!pageContent) {
      throw new Error('页面内容为空');
    }
    
    // 获取HTTP头信息（注意：浏览器扩展无法直接获取完整的HTTP头）
    const headers = {};
    
    const matches = [];
    
    // 使用完整指纹库进行扫描
    const fingerprintsToScan = fingerprints;
    console.log('[Fingerprint] 使用完整指纹库，指纹数量:', fingerprintsToScan.length);
    
    // 添加扫描进度日志
    let scannedCount = 0;
    const totalFingerprints = fingerprintsToScan.length;
    
    for (const fp of fingerprintsToScan) {
      try {
        // 检查指纹数据是否有效
        if (!fp || !fp.method || !fp.keyword) {
          scannedCount++;
          continue;
        }
        
        // 每扫描100个指纹记录一次进度
        if (scannedCount % 100 === 0) {
          console.log(`[Fingerprint] 扫描进度: ${scannedCount}/${totalFingerprints}`);
        }
        
        let isMatch = false;

        if (fp.method === 'keyword') {
          if (fp.location === 'title') {
            // 标题匹配：只要包含任一关键词即匹配成功
            isMatch = fp.keyword.some(kw => {
              if (typeof kw !== 'string') return false;
              const matchResult = pageTitle.includes(kw);
              if (matchResult) {
                console.log(`[Fingerprint] 标题匹配成功: ${fp.cms}, 关键词: ${kw}`);
              }
              return matchResult;
            });
          } else if (fp.location === 'body') {
            // 内容匹配：所有关键词都要匹配才成功
            isMatch = fp.keyword.some(kw => {
              if (typeof kw !== 'string') return false;
              const matchResult = pageContent.includes(kw);
              if (matchResult) {
                console.log(`[Fingerprint] 内容匹配成功: ${fp.cms}, 关键词: ${kw}`);
              }
              return matchResult;
            });
          } else if (fp.location === 'header') {
            // 头部匹配：由于浏览器限制，这里只能做有限的匹配
            isMatch = false;
          }
        } else if (fp.method === 'icon_hash' || fp.method === 'faviconhash') {
          // Favicon哈希匹配
          const faviconHash = await getFaviconHash();
          if (faviconHash && Array.isArray(fp.keyword)) {
            isMatch = fp.keyword.includes(faviconHash);
            if (isMatch) {
              console.log(`[Fingerprint] Favicon哈希匹配成功: ${fp.cms}, 哈希值: ${faviconHash}`);
            }
          }
        }

        if (isMatch) {
          matches.push({
            cms: fp.cms || '未知CMS',
            type: fp.type || '其他',
            method: fp.method || '未知',
            location: fp.location || '未知',
            isImportant: fp.isImportant || false
          });
        }
      } catch (fpError) {
        console.error(`[Fingerprint] 处理指纹 ${fp.cms} 时出错:`, fpError);
      }
      
      scannedCount++;
    }

    console.log('[Fingerprint] 扫描完成，匹配到', matches.length, '条指纹');
    
    // 存储匹配结果
    await new Promise((resolve, reject) => {
      chrome.storage.local.set({fingerprintMatches: matches}, () => {
        if (chrome.runtime.lastError) {
          console.error('[Fingerprint] 存储匹配结果失败:', chrome.runtime.lastError);
          reject(new Error(`存储匹配结果失败: ${chrome.runtime.lastError.message}`));
        } else {
          console.log('[Fingerprint] 匹配结果存储成功');
          resolve();
        }
      });
    });
    
    return matches;
  } catch (error) {
    console.error('[Fingerprint] 扫描页面失败:', error);
    // 提供更具体的错误信息
    let errorMessage = '扫描页面失败';
    if (error.message) {
      errorMessage = `扫描页面失败: ${error.message}`;
    }
    throw new Error(errorMessage);
  }
}

// 获取favicon的hash值
// 注意：这是一个简化的实现，实际上需要更复杂的哈希计算
async function getFaviconHash() {
  try {
    // 尝试获取favicon URL
    let faviconUrl = '/favicon.ico';
    const iconLink = document.querySelector('link[rel~="icon"]');
    if (iconLink && iconLink.href) {
      faviconUrl = iconLink.href;
    }
    
    // 如果是相对路径，转换为绝对路径
    if (faviconUrl.startsWith('/')) {
      faviconUrl = new URL(faviconUrl, window.location.origin).href;
    } else if (!faviconUrl.startsWith('http')) {
      faviconUrl = new URL(faviconUrl, window.location.href).href;
    }
    
    console.log('[Fingerprint] Favicon URL:', faviconUrl);
    
    // 获取favicon内容并计算哈希
    const response = await fetch(faviconUrl);
    if (!response.ok) {
      return null;
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const hash = calculateMurmurHash3(arrayBuffer);
    return hash.toString();
  } catch (error) {
    console.error('[Fingerprint] 获取favicon哈希失败:', error);
    return null;
  }
}

// 实现MurmurHash3算法
function calculateMurmurHash3(data) {
  // 简化的哈希计算实现
  // 实际实现应该参考Finger24或其他成熟的实现
  let hash = 0;
  const bytes = new Uint8Array(data);
  for (let i = 0; i < bytes.length; i++) {
    hash = ((hash << 5) - hash) + bytes[i];
    hash |= 0; // 转换为32位整数
  }
  return hash;
}

// 监听来自popup的消息
// 注意：我们不直接使用chrome.runtime.onMessage.addListener，而是使用一种更安全的方式
// 与content.js协同工作，避免消息监听器冲突

// 创建一个独立的消息处理函数
function handleFingerprintMessage(request, sender, sendResponse) {
  //console.log('[Fingerprint] 收到消息:', request);
  
  // 只处理与指纹识别相关的消息，避免处理信息搜集的消息
  if ((request.type && request.type.startsWith('FINGERPRINT_')) || request.type === 'SCAN_FINGERPRINT' || request.type === 'GET_FINGERPRINT_MATCHES') {
    // 转换消息类型以保持兼容性
    let convertedType = request.type;
    if (request.type === 'FINGERPRINT_SCAN_PAGE') {
      convertedType = 'SCAN_FINGERPRINT';
    } else if (request.type === 'FINGERPRINT_GET_MATCHES') {
      convertedType = 'GET_FINGERPRINT_MATCHES';
    }
    console.log('[Fingerprint] 开始处理指纹识别相关消息，转换后类型:', convertedType);
    
    // 添加错误处理
    try {
      if (convertedType === 'SCAN_FINGERPRINT') {
        console.log('[Fingerprint] 开始处理SCAN_FINGERPRINT消息');
        
        // 检查必要的参数
        if (!sendResponse) {
          console.error('[Fingerprint] sendResponse函数未定义');
          return false;
        }
        
        // 确保sendResponse不会被垃圾回收
        const sendResponseWrapper = function(response) {
          try {
            console.log('[Fingerprint] 调用sendResponse，响应内容:', response);
            sendResponse(response);
          } catch (error) {
            console.error('[Fingerprint] 调用sendResponse时出错:', error);
          }
        };
        
        // 检查指纹库是否已加载
        if (!isInitialized || !fingerprints) {
          console.log('[Fingerprint] 指纹库未初始化，开始初始化');
          initFingerprints().then(() => {
            console.log('[Fingerprint] 指纹库初始化成功，开始扫描页面');
            return scanCurrentPage();
          }).then(matches => {
            console.log('[Fingerprint] 扫描成功，返回结果，匹配数量:', matches.length);
            sendResponseWrapper({matches: matches, success: true});
          }).catch(error => {
            console.error('[Fingerprint] 初始化或扫描失败:', error);
            sendResponseWrapper({matches: [], success: false, error: error.message || '初始化或扫描失败'});
          });
        } else {
          // 指纹库已加载，直接扫描页面
          console.log('[Fingerprint] 指纹库已加载，直接扫描页面');
          // 扫描页面指纹
          scanCurrentPage().then(matches => {
            console.log('[Fingerprint] 扫描成功，返回结果，匹配数量:', matches.length);
            sendResponseWrapper({matches: matches, success: true});
          }).catch(error => {
            console.error('[Fingerprint] 扫描失败:', error);
            sendResponseWrapper({matches: [], success: false, error: error.message || '扫描失败'});
          });
        }
        
        console.log('[Fingerprint] SCAN_FINGERPRINT消息处理完成，保持消息通道开放');
        return true; // 保持消息通道开放
      } else if (convertedType === 'GET_FINGERPRINT_MATCHES') {
        console.log('[Fingerprint] 开始处理GET_FINGERPRINT_MATCHES消息');
        
        // 检查必要的参数
        if (!sendResponse) {
          console.error('[Fingerprint] sendResponse函数未定义');
          return false;
        }
        
        // 确保sendResponse不会被垃圾回收
        const sendResponseWrapper = function(response) {
          try {
            console.log('[Fingerprint] 调用sendResponse，响应内容:', response);
            sendResponse(response);
          } catch (error) {
            console.error('[Fingerprint] 调用sendResponse时出错:', error);
          }
        };
        
        // 获取已扫描的指纹匹配结果
        chrome.storage.local.get(['fingerprintMatches'], function(result) {
          console.log('[Fingerprint] 获取存储的匹配结果:', result);
          sendResponseWrapper({matches: result.fingerprintMatches || [], success: true});
        });
        
        console.log('[Fingerprint] GET_FINGERPRINT_MATCHES消息处理完成，保持消息通道开放');
        return true; // 保持消息通道开放
      }
    } catch (error) {
      console.error('[Fingerprint] 消息处理出错:', error);
      
      // 确保即使出错也调用sendResponse
      if (typeof sendResponse === 'function') {
        try {
          sendResponse({success: false, error: '消息处理出错: ' + (error.message || error.toString())});
        } catch (sendError) {
          console.error('[Fingerprint] 调用sendResponse时出错:', sendError);
        }
      }
      
      return true;
    }
  } else {
    console.log('[Fingerprint] 非指纹识别消息，不处理');
  }
  
  // 对于不处理的消息，不返回true，让其他监听器处理
  return false;
}

// 在页面加载时自动初始化指纹库
document.addEventListener('DOMContentLoaded', function() {
  console.log('[Fingerprint] 页面加载完成，开始初始化指纹库');
  initFingerprints().then(() => {
    console.log('[Fingerprint] 页面加载时指纹库初始化成功');
  }).catch(error => {
    console.error('[Fingerprint] 页面加载时初始化指纹库失败:', error);
    // 设置错误状态
    isInitialized = false;
    fingerprints = null;
  });
});

// 导出函数供其他模块使用
window.FingerprintModule = {
  init: initFingerprints,
  scan: scanCurrentPage,
  handleMessage: handleFingerprintMessage
};

// 添加测试函数，用于验证消息通信是否正常工作
window.FingerprintModule.testMessageHandling = function() {
  console.log('[Fingerprint] 测试消息处理功能');
  
  // 模拟一个消息处理
  const testRequest = {type: 'SCAN_FINGERPRINT'};
  const testSender = {};
  let responseSent = false;
  
  const testSendResponse = function(response) {
    responseSent = true;
    console.log('[Fingerprint] 测试响应:', response);
  };
  
  const result = handleFingerprintMessage(testRequest, testSender, testSendResponse);
  console.log('[Fingerprint] 消息处理结果:', result, '响应已发送:', responseSent);
  
  return result;
};

// 添加一个检查函数，用于验证模块是否正确加载
window.FingerprintModule.checkStatus = function() {
  console.log('[Fingerprint] 模块状态检查');
  console.log('[Fingerprint] isInitialized:', isInitialized);
  console.log('[Fingerprint] fingerprints length:', fingerprints ? fingerprints.length : 'undefined');
  console.log('[Fingerprint] window.FingerprintModule:', window.FingerprintModule);
  return {
    isInitialized: isInitialized,
    fingerprintsCount: fingerprints ? fingerprints.length : 0,
    moduleAvailable: typeof window.FingerprintModule !== 'undefined'
  };
};

// 添加fingerprint模块加载完成的标志
//console.log('[Fingerprint] Fingerprint module加载完成');
window.fingerprintModuleLoaded = true;

  // 明确注册监听器
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //console.log('[Fingerprint] 直接监听到消息:', request);
    
    // 添加脚本加载检查消息处理
    if (request.type === 'CHECK_SCRIPT_LOADED') {
      console.log('[Fingerprint] 收到脚本加载检查消息');
      sendResponse({loaded: true, timestamp: Date.now()});
      return true;
    }
    
    // 避免处理信息搜集的消息
    if (request.type === 'GET_RESULTS') {
      //console.log('[Fingerprint] 收到信息搜集消息GET_RESULTS，不处理，让content.js处理');
      return false; // 让信息搜集脚本处理
    }
    
    // 避免处理信息搜集的刷新消息
    if (request.type === 'REFRESH_SCAN') {
      console.log('[Fingerprint] 收到信息搜集消息REFRESH_SCAN，不处理，让content.js处理');
      return false; // 让信息搜集脚本处理
    }
    
    try {
      const result = handleFingerprintMessage(request, sender, sendResponse);
      console.log('[Fingerprint] 直接监听器处理结果:', result);
      // 保持消息通道开放，等待异步响应
      if (result === true) {
        return true;
      }
      // 如果没有异步操作，直接返回
      return false;
    } catch (e) {
      console.error('[Fingerprint] 监听器处理消息时出错:', e);
      // 确保即使出错也调用sendResponse
      if (typeof sendResponse === 'function') {
        try {
          sendResponse({success: false, error: '监听器处理消息时出错: ' + e.message});
        } catch (sendError) {
          console.error('[Fingerprint] 调用sendResponse时出错:', sendError);
        }
      }
      return true; // 保持消息通道开放
    }
  });
})();
