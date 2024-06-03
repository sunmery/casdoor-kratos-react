import {goToLink,getSigninUrl} from '@/components/setting.ts'


const casdoorLogin = () => {
	goToLink(getSigninUrl());
}

export default function Login() {
	return <>
			<button onClick={casdoorLogin}>Login</button>
	</>
}
