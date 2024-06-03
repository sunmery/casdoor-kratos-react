import {AuthCallback} from 'casdoor-react-sdk'
import {CASDOOR_SDK, goToLink, serverUrl, setToken} from '@/components/setting.ts'

interface SigninReply {
	data: string
	state: string
}

export default function CallbackPage() {
	console.log("CASDOOR_SDK:",CASDOOR_SDK)
	return  <AuthCallback
		sdk={CASDOOR_SDK}
		serverUrl={serverUrl}
		// 获取服务器的登录接口返回的token
		saveTokenFromResponse={(res: Response) => {
			console.log("result data:", res as unknown as SigninReply)
			setToken(res?.data);
			goToLink("/");
		}}
		// 根据服务器返回的字段来判断请求是否成功
		isGetTokenSuccessful={(res: Response) => {
			console.log("isGetTokenSuccessful res",res)
			return res?.state === "ok"
			// return true
		}}
	/>
}
