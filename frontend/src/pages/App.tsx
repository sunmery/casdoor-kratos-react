import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {CASDOOR_SDK, getUserinfo, getUsers, goToLink, isLoggedIn, showMessage} from '@/components/setting'

// 如果需要静默登录，返回 SilentSignin 组件，它会帮你发起登录请求，登录成功后会调用函数 handleReceivedSilentSigninSuccessEvent ，登录失败时也会调用函数 handleReceivedSilentSigninFailureEvent
import {isSilentSigninRequired, SilentSignin} from 'casdoor-react-sdk'

interface Account {
  username: string
  avatar: string
}

interface Users {
  [key:string]: never
}

function App() {
  const [account,setAccount] = useState<Account>({
      username: "res.data.displayName",
      avatar: "res.data.avatar",
  });
  const [users, setUsers ] = useState<Users[]>([])
  useEffect(() => {
    if (isLoggedIn()) {
      getUserinfo().then((res) => {
        if (res?.status === "ok") {
          setAccount({
              username: res.data.displayName,
              avatar: res.data.avatar,
          });
        } else {
          showMessage(`getUserinfo() error: ${res?.msg}`);
        }
      });

      getUsers().then((res) => {
        if (res?.status === "ok") {
          setUsers(
          res.data,
          );
        } else {
          showMessage(`getUsers() error: ${res?.msg}`);
        }
      });
    }
  }, [])

  useEffect(() => {
    console.log("account:",account)
    console.log("users:",users)
  }, [account,users])

  return (
    <>
      <header>
        <nav>
          <ol>
            <li>
              <Link to={"/"}>Index</Link>
            </li>
            <li>
              <Link to={"/login"}>login</Link>
            </li>
            <li>
              <Link to={"/logout"}>logout</Link>
            </li>
          </ol>
        </nav>
      </header>
      <main>
        <div>
          <table>
            <caption>
              User List
            </caption>
            <thead>
            <tr>
              <th>username</th>
              <th>avatar</th>
              <th>email</th>
            </tr>
            </thead>
            <tbody>
              {
                users.slice(0, 10)?.map((user: Users) => (
                  <tr key={user.name}>
                    <td>{user.name}</td>
                    <td><img src={user.avatar} alt={user.name} /></td>
                    <td>{user.email}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        {/* 静默登录组件, 不需要静默登录注释掉即可 */}
        {/* 如果需要静默登录，返回 SilentSignin 组件，它会帮你发起登录请求，登录成功后会调用函数 handleReceivedSilentSigninSuccessEvent ，登录失败时也会调用函数 handleReceivedSilentSigninFailureEvent */}
        <div>
          call:
          {
            isSilentSigninRequired() ?? (
              <div
                style={{marginTop: 200, textAlign: 'center', alignItems: 'center'}}
              >
                <SilentSignin
                  sdk={CASDOOR_SDK}
                  isLoggedIn={isLoggedIn}
                  handleReceivedSilentSigninSuccessEvent={() => goToLink('/')}
                  handleReceivedSilentSigninFailureEvent={() => {
                  }}
                />
                <p>Logging in...</p>
              </div>
            )
          }
        </div>
      </main>
    </>
  )
}

export default App
