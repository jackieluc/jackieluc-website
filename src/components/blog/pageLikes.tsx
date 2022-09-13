import useSWR from 'swr';
import { FC } from 'react';

interface PageLikesProps {
  slug: string;
}

const fetcher = async (input: RequestInfo) => {
  const res: Response = await fetch(input);
  return await res.json();
};

const PageLikes: FC<PageLikesProps> = ({ slug }) => {
  const { data } = useSWR(`/api/likes/${slug}`, fetcher);
  const likes = Number(data?.likes);

  const formattedLikes = new Intl.NumberFormat('en', { notation: 'compact' }).format(likes);

  return <p>{`${likes > -1 ? formattedLikes.toLocaleString() : '---'} likes`}</p>;
};

export default PageLikes;
