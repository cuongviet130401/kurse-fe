<script lang="ts">
  import CourseDetails from "$lib/components/CourseDetails.svelte";
  import { testData } from "$lib/configs/testData.js";
  import BitbleAppBar from "$lib/components/BitbleAppBar.svelte";

  export let data;

  console.log(data);
</script>

<BitbleAppBar />
<div
  style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2% 0; margin-top: 100px;"
>
  <CourseDetails course={testData} />
</div>
