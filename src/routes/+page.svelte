<script>
	import BitbleAppBar from '../lib/components/BitbleAppBar.svelte';
  import imgUrl from "$lib/images/1.png";

</script>

<BitbleAppBar/>

<section id="hero" class="flex flex-row justify-center items-center p-8 m-8 h-screen" >
  <!-- TODO: animate the text and images -->

  <div id="hero-underlay" class="" style={`background-image: url(${imgUrl});`} />

  <div class="z-20 flex flex-row justify-center items-center p-8 m-8 w-full h-full">
    <div class="hero-title">
      <h1>We are here as <br> we love <span class="text-blue-500 font-black">Sharing</span> </h1>
      <p class="semi-title">
      </p>
    </div>

    <div style="margin-left: 200px;" >
      <img src="{imgUrl}" alt="img" width=500 height=500>
    </div>
  </div>

</section>


<section class="z-20">
  <!-- TODO: we treat teaching and techs are forms of art -->


</section>

<section>
  <!-- TODO: featured courses -->


</section>

<section>
  <!-- TODO: principles of teaching -->


</section>

<section>
  <!-- TODO: testimonials -->


</section>

<section>
  <!-- TODO: search a course now -->


</section>

<style>

  section {
    width: 100vw;
  }

  section#hero {
    position: relative;
  }

  div#hero-underlay {
    position: absolute;
    right: -10%;
    width: 66%;
    height: 100%;
    background-position: right;
    background-repeat: no-repeat;
    background-attachment: local;
    background-size: 100vh;
    filter: sepia(1) hue-rotate(150deg) blur(10px) brightness(0.6);
    z-index: 0;
    transform: rotate(30deg);
  }

  div.hero-title > h1 {
    font-size: 60px;
    font-weight: 100;
    line-height: 1.5em;
  }

</style>
