import useSWR from 'swr';
import { FC } from 'react';

interface PageViewsProps {
  slug: string;
}

const fetcher = async (input: RequestInfo) => {
  const res: Response = await fetch(input);
  return await res.json();
};

const PageViews: FC<PageViewsProps> = ({ slug }) => {
  const { data } = useSWR(`/api/views/${slug}`, fetcher);
  const views = Number(data?.views);

  const formattedViews = new Intl.NumberFormat('en', { notation: 'compact' }).format(views);

  return <p>{`${views > -1 ? formattedViews.toLocaleString() : '---'} views`}</p>;
};

export default PageViews;
