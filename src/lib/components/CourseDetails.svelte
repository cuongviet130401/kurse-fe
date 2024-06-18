<script lang="ts">
  import { onMount } from "svelte";
  import Page from "../../routes/+page.svelte";

  export let course;

  onMount(() => {
    console.log(course);
  });
</script>

{#if course}
  <div class="course-page">
    <header class="course-header border-current">
      <div
        class="container mx-auto flex flex-col md:flex-row items-center py-4"
      >
        <div class="flex-1">
          <h1 class="text-4xl font-bold">{course.title}</h1>
          <p class="text-gray-500 mt-2">{course.subtitle}</p>

          <div class="flex items-center mt-4">
            <span class="text-yellow-500 text-lg font-bold"
              >{course.rating}</span
            >
            <span class="text-gray-500 ml-2">({course.reviews} xếp hạng)</span>
            <span class="text-gray-500 ml-4"
              >{course.numberOfEnrolled} học viên</span
            >
          </div>
          {#if course.instructor && course.instructor.name}
            <div class="flex items-center mt-2">
              <span class="text-gray-500">Được tạo bởi</span>
              <span class="text-blue-600 ml-2">{course.instructor.name}</span>
            </div>
          {/if}
          <div class="flex items-center mt-2">
            <span class="text-gray-500">Lần cập nhật gần đây nhất</span>
            <span class="text-blue-600 ml-2">{course.lastUpdatedAt}</span>
          </div>
          <div class="flex items-center mt-2">
            <span class="text-gray-500">Ngôn ngữ</span>
            <span class="text-blue-600 ml-2">{course.language}</span>
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

    <main class="container mx-auto py-6 mt-4">
      <section class="flex flex-col md:flex-row">
        <div class="flex-1 pr-0 md:pr-8">
          <h2 class="text-2xl font-bold mb-4">Nội dung bài học</h2>
          <!-- <ul class="list-disc pl-6 text-white">
            {#each course.curriculum as item}
              <li class="mb-2">
                <span class="font-bold">{item.section}</span>: {item.lectures} bài
                giảng • {item.duration}
              </li>
            {/each}
          </ul> -->
        </div>
        <div class="w-full md:w-1/3 mt-8 md:mt-0">
          <div class="p-6 shadow-lg rounded-lg">
            <h3 class="text-2xl font-bold mb-4">₫{course.price}</h3>

            <button
              class="bg-white text-black py-2 px-4 rounded-lg w-full mt-2"
            >
              Buy Now
            </button>
            <!-- <ul class="list-disc pl-6 text-white mt-4">
              {#each course.features as feature}
                <li>{course.feature}</li>
              {/each}
            </ul> -->
          </div>
        </div>
      </section>
    </main>
  </div>
{:else}
  <p>Course not found</p>
{/if}

<style>
  .course-page {
    font-family: "Helvetica Neue", Arial, sans-serif;
  }
  .course-header {
    /* background-color: ;  */
    color: #ffffff;
    padding: 20px;
  }
</style>
