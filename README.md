更新记录：重构指纹识别模块，可以自行添加指纹进行识别。
# 一款巨好用挖洞辅助神器—GodEyes
开源项目，所有项目仅供参考学习，禁止用于任何违法行为，任何违法行为需使用者本人自己承担相应法律责任。

### 一、导言

由于目前网上流通的插件功能都各有千秋，每个插件都有他自己的亮点，每次使用都得按场景去选择插件，为了能够有一款属于自己的完美插件，不用来回倒腾切换，由此**GodEyes** 诞生了。

它是一款可以帮助安全研究员获取页面和JS中隐藏的接口和敏感信息的浏览器插件，集合了市面上snoweyes、lovejs等众多插件的特点功能，如信息搜集、批量打开URL、自定义基础目录、白名单设置、指纹识别、网站权重解析、cookie管理等众多功能，可以帮助用户高效的进行API接口测试和SRC漏洞挖掘。

目前只支持 **Chrome** 浏览器，因为其他的我很少用。

### 二、安装介绍

压缩包解压以后，放到常用路径下，避免误删。

1、点击进入"管理扩展程序"
<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/49c42918-1efd-432a-8721-55f2828183b3" />

2、打开 "开发者模式" 后点击 "加载未打包的扩展程序"，或者找到GodEyes文件直接拖到页面也可以

<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/3925e0ae-7736-4175-96f2-0de236078a1f" />

<img width="400" height="61" alt="image" src="https://github.com/user-attachments/assets/7b48e63c-9298-4bc4-a469-87c361d4895e" />

### 三、工具功能介绍

##### 信息搜集

对常见信息进行收集（如账号密码、云key、接口等），同时可以对接口和URL进行复制

<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/fd0ed1cf-81a9-4421-a3a0-1ff5808a514a" />

同时如果需要知道接口或者密码来源于哪里，可以将鼠标悬停即可查看，单击即可复制来源路径

<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/690194ce-cc59-4741-a153-deaf928fb3be" />

##### 指纹嗅探

可以对页面进行指纹鉴定，目前可以知道一些前端框架信息，未来考虑是集成常见指纹，目前只具有一定参考作用。

<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/a0681fe6-dd5f-4f9a-8dc2-43552452e1bd" />

##### 网站解析

用户可以在该界面知道网站域名备案信息和权重信息。

<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/20d74f03-a529-4fdd-9120-cbf0b38800e0" />


##### 配置

这里集成了白名单设置，添加域名即可避免扫描

<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/f457a16c-5569-4364-bf02-df3c4d71c08b" />

可以进行动态扫描和深度扫描，从而发现更多信息

<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/dbc93a95-8ec1-4667-869a-c6eba501f899" />

基础路径设置，设置基础路径，设置后，在信息搜集的复制功能中会自动添加该路径，

使用方法，如添加/api/，则会变为/api/usde,http://example.com/api/usde

<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/4aee9302-2c1e-4468-bca4-95db9da012fb" />

##### Cookie管理

获取当前cookie，并且对其进行修改和保存，插件会自动保存修改前的cookie，如果需要恢复原来的cookie，点击恢复cookie即可

<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/0c3852f1-e328-40a4-ab14-6dc52623eef2" />

##### URL多开

配合信息搜集中的复制功能进行使用，多开URL，可以进行get和post的方式进行请求，暂时不支持请求体的更改。

<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/2ae247ef-36b0-48de-971b-d9cd0e86525a" />

### 四、项目地址

https://codeload.github.com/zihe-debug/GodEyesV0.1.0

关注不迷路，不定时发布好用的工具和技术文章

![b9c11a8ce1d1c59776d5fb7ca04144cc](https://github.com/user-attachments/assets/d2e80851-33a8-4070-9147-c8d18b670f38)

