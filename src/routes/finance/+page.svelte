
<script>
  import { onMount } from 'svelte';
  import { financialData } from '$lib/stores/financialData';
  import { formatCurrency } from '$lib/utils';

  let userRole = 'admin';
  let showBudgetModal = false;
  let selectedCurrency = 'MWK';
  let budgetData = {
    category: '',
    amount: 0,
    period: 'monthly'
  };

  let recentAlerts = [
    { type: 'warning', message: 'Unusual expense pattern detected' },
    { type: 'success', message: 'Monthly revenue target achieved' }
  ];

  function toggleBudgetModal() {
    showBudgetModal = !showBudgetModal;
  }

  function handleBudgetSubmit() {
    // Budget submission logic would go here
    showBudgetModal = false;
  }
</script>

<main class="finance-dashboard">
  <header>
    <h1>Finance Dashboard</h1>
    <div class="user-controls">
      <select bind:value={selectedCurrency}>
        <option value="MWK">MWK</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
      <span>Role: {userRole}</span>
      <button class="settings-btn">Settings</button>
    </div>
  </header>

  <div class="alert-section">
    {#each recentAlerts as alert}
      <div class="alert {alert.type}">
        {alert.message}
      </div>
    {/each}
  </div>

  <div class="dashboard-grid">
    <div class="card balance">
      <h3>Balance</h3>
      <p class="amount">{formatCurrency(2190.19, selectedCurrency)}</p>
      <div class="trend positive">↑ 15% from last month</div>
    </div>
    
    <div class="card metrics">
      <h3>Key Metrics</h3>
      <div class="metric-grid">
        <div class="metric">
          <span>Revenue</span>
          <p>{formatCurrency(21.30, selectedCurrency)}</p>
          <div class="trend positive">↑ 5%</div>
        </div>
        <div class="metric">
          <span>Expenses</span>
          <p>{formatCurrency(19.11, selectedCurrency)}</p>
          <div class="trend negative">↓ 3%</div>
        </div>
      </div>
    </div>

    <div class="card quick-actions">
      <h3>Quick Actions</h3>
      <div class="action-buttons">
        <button on:click={toggleBudgetModal}>Set Budget</button>
        <button>Export Report</button>
        <button>Schedule Payment</button>
      </div>
    </div>

    <div class="card transactions">
      <h3>Recent Transactions</h3>
      <div class="transaction-filters">
        <select>
          <option value="all">All Categories</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input type="date" />
      </div>
      <div class="transaction-list">
        <!-- Transaction list would be populated dynamically -->
      </div>
    </div>
  </div>

  {#if showBudgetModal}
    <div class="modal">
      <div class="modal-content">
        <h2>Set Budget</h2>
        <form on:submit|preventDefault={handleBudgetSubmit}>
          <input type="text" placeholder="Category" bind:value={budgetData.category} />
          <input type="number" placeholder="Amount" bind:value={budgetData.amount} />
          <select bind:value={budgetData.period}>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <div class="modal-actions">
            <button type="submit">Save</button>
            <button type="button" on:click={toggleBudgetModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  {/if}
</main>

<style>
  .finance-dashboard {
    background: linear-gradient(to bottom, #f8f9fc, #eef1f9);
    min-height: 100vh;
    padding: 2rem;
  }

  .card {
    background: white;
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06);
    transition: all 0.2s ease;
  }

  .card:hover {
    box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.1), 0 2px 4px -1px rgba(16, 24, 40, 0.06);
  }

  .amount {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1098F7;
    letter-spacing: -1px;
  }

  button {
    background: linear-gradient(to right, #1098F7, #0d7ac4);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
  }

  button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(16, 152, 247, 0.15);
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

  .alert-section {
    margin-bottom: 1rem;
  }

  .alert {
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }

  .alert.warning {
    background-color: #fff3cd;
    color: #856404;
  }

  .alert.success {
    background-color: #d4edda;
    color: #155724;
  }

  .trend {
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }

  .trend.positive {
    color: #28a745;
  }

  .trend.negative {
    color: #dc3545;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
  }

  .modal-content form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .action-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background: #1098F7;
    color: white;
    cursor: pointer;
  }

  button:hover {
    background: #0d7ac4;
  }
</style>
