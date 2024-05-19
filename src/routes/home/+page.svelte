<script>
  import Course from "../../lib/components/Course.svelte";
  import CourseCarousel from "../../lib/components/CourseCarousel.svelte";
  // Sample data for carousel
  import Carousel from "../../lib/components/Carousel.svelte";

  const carouselItems = [
    { id: 1, image: "/src/lib/images/home1.jpeg", caption: "Caption 1" },
    { id: 2, image: "/src/lib/images/home2.jpeg", caption: "Caption 2" },
    { id: 3, image: "/src/lib/images/home3.jpeg", caption: "Caption 3" },
  ];

  // Sample data for courses
  import { bookData } from "../../lib/configs/bookData";

  // Filter the first 3 courses for the carousel
  const courses = bookData.slice(0, 3);
</script>

<div class="container">
  <!-- Div lớn chứa carousel -->
  <div class="carousel-container">
    <Carousel {carouselItems} />
  </div>

  <!-- 3 div nhỏ xếp từ trên xuống -->
  <div class="small-divs">
    <div class="content1">
      <h1>Tuyển tập khóa học rộng lớn</h1>

      <p>
        Lựa chọn trong số hơn 210000 khóa học video online với nhiều nội dung bổ
        sung mới được xuất bản hàng tháng
      </p>
    </div>
    <div class="small-div">
      <Course url="/student/course-detail" />
      <div class="carousel-container">
        <CourseCarousel {courses} />
      </div>
    </div>
    <div class="small-div">Content 2</div>
  </div>
</div>

<style>
  .container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 20px;
  }

  .carousel-container {
    margin-bottom: 50px;
  }

  .small-divs {
    display: flex;
    flex-direction: column;
    margin-left: 90px;
  }

  .small-div {
    padding: 20px;
    border: 0px solid #ccc;
    margin-bottom: 50px;
  }
  .content1 {
    display: flex;
    flex-direction: column;
    font-size: 25px;
    margin-bottom: 50px;
    margin-left: 90px;
  }
  .content1 h1 {
    margin-bottom: 50px; /* Khoảng cách dưới của thẻ h1 */
  }
</style>
