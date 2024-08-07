<script>
  import { getContext, onMount } from "svelte";

  const ctx = getContext("Header");

  let unsubscribe_visible = undefined;
  let unsubscribe_extended = undefined;
  let ref = null;
  let visible = false;
  let extended = false;
  let calling = false;
  let timeout = undefined;

  function debounce(cb, value = 250) {
    if (calling) return;

    calling = true;

    timeout = setTimeout(() => {
      cb();
      calling = false;
    }, value);
  }

  onMount(() => {
    return () => {
      if (typeof timeout === "number") clearTimeout(timeout);
      if (unsubscribe_visible !== undefined) unsubscribe_visible();
      if (unsubscribe_extended !== undefined) unsubscribe_extended();
    };
  });

  $: if (ctx) {
    unsubscribe_visible = ctx.visible.subscribe((state) => {
      visible = state;
    });

    unsubscribe_extended = ctx.extended.subscribe((state) => {
      extended = state;
    });
  }
</script>

<svelte:window
  on:resize="{() => {
    debounce(() => {
      if (ref && ctx) {
        ctx.mobile.set(ref.getBoundingClientRect().width === 0);
      }
    });
  }}"
/>

<div class="usa-navbar">
  <slot name="navbar" />
  <button
    bind:this="{ref}"
    class="usa-navbar-button usa-menu-btn"
    on:click="{() => {
      if (ctx) {
        ctx.mobile.set(true);
        ctx.visible.set(true);
      }
    }}"
  >
    Menu
  </button>
</div>
<nav
  aria-label="{$$props['aria-label'] || 'Primary navigation'}"
  class:usa-nav="{true}"
  class:is-visible="{visible}"
>
  {#if extended}
    <div class="usa-nav__inner">
      <button
        class="usa-nav__close"
        on:click="{() => {
          if (visible && ctx) {
            ctx.visible.set(false);
          }
        }}"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          width="12"
          fill="#565c65"
        >
          <title>close</title>
          <path
            fill="#565C65"
            fill-rule="evenodd"
            d="M57.042 1.15l5.809 5.808a4 4 0 010 5.657L43.465 32l19.386 19.385a4 4 0 010
            5.657l-5.809 5.809a4 4 0 01-5.657 0L32 43.465 12.615 62.851a4 4 0 01-5.657
            0l-5.809-5.809a4 4 0 010-5.657L20.535 32 1.149 12.615a4 4 0 010-5.657l5.809-5.809a4 4 0
            015.657 0L32 20.535 51.385 1.149a4 4 0 015.657 0z"
          ></path>
        </svg>
      </button>
      <ul class="usa-nav__primary usa-accordion">
        <slot />
      </ul>
      <div class="usa-nav__secondary">
        <slot name="nav-secondary" />
      </div>
    </div>
  {:else}
    <button
      class="usa-nav__close"
      on:click="{() => {
        if (visible && ctx) {
          ctx.visible.set(false);
        }
      }}"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width="12"
        fill="#565c65"
      >
        <title>close</title>
        <path
          fill="#565C65"
          fill-rule="evenodd"
          d="M57.042 1.15l5.809 5.808a4 4 0 010 5.657L43.465 32l19.386 19.385a4 4 0 010 5.657l-5.809
          5.809a4 4 0 01-5.657 0L32 43.465 12.615 62.851a4 4 0 01-5.657 0l-5.809-5.809a4 4 0
          010-5.657L20.535 32 1.149 12.615a4 4 0 010-5.657l5.809-5.809a4 4 0 015.657 0L32 20.535
          51.385 1.149a4 4 0 015.657 0z"
        ></path>
      </svg>
    </button>
    <ul class="usa-nav__primary usa-accordion">
      <slot />
    </ul>
    <slot name="nav-secondary" />
  {/if}
</nav>

<!-- TODO I'm not entirely sure the .usa-navbar-button.usa-menu-btn style is as intended. Verify -->
<style>
  @media (min-width: 64em) {
    :global(div[slot="nav-secondary"]) {
      margin-left: 1rem;
    }
  }

  .usa-navbar-button.usa-menu-btn {
    margin-left: auto;
  }

  .usa-nav__close {
    height: 3rem;
    width: 3rem;
  }
</style>
