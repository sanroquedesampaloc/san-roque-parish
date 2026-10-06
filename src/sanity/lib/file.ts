export function getFileUrl(ref: string): string {
  const match = ref.match(/^file-(.+)-(\w+)$/);
  if (!match) return "#";
  const [, id, ext] = match;
  return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${ext}`;
}
