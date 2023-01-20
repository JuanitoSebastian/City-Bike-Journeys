<script lang="ts">
  import Tailwindcss from './components/Tailwindcss.svelte';
	export let name: string;
</script>

<main>
  <Tailwindcss />
	<h1 class='font-mono'>Hello {name}!</h1>
	<p class='text-sm text-red-500'>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>