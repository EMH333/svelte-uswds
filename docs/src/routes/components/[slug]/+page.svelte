<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`components/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  /** @type {import('./$types').PageData} */
	export let data;

  import * as registry from "./_components";
  import HeaderTitle from "../../../components/HeaderTitle.svelte";
  import { Grid } from "svelte-uswds";
  import { getContext, onMount } from "svelte";

  const ctx = getContext("Navigation");

  onMount(() => {
    return () => {
      ctx.slug.set(undefined);
    };
  });

  $: if (data.slug) {
    ctx.slug.set(data.slug);
  }
</script>

<svelte:head>
  <title>{data.title} | Components</title>
</svelte:head>

<Grid>
  <HeaderTitle subtitle="Components">{data.title}</HeaderTitle>
  <svelte:component this="{registry[data.title]}" />
</Grid>
