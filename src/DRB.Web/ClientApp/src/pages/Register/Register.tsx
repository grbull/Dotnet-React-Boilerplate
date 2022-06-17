import React, { FormEvent, useState } from 'react';

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
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

    if (password !== passwordConfirm) {
      setError('Passwords do not match.');
      return;
    }

    const registerDto = JSON.stringify({
      UserName: username,
      Email: email,
      Password: password,
    });

    setIsLoading(false);

    fetch('/api/auth/register', { headers: { 'Content-Type': 'application/json' }, body: registerDto })
      .then((response) => console.log(response.status))
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <h2>Register Page</h2>

      {error ? <p>Error: {error}</p> : null}

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter your username:</label>
        <input id="username" onChange={(e) => setUsername(e.target.value)} type="text" value={username} />

        <label htmlFor="email">Enter your email:</label>
        <input id="email" onChange={(e) => setEmail(e.target.value)} type="email" value={email} />

        <label htmlFor="password">Enter your password:</label>
        <input id="password" onChange={(e) => setPassword(e.target.value)} type="password" value={password} />

        <label htmlFor="passwordConfirm">Confirm your password:</label>
        <input
          id="passwordConfirm"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          type="password"
          value={passwordConfirm}
        />

        <button disabled={isLoading} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};
