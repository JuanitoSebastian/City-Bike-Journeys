<script lang="ts">
  import Divider from '../Divider.svelte';
  export let sectionTitle: string;
</script>

<div class="flex flex-col gap-4">
  <Divider label={sectionTitle} />
  <slot />
</div>
