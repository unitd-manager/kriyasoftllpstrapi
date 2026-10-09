export function getImageUrl(
  url: string | null | undefined,
  cmsUrl: string
): string {
  const imageUrl = url?.trim();
  if (!imageUrl) return '';

  if (/^[a-z][a-z\d+.-]*:/i.test(imageUrl) || imageUrl.startsWith('//')) {
    return imageUrl;
  }

  const baseUrl = cmsUrl.replace(/\/+$/, '');
  const relativePath = imageUrl.replace(/^\/+/, '');

  return baseUrl ? `${baseUrl}/${relativePath}` : `/${relativePath}`;
}
