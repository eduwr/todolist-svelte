<script lang="typescript">
  import { onMount } from "svelte";
  import { v4 as uuid } from "uuid";
  import type { Item as ItemType } from "../stores";
  import { items } from "../stores";
  import { TodoApi } from "../TodoApi";

  import NewItem from "./NewItem.svelte";
  import Item from "./Item.svelte";

  function handleNewItem(e: CustomEvent<string>) {
    $items = [
      {
        id: uuid(),
        text: e.detail,
        completed: false,
      },
      ...$items,
    ];

    TodoApi.save($items);
  }

  function handleUpdateItem(e: CustomEvent<ItemType>) {
    const idx = $items.findIndex((item) => item.id === e.detail.id);
    $items[idx] = e.detail;
    TodoApi.save($items);
  }

  function handleDeleteItem(e: CustomEvent<number>) {
    $items = $items.filter((i) => i.id !== e.detail);
  }

  let itemsSorted: ItemType[] = [];

  $: {
    itemsSorted = [...$items];
    itemsSorted.sort((a, b) => {
      if (a.completed && b.completed) return 0;
      if (a.completed) return 1;
      if (b.completed) return -1;
    });
  }

  onMount(async () => {
    items.set(await TodoApi.getAll());
  });
</script>

<div class="list">
  <NewItem on:newitem={handleNewItem} />
  {#each itemsSorted as item (item.id)}
    <Item {...item} on:update={handleUpdateItem} on:delete={handleDeleteItem} />
  {:else}
    <p class="list-status">No items exists</p>
  {/each}
</div>

<style>
  .list {
    padding: 15px;
  }

  .list-status {
    margin: 0;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 1.1em;
  }
</style>
