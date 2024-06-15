<script>
  import BitbleMagazineAppBar from "$lib/components/modules/bitble-maganize/BitbleMagazineAppBar.svelte";
	import "$lib/bitble-magazine.css";
  import { blur } from "svelte/transition";
  import { sineInOut } from "svelte/easing";

</script>

<BitbleMagazineAppBar/>

<div class="overflow-hidden max-h-screen" transition:blur={{ easing: sineInOut }}>
	<slot/>
</div>


