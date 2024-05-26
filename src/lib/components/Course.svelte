<script>
  import { scale } from "svelte/transition";
  import { expoInOut } from "svelte/easing";
  import Rating from "$lib/components/Rating.svelte"

  export let title;
  export let image;
  export let language;
  export let price;
  export let description;
  //export let url; // URL to navigate to
</script>

<div  class="book">
  <section
    class="book"
    transition:scale={{ duration: 1000, easing: expoInOut }}
  >
    <section class="book-top">
        <img src={image} class="bkcont" />
        <h5>{title}</h5>
    </section>

    <section class="book-bottom">
      <section class="from-pariyatti available-at">
        <Rating></Rating>
        <header>
          <h5>{price}</h5>
        </header>
      </section>
    </section>
  </section>
</div>

<style>
  .book {
    width: 280px;
    margin: 15px;
    ;
  }

  .book-top {
    width: 100%;
    display: block;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  /* Book Top Layout */
  .bkcont {
    width: 400px; /* Chiều rộng cố định cho ảnh */
    height: 180px; /* Chiều cao cố định cho ảnh */
    object-fit: cover; /* Điều chỉnh ảnh để lấp đầy khung mà không bị méo */
    margin-bottom:15px;
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

  /* Book Bot Layout */

  .book-bottom {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: left;
  }

  .available-at {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /*   background-color: #fff; */
  }

  .available-at header {
    text-align: left;
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
