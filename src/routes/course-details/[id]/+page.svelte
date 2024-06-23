<script lang="ts">
  // import CourseDetails from "$lib/components/CourseDetails.svelte";
  import { testData } from "$lib/configs/testData.js";
  import BitbleAppBar from "$lib/components/BitbleAppBar.svelte";
  import { page } from "$app/stores";
  import { RecursiveTreeView } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import CommentSection from "$lib/components/CommentSection.svelte";

  export let course = testData;

  export let data;

  $: openedUnit = $page.url.searchParams.get("open");
  $: moduleTreeClass = !!openedUnit ? "w-full" : "w-full";

  onMount(() => {
    console.log(course);
  });

  console.log(data);
</script>

<BitbleAppBar />
<div
  style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2% 0; margin-top: 100px;"
>
  {#if course}
    <div class="card p-4 shadow-lg course-page">
      <header class="course-header card-header">
        <div
          class="container mx-auto flex flex-col md:flex-row items-center py-4"
        >
          <div class="flex-1">
            <h1 class="text-4xl font-bold">{course.title}</h1>
            <p class="text-gray-500 mt-2">{course.subtitle}</p>

            <div class="flex items-center mt-4">
              <span class="text-yellow-500 text-lg font-bold"
                >{course.rating} Rates</span
              >
              <span class="text-gray-500 ml-2"
                >({course.numberOfLiked} likes)</span
              >
              <span class="text-gray-500 ml-4"
                >{course.numberOfEnrolled} students</span
              >
            </div>
            {#if course.instructor && course.instructor.name}
              <div class="flex items-center mt-2">
                <span class="text-gray-500">Created by</span>
                <span class="text-blue-600 ml-2">{course.instructor.name}</span>
              </div>
            {/if}
            <div class="flex items-center mt-2 mb-4">
              <span class="text-gray-500">Last updated</span>
              <span class="text-blue-600 ml-2">{course.createdAt}</span>
            </div>
            <div class="w-full md:w-1/3 mt-8 md:mt-0">
              <div class="p-6 shadow-lg rounded-lg">
                <h3 class="text-2xl font-bold mb-4">₫{course.price}</h3>

                <a
                  href="/payment"
                  class=" bg-blue-500 text-white py-2 px-4 rounded-lg w-full mt-2 btn bg-gradient-to-br variant-gradient-primary-secondary"
                >
                  Buy Now
                </a>

                <!-- <ul class="list-disc pl-6 text-white mt-4">
                {#each course.features as feature}
                  <li>{course.feature}</li>
                {/each}
              </ul> -->
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 mt-6 md:mt-0">
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              class="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </header>

      <section class="container mx-auto py-6 mt-4 mb-4">
        <section class="flex flex-col md:flex-row">
          <div class="flex-1 pr-0 md:pr-8">
            <h2 class="text-2xl font-bold mb-4">Course content</h2>
            <div id="module-tree-view" class="flex flex-row py-4 w-full gap-8">
              <section id="programme-tree" class={moduleTreeClass}>
                <RecursiveTreeView
                  nodes={data.data}
                  padding="p-0"
                  spacing="space-y-4"
                />
              </section>

              <!-- {#if !!openedUnit}
                <section
                  class="half-view-width variant-ghost-primary rounded sticky top-0"
                  style="min-height: 100%;"
                >
                  {#await data.courseDetailsPreviewFetcher(openedUnit)}
                    <div class="w-full space-y-4 m-4 p-4">
                      <div class="placeholder animate-pulse" />
                      <div class="placeholder animate-pulse" />
                      <div class="placeholder animate-pulse" />
                      <div class="placeholder animate-pulse" />
                    </div>
                  {:then value}
                    <div
                      class="card flex flex-col bg-transparent border-0 !ring-0 h-full p-0"
                    >
                      <header class="card-header grow-0 my-4 p-4">
                        <h2 class="h2">{value.id}</h2>
                      </header>
                      <section class="my-4 p-4 grow">
                        {openedUnit}
                      </section>
                      <hr class="my-2 border-primary-500" />
                      <footer
                        class="card-footer grow-0 flex flex-row-reverse px-4 my-2"
                      >
                        <a
                          href="programme/unit/{value.id}"
                          class="btn bg-gradient-to-br variant-gradient-tertiary-secondary !text-white"
                        >
                          Go to unit
                          <span class="ml-2"
                            ><i class="bi bi-chevron-right"></i></span
                          >
                        </a>
                      </footer>
                    </div>
                    <div></div>
                  {/await}
                </section>
              {/if} -->
            </div>

            <!-- <ul class="list-disc pl-6 text-white">
            {#each course.curriculum as item}
              <li class="mb-2">
                <span class="font-bold">{item.section}</span>: {item.lectures} bài
                giảng • {item.duration}
              </li>
            {/each}
          </ul> -->
          </div>
        </section>
      </section>

      <footer class="card-footer">
        <CommentSection />
      </footer>
    </div>
  {:else}
    <p>Course not found</p>
  {/if}
</div>

<style>
  div#module-tree-view {
    overflow: hidden;
    overflow-y: scroll;
    min-height: 85vh;
    max-height: 85vh;
  }

  .half-view-width {
    width: 50%;
    max-width: 50%;
  }
</style>
