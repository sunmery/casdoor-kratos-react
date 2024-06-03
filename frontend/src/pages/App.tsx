import {Link} from 'react-router-dom'
import {useEffect, useMemo, useState} from 'react'

import {CASDOOR_SDK, getUserinfo, getUsers, goToLink, isLoggedIn, showMessage} from '@/components/setting'
import type {JwtPayload, Account} from '@/types/casdoor'

// 如果需要静默登录，返回 SilentSignin 组件，它会帮你发起登录请求，登录成功后会调用函数 handleReceivedSilentSigninSuccessEvent ，登录失败时也会调用函数 handleReceivedSilentSigninFailureEvent
import {isSilentSigninRequired, SilentSignin} from 'casdoor-react-sdk'

function App() {
  const [account,setAccount] = useState<Account>({
    accessToken: '',
    affiliation: '',
    email: '',
    isAdmin: false,
    language: '',
    name: '',
    organization: '',
    phone: '',
    score: 0,
    tag: '',
    type: '',
    username: '',
    avatar: ''
  });
  const [users, setUsers ] = useState<JwtPayload[]>([])
  useMemo(() => {
    if (isLoggedIn()) {
      getUserinfo().then((res) => {
        if (res?.state === "ok") {
          setAccount({
            username: res.data.displayName,
            avatar: res.data.avatar,
            accessToken: res.data.accessToken,
            affiliation: res.data.affiliation,
            email: res.data.email,
            isAdmin: res.data.admin,
            language: res.data.language,
            name: res.data.name,
            organization: res.data.organization,
            phone: res.data.phone,
            score: res.data.score,
            tag: res.data.tag,
            type: res.data.type,
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
  }, []);

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
            <caption>Account</caption>
            <thead>
            <tr>
              <th>accessToken</th>
              <th>affiliation</th>
              <th>email</th>
              <th>isAdmin</th>
              <th>language</th>
              <th>name</th>
              <th>organization</th>
              <th>phone</th>
              <th>score</th>
              <th>tag</th>
              <th>type</th>
              <th>username</th>
              <th>avatar</th>
              <th>username</th>
              <th>avatar</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{account.accessToken}</td>
              <td>{account.affiliation}</td>
              <td>{account.email}</td>
              <td>{account.isAdmin}</td>
              <td>{account.language}</td>
              <td>{account.name}</td>
              <td>{account.organization}</td>
              <td>{account.phone}</td>
              <td>{account.score}</td>
              <td>{account.tag}</td>
              <td>{account.type}</td>
              <td>{account.username}</td>
              <td>{account.avatar}</td>
              <td>{account.username}</td>
              <td>{account.avatar}</td>
            </tr>
            </tbody>
          </table>
        </div>

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
              users.slice(0, 10)?.map((user) => (
                <tr key={user.id}>
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
