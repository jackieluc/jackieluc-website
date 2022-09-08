import useSWR from 'swr';
import { FC, useEffect, useState } from 'react';

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

  return <>{`${views > -1 ? views.toLocaleString() : '---'} views`}</>;
};

export default PageViews;
