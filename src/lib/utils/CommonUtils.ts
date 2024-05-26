import type { ToastSettings } from "@skeletonlabs/skeleton";
import { get, writable } from "svelte/store";

export function getFieldValue(thisPointer: any, id: string) {
  return thisPointer?.querySelector(`#${id}`)?.value;
}

export function getFieldHtmlContent(thisPointer: any, id: string) {
  return thisPointer.querySelector(`#${id}`)?.innerText;
}

export function ensureRequiredField(wrapper: any, id: string) {
  const val = getFieldValue(wrapper, id);
  if (!val) {
    setError(id, "Không cho phép bỏ trống")
  } else {
    removeError(id);
  }
  return val;
}

const $_errors = writable({});

export function setError(id: string, errorHint: string) {
  let errors = get($_errors);
  errors[id] = errorHint;
  $_errors.set(errors)
}

export function getError(id: string): string | undefined {
  return get($_errors)[id];
}

export function getErrors() {
  return get($_errors);
}

export function removeError(id) {
  let errors = get($_errors);
  delete errors[id];
  $_errors.set(errors);
}

export function clearErrors() {
  $_errors.set({});
}

export function hasError() {
  return Object.keys(get($_errors)).length > 0;
}

/**
 *
 * @param obj
 * @returns
 */
export function preparePayload(obj: object) {
  let payload: any = {}

  Object.entries(obj).forEach((entry, index) => {
    const fieldName = entry[0].replace("form_", "");
    payload[fieldName] = entry[1];
  })

  return payload;
}

export function triggerSuccessToast(toastStore: any, message: string, timeout: number = 5000) {
  toastStore.trigger({
    message,
    timeout,
    background: 'variant-ghost-success'
  });
}

export function triggerInfoToast(toastStore: any, message: string, timeout: number = 5000) {
  toastStore.trigger({
    message,
    timeout,
    background: 'variant-ghost-primary'
  });
}

export function triggerErrorToast(toastStore: any, message: string, timeout: number = 5000) {
  toastStore.trigger({
    message: `<p><i class="mr-2 bi bi-x-circle-fill text-red-400 text-xl"></i>${message}</p>`,
    timeout,
    background: 'variant-ghost-error'
  });
}

