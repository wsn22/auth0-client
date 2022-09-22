import { useAuth0 } from "@auth0/auth0-react";
import { config } from './auth0-config';
import { useState } from 'react';

function App() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [accessToken, setAccessToken] = useState("-");
  const [idToken, setIdToken] = useState("-");

  if (!isLoading && isAuthenticated) {
    getAccessTokenSilently({ audience: config.audience }).then(x => setAccessToken(x));
    getIdTokenClaims().then(x => setIdToken(x.__raw));
  }

  return (
    <div className="App">
      <p>
        <button id="login" onClick={() => loginWithRedirect()}>Click to Login</button>
        <button id="logout" onClick={() => logout()}>Click to Logout</button>
      </p>
      <h3>Is authenticated: {isAuthenticated ? 'true': 'false'}</h3>
      <h3>Access Token</h3>
        <code>
          {accessToken}
        </code>
      <h3>Id Token</h3>
        <code>
          {idToken}
        </code>
      <h3>User</h3>
        <code>{JSON.stringify(user, undefined, 2)}</code>
    </div>
  );
}

export default App;
