<script>
  import { onMount } from "svelte";
  import TopNav from '$lib/components/TopNav.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Card from '$lib/components/Card.svelte';
  import TrendGraph from '$lib/components/TrendGraph.svelte';

  let data = {
    totalSales: 0,
    totalCustomers: 0,
    netProfit: 0,
    customerSatisfaction: 0,
  };

  let filteredData = data; // To hold filtered data
  let searchTerm = '';

  onMount(() => {
    // Simulate fetching data
    data = {
      totalSales: 150000,
      totalCustomers: 300,
      netProfit: 50000,
      customerSatisfaction: 85,
    };
    filteredData = data; // Initialize filtered data
  });

  function handleSearch(term) {
    searchTerm = term.toLowerCase(); // Convert to lowercase for case-insensitive search

    // Implement filtering logic based on searchTerm
    filteredData = {
      totalSales: data.totalSales, // Adjust based on search
      totalCustomers: data.totalCustomers, // Adjust based on search
      netProfit: data.netProfit, // Adjust based on search
      customerSatisfaction: data.customerSatisfaction, // Adjust based on search
    };

    // Example filtering logic
    if (searchTerm) {
      console.log('Filtering data based on:', searchTerm);
    }
  }

  let graphData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Sales',
      data: [5000, 7000, 8000, 6000],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
    }]
  };
</script>

<TopNav onSearch={handleSearch} />

<div class="layout">
  <Sidebar />

  <main class="dashboard">
    <h1>Business Analytics Dashboard</h1>
    
    <section class="kpis">
      <Card title="Total Sales" content={`$${filteredData.totalSales.toLocaleString()}`} />
      <Card title="Total Customers" content={filteredData.totalCustomers} />
      <Card title="Net Profit" content={`$${filteredData.netProfit.toLocaleString()}`} />
      <Card title="Customer Satisfaction Score" content={`${filteredData.customerSatisfaction}%`} />
    </section>

    <section class="trend-graph">
      <TrendGraph data={graphData} />
    </section>

    <section class="ai-insights">
      <h2>AI Insights</h2>
      <ul>
        <li>Your customer acquisition cost has decreased by 5% this quarter.</li>
        <li>Consider increasing your marketing budget to capitalize on the current growth.</li>
        <li>Your churn rate is higher than the industry average; consider implementing a loyalty program.</li>
      </ul>
    </section>
  </main>
</div>

<style>
  .layout {
    display: flex;
  }

  .dashboard {
    flex-grow: 1;
    padding: 20px;
  }

  .kpis {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .trend-graph {
    margin-bottom: 30px;
  }

  .ai-insights {
    background: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
  }
</style>