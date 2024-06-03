import {goToLink, logout as out} from '@/components/setting.ts'
const logout = () => {
	out();
	goToLink("/");
}
export default function Logout() {
	return <>
		<button onClick={logout}>Logout</button>
 </>
}
