<!--
 @component
  Redirect user to other route.
  - route: route to navigate user to
-->
<script lang="ts">
  import { useNavigate } from 'svelte-navigator';
  const navigate = useNavigate();

  export let route: string;
  navigate(route);
</script>