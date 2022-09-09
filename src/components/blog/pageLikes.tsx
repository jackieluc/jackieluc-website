import useSWR from 'swr';
import { FC, useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

interface PageLikesProps {
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

const PageLikes: FC<PageLikesProps> = ({ slug }) => {
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

  return (
    <div className='flex flex-col items-center'>
      <button
        className='[&>svg]:inline w-30 bg-secondary rounded-full border py-3 px-6 text-white'
        onClick={() => {
          mutate(updateLikes(slug));
          setLikes(likes + 1);
        }}
      >
        <FaHeart /> &nbsp; {likes.toLocaleString()} likes
      </button>
    </div>
  );
};

export default PageLikes;
