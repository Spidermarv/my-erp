
<script>
  import { onMount } from 'svelte';
  import { financialData } from '$lib/stores/financialData';
  import { formatCurrency } from '$lib/utils';

  let userRole = 'admin';
  let showBudgetModal = false;
  let showForecastModal = false;
  let selectedCurrency = 'MWK';
  let selectedTimeRange = 'month';
  let budgetData = {
    category: '',
    amount: 0,
    period: 'monthly',
    alerts: true,
    maxVariance: 10
  };

  let forecastSettings = {
    period: '6months',
    model: 'arima',
    confidence: 95,
    variables: ['revenue', 'expenses']
  };

  let riskMetrics = {
    cashflowRisk: 'medium',
    operationalRisk: 'low',
    marketRisk: 'high',
    score: 72
  };

  let complianceStatus = {
    taxFiling: 'complete',
    auditReadiness: 89,
    pendingIssues: 3
  };

  let recentAlerts = [
    { type: 'warning', message: 'Unusual expense pattern detected', severity: 'high' },
    { type: 'success', message: 'Monthly revenue target achieved', severity: 'info' },
    { type: 'danger', message: 'Cash flow projection below threshold', severity: 'critical' }
  ];

  let workingCapital = {
    current: 150000,
    optimal: 180000,
    trend: 'upward',
    daysPayable: 45,
    daysReceivable: 30
  };

  function toggleBudgetModal() {
    showBudgetModal = !showBudgetModal;
  }

  function toggleForecastModal() {
    showForecastModal = !showForecastModal;
  }

  function handleBudgetSubmit() {
    // Budget submission logic
    showBudgetModal = false;
  }

  function generateForecast() {
    // Forecast generation logic
    showForecastModal = false;
  }

  function exportFinancialReport() {
    // Report export logic
  }

  function schedulePayment() {
    // Payment scheduling logic
  }

  function updateRiskAssessment() {
    // Risk assessment update logic
  }

  onMount(() => {
    // Initialize real-time data monitoring
  });
</script>

