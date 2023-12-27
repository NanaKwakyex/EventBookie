import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';

function LoginPage() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main className="container mx-auto py-16 text-center">
          <h1 className="text-4xl text-red-500">Hello {user.username}</h1>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={signOut}>
            Sign out
          </button>
        </main>
      )}
    </Authenticator>
  );
}

export default LoginPage;
