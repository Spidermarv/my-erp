<script>
  import { onMount } from "svelte";
  import TopNav from '$lib/components/TopNav.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Card from '$lib/components/Card.svelte';
  import TrendGraph from '$lib/components/TrendGraph.svelte';

  // Initial state
  let data = {
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    financialHealth: 0,
  };

  let filteredData = { ...data };
  let searchTerm = '';
  let loading = true;
  let error = null;

  async function fetchFinanceData() {
    try {
      loading = true;
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulated data
      data = {
        totalRevenue: 200000,
        totalExpenses: 150000,
        netProfit: 50000,
        financialHealth: 75,
      };
      
      filteredData = { ...data };
      loading = false;
    } catch (err) {
      error = 'Failed to load financial data';
      loading = false;
    }
  }

  onMount(fetchFinanceData);

  function handleSearch(term) {
    searchTerm = term.toLowerCase();
    
    if (searchTerm) {
      filteredData = Object.entries(data).reduce((acc, [key, value]) => {
        if (key.toLowerCase().includes(searchTerm)) {
          acc[key] = value;
        }
        return acc;
      }, {});
    } else {
      filteredData = { ...data };
    }
  }

  const graphData = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Revenue',
        data: [30000, 40000, 50000, 60000],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Expenses',
        data: [25000, 30000, 35000, 40000],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const aiInsights = [
    {
      id: 1,
      text: 'Expenses increased by 10% this month',
      type: 'warning',
      impact: 'high'
    },
    {
      id: 2,
      text: 'Consider reducing discretionary spending',
      type: 'suggestion',
      impact: 'medium'
    },
    {
      id: 3,
      text: 'Revenue projected to increase by 15% next quarter',
      type: 'positive',
      impact: 'high'
    }
  ];
</script>

<div class="dashboard-container">
  <TopNav onSearch={handleSearch} />
  
  <div class="layout">
    <Sidebar />

    <main class="dashboard">
      <header class="dashboard-header">
        <h1>Finance Dashboard</h1>
        {#if loading}
          <div class="loading">Loading financial data...</div>
        {/if}
      </header>
      
      {#if error}
        <div class="error-message">
          {error}
          <button on:click={fetchFinanceData}>Retry</button>
        </div>
      {/if}

      {#if !loading && !error}
        <section class="financial-overview" aria-label="Financial Overview">
          <div class="kpis">
            <Card 
              title="Total Revenue" 
              content={`$${filteredData.totalRevenue?.toLocaleString() ?? 0}`}
              trend="+5.2%"
              icon="dollar-sign"
            />
            <Card 
              title="Total Expenses" 
              content={`$${filteredData.totalExpenses?.toLocaleString() ?? 0}`}
              trend="-3.1%"
              icon="users"
            />
            <Card 
              title="Net Profit" 
              content={`$${filteredData.netProfit?.toLocaleString() ?? 0}`}
              trend="+10%"
              icon="trending-up"
            />
            <Card 
              title="Financial Health" 
              content={`${filteredData.financialHealth ?? 0}%`}
              trend="Stable"
              icon="smile"
            />
          </div>

          <section class="trend-graph" aria-label="Sales Trend">
            <TrendGraph data={graphData} />
          </section>

          <section class="ai-insights">
            <h2>AI Insights</h2>
            <div class="insights-grid">
              {#each aiInsights as insight}
                <div class="insight-card {insight.type}">
                  <h3>{insight.text}</h3>
                </div>
              {/each}
            </div>
          </section>
        </section>
      {/if}
    </main>
  </div>
</div>

<style>
  .dashboard-container {
    min-height: 100vh;
    background-color: #f8f9fa;
  }

  .layout {
    display: flex;
    min-height: calc(100vh - 60px); /* Adjust based on TopNav height */
  }

  .dashboard {
    flex-grow: 1;
    padding: 2rem;
    overflow-y: auto;
  }

  .dashboard-header {
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 1.875rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 1rem;
  }

  .kpis {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .trend-graph {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  .ai-insights {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .insights-grid {
    display: grid;
    gap: 1rem;
  }

  .insight-card {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .insight-card.positive {
    border-left: 4px solid #10B981;
  }

  .insight-card.warning {
    border-left: 4px solid #F59E0B;
  }

  .insight-card.suggestion {
    border-left: 4px solid #3B82F6;
  }

  .loading {
    color: #6b7280;
    font-size: 0.875rem;
  }

  .error-message {
    padding: 1rem;
    background-color: #fee2e2;
    color: #dc2626;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .error-message button {
    padding: 0.5rem 1rem;
    background-color: #dc2626;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .dashboard {
      padding: 1rem;
    }

    .kpis {
      grid-template-columns: 1fr;
    }

    .insight-card {
      flex-direction: column;
    }
  }
</style>