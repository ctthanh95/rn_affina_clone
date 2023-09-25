import React, {useState} from 'react';
import {Image, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import AppView from '../AppView';
import {PRIMARY} from '@utils/colors';
import {PLACEHOLDER} from '@utils/images';
import {useAppSelector} from '@hooks/redux';
import {selectHostStaticResource} from '@slices/configSlice';
import {getLink} from '@utils/global';

type Props = {
  uri?: string;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
  style?: object;
};

const AppImage = ({uri, style, ...props}: Props) => {
  const hostStaticResource = useAppSelector(selectHostStaticResource);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const onLoadStart = () => {
    setIsLoading(true);
  };
  const onLoadEnd = () => {
    setIsLoading(false);
  };
  const onError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  if (isError || !uri) {
    return <Image source={PLACEHOLDER} style={style} resizeMode="cover" />;
  }

  const link = getLink(hostStaticResource, uri);

  return (
    <FastImage
      source={{
        uri: link,
      }}
      style={style}
      onLoadStart={onLoadStart}
      onLoadEnd={onLoadEnd}
      onError={onError}
      {...props}>
      {isLoading ? (
        <AppView center style={style}>
          <ActivityIndicator size="small" color={PRIMARY} />
        </AppView>
      ) : null}
    </FastImage>
  );
};

export default AppImage;
