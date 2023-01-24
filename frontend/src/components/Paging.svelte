<!--
 @component
  A simple pagination component featuring a button for prev and next page.
  - paging: PagingDetails to display paging from. If undefined nothing is rendered.
  - onChange: function to call when the user changes page. function is called with the
    number of the page that the user wants to see.
-->

<script lang="ts">
  import type { PagingDetails } from '../utils/interfaces';
  import Icon from './Icon.svelte';

  export let paging: PagingDetails|undefined;
  export let onChange: (value: number) => void;

  const increment = () => {
    if (paging.page >= paging.pages - 1) {
      return;
    }
    onChange(paging.page + 1);
  };

  const decrement = () => {
    if (paging.page < 1) {
      return;
    }
    onChange(paging.page - 1);
  };
</script>

<div
  class="bg-white p-4 rounded-lg w-full flex flex-row items-center justify-center gap-4 h-16"
>
  {#if paging}
  <div class="flex flex-row w-fit h-10 bg-gray-100 rounded-lg border border-gray-300">
    <div
      class="w-20 h-full flex flex-col items-center justify-center text-blue-600"
    >
      {#if paging.page > 0}
        <button on:click={() => decrement()}>
          <Icon iconType="chevron-left" />
        </button>
      {/if}
    </div>
    <div
      class="px-2 w-fit h-full border-x bg-gray-50 border-gray-300 flex flex-row items-center justify-center text-sm"
    >
      {paging.page} / {paging.pages - 1}
    </div>
    <div
      class="w-20 h-full flex flex-col items-center justify-center text-blue-600"
    >
      {#if paging.page < paging.pages - 1}
        <button on:click={() => increment()}>
          <Icon iconType="chevron-right" />
        </button>
      {/if}
    </div>
  </div>
  {/if}
</div>
