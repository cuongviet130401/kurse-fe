<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { tick } from "svelte";
  import { writable } from "svelte/store";

  export let carouselItems = [];
  let currentIndex = 0;
  let totalItems = 0;
  let isTransitioning = false;
  let interval;

  // Store to handle transition
  const transitionStore = writable(false);

  // Function to move to the next slide
  function nextSlide() {
    if (!isTransitioning) {
      isTransitioning = true;
      currentIndex = (currentIndex + 1) % totalItems;
      transitionStore.set(true);
      tick().then(() => {
        transitionStore.set(false);
        isTransitioning = false;
      });
    }
  }

  // Function to move to the previous slide
  function prevSlide() {
    if (!isTransitioning) {
      isTransitioning = true;
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      transitionStore.set(true);
      tick().then(() => {
        transitionStore.set(false);
        isTransitioning = false;
      });
    }
  }

  // Update totalItems and currentIndex on mount
  onMount(() => {
    totalItems = carouselItems.length;
    startAutoSlide(); // Start automatic sliding on mount
  });

  // Clear the interval on component destroy to prevent memory leaks
  onDestroy(() => {
    clearInterval(interval);
  });

  // Function to start automatic sliding
  function startAutoSlide() {
    interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds (5000ms)
  }
</script>

<div class="carousel">
  {#if totalItems > 0}
    <div
      class="carousel-content {isTransitioning ? 'transitioning' : ''}"
      style="transform: translateX(-{currentIndex * 100}%);"
      class:transitioning={$transitionStore}
    >
      {#each carouselItems as item, i (item.id)}
        <div class="carousel-item">
          <img
            src={item.image}
            alt={item.caption}
            style="height: 100%; object-fit: cover;"
          />
          <div class="caption">{item.caption}</div>
        </div>
      {/each}
    </div>
    <button on:click={prevSlide} class="prev">&lt;</button>
    <button on:click={nextSlide} class="next">&gt;</button>
  {:else}
    <p>No items to display</p>
  {/if}
</div>

<style>
  .carousel {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 500px; /* Set height as needed */
  }

  .carousel-content {
    display: flex;
    transition: transform 0.5s ease;
  }

  .carousel-item {
    flex: 0 0 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px; /* Set height to fill carousel */
  }

  .caption {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5px;
  }

  .prev,
  .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    cursor: pointer;
    padding: 10px;
    z-index: 1;
  }

  .prev {
    left: 10px;
  }

  .next {
    right: 10px;
  }

  .transitioning {
    pointer-events: none;
  }
</style>
