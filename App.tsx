import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {PortalProvider} from '@gorhom/portal';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import RootApp from '@navigation/RootApp';
import store, {persistor} from 'src/redux/store';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={styles.container}>
            <PortalProvider>
              <RootApp />
            </PortalProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
