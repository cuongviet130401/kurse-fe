<script>
  import { scale } from "svelte/transition";
  import { expoInOut } from "svelte/easing";
  export let title;
  export let image;
  //export let language;
  export let courseBundle;
  //export let pdfLink;
  //export let appleLink;
  //export let googleLink;
  //export let amazonLink;
</script>

<section class="book" transition:scale={{ duration: 1000, easing: expoInOut }}>
  <section class="book-top-info">
    <figure class="bkcont">
      <img src={image} alt={title} class="bkcover" />
      <!--<div class="language">({language})</div>-->
      <figcaption>{title}</figcaption>
    </figure>
  </section>

  <section class="book-bottom-links">
    <section class="from-pariyatti available-at">
      <header>
        <h5>Content</h5>
      </header>
      <div class="buy-options-cont">
        <a href={courseBundle}
          ><button class="p-book-btn multi-btn">Button</button></a
        >
      </div>
      <div class="buy-options-cont">
        <!--<a href={pdfLink}><button class="p-book-btn pdf-btn">Free PDF Download</button></a>-->
      </div>
    </section>
    <section class="other-vendors available-at">
      <header>
        <h5>Content</h5>
      </header>
      <!--<div class="buy-options-cont">
				<a href={appleLink}><img class="itunes vender-logo" src="https://store.pariyatti.org/assets/images/IBooks_logo.png" alt="itunes logo" /></a>
			</div>
			<div class="buy-options-cont">
				<a href={googleLink}><img class="googleplay vender-logo" src="https://store.pariyatti.org/assets/images/google_play_logo.png" alt="google logo" /></a>
			</div>
			<div class="buy-options-cont">
				<a href={amazonLink}><img class="amazon vender-logo" src="https://store.pariyatti.org/assets/images/Amazon_Kindle_logo.png" alt="amazon logo" /></a>
			</div>-->
    </section>
  </section>
</section>
