<script>
  import { AppBar } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";

  let isOpen = false;

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function handleMouseEnter() {
    isOpen = true;
  }

  function handleMouseLeave() {
    isOpen = false;
  }
</script>

<AppBar>
  <svelte:fragment slot="lead">
    <div class="flex items-center space-x-4">
      <!-- Logo -->
      <a
        class="lg:!ml-0 w-[32px] lg:w-auto overflow-hidden"
        href="/home"
        title="Go to Homepage"
      >
        (logo)
      </a>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <!--Dropdown button-->
    <button
      class="dropdown lg:block"
      on:mouseenter={handleMouseEnter}
      on:mouseleave={handleMouseLeave}
    >
      <button class="dropdown-btn">Dropdown</button>
      {#if isOpen}
        <div class="dropdown-content">
          <a href="/">Option 1</a>
          <a href="/">Option 2</a>
          <a href="/">Option 3</a>
        </div>
      {/if}
    </button>

    <!--Cart-->
    <button>
      <a href="/cart"><i class="bi bi-cart large-icon"></i></a>
    </button>

    <!--AVT button-->
    <button
      class="dropdown lg:block"
      on:mouseenter={handleMouseEnter}
      on:mouseleave={handleMouseLeave}
    >
      <button class="dropdown-btn btn-icon variant-filled">
        <i class="bi bi-person-circle large-icon"></i>
      </button>
      {#if isOpen}
        <div class="dropdown-content">
          <a href="/auth">Sign In</a>
        </div>
      {/if}
    </button>
  </svelte:fragment>
</AppBar>

<style>
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-btn {
    padding: 10px;
    border: none;
    cursor: pointer;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    right: 0;
    top: 100%;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content a:hover {
    background-color: #f1f1f1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
  .large-icon {
    font-size: 1.5rem; /* Adjust the size as needed */
  }
</style>
