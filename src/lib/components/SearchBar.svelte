<script>
  export let isVisible = false;
  export let onClose = () => {};
  export let onSearch = (term) => {};

  let searchTerm = '';

  function handleSearch() {
    onSearch(searchTerm);
    onClose();
  }
</script>

{#if isVisible}
  <div class="search-bar">
    <input type="text" bind:value={searchTerm} placeholder="Search..." />
    <button on:click={handleSearch}>Search</button>
    <button on:click={onClose} aria-label="Close Search">✖️</button>
  </div>
{/if}

<style>
  .search-bar {
    display: flex;
    align-items: center;
    padding: 10px;
    background: #f8f9fc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 60px; /* Adjust based on your layout */
    right: 20px; /* Adjust based on your layout */
    z-index: 1000;
  }

  .search-bar input {
    padding: 5px;
    margin-right: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .search-bar button {
    margin-left: 5px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }

  .search-bar button:hover {
    background: #0056b3;
  }
</style> 