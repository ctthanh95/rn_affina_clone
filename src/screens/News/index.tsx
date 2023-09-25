import React, {useEffect, useState} from 'react';
import {useAppDispatch} from '@hooks/redux';
import {getTopic} from '@sagas/news/getTopic';
import {getOutstandingNews} from '@sagas/news/getOutstandingNews';
import View from './view';

const News = () => {
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState<number>(10);
  const [dataTopic, setDataTopic] = useState([]);
  const [totalTopic, setTotalTopic] = useState(0);
  const [dataNews, setDataNews] = useState([]);
  const [totalNews, setTotalNews] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleSelectedTopic = (id: string) => {
    setSelectedTopic(id);
  };

  const handleGetOutstandingNews = () => {
    const options: any = {
      dataDelete: {
        order: 'createdAt',
        by: 'desc',
        from: 0,
        limit,
        filter: 'agencyNews.newsTopic',
        filterValue: selectedTopic,
      },
      callbackSuccess: (data: any) => {
        const {list, total} = data;
        setDataNews(list);
        setTotalNews(total);
      },
    };
    dispatch(getOutstandingNews(options));
  };

  useEffect(() => {
    const options: any = {
      dataDelete: {
        order: 'id',
        by: 'asc',
        from: 0,
        limit,
      },
      callbackSuccess: (data: any) => {
        const {list, total} = data;
        const id = list[0].id;
        setDataTopic(list);
        setTotalTopic(total);
        setSelectedTopic(id);
      },
    };
    dispatch(getTopic(options));
  }, []);

  useEffect(() => {
    if (selectedTopic) handleGetOutstandingNews();
  }, [selectedTopic]);

  return (
    <View
      dataTopic={dataTopic}
      onSelectedTopic={handleSelectedTopic}
      dataNews={dataNews}
    />
  );
};

export default News;
