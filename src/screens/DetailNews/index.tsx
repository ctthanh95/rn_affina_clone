import React, {useEffect, useState} from 'react';
import View from './view';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch} from '@hooks/redux';
import {getNewsDetail} from '@sagas/news/getNewsDetail';
import {postCommentOnNews} from '@sagas/news/postCommentOnNews';

const DetailNews = () => {
  const routes = useRoute();
  const dispatch = useAppDispatch();
  const {newsId, newsName} = routes.params as any;
  const [data, setData] = useState({});
  const [listComment, setListComment] = useState([]);

  const hanleGetNewsDetail = () => {
    const options: any = {
      dataGet: {newsId},
      callbackSuccess: (data: any) => {
        setData(data);
        setListComment(data?.listComment || []);
      },
    };
    dispatch(getNewsDetail(options));
  };

  useEffect(() => {
    hanleGetNewsDetail();
  }, []);

  const handlePostComment = (text: string) => {
    if (text) {
      const content = text.trim().replace(/\s+/g, ' ');
      const options: any = {
        dataPost: {
          newsId,
          content,
        },
        callbackSuccess: () => {
          hanleGetNewsDetail();
        },
      };
      dispatch(postCommentOnNews(options));
    }
  };

  return (
    <View
      newsName={newsName}
      data={data}
      listComment={listComment}
      onPostComment={handlePostComment}
    />
  );
};

export default DetailNews;
