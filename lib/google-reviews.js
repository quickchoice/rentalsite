const PLACES_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

export async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId || apiKey === 'YOUR_API_KEY_HERE' || placeId === 'YOUR_PLACE_ID_HERE') {
    return null;
  }

  const url =
    `${PLACES_URL}?place_id=${encodeURIComponent(placeId)}` +
    `&fields=name,rating,user_ratings_total,reviews,url` +
    `&reviews_sort=newest` +
    `&key=${apiKey}`;

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;

    const data = await res.json();
    if (data.status !== 'OK' || !data.result) return null;

    const { result } = data;
    return {
      rating: result.rating,
      userRatingsTotal: result.user_ratings_total,
      placeUrl: result.url || `https://www.google.com/maps/place/?q=place_id:${placeId}`,
      reviews: (result.reviews || []).slice(0, 5).map(r => ({
        authorName: r.author_name,
        authorUrl: r.author_url,
        profilePhotoUrl: r.profile_photo_url,
        rating: r.rating,
        text: r.text,
        relativeTimeDescription: r.relative_time_description
      }))
    };
  } catch {
    return null;
  }
}
