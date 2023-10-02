import React, {memo, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import {BACKGROUND, BLACK, SELECT_BUTTON} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {WIDTH, ms, vs, width} from '@utils/responsive';

type Props = {
  routes: {key: string; title: string}[];
  renderScene: any;
  width?: string | number;
  onSelected?: (index: number) => void;
};

const AppTabView = ({
  routes,
  renderScene,
  width = 'auto',
  onSelected,
}: Props) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (onSelected) {
      onSelected(index);
    }
  }, [index]);

  const renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        scrollEnabled={true}
        pressColor=""
        activeColor={BLACK[100]}
        inactiveColor={BLACK[30]}
        labelStyle={CONTENT.bold_14}
        indicatorStyle={styles.indicator}
        style={styles.background}
        tabStyle={{
          width: width,
        }}
      />
    );
  };
  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: WIDTH}}
      lazy
    />
  );
};

export default memo(AppTabView);

const styles = StyleSheet.create({
  background: {
    backgroundColor: BACKGROUND,
    marginBottom: ms(24),
  },
  indicator: {
    backgroundColor: SELECT_BUTTON,
    height: vs(4),
  },
});
