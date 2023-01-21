<script lang="ts">
  export let sectionTitle: string;
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-row gap-2 items-center">
    <p class="uppercase text-gray-600 text-sm">{sectionTitle}</p>
    <div class="flex-grow border-t-2 border-gray-200"></div>
  </div>
  <slot></slot>
</div>