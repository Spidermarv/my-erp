<script>
  import { goto } from '$app/navigation';
</script>

<main class="landing">
  <h1>Welcome to Cichlify ERP</h1>
  <p>Please choose a dashboard:</p>
  <button on:click={() => goto('/finance')} aria-label="Go to Finance Dashboard">Finance Dashboard</button>
  <button on:click={() => goto('/business')} aria-label="Go to Business Analytics Dashboard">Business Analytics Dashboard</button>
</main>

<style>
  .landing {
    text-align: center;
    padding: 50px;
  }

  button {
    margin: 10px;
    padding: 15px 30px;
    font-size: 18px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #0056b3;
  }
</style> 