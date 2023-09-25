import React, {useState} from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import RenderHtml from 'react-native-render-html';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {AppImage, AppText, AppTextInput, AppView, Container} from '@components';
import {ms, width} from '@utils/responsive';
import {CONTENT} from '@utils/fontStyle';
import {BLACK, WHITE} from '@utils/colors';
import {formatTime} from '@utils/global';
import Comment from './components/Comment';
import {Send} from '@utils/svg';
import styles from './styles';

const WIDTH = width - 2 * ms(23);

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
    console.log(keyboardState, keyboardSpace);
    setIsKeyboard(keyboardState);
    setHeightKeyboard(keyboardSpace);
  };

  return (
    <>
      <Container isAuth title={newsName} isScrollView>
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
            <AppView height={100} />
            {isKeyboard ? <AppView height={heightKeyboard} /> : null}
          </AppView>
        </AppView>
      </Container>
      <AppView
        padding={ms(23)}
        absolute
        bottom={0}
        width="100%"
        backgroundColor={WHITE}>
        <AppTextInput
          value={text}
          onChangeText={setText}
          placeholder="Ý kiến của bạn"
          contentRight={
            <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
              <Send />
            </TouchableOpacity>
          }
        />
        <KeyboardSpacer
          onToggle={handleOnToggle}
          topSpacing={isIos ? 0 : -230}
        />
      </AppView>
    </>
  );
};

export default View;
