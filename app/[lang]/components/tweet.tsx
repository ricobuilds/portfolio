import { getTweet as _getTweet } from 'react-tweet/api';
import { unstable_cache } from 'next/cache'
import { Suspense } from 'react';
import {
  TweetSkeleton,
  EmbeddedTweet,
  TweetNotFound,
  type TweetProps,
} from 'react-tweet';

const getTweet = unstable_cache(
  async (id: string) => _getTweet(id),
  ['tweet'],
  { revalidate: 3600 * 24 }
)

const TweetContent = async ({ id, components, onError }: TweetProps) => {
  let error;
  const tweet = id
    ? await getTweet(id).catch((err) => {
      if (onError) {
        error = onError(err);
      } else {
        console.error(err);
        error = err;
      }
    })
    : undefined;

  if (!tweet) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound error={error} />;
  }

  return <EmbeddedTweet tweet={tweet} components={components} />;
};

export const ReactTweet = (props: TweetProps) => <TweetContent {...props} />;

export async function TweetComponent({ id }: { id: string }) {
  return (
    <div className="my-6 tweet">
      <div className={`flex justify-center`}>
        <Suspense fallback={<TweetSkeleton />}>
          <ReactTweet id={id} />
        </Suspense>
      </div>
    </div>
  );
}