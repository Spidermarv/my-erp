<script>
    import { onMount } from "svelte";
    import { financialData, addTransaction, setFinancialGoal } from "$lib/stores/financialData";
    import { formatCurrency } from "$lib/utils"; 
  
    let data = {};
    let goalTarget = 100000;
    let goalDeadline = "2025-12-31";
  
    onMount(() => {
      financialData.subscribe((value) => {
        data = value;
      });
    });
  
    function addIncome() {
      addTransaction("income", 5000, "Product Sales", new Date().toISOString());
    }
  
    function addExpense() {
      addTransaction("expense", 2000, "Marketing", new Date().toISOString());
    }
  
    function setGoal() {
      setFinancialGoal(goalTarget, goalDeadline);
    }
  </script>
  
  <h1>Finance Dashboard</h1>
  <p><strong>Revenue:</strong> {formatCurrency(120000)}</p>
  <p><strong>Expenses:</strong> {formatCurrency(300000)}</p>
  <p><strong>Profit:</strong> {formatCurrency(20000)}</p>
  
  <button on:click={addIncome}>+ Add Income</button>
  <button on:click={addExpense}>- Add Expense</button>
  
  <h2>Financial Goal</h2>
  <input type="number" bind:value={goalTarget} placeholder="Target Amount" />
  <input type="date" bind:value={goalDeadline} />
  <button on:click={setGoal}>Set Goal</button>
  
 
  