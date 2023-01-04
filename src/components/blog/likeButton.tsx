import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

import type { FC } from 'react';

interface LikeButtonProps {
  slug: string;
}

const fetcher = async (input: RequestInfo) => {
  const res: Response = await fetch(input);
  return await res.json();
};

const updateLikes = async (slug: string) => {
  await fetch(`/api/likes/${slug}`, {
    method: 'POST',
  });
};

const LikeButton: FC<LikeButtonProps> = ({ slug }) => {
  const [likes, setLikes] = useState(-1);
  const { data, mutate } = useSWR(`/api/likes/${slug}`, fetcher);

  useEffect(() => {
    if (data) {
      setLikes(data.likes);
    }
  }, [data]);

  if (likes === -1) {
    return null;
  }

  const formattedLikes = new Intl.NumberFormat('en', { notation: 'compact' }).format(likes);

  return (
    <div className='flex flex-col items-center'>
      <button
        className='[&>svg]:inline w-30 bg-secondary rounded-full border py-3 px-6 text-white'
        onClick={() => {
          mutate(updateLikes(slug));
          setLikes(likes + 1);
        }}
      >
        <FaHeart /> &nbsp; {formattedLikes.toLocaleString()} likes
      </button>
    </div>
  );
};

export default LikeButton;
