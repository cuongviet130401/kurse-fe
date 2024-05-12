<script>
  import { scale } from "svelte/transition";
  import { expoInOut } from "svelte/easing";
  export let title;
  export let image;
  export let language;
</script>

<section class="book" transition:scale={{ duration: 1000, easing: expoInOut }}>
  <section class="book-top-info">
    <figure class="bkcont">
      <img src={image} alt={title} class="bkcover" />
      <div class="language">({language})</div>
      <figcaption>{title}</figcaption>
    </figure>
  </section>

  <section class="book-bottom-links">
    <section class="from-pariyatti available-at">
      <header>
        <h5>Prize</h5>
      </header>
    </section>
  </section>
</section>

<style>
  .book {
    width: 280px;
    box-shadow: 1px 1px 0 black;
    margin: 5px;
    background-color: #e4ddcf;
  }

  .book-top-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 3px solid #ffffff;
  }

  /* Book Layout */
  .bkcont {
    width: 100%;
    text-align: center;
  }

  .bkcover {
    width: 100px;
    height: 150px;
    margin-bottom: 5px;
    box-shadow: 0 0 3px gray;
  }

  div.language {
    font-size: 0.8em;
    margin: 5px 0;
  }

  figcaption {
    text-align: center;
    width: 90%;
    padding: 3px 10px;
    height: 36px;
    font-weight: bold;
  }

  /* Book Links Layout */

  .book-bottom-links {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .available-at {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /*   background-color: #fff; */
  }

  .available-at header {
    text-align: center;
  }
  .available-at header h5 {
    font-size: 0.95rem;
    margin: 15px 0;
    padding: 0 0.2rem;
  }

  .from-pariyatti {
    height: 200px;
  }
</style>
