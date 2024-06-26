<script lang="ts">
  import { bookData } from "../../lib/configs/bookData";
  import Search from "../../lib/components/Search.svelte";
  import Course from "../../lib/components/Course.svelte";
  import NoResults from "../../lib/components/NoResults.svelte";
  import BitbleAppBar from "$lib/components/BitbleAppBar.svelte";
  import { Paginator, type PaginationSettings } from "@skeletonlabs/skeleton";

  let filteredBooks = bookData;
  let searchTerm = "";
  let paginationSettings: PaginationSettings = {
    page: 1,
    limit: 6,
    size: filteredBooks.length,
    amounts: [6, 12], // Example amounts for select input
  };

  // Function to filter books based on search term
  const searchBooks = () => {
    filteredBooks = bookData.filter((book) => {
      let bookTitle = book.title.toLowerCase();
      return bookTitle.includes(searchTerm.toLowerCase());
    });
    paginationSettings.page = 0; // Reset to first page after search
    paginationSettings.size = filteredBooks.length; // Update total size after search
  };

  // Function to get books for the current page
  const getCurrentPageBooks = () => {
    const startIndex = paginationSettings.page * paginationSettings.limit;
    const endIndex = startIndex + paginationSettings.limit;
    return filteredBooks.slice(startIndex, endIndex);
  };

  //Event handler for page change
  function onPageChange(e: CustomEvent) {
    paginationSettings.page = e.detail.page;
  }
</script>

<BitbleAppBar />
<section
  id="query-section"
  style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2% 0; margin-top: 200px;"
>
  <h1 class="h1 text-center" style="margin-bottom: 20px;">
    <span
      class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
      >Bitble</span
    >'s Kurges
  </h1>
  <Search bind:searchTerm on:input={searchBooks} />
</section>

<main id="bookshelf">
  {#if searchTerm && filteredBooks.length === 0}
    <NoResults />
  {:else if filteredBooks.length > 0}
    {#each filteredBooks as { id, title, thumbnailUrl, price, numberOfEnrolled, numberOfLiked }}
      <Course
        {id}
        {title}
        {thumbnailUrl}
        {price}
        {numberOfEnrolled}
        {numberOfLiked}
      />
    {/each}
  {:else}
    {#each bookData as { id, title, thumbnailUrl, price, numberOfEnrolled, numberOfLiked }}
      <Course
        {id}
        {title}
        {thumbnailUrl}
        {price}
        {numberOfEnrolled}
        {numberOfLiked}
      />
    {/each}
  {/if}
</main>

<footer class="w-full flex justify-center mt-8">
  <Paginator
    bind:settings={paginationSettings}
    controlVariant="variant-ghost-surface"
    active="variant-ghost-primary"
    amountText="items/page"
    showFirstLastButtons={true}
    showPreviousNextButtons={true}
    showNumerals={true}
    maxNumerals={10}
    on:page={onPageChange}
  />
</footer>

<style>
  * {
    box-sizing: border-box;
  }

  #query-section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2% 0;
  }

  /* General Structure */
  main#bookshelf {
    width: 100%;
    margin: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    justify-content: center;
  }
</style>
