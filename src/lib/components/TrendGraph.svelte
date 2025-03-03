<script>
  import { onMount, onDestroy } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);

  export let data = {
    labels: [],
    datasets: []
  };

  let chart;
  let canvas;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            enabled: true,
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time'
            },
            grid: {
              display: true,
              drawBorder: true,
            }
          },
          y: {
            title: {
              display: true,
              text: 'Amount'
            },
            grid: {
              display: true,
              drawBorder: true,
            }
          }
        }
      }
    });
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });

  // Update chart when data changes
  $: if (chart && data) {
    chart.data = data;
    chart.update();
  }
</script>

<div class="chart-container">
  <canvas 
    bind:this={canvas}
    width="400" 
    height="200"
  ></canvas>
</div>

<style>
  .chart-container {
    position: relative;
    height: 400px;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }

  canvas {
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
</style>