<main class="finance-dashboard">
  <header>
    <h1>Financial Command Center</h1>
    <div class="user-controls">
      <select bind:value={selectedCurrency}>
        <option value="MWK">MWK</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
      <select bind:value={selectedTimeRange}>
        <option value="day">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="quarter">This Quarter</option>
      </select>
      <span class="user-role">Role: {userRole}</span>
    </div>
  </header>

  <div class="alert-section">
    {#each recentAlerts as alert}
      <div class="alert {alert.type} severity-{alert.severity}">
        <span class="alert-icon">
          {#if alert.severity === 'critical'}⚠️{:else if alert.severity === 'high'}⚡{:else}ℹ️{/if}
        </span>
        <span class="alert-message">{alert.message}</span>
        <span class="alert-severity">{alert.severity}</span>
      </div>
    {/each}
  </div>

  <div class="dashboard-grid">
    <div class="card balance">
      <h3>Financial Position</h3>
      <p class="amount">{formatCurrency(2190.19, selectedCurrency)}</p>
      <div class="trend positive">↑ 15% from last period</div>
      <div class="working-capital">
        <h4>Working Capital</h4>
        <div class="capital-metrics">
          <div>Current: {formatCurrency(workingCapital.current, selectedCurrency)}</div>
          <div>Optimal: {formatCurrency(workingCapital.optimal, selectedCurrency)}</div>
          <div>Days Payable: {workingCapital.daysPayable}</div>
          <div>Days Receivable: {workingCapital.daysReceivable}</div>
        </div>
      </div>
    </div>
    
    <div class="card risk-assessment">
      <h3>Risk Assessment</h3>
      <div class="risk-grid">
        <div class="risk-metric">
          <span>Cashflow Risk</span>
          <div class="risk-indicator {riskMetrics.cashflowRisk}">{riskMetrics.cashflowRisk}</div>
        </div>
        <div class="risk-metric">
          <span>Operational Risk</span>
          <div class="risk-indicator {riskMetrics.operationalRisk}">{riskMetrics.operationalRisk}</div>
        </div>
        <div class="risk-metric">
          <span>Market Risk</span>
          <div class="risk-indicator {riskMetrics.marketRisk}">{riskMetrics.marketRisk}</div>
        </div>
        <div class="risk-score">
          <span>Overall Score</span>
          <div class="score-circle" style="--score: {riskMetrics.score}">
            {riskMetrics.score}
          </div>
        </div>
      </div>
    </div>

    <div class="card compliance">
      <h3>Compliance & Reporting</h3>
      <div class="compliance-status">
        <div class="status-item">
          <span>Tax Filing Status</span>
          <div class="status-indicator {complianceStatus.taxFiling}">
            {complianceStatus.taxFiling}
          </div>
        </div>
        <div class="status-item">
          <span>Audit Readiness</span>
          <div class="progress-bar" style="--progress: {complianceStatus.auditReadiness}%">
            <div class="progress"></div>
            <span>{complianceStatus.auditReadiness}%</span>
          </div>
        </div>
        <div class="status-item">
          <span>Pending Issues</span>
          <div class="issue-count">{complianceStatus.pendingIssues}</div>
        </div>
      </div>
    </div>

    <div class="card quick-actions">
      <h3>Financial Operations</h3>
      <div class="action-buttons">
        <button on:click={toggleBudgetModal}>Budget Planning</button>
        <button on:click={toggleForecastModal}>Financial Forecast</button>
        <button on:click={exportFinancialReport}>Export Reports</button>
        <button on:click={schedulePayment}>Payment Management</button>
        <button on:click={updateRiskAssessment}>Update Risk Assessment</button>
      </div>
    </div>
  </div>

  {#if showBudgetModal}
    <div class="modal">
      <div class="modal-content">
        <h2>Advanced Budget Planning</h2>
        <form on:submit|preventDefault={handleBudgetSubmit}>
          <input type="text" placeholder="Category" bind:value={budgetData.category} />
          <input type="number" placeholder="Amount" bind:value={budgetData.amount} />
          <select bind:value={budgetData.period}>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <div class="advanced-options">
            <label>
              <input type="checkbox" bind:checked={budgetData.alerts} />
              Enable Alerts
            </label>
            <label>
              Max Variance (%)
              <input type="number" bind:value={budgetData.maxVariance} min="0" max="100" />
            </label>
          </div>
          <div class="modal-actions">
            <button type="submit">Save Budget</button>
            <button type="button" on:click={toggleBudgetModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  {/if}

  {#if showForecastModal}
    <div class="modal">
      <div class="modal-content">
        <h2>Financial Forecast Configuration</h2>
        <form on:submit|preventDefault={generateForecast}>
          <select bind:value={forecastSettings.period}>
            <option value="3months">3 Months</option>
            <option value="6months">6 Months</option>
            <option value="1year">1 Year</option>
          </select>
          <select bind:value={forecastSettings.model}>
            <option value="arima">ARIMA</option>
            <option value="prophet">Prophet</option>
            <option value="lstm">LSTM</option>
          </select>
          <input type="number" bind:value={forecastSettings.confidence} 
                 min="1" max="99" placeholder="Confidence Interval %" />
          <div class="variable-selection">
            <label>
              <input type="checkbox" checked disabled />
              Revenue
            </label>
            <label>
              <input type="checkbox" checked disabled />
              Expenses
            </label>
          </div>
          <div class="modal-actions">
            <button type="submit">Generate Forecast</button>
            <button type="button" on:click={toggleForecastModal}>Cancel</button>
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

  .dashboard-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }

  .card {
    background: white;
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06);
    transition: all 0.3s ease;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.1), 0 2px 4px -1px rgba(16, 24, 40, 0.06);
  }

  .alert {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from { transform: translateX(-10px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  .severity-critical { background: #fee2e2; color: #991b1b; }
  .severity-high { background: #fff7ed; color: #9a3412; }
  .severity-info { background: #f0f9ff; color: #075985; }

  .risk-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
  }

  .risk-indicator {
    padding: 0.5rem;
    border-radius: 4px;
    text-align: center;
    text-transform: uppercase;
    font-weight: 500;
  }

  .risk-indicator.high { background: #fee2e2; color: #991b1b; }
  .risk-indicator.medium { background: #fff7ed; color: #9a3412; }
  .risk-indicator.low { background: #ecfdf5; color: #065f46; }

  .score-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: conic-gradient(
      #1098F7 calc(var(--score) * 1%),
      #e5e7eb calc(var(--score) * 1%)
    );
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #1098F7;
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .progress-bar .progress {
    position: absolute;
    height: 100%;
    width: var(--progress);
    background: linear-gradient(90deg, #1098F7, #0d7ac4);
    transition: width 0.3s ease;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .action-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
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
</style>
