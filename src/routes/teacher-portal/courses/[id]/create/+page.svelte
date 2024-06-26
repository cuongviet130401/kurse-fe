<script lang="ts">
  import ActionButton from "$lib/components/ActionButton.svelte";
  import ActionInput from "$lib/components/ActionInput.svelte";
  import { provokePost } from "$lib/utils/ServiceApiConnector";
  import {
    preparePayload,
    triggerErrorToast,
    triggerSuccessToast,
  } from "$lib/utils/CommonUtils";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { goto } from "$app/navigation";
  import { FileButton } from "@skeletonlabs/skeleton";
  import { storage } from "$lib/configs/firebase";
  import { onMount } from "svelte";

  let selectedFile: File | null = null;

  const toastStore = getToastStore();

  let form_title: string;
  let form_createAt: string;
  let form_introductoryVideoUrl: string;
  let form_price: number;
  let form_description: string;
  let form_thumbnailUrl: string;

  let errors: any = {};

  async function handleCreateCourse() {
    const preparedPayload = preparePayload({
      form_title,
      form_createAt,
      form_introductoryVideoUrl,
      form_price,
      form_description,
      form_thumbnailUrl,
    });

    return await provokePost(
      "/kurse/api/v1/courses/COURSE_ID/units",
      preparedPayload
    );
  }

  // Hàm xử lý khi người dùng tải lên video
  async function handleUpload() {
    if (!selectedFile) return;

    const storageRef = storage.ref();
    const fileRef = storageRef.child(selectedFile.name);

    try {
      const snapshot = await fileRef.put(selectedFile);
      console.log("Upload successful!", snapshot);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  function handleError(err: any) {
    if (err.httpStatus === 404) {
      triggerErrorToast(
        toastStore,
        err.message + " : " + JSON.stringify(err.description)
      );
      return;
    }

    if (err.httpStatus === 400) {
      Object.keys(err.description).forEach((fieldName) => {
        console.log(fieldName);
        errors[fieldName] = err.description[fieldName];
      });
    }
  }

  function onSuccess(result: any) {
    console.log("triggered onSuccess()");
    if (result) {
      triggerSuccessToast(
        toastStore,
        "🎉 Your New Course has been added successfully."
      );
      goto("/teacher-portal/courses");
    }
  }

  function handleClick() {
    const id = "00";
    goto(`/courses/${id}/create/unit`);
  }

  // Hàm xử lý khi người dùng chọn file
  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      selectedFile = target.files[0];
    }
  }
</script>

<div
  style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2% 0; margin-top: 100px;"
>
  <div class="card p-4 shadow-lg" style="width: 1000px">
    <header class="p-4">
      <div class="flex flex-col gap-4">
        <div
          class="placeholder animate-pulse rounded-md flex justify-center h-72 w-1/2"
        ></div>
        <div>
          <input type="file" accept="video/*" on:change={handleFileChange} />
          <button type="button" on:click={handleUpload}>Upload Video</button>
        </div>
        <ActionInput
          class="bg-transparent"
          name="title"
          bind:value={form_title}
          {errors}
          label="Title"
          placeholder="Course Name"
          required={true}
        />
      </div>
    </header>
    <section class="p-4">
      <h>Description:</h>
      <textarea
        name="description"
        class="textarea mt-2 mb-2"
        rows="4"
        placeholder="Enter some info about course."
      />
      <div class="flex gap-4 mb-4">
        <ActionInput
          name="price"
          bind:value={form_price}
          {errors}
          label="Price $:"
          placeholder="00.000.000 VND"
          required={true}
        />
      </div>
      <div class="flex gap-4 mb-2">
        <h class="content-center">Curriculum :</h>
      </div>
      <!-- <a href="/courses/[id]/create/unit"
        ><button type="button" class="btn variant-filled">Add</button></a
      > -->
      <ActionButton
        class=" btn variant-filled "
        label="Add"
        icon="bi bi-plus-lg"
        on:click={handleClick}
      />
    </section>
    <footer class="footer p-4">
      <ActionButton
        class=" btn bg-gradient-to-br variant-gradient-primary-secondary "
        icon="box-arrow-in-right"
        label="CREATE COURSE"
        onClick={handleCreateCourse}
        {onSuccess}
        onError={handleError}
      />
    </footer>
  </div>
</div>

<style>
  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .gap-4 {
    gap: 1rem;
  }

  .placeholder {
    background-color: #e0e0e0;
  }

  .animate-pulse {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .rounded-md {
    border-radius: 0.375rem;
  }

  .content-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text-lg {
    font-size: 1.125rem;
    font-weight: 700;
  }

  .h-72 {
    height: 18rem;
  }
</style>
