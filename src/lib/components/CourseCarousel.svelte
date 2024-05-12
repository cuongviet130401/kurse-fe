<script>
  import { onMount } from "svelte";
  import { tick } from "svelte";
  import { writable } from "svelte/store";
  import { bookData } from "../configs/bookData"; // Import book data
  import Course from "../components/Course.svelte"; // Import Course component

  let currentIndex = 0;
  let totalItems = 0;
  let isTransitioning = false;

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
    totalItems = bookData.length;
  });

  // Function to get the current course
  function getCurrentCourse(index) {
    return bookData[index];
  }
</script>

<div class="carousel">
  {#if totalItems > 0}
    <div
      class="carousel-content {isTransitioning ? 'transitioning' : ''}"
      style="transform: translateX(-{currentIndex * 100}%);"
      class:transitioning={$transitionStore}
    >
      {#each bookData as course, i (course.title)}
        <div class="carousel-item">
          <Course
            title={course.title}
            image={course.image}
            language={course.language}
          />
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
  /* Your carousel styles */
</style>
