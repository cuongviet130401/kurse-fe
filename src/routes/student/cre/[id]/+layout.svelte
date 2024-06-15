<script lang="ts">
  import KurseCreSidebar from "$lib/components/modules/kurse/KurseCreSidebar.svelte";
</script>

<div class="fixed" style="">
	<KurseCreSidebar/>
</div>

<div style="min-height: 100vh; margin-left: 5rem !important">
	<div class="w-full p-4 overflow-x-hidden" style="">
		<slot/>
	</div>
</div>

