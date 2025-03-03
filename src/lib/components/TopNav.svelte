<script>
  import { goto } from '$app/navigation';
  import SearchBar from './SearchBar.svelte';
  let darkMode = false;
  let isSearchVisible = false;
  let isProfileMenuVisible = false;

  function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
  }

  function toggleSearch() {
    isSearchVisible = !isSearchVisible;
  }

  function toggleProfileMenu() {
    isProfileMenuVisible = !isProfileMenuVisible;
  }

  function signOut() {
    // Implement sign-out logic here
    console.log('Signing out...');
    isProfileMenuVisible = false; // Close the menu after signing out
  }

  function addUser() {
    // Implement add user logic here
    console.log('Adding user...');
    isProfileMenuVisible = false; // Close the menu after adding a user
  }
</script>

<nav class="top-nav">
  <button class="logo" on:click={() => goto('/')} aria-label="Go to home">
    <img src="./assets/images/logo.png" alt="Cichlify Logo" />
  </button>
  <div class="actions">
    <button on:click={toggleSearch} aria-label="Search">🔍</button>
    <SearchBar isVisible={isSearchVisible} onClose={toggleSearch} />
    <button on:click={toggleDarkMode} aria-label="Toggle Dark Mode">
      {darkMode ? '🌙' : '☀️'}
    </button>
    <button on:click={toggleProfileMenu} aria-label="Profile">👤</button>
    {#if isProfileMenuVisible}
      <div class="profile-menu">
        <button on:click={signOut}>Sign Out</button>
        <button on:click={addUser}>Add User</button>
      </div>
    {/if}
  </div>
</nav>

<style>
  .top-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .logo img {
    height: 40px;
    cursor: pointer;
  }

  .actions button {
    margin-left: 15px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
  }

  .profile-menu {
    position: absolute;
    right: 20px;
    top: 60px; /* Adjust based on your layout */
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .profile-menu button {
    display: block;
    padding: 10px;
    width: 100%;
    text-align: left;
    border: none;
    background: none;
    cursor: pointer;
  }

  .profile-menu button:hover {
    background: #e0e0e0;
  }
</style>