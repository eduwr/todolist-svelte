<script lang="typescript">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleKeyUp(
    e: KeyboardEvent & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) {
    if (e.key !== "Enter" || value.length === 0) return;

    dispatch("newitem", value);
    value = "";

    e.currentTarget.blur();
  }

  let value = "";
</script>

<input
  type="text"
  placeholder="+ Add Item"
  on:keyup={(e) => handleKeyUp(e)}
  bind:value
/>

<style>
  input {
    box-sizing: border-box;
    margin-bottom: 15px;
    padding: 15px;
    border: none;
    outline: none;
    width: 100%;
    background: rgba(0, 0, 0, 0.25);
    color: white;
    font-weight: bold;
    font-size: 1em;
    cursor: pointer;
  }

  input::placeholder {
    color: white;
  }
</style>
