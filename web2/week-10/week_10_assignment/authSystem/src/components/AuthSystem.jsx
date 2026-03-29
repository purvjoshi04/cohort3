import { createContext, useState } from 'react'
import Home from './Home'
import AppBar from './AppBar';
import Login from './Login';

export const AuthContext = createContext(undefined);

const AuthSystem = () => {
  const [userContextApi, setUseContextApi] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (newUsername) => {
    setUsername(newUsername);
    setIsLoggedIn(true);
  }

  const logout = () => {
    setUsername("");
    setIsLoggedIn(false);
  }

  const contextValue = userContextApi ? { username, isLoggedIn, login, logout } : undefined;

  return (
    <AuthContext.Provider value={contextValue}>
      <div><AppBar
        username={username}
        isLoggedIn={isLoggedIn}
        logout={logout}
      />
        <div style={{ display: "flex", alignItems: 'center', justifyContent: "flex-end", padding: "1rem", backgroundColor: "#f0f0f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              id='use-context-api'
              type="checkbox"
              checked={userContextApi}
              onChange={(e) => {
                setUseContextApi(e.target.checked)
              }}
            />
            <label htmlFor='use-context-api'>
              Use Context API:
              {userContextApi ? "On" : "Off"}
            </label>
          </div>
        </div>
        <main style={{flex: "1", padding: "1rem"}}>
          {isLoggedIn ? (<Home/> ): <Login onLogin={login} />}
        </main>
      </div>
    </AuthContext.Provider>
  )
}

export default AuthSystem