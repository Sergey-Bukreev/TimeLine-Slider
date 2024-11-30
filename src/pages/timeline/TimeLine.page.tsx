import React, { useEffect, useState } from 'react';
import { TimelineData } from '@/db/db.types';
import jsonData from '@/db/data.json';
import { Timeline } from '@/component/TimeLine';

export const TimeLinePage = () => {
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const [data, setData] = useState<TimelineData | null>(null);

  const getData = async () => {
    await delay(500);
    return jsonData;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setData(data as TimelineData);
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Timeline periods={data} />
    </div>
  );
};
