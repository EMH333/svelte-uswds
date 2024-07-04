<script>
  import { page } from '$app/stores';
  import { Link, Grid } from "svelte-uswds";
  import HeaderTitle from "../components/HeaderTitle.svelte";

  const dev = process.env.NODE_ENV === "development";
</script>

<style>
  :global(footer) {
    display: none;
  }
</style>

<svelte:head>
  <title>{$page.error.title}</title>
</svelte:head>
<Grid>
  <HeaderTitle subtitle="{$page.error.title}">{$page.error.message}</HeaderTitle>
  <p>
    Return to
    <Link href="/">home</Link>
    .
  </p>
</Grid>
