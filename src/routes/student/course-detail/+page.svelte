<script >
  
  import Rating from "$lib/components/Rating.svelte"

  
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

</script>

<div class="course-page">
  <header class="course-header">
    <div class="container mx-auto flex flex-col md:flex-row items-center py-4">
      <div class="flex-1">
        <h1 class="text-4xl font-bold">{course.title}</h1>
        <p class="text-gray-500 mt-2">{course.description}</p>

        <Rating></Rating>

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
            >Add to Cart</button
          >
          <button class="bg-white text-black py-2 px-4 rounded-lg w-full mt-2"
            >Buy Now</button
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
  
</style>
