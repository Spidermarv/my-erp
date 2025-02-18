
<script>
  import { onMount } from 'svelte';

  let userRole = 'analyst'; // This would come from your auth system
</script>

<main class="analytics-dashboard">
  <header>
    <h1>Business Analytics</h1>
    <div class="user-controls">
      <span>Role: {userRole}</span>
      <button class="settings-btn">Settings</button>
    </div>
  </header>

  <div class="dashboard-grid">
    <div class="card insights">
      <h3>AI Insights</h3>
      <div class="insight-list">
        <!-- AI-generated insights would go here -->
      </div>
    </div>
    
    <div class="card predictions">
      <h3>Market Predictions</h3>
      <!-- Prediction charts would go here -->
    </div>

    <div class="card metrics">
      <h3>Performance Metrics</h3>
      <!-- Performance metrics would go here -->
    </div>
  </div>
</main>

<style>
  .analytics-dashboard {
    background-color: #f5f7fa;
    min-height: 100vh;
    padding: 1rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  h1 {
    color: #3B28CC;
  }

  .dashboard-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
</style>
