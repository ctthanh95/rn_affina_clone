import React from 'react';
import WebView from 'react-native-webview';
import {Container, AuthInfomation, AppView, Loading} from '@components';
import {WHITE} from '@utils/colors';

type Props = {};

const html = `
   <!DOCTYPE html>
<html>
<head>
</head>
<body>
<script src="https://worldchatbox.worldfone.vn/assets/js/widget.js"></script>
<script>
  window.oscWidget.init({token: '6375a1abdb28b2190030366d'});
  const myTimeout = setTimeout(function() {
      if (window.oscWidget.isOpen() != true) {
            window.oscWidget.open();
        }
    }, 200);
</script>
</body>
</html>`;

const View = (props: Props) => {
  return (
    <Container>
      <AuthInfomation />
      <AppView flex backgroundColor={WHITE}>
        <WebView
          originWhitelist={['*']}
          source={{html, baseUrl: 'https://omnisales.worldfone.vn'}}
          startInLoadingState={true}
          renderLoading={() => <Loading />}
        />
      </AppView>
    </Container>
  );
};

export default View;
