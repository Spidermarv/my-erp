<script>
  import { goto } from '$app/navigation';
</script>

<header class="header">
  <div class="logo" on:click={() => goto('/')}>
    <img src="/logo.svg" alt="Logo" />
  </div>
  <nav>
    <button on:click={() => goto('/finance')}>Finance</button>
    <button on:click={() => goto('/analytics')}>Analytics</button>
  </nav>
</header>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .logo img {
    height: 50px;
  }

  nav button {
    margin-left: 20px;
    padding: 10px 15px;
    border: none;
    background: #4CAF50;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }

  nav button:hover {
    background: #45a049;
  }
</style>
