import React, { FormEvent, useState } from 'react';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    if (error) {
      setError('');
    }

    const loginDtoDto = JSON.stringify({
      UserName: username,
      Password: password,
    });

    setIsLoading(false);

    fetch('/Auth/login', { headers: { 'Content-Type': 'application/json' }, body: loginDtoDto, method: 'POST' })
      .then((response) => console.log(response.status))
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <h2>Login Page</h2>

      {error ? <p>Error: {error}</p> : null}

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter your username:</label>
        <input id="username" onChange={(e) => setUsername(e.target.value)} type="text" value={username} />

        <label htmlFor="password">Enter your password:</label>
        <input id="password" onChange={(e) => setPassword(e.target.value)} type="password" value={password} />

        <button disabled={isLoading} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
