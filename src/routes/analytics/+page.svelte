
<script>
  import { onMount } from 'svelte';
  import { formatCurrency } from '$lib/utils';

  let userRole = 'analyst';
  let selectedTimeframe = 'month';
  let selectedMetric = 'revenue';

  let aiInsights = [
    { type: 'prediction', message: 'Revenue expected to grow by 23% next quarter based on current trends' },
    { type: 'anomaly', message: 'Unusual spike in operational costs detected in Department A' },
    { type: 'opportunity', message: 'Potential cost saving of 15% identified in supply chain' }
  ];

  let performanceScores = {
    efficiency: 85,
    growth: 92,
    sustainability: 78,
    innovation: 88
  };

  function generateReport() {
    // Report generation logic would go here
  }
</script>

<main class="analytics-dashboard">
  <header>
    <h1>Business Analytics</h1>
    <div class="user-controls">
      <select bind:value={selectedTimeframe}>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="quarter">This Quarter</option>
        <option value="year">This Year</option>
      </select>
      <span>Role: {userRole}</span>
      <button class="settings-btn">Settings</button>
    </div>
  </header>

  <div class="dashboard-grid">
    <div class="card insights">
      <h3>AI Insights</h3>
      <div class="insight-list">
        {#each aiInsights as insight}
          <div class="insight {insight.type}">
            <span class="insight-icon">
              {#if insight.type === 'prediction'}💡
              {:else if insight.type === 'anomaly'}⚠️
              {:else}💰{/if}
            </span>
            <p>{insight.message}</p>
          </div>
        {/each}
      </div>
    </div>
    
    <div class="card predictions">
      <h3>Performance Scores</h3>
      <div class="scores-grid">
        {#each Object.entries(performanceScores) as [metric, score]}
          <div class="score-item">
            <div class="score-label">{metric}</div>
            <div class="score-value" style="--score: {score}%">
              <div class="score-bar"></div>
              <span>{score}%</span>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="card actions">
      <h3>Quick Analysis</h3>
      <div class="analysis-controls">
        <select bind:value={selectedMetric}>
          <option value="revenue">Revenue Analysis</option>
          <option value="costs">Cost Analysis</option>
          <option value="productivity">Productivity Analysis</option>
        </select>
        <button on:click={generateReport}>Generate Report</button>
      </div>
    </div>

    <div class="card metrics">
      <h3>Real-time Metrics</h3>
      <div class="metric-cards">
        <div class="metric-card">
          <span>Active Users</span>
          <p>1,234</p>
          <div class="trend positive">↑ 12%</div>
        </div>
        <div class="metric-card">
          <span>Conversion Rate</span>
          <p>3.2%</p>
          <div class="trend positive">↑ 0.5%</div>
        </div>
        <div class="metric-card">
          <span>Avg. Response Time</span>
          <p>1.8s</p>
          <div class="trend negative">↓ 0.3s</div>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  .analytics-dashboard {
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

  .insight {
    background: #f8f9fc;
    border-left: 4px solid #3B28CC;
    margin-bottom: 1rem;
    transition: all 0.2s ease;
  }

  .insight:hover {
    transform: translateX(4px);
  }

  button {
    background: linear-gradient(to right, #3B28CC, #2a1d99);
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
    box-shadow: 0 4px 12px rgba(59, 40, 204, 0.15);
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

  .insight {
    display: flex;
    align-items: flex-start;
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    background: #f8f9fa;
  }

  .insight-icon {
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }

  .scores-grid {
    display: grid;
    gap: 1rem;
  }

  .score-item {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .score-label {
    width: 120px;
    text-transform: capitalize;
  }

  .score-value {
    flex: 1;
    height: 24px;
    background: #eee;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
  }

  .score-bar {
    position: absolute;
    height: 100%;
    width: var(--score);
    background: linear-gradient(90deg, #3B28CC, #6C63FF);
    border-radius: 12px;
  }

  .score-value span {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 0.8rem;
    z-index: 1;
  }

  .metric-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .metric-card {
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 4px;
    text-align: center;
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

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background: #3B28CC;
    color: white;
    cursor: pointer;
  }

  button:hover {
    background: #2a1d99;
  }

  select {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  .analysis-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
</style>
