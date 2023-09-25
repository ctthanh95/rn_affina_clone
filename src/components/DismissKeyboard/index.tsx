import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleSheet,
} from 'react-native';

const DismissKeyboardHOC = Comp => {
  return ({children, ...props}) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props} style={styles.container}>
        {children}
      </Comp>
    </TouchableWithoutFeedback>
  );
};

const DismissKeyboard = DismissKeyboardHOC(View);

export default DismissKeyboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
