<!--
 @component
  A component providing Tailwindcss utility classes globally
-->

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    body {
      @apply bg-gray-50;
      @apply text-gray-900;
    }
  }
</style>