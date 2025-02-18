
<script>
  import { onMount } from "svelte";
  import { financialData, addTransaction, setFinancialGoal, addDocument } from "$lib/stores/financialData";
  import { formatCurrency } from "$lib/utils";

  let data = {};
  let newTransaction = {
    type: "income",
    amount: 0,
    category: "",
    currency: "MWK"
  };
  let goalTarget = 100000;
  let goalDeadline = "2025-12-31";
  let goalStrategies = "";

  onMount(() => {
    financialData.subscribe((value) => {
      data = value;
    });
  });

  function handleTransactionSubmit() {
    addTransaction(
      newTransaction.type,
      newTransaction.amount,
      newTransaction.category,
      new Date().toISOString(),
      newTransaction.currency
    );
    newTransaction.amount = 0;
    newTransaction.category = "";
  }

  function handleGoalSubmit() {
    setFinancialGoal(
      goalTarget,
      goalDeadline,
      goalStrategies.split('\n').filter(s => s.trim())
    );
  }

  function uploadDocument(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        addDocument(
          file.name,
          file.type,
          e.target.result,
          new Date().toISOString()
        );
      };
      reader.readAsDataURL(file);
    }
  }
</script>

<main class="container">
  <h1>Financial Dashboard</h1>
  
  <section class="metrics">
    <div class="metric">
      <h3>Revenue</h3>
      <p>{formatCurrency(data.revenue)}</p>
    </div>
    <div class="metric">
      <h3>Expenses</h3>
      <p>{formatCurrency(data.expenses)}</p>
    </div>
    <div class="metric">
      <h3>Profit</h3>
      <p>{formatCurrency(data.profit)}</p>
    </div>
    <div class="metric">
      <h3>Cash Flow</h3>
      <p>{formatCurrency(data.cashFlow)}</p>
    </div>
  </section>

  <section class="financial-health">
    <h2>Financial Health</h2>
    <div class="health-score">
      Score: {data.financialHealth?.score.toFixed(2)}
    </div>
    <div class="health-metrics">
      {#each Object.entries(data.financialHealth?.metrics || {}) as [key, value]}
        <div class="metric">
          <span>{key}:</span>
          <span>{value.toFixed(2)}%</span>
        </div>
      {/each}
    </div>
  </section>

  <section class="transactions">
    <h2>Add Transaction</h2>
    <div class="form">
      <select bind:value={newTransaction.type}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="number"
        bind:value={newTransaction.amount}
        placeholder="Amount"
      />
      <input
        type="text"
        bind:value={newTransaction.category}
        placeholder="Category"
      />
      <select bind:value={newTransaction.currency}>
        <option value="MWK">MWK</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
      <button on:click={handleTransactionSubmit}>Add Transaction</button>
    </div>
  </section>

  <section class="financial-goal">
    <h2>Financial Goal</h2>
    <div class="form">
      <input
        type="number"
        bind:value={goalTarget}
        placeholder="Target Amount"
      />
      <input
        type="date"
        bind:value={goalDeadline}
      />
      <textarea
        bind:value={goalStrategies}
        placeholder="Enter strategies (one per line)"
      ></textarea>
      <button on:click={handleGoalSubmit}>Set Goal</button>
    </div>
    {#if data.financialGoal?.target}
      <div class="goal-progress">
        <h3>Goal Progress: {data.financialGoal.progress.toFixed(2)}%</h3>
        <progress value={data.financialGoal.progress} max="100"></progress>
      </div>
    {/if}
  </section>

  <section class="documents">
    <h2>Documents</h2>
    <input
      type="file"
      on:change={uploadDocument}
      accept=".pdf,.doc,.docx,.xls,.xlsx"
    />
    <div class="document-list">
      {#each data.documents || [] as doc}
        <div class="document">
          <span>{doc.title}</span>
          <span>{new Date(doc.date).toLocaleDateString()}</span>
        </div>
      {/each}
    </div>
  </section>
</main>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .metric {
    padding: 15px;
    background: #f5f5f5;
    border-radius: 8px;
  }

  .form {
    display: grid;
    gap: 10px;
    max-width: 500px;
    margin-bottom: 20px;
  }

  .health-score {
    font-size: 24px;
    font-weight: bold;
    margin: 10px 0;
  }

  .health-metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
  }

  .goal-progress {
    margin-top: 20px;
  }

  progress {
    width: 100%;
    height: 20px;
  }

  section {
    margin-bottom: 30px;
  }

  h1, h2, h3 {
    margin-bottom: 15px;
  }

  button {
    padding: 10px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background: #45a049;
  }

  input, select, textarea {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
</style>
<script>
  import { goto } from '$app/navigation';
</script>

<main class="landing-container">
  <h1>ERP System</h1>
  
  <div class="module-cards">
    <div class="module-card finance" on:click={() => goto('/finance')}>
      <h2>Finance Module</h2>
      <p>Financial Management & Analysis</p>
      <ul>
        <li>Automated Ledger System</li>
        <li>Multi-Currency Support</li>
        <li>Tax Management</li>
        <li>Financial Forecasting</li>
      </ul>
    </div>
    
    <div class="module-card analytics" on:click={() => goto('/analytics')}>
      <h2>Business Analytics</h2>
      <p>Data-Driven Insights</p>
      <ul>
        <li>AI-Powered Analytics</li>
        <li>Real-time Reporting</li>
        <li>Predictive Analysis</li>
        <li>Performance Metrics</li>
      </ul>
    </div>
  </div>
</main>

<style>
  .landing-container {
    min-height: 100vh;
    padding: 2rem;
    background-color: #EAEBED;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    color: #232B28;
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .module-cards {
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .module-card {
    width: 300px;
    padding: 2rem;
    border-radius: 12px;
    color: white;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .module-card:hover {
    transform: translateY(-5px);
  }

  .finance {
    background-color: #1098F7;
  }

  .analytics {
    background-color: #3B28CC;
  }

  h2 {
    margin: 0 0 1rem 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 1rem 0 0 0;
  }

  li {
    margin: 0.5rem 0;
    font-size: 0.9rem;
  }
</style>
