<script>
  export let onClick;
  export let label;
</script>

<button class="button" on:click={onClick}>{label}</button>

<style>
  .button {
    padding: 10px 15px;
    border: none;
    background: #4CAF50;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .button:hover {
    background: #45a049;
  }
</style>
