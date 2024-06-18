import { error } from "@sveltejs/kit";
import { bookData } from "$lib/configs/bookData";

export function load({ params }) {
  const course = bookData.find((course) => course.id === params.id);

  if (!course) {
    throw error(404, "Course not found");
  }

  return {
    course,
  };
}
