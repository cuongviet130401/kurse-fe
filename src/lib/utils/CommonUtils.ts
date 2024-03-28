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