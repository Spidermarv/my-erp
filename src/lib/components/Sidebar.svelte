<script>
  import { goto } from '$app/navigation';
  let isCollapsed = false;

  function toggleSidebar() {
    isCollapsed = !isCollapsed;
  }
</script>

<aside class="sidebar {isCollapsed ? 'collapsed' : ''}">
  <button on:click={toggleSidebar} class="toggle-btn" aria-label="Toggle Sidebar">☰</button>
  <nav>
    <ul>
      <li><button on:click={() => goto('/finance')} aria-label="Go to Finance Dashboard">{isCollapsed ? '' : 'Finance Dashboard'}</button></li>
      <li><button on:click={() => goto('/business')} aria-label="Go to Business Analytics Dashboard">{isCollapsed ? '' : 'Business Analytics Dashboard'}</button></li>
      <li><button on:click={() => goto('/login')} aria-label="Go to Login Page">{isCollapsed ? '' : 'Login'}</button></li>
    </ul>
  </nav>
</aside>

<style>
  .sidebar {
    width: 250px;
    background: #f8f9fc;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    transition: width 0.3s;
  }

  .collapsed {
    width: 60px;
  }

  .toggle-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    margin: 10px;
  }

  nav ul {
    list-style: none;
    padding: 0;
  }

  nav li {
    padding: 15px;
  }

  nav li button {
    width: 100%;
    text-align: left;
    padding: 10px;
    cursor: pointer;
    transition: background 0.3s;
    background: none;
    border: none;
  }

  nav li button:hover {
    background: #e0e0e0;
  }
</style>