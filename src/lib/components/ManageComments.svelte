<script lang="ts">
  //   import { Section, Comment, CommentItem } from "flowbite-svelte-blocks";
  import { Avatar, Ratings } from "@skeletonlabs/skeleton";
  import { authenticatedUser } from "$lib/configs/auth";
  import { get } from "svelte/store";
  import { onMount } from "svelte";
  import { _retrieveCustomerReviews } from "../../routes/comments/+page";
  import { provokePost } from "$lib/utils/ServiceApiConnector";

  const authUser = get(authenticatedUser);

  let customerReviews: any[] = [];
  let numberOfReviews: number = 0;
  let averageRating: number = 0;

  onMount(async () => {
    customerReviews = await _retrieveCustomerReviews(
      authUser?.employeeShowroomDto?.showroomId
    );

    numberOfReviews = customerReviews.length;
    averageRating =
      customerReviews.reduce((acc, review) => acc + review.reviewRating, 0) /
      numberOfReviews;
  });

  function toggleDisplayReplyBox(reviewId: number) {
    const element: Element | null = document.querySelector(
      "#reply-form-" + reviewId
    );
    element.style.display =
      element?.style?.display === "none" ? "block" : "none";
  }

  async function replyReview(reviewId: number) {
    const element: Element | null = document.querySelector(
      "#reply-input-" + reviewId
    );
    const replyContent: string = element?.value;

    console.log(authUser);

    const preparedPayload: object = {
      criteria: {
        commentatorId: authUser?.employeeShowroomDto.id,
        commentatorName: authUser?.showroomDetails.name ?? "",
        commentatorType: "SHOWROOM",
        avatarUrl: authUser?.showroomDetails.showroomImageDtos[0].url,
        commentContent: replyContent,
        commentDate: Date.now() + "",
        customerReviewsId: reviewId,
      },
    };

    const r = await provokePost("comment-reviews", preparedPayload);
    console.log(r);
    window.location.reload();
  }
</script>

<div class="w-full">
  <div class="p-4">
    Cửa hàng đã nhận được <strong>{numberOfReviews}</strong> với số lượt đánh
    giá trung bình là <strong>{averageRating.toFixed(1)}</strong>/5
  </div>
  <div class="w-full flex flex-wrap max-w-full">
    {#each customerReviews as review}
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="rounded shadow p-2 m-4 w-full min-w-full"
        on:dblclick={() => toggleDisplayReplyBox(review.id)}
      >
        <!-- * customer review -->
        <div class="flex flex-row justify-between">
          <!-- * Comment avatar -->
          <div class="mr-4">
            <Avatar
              src={review.customerDto.avatarUrl}
              width="w-32"
              rounded="rounded-full"
            />
          </div>

          <!-- * Content -->
          <div class="w-full shrink">
            <div>
              <span class="font-bold mr-2">{review.customerDto.fullName}</span>
              <span
                ><small
                  >{new Date(
                    Number.parseInt(review.reviewDate)
                  ).toLocaleDateString()}</small
                ></span
              >
            </div>
            <p>{review.reviewContent}</p>
          </div>

          <!-- * rating -->
          <div class="float-right">
            <Ratings max={5} rating={review.reviewRating}
              ><svelte:fragment slot="empty"
                ><i class="bi bi-star"></i></svelte:fragment
              >
              <svelte:fragment slot="half"
                ><i class="bi bi-star-half"></i></svelte:fragment
              >
              <svelte:fragment slot="full"
                ><i class="bi bi-star-fill"></i></svelte:fragment
              >
            </Ratings>
          </div>
        </div>
        {#if review.commentReviewsDtos.length > 0}
          <hr class="my-2" />
        {/if}
        <!-- * showroom replies -->
        <div class="ml-12">
          {#each review.commentReviewsDtos as reply}
            <div class="flex flex-row justify-between">
              <!-- * Content -->
              <div class="w-full shrink mb-2">
                <div>
                  <span class="font-bold mr-2">{reply.commentatorName}</span>
                  <span
                    ><small
                      >{new Date(
                        Number.parseInt(reply.commentDate)
                      ).toLocaleDateString()}</small
                    ></span
                  >
                </div>
                <p>{reply.commentContent}</p>
              </div>
            </div>
          {/each}

          <div
            id="reply-form-{review.id}"
            class="hidden border mt-2 p-4 text-black bg-orange-50"
          >
            <div class="flex flex-row">
              <!-- <ButtonGroup class="w-full">
                <Input
                  id="reply-input-{review.id}"
                  type="text"
                  placeholder="Trả lời review của khách hàng dưới vai trò là showroom"
                />
                <Button color="primary" on:click={() => replyReview(review.id)}
                  ><span class="no-wrap whitespace-nowrap">Trả lời</span
                  ></Button
                >
              </ButtonGroup> -->
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
