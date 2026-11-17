// Mobile file preview sheet & workspace guard compatibility entry.
// Full v4.0 implementation lives in `./pocket/file-preview-sheet.ts`.
export {
  PREVIEW_TRUNCATE_BYTES,
  createPocketFileReader,
  looksLikeFilePath,
  startFileGuard,
  type FileGuardOptions,
  type ReadFileResponse,
} from './pocket/file-preview-sheet.ts'
