import type { PageLoad } from "../$types";
import { bookData } from "../../../lib/configs/bookData";

export const load: PageLoad = async ({ params }) => {
  const id = params.id;
  const course = bookData.find((course) => course.id === id);

  return {
    course,
  };
};
