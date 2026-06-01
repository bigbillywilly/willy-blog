export function getPostImages(post) {
  if (!post) {
    return [];
  }

  if (post.imageUrls) {
    try {
      const parsed = JSON.parse(post.imageUrls);
      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean);
      }
    } catch {
      if (typeof post.imageUrls === "string" && post.imageUrls.trim()) {
        return [post.imageUrls];
      }
    }
  }

  if (post.imageUrl) {
    return [post.imageUrl];
  }

  return [];
}