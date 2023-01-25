<!--
 @component
  A horizontal divider that fills the parent container.
    - label: An optional string to display as a title
-->
<script lang="ts">
  export let label: string | undefined;
</script>

<div class="flex flex-row w-full items-center justify-start gap-2">
  {#if label}
    <p class="uppercase text-gray-600 text-sm">{label}</p>
  {/if}
  <div class="flex-grow border-t-2 border-gray-200 rounded-lg" />
</div>
