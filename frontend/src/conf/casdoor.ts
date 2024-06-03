export const CASDOOR_CONF = {
	// 第三方或自有的Casdoor服务端的URL
	serverUrl: "https://door.casdoor.com",
	// 注册登录的接口, 默认为/api/signin
	signinPath:'/api/signin',
	// 客户端ID, 在第三方或自有的Casdoor服务端生成
	clientId: "294b09fbc17f95daf2fe",
	// 组织名, 在第三方或自有的Casdoor服务端生成
	organizationName: "casbin",
	// 应用名, 在第三方或自有的Casdoor服务端生成
	appName: "app-vue-python-example",
	// 重新向到哪个路由
	redirectPath: "/callback",
};
