<script lang="ts">
  import { goto } from '$app/navigation';
  
  function navigateTo(path: string) {
    goto(path);
  }
</script>

<main class="landing">
  <div class="gradient-bg"></div>
  <div class="container">
    <div class="content-wrapper">
      <h1>Welcome to <span class="brand-text">Cichlify's</span> ERP</h1>
      <p class="subtitle">Select your dashboard experience</p>
      <div class="button-container">
        <button 
          on:click={() => navigateTo('/finance')} 
          aria-label="Go to Finance Dashboard"
          class="button primary">
          Finance Dashboard
        </button>
        <button 
          on:click={() => navigateTo('/business')} 
          aria-label="Go to Business Analytics Dashboard"
          class="button secondary">
          Business Analytics
        </button>
      </div>
    </div>
  </div>
</main>

<style>
  :root {
    --brand-blue: #1078F7; /* Finance color */
    --brand-purple: #3B28CC; /* Business color */
    --brand-light: #EAEBED;
    --spacing-unit: 4rem;
  }

  .landing {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--brand-light);
    position: relative;
    overflow: hidden;
  }

  .gradient-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(16, 120, 247, 0.05) 0%,
      rgba(59, 40, 204, 0.05) 100%
    );
    z-index: 1;
  }

  .container {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: var(--spacing-unit);
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.05),
      0 1px 3px rgba(0, 0, 0, 0.1);
    max-width: 1000px;
    width: 90%;
    margin: var(--spacing-unit);
  }

  .content-wrapper {
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    color: var(--brand-dark);
    margin-bottom: 1.5rem;
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    line-height: 1.2;
  }

  .brand-text {
    background: linear-gradient(135deg, var(--brand-blue), var(--brand-purple));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    color: var(--brand-dark);
    opacity: 0.8;
    margin-bottom: var(--spacing-unit);
    font-size: 1.25rem;
    font-weight: 400;
  }

  .button-container {
    display: grid;
    gap: 2rem;
    margin-top: var(--spacing-unit);
  }

  @media (min-width: 768px) {
    .button-container {
      grid-template-columns: 1fr 1fr;
    }
  }

  .button {
    padding: 1rem 2rem;
    font-size: 1.125rem;
    cursor: pointer;
    color: white;
    border: none;
    border-radius: 8px;
    transition: all 0.3s ease;
    min-width: 200px;
    text-align: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .button.primary {
    background: var(--brand-blue);
  }

  .button.secondary {
    background: var(--brand-purple);
  }

  .button:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 12px 24px rgba(0, 0, 0, 0.15),
      0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .button:active {
    transform: translateY(-2px);
  }

  .button:focus {
    outline: none;
    box-shadow: 
      0 0 0 3px rgba(16, 120, 247, 0.3),
      0 12px 24px rgba(0, 0, 0, 0.15);
  }
</style>