<script>
    import { goto } from '$app/navigation';
    let email = '';
    let password = '';
  
    function handleLogin() {
      // Simulate authentication logic
      if (email === 'user@example.com' && password === 'password') {
        goto('/landing'); // Redirect to the landing page after successful login
      } else {
        alert('Invalid credentials');
      }
    }
  </script>
  
  <main class="login">
    <h1>Login</h1>
    <input type="email" bind:value={email} placeholder="Email" required />
    <input type="password" bind:value={password} placeholder="Password" required />
    <button on:click={handleLogin}>Login</button>
  </main>
  
  <style>
    .login {
      text-align: center;
      padding: 50px;
    }
  
    input {
      margin: 10px;
      padding: 10px;
      width: 200px;
    }
  
    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  </style>