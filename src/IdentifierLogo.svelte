<script>
  /**
   * @type {string} [href="#"]
   */
  export let href = "#";

  /**
   * @type {string} [src=""]
   */
  export let src = "";

  /**
   * @type {string} [alt=""]
   */
  export let alt = "";
</script>

<a {...$$restProps} {href} class="usa-identifier__logo" on:click>
  <img class="usa-identifier__logo-img" {src} {alt} />
</a>
