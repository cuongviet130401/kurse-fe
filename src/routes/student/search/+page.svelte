<script>
  import { onMount } from "svelte";

  import { bookData } from "../../../lib/configs/bookData";
  import Menu from "../../../lib/components/Menu.svelte";
  import Search from "../../../lib/components/Search.svelte";
  import Course from "../../../lib/components/Course.svelte";
  import NoResults from "../../../lib/components/NoResults.svelte";

  let languages = []; // menu built from bookData
  let selectedLang = ""; //  menu selection

  const getLanguages = () => {
    for (let bookObj of bookData) {
      if (!languages.includes(bookObj.language)) {
        languages = [...languages, bookObj.language];
      }
    }
    languages = languages.sort();
  };
  onMount(() => getLanguages());

  // Query results
  let filteredBooks = [];

  // For Select Menu
  $: if (selectedLang) getBooksByLang();
  $: console.log(filteredBooks, selectedLang);

  const getBooksByLang = () => {
    // resets search input if menu is being used
    searchTerm = "";

    if (selectedLang === "all") {
      return (filteredBooks = []);
    }
    return (filteredBooks = bookData.filter(
      (book) => book.language === selectedLang
    ));
  };

  // For Search Input
  let searchTerm = "";
  // resets language menu if search input is used
  $: if (searchTerm) selectedLang = "";

  const searchBooks = () => {
    return (filteredBooks = bookData.filter((book) => {
      let bookTitle = book.title.toLowerCase();
      return bookTitle.includes(searchTerm.toLowerCase());
    }));
  };
</script>

<section id="query-section">
  <Menu {languages} bind:selectedLang />
  <Search bind:searchTerm on:input={searchBooks} />
</section>

<main id="bookshelf">
  {#if searchTerm && filteredBooks.length === 0}
    <NoResults />
  {:else if filteredBooks.length > 0}
    {#each filteredBooks as { title, image, language, description, price }}
      <Course
        {title}
        {image}
        {language}
        {description}
        {price}
      />
    {/each}
  {:else}
    {#each bookData as { title, image, language, description, price}}
      <Course
        {title}
        {image}
        {language}
        {description}
        {price}
      />
    {/each}
  {/if}
</main>

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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
  }
</style>
