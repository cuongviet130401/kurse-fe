<!-- src/routes/comments/Index.svelte -->

<script lang="ts">
  import { testData } from "$lib/configs/testData";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";

  let newComment = "";
  let studentName = "";

  function addComment() {
    // Append new comment to description with studentname
    testData.description += `${testData.description ? "\n" : ""}${studentName} ${newComment}`;
    newComment = "";

    resizeTextarea();
  }

  // Function to resize the textarea based on its content
  function resizeTextarea() {
    const textarea = document.getElementById("commentTextarea");
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to auto to shrink back if needed
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
    }
  }

  // Resize textarea initially and on input change
  onMount(() => {
    resizeTextarea();
  });
</script>

<h1 class="text-xl">Comments</h1>

<!-- Form to add new comment -->
<form class="w-full" on:submit|preventDefault={addComment}>
  <textarea
    id="commentTextarea"
    class="custom-textarea w-full rounded-md"
    bind:value={newComment}
    placeholder="Add a comment"
    on:input={resizeTextarea}
  ></textarea>
  <button
    type="submit"
    class="btn variant-filled bg-gradient-to-br variant-gradient-primary-secondary text-white"
    >Post Comment</button
  >
</form>
<!-- Display existing comments -->
{#if testData.description}
  <ul>
    {#each testData.description.split("\n") as comment, index}
      <li key={index}>
        <div class="grid grid-cols gap-2 mt-6">
          <Avatar src={testData.avatarUrl} width="w-12" />
          <div class="card p-4 variant-soft rounded-tl-none space-y-2">
            <header class="flex justify-between items-center">
              <p class="font-bold">{testData.studentname}</p>
            </header>
            <p>{comment}</p>
          </div>
        </div>
      </li>
    {/each}
  </ul>
{:else}
  <p class="mt-4">No comments yet.</p>
{/if}

<style>
  .custom-textarea::placeholder {
    border-radius: 0;
  }
  textarea {
    color: black;
    resize: none;
    overflow-y: hidden;
    min-height: 50px;
    transition: height 0.2s ease;
    width: full;
  }
</style>
