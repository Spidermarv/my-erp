
<script>
  import { onMount } from 'svelte';
  import { financialData } from '$lib/stores/financialData';

  let userRole = 'admin'; // This would come from your auth system
</script>

<main class="finance-dashboard">
  <header>
    <h1>Finance Dashboard</h1>
    <div class="user-controls">
      <span>Role: {userRole}</span>
      <button class="settings-btn">Settings</button>
    </div>
  </header>

  <div class="dashboard-grid">
    <div class="card balance">
      <h3>Balance</h3>
      <p class="amount">$2,190.19</p>
    </div>
    
    <div class="card metrics">
      <h3>Key Metrics</h3>
      <div class="metric-grid">
        <div class="metric">
          <span>Revenue</span>
          <p>$21.30</p>
        </div>
        <div class="metric">
          <span>Expenses</span>
          <p>$19.112</p>
        </div>
      </div>
    </div>

    <div class="card transactions">
      <h3>Recent Transactions</h3>
      <!-- Transaction list would go here -->
    </div>
  </div>
</main>

<style>
  .finance-dashboard {
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
    color: #1098F7;
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

  .amount {
    font-size: 2rem;
    color: #1098F7;
  }
</style>
