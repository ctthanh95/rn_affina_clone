import React, {useState} from 'react';
import {Platform, ScrollView, TouchableOpacity} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {
  AppImage,
  AppText,
  AppTextInput,
  AppView,
  Container,
  KeyboardSpacer,
} from '@components';
import {WIDTH, ms, width} from '@utils/responsive';
import {CONTENT} from '@utils/fontStyle';
import {BLACK, WHITE} from '@utils/colors';
import {formatTime} from '@utils/global';
import Comment from './components/Comment';
import {Send} from '@utils/svg';
import styles from './styles';

const tagsStyles = {
  p: {
    ...CONTENT.semibold_14,
    color: BLACK[100],
  },
};

type Props = {
  newsName: string;
  data: any;
  listComment: any;
  onPostComment: (text: string) => void;
};

const View = ({newsName, data, listComment, onPostComment}: Props) => {
  const {newsImage2, createdAt, newsContent} = data;
  const [text, setText] = useState('');
  const [isKeyboard, setIsKeyboard] = useState(false);
  const [heightKeyboard, setHeightKeyboard] = useState(0);

  const onPress = () => {
    onPostComment(text);
    setText('');
  };

  const isIos = Platform.OS === 'ios';

  const handleOnToggle = (keyboardState: any, keyboardSpace: any) => {
    setIsKeyboard(keyboardState);
    setHeightKeyboard(keyboardSpace);
  };

  return (
    <Container isAuth title={newsName}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppView flex marginTop={ms(12)}>
          <AppImage uri={newsImage2} style={styles.image} />
          <AppView padding={ms(23)}>
            <AppText
              style={CONTENT.bold_20}
              color={BLACK[100]}
              numberOfLines={2}>
              {newsName}
            </AppText>
            <AppText
              style={CONTENT.bold_14}
              color={BLACK[50]}
              numberOfLines={2}
              marginVertical={ms(23)}>
              {formatTime(createdAt, 'datetime')}
            </AppText>
            <RenderHtml
              contentWidth={WIDTH}
              source={{html: newsContent}}
              tagsStyles={tagsStyles}
            />
            <AppText
              style={CONTENT.bold_20}
              color={BLACK[100]}
              marginVertical={ms(12)}>
              {`Bình luận (${listComment.length})`}
            </AppText>
            <Comment data={listComment} />
          </AppView>
        </AppView>
      </ScrollView>
      <AppView
        padding={ms(23)}
        backgroundColor={WHITE}
        onLayout={event => {
          var {x, y, width, height} = event.nativeEvent.layout;
          console.log('height: ' + height);
        }}>
        <AppTextInput
          value={text}
          onChangeText={setText}
          placeholder="Ý kiến của bạn"
          marginBottom={0}
          contentRight={
            <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
              <Send />
            </TouchableOpacity>
          }
        />
        <KeyboardSpacer topSpacing={228} />
      </AppView>
    </Container>
  );
};

export default View;
