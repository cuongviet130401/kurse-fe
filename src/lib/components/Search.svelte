<script>
  export let searchTerm;
</script>

<div
  class="input-group input-group-divider flex flex-row pl-2 items-center variant-form-material"
  style="background: none"
  id="search-input-cont"
>
  <input
    class="grow text-xl"
    type="search"
    placeholder="Search your topic"
    autocomplete="off"
    bind:value={searchTerm}
    on:input
  />
  <!-- <a href="/" title="Username already in use.">(icon)</a> -->
  <span class="text-2xl" style="margin-right: 16px;"
    ><i class="bi bi-search"></i></span
  >
</div>

<style>
  #search-input-cont {
    width: 40%;
    display: flex;
    align-items: center;
    margin: 0 0 0 10px;
  }
</style>
