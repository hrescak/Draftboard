/**
 * Simple module-level registry for passing File objects to UploadPlaceholderNodes.
 *
 * When a plugin initiates an upload, it:
 * 1. Generates an upload ID
 * 2. Registers the File here with an AbortController
 * 3. Inserts an UploadPlaceholderNode with that ID
 *
 * The placeholder component retrieves the File, performs the upload,
 * and cleans up the entry when done.
 */

interface PendingUploadEntry {
  file: File;
  abortController: AbortController;
}

const pendingUploads = new Map<string, PendingUploadEntry>();

let nextId = 0;

export function generateUploadId(): string {
  return `upload-${Date.now()}-${nextId++}`;
}

export function registerPendingUpload(id: string, file: File): AbortController {
  const abortController = new AbortController();
  pendingUploads.set(id, { file, abortController });
  return abortController;
}

export function getPendingUpload(id: string): PendingUploadEntry | undefined {
  return pendingUploads.get(id);
}

export function removePendingUpload(id: string): void {
  const entry = pendingUploads.get(id);
  if (entry && !entry.abortController.signal.aborted) {
    entry.abortController.abort();
  }
  pendingUploads.delete(id);
}

export function cancelPendingUpload(id: string): void {
  const entry = pendingUploads.get(id);
  if (entry) {
    entry.abortController.abort();
  }
  pendingUploads.delete(id);
}
