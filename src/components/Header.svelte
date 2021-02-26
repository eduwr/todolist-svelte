<script lang="typescript">
  import { items } from "../stores";

  let list = $items;
  $: itemCount = list.length;
  $: completedItemCount = list.filter((item) => item.completed).length;
</script>

<div class="header">
  <span>Dom's todo list</span>
  <span>{completedItemCount}/{itemCount}</span>
</div>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    color: white;
    font-weight: bold;
    font-size: 1.5em;
    background: rgba(0, 0, 0, 0.1);
  }
</style>
