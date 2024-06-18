<script>
  import { scale } from "svelte/transition";
  import { expoInOut } from "svelte/easing";

  export let id;
  export let title;
  export let thumbnailUrl;
  // export let description;
  export let price;
  // export let subtitle;
  export let numberOfEnrolled;
  export let numberOfLiked;
</script>

<a href="/course-details/{id}">
  <div
    class="card m-4 !p-0 card-hover shadow-xl hover:shadow-2xl flex flex-col justify-between"
    style="height: 400px; width: 300px; max-width: 300px"
    transition:scale={{ duration: 1000, easing: expoInOut }}
  >
    <header class="card-header !p-0 overflow-y-hidden rounded-t-lg">
      <div class="image-container">
        <img src={thumbnailUrl} class="image" alt="" />
      </div>
    </header>
    <section class="p-4 grow">
      <h4 class="h4">
        {title}
      </h4>
      <p>{numberOfLiked}</p>
      <p>({numberOfEnrolled})</p>
    </section>
    <footer
      class="card-footer !p-2 flex flex-row gap-4 mt-8"
      style="border-top-width: 1px; border-top-color: darkgray;"
    >
      <h5>{price}</h5>
    </footer>
  </div>
</a>

<style>
  .image-container {
    width: 100%;
    height: 200px; /* Set the height you want for the images */
    overflow: hidden;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* This ensures the image covers the entire container */
    object-position: center; /* This centers the image within the container */
  }
</style>
