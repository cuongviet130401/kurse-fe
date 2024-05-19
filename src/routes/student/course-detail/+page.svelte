<script lang="ts">
  import { Ratings } from "@skeletonlabs/skeleton";

  let value = {
    current: 0,
    max: 5,
  };

  export let params;
  let course = {
    title: "Thành Thạo Xử Lý Dữ Liệu Với Python 2024",
    description:
      "Thành thạo Xử Lý Dữ Liệu Lớn (Big Data) với Python, Pandas, Matplotlib, Seaborn, Numpy, Machine Learning, Sklearn,...",
    rating: 0,
    reviews: 0,
    students: 0,
    updated: "05/2024",
    language: "Vietnamese",
    instructor: {
      name: "Lecturer Name",
      image: "/path/to/instructor-image.jpg",
    },
    price: "899.000",
    features: [
      "18 giờ video theo yêu cầu",
      "2 bài viết",
      "2 tài nguyên có thể tải xuống",
      "Truy cập trên thiết bị di động và TV",
      "Quyền truy cập đầy đủ suốt đời",
      "Giấy chứng nhận hoàn thành",
    ],
    curriculum: [
      {
        section: "Giới thiệu về Python",
        lectures: 0,
        duration: "0 giờ 0 phút",
      },
      // Add more sections here
    ],
  };

  function iconClick(event: CustomEvent<{ index: number }>): void {
    value.current = event.detail.index;
  }
</script>

<div class="course-page">
  <header class="course-header">
    <div class="container mx-auto flex flex-col md:flex-row items-center py-4">
      <div class="flex-1">
        <h1 class="text-4xl font-bold">{course.title}</h1>
        <p class="text-gray-500 mt-2">{course.description}</p>

        <Ratings
          class="ratings-container mt-4"
          bind:value={value.current}
          max={value.max}
          interactive
          on:icon={iconClick}
        >
          <svelte:fragment slot="empty"
            ><i class="bi bi-star"></i></svelte:fragment
          >
          <svelte:fragment slot="half"
            ><i class="bi bi-star-half"></i></svelte:fragment
          >
          <svelte:fragment slot="full"
            ><i class="bi bi-star-fill"></i></svelte:fragment
          >
        </Ratings>

        <div class="flex items-center mt-4">
          <span class="text-yellow-500 text-lg font-bold">{course.rating}</span>
          <span class="text-gray-500 ml-2">({course.reviews} xếp hạng)</span>
          <span class="text-gray-500 ml-4">{course.students} học viên</span>
        </div>
        <div class="flex items-center mt-2">
          <span class="text-gray-500">Được tạo bởi</span>
          <span class="text-blue-600 ml-2">{course.instructor.name}</span>
        </div>
        <div class="flex items-center mt-2">
          <span class="text-gray-500">Lần cập nhật gần đây nhất</span>
          <span class="text-blue-600 ml-2">{course.updated}</span>
        </div>
        <div class="flex items-center mt-2">
          <span class="text-gray-500">Ngôn ngữ</span>
          <span class="text-blue-600 ml-2">{course.language}</span>
        </div>
      </div>
      <div class="w-full md:w-1/3 mt-6 md:mt-0">
        <img
          src="/src/lib/images/python-test.jpeg"
          alt="Course Image"
          class="rounded-lg shadow-lg"
        />
      </div>
    </div>
  </header>

  <main class="container mx-auto py-6 mt-4">
    <section class="flex flex-col md:flex-row">
      <div class="flex-1 pr-0 md:pr-8">
        <h2 class="text-2xl font-bold mb-4">Nội dung bài học</h2>
        <ul class="list-disc pl-6 text-white">
          {#each course.curriculum as item}
            <li class="mb-2">
              <span class="font-bold">{item.section}</span>: {item.lectures} bài
              giảng • {item.duration}
            </li>
          {/each}
        </ul>
      </div>
      <div class="w-full md:w-1/3 mt-8 md:mt-0">
        <div class="p-6 shadow-lg rounded-lg">
          <h3 class="text-2xl font-bold mb-4">₫{course.price}</h3>
          <button class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
            >Thêm vào giỏ hàng</button
          >
          <button class="bg-white text-black py-2 px-4 rounded-lg w-full mt-2"
            >Mua ngay</button
          >
          <ul class="list-disc pl-6 text-white mt-4">
            {#each course.features as feature}
              <li>{feature}</li>
            {/each}
          </ul>
        </div>
      </div>
    </section>
  </main>
</div>

<style>
  .course-page {
    font-family: "Helvetica Neue", Arial, sans-serif;
  }
  .course-header {
    background-color: #1a202c;
    color: #ffffff;
    padding: 20px;
  }
  .ratings-container {
    display: flex;
    align-items: center;
    justify-content: flex-start; /* Align to the left */
  }
</style>
