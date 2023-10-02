import React from 'react';
import {StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import {Container, Loading} from '@components';

type Props = {
  title: string;
  url: string;
};

const View = ({title, url}: Props) => {
  console.log(url);
  return (
    <Container title={title} isAuth>
      <WebView
        source={{uri: url}}
        style={styles.container}
        startInLoadingState={true}
        renderLoading={() => <Loading />}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default View;
