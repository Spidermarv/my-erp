<script>
  export let title;
  export let content;
</script>

<div class="card">
  <h3>{title}</h3>
  <p>{content}</p>
</div>

<style>
  .card {
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    margin: 10px;
    transition: transform 0.3s;
  }

  .card:hover {
    transform: translateY(-5px);
  }
</style>