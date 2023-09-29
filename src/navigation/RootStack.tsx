import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isEmpty} from 'lodash';
import {navigationRef} from './RootNavigation';
import {
  Buyer,
  Chat,
  Contract,
  CreateAccount,
  Dashboard,
  DetailContract,
  DetailCustomer,
  DetailNews,
  DetailProduct,
  EmployeeProfile,
  FilterInsurance,
  Home,
  Link,
  NewCustomer,
  News,
  Notification,
  Otp,
  Payment,
  PersonalInformation,
  Product,
  Receiver,
  ReferralCode,
  Scan,
  Security,
  SecuritySetting,
  Setting,
  SignIn,
  SignUp,
  SystemInfomation,
  UpdateCustomer,
} from '@screens';
import {
  AUTH_STACK,
  BOTTOM_TAB,
  BUYER,
  CHAT,
  CONTRACT,
  CREATE_ACCOUNT,
  DASHBOARD,
  DETAIL_CONTRACT,
  DETAIL_CUSTOMER,
  DETAIL_NEWS,
  DETAIL_PRODUCT,
  EMPLOYEEPROFILE,
  FILTER_INSURANCE,
  HOME,
  LINK,
  NEWS,
  NEW_CUSTOMER,
  NOTIFICATION,
  OTP,
  PAYMENT,
  PERSONAL_INFORMATION,
  PRODUCT,
  PUBLIC_STACK,
  RECEIVER,
  REFERRAL_CODE,
  SCAN,
  SECURITY,
  SECURITY_SETTING,
  SETTING,
  SIGN_IN,
  SIGN_UP,
  SYSTEM_INFOMATION,
  UPDATE_CUSTOMER,
} from './screens';
import {
  Chat as ChatSvg,
  Dashboard as DashboardSvg,
  Home as HomeSvg,
  News as NewsSvg,
  Setting as SettingSvg,
} from '@utils/svg';
import {BACKGROUND, BLACK, PRIMARY} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms} from '@utils/responsive';
import {Platform} from 'react-native';
import {selectUsername} from '@slices/authSlice';
import {useAppSelector} from '@hooks/redux';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions: any = {
  headerShown: false,
  animation: 'none',
};

function BottomTab() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let Icon: any;
          switch (route.name) {
            case HOME:
              Icon = HomeSvg;
              break;
            case CHAT:
              Icon = ChatSvg;
              break;
            case DASHBOARD:
              Icon = DashboardSvg;
              break;
            case NEWS:
              Icon = NewsSvg;
              break;
            case SETTING:
              Icon = SettingSvg;
              break;
          }
          return <Icon fill={focused ? PRIMARY : BLACK[30]} />;
        },
        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: BLACK[30],
        headerShown: false,
        tabBarLabelStyle: CONTENT.bold_10,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          paddingBottom: Platform.select({
            android: ms(5),
            ios: insets.bottom,
          }),
          backgroundColor: BACKGROUND,
        },
      })}>
      <Tab.Screen
        name={HOME}
        component={Home}
        options={{
          title: 'Trang chủ',
        }}
      />
      <Tab.Screen
        name={CHAT}
        component={Chat}
        options={{
          title: 'Trò chuyện',
        }}
      />
      <Tab.Screen
        name={DASHBOARD}
        component={Dashboard}
        options={{
          title: 'Quản lý',
        }}
      />
      <Tab.Screen
        name={NEWS}
        component={News}
        options={{
          title: 'Tin tức',
        }}
      />
      <Tab.Screen
        name={SETTING}
        component={Setting}
        options={{
          title: 'Cài đặt',
        }}
      />
    </Tab.Navigator>
  );
}

const PublicStack = () => {
  const username = useAppSelector(selectUsername);
  const initialRouteName = isEmpty(username) ? SIGN_UP : SIGN_IN;
  // const expireAt = useAppSelector(selectExpireAt);
  // const refreshAt = useAppSelector(selectRefreshAt);
  // console.log(storage.getString('token'));
  // console.log('expireAt', formatTime(expireAt, 'datetime'));
  // console.log('refreshAt', formatTime(refreshAt, 'datetime'));
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={initialRouteName}>
      <Stack.Screen name={SIGN_UP} component={SignUp} />
      <Stack.Screen name={SIGN_IN} component={SignIn} />
      <Stack.Screen name={SECURITY} component={Security} />
      <Stack.Screen name={OTP} component={Otp} />
      <Stack.Screen name={REFERRAL_CODE} component={ReferralCode} />
      <Stack.Screen name={CREATE_ACCOUNT} component={CreateAccount} />
    </Stack.Navigator>
  );
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name={BOTTOM_TAB} component={BottomTab} />
    <Stack.Screen name={PERSONAL_INFORMATION} component={PersonalInformation} />
    <Stack.Screen name={NOTIFICATION} component={Notification} />
    <Stack.Screen name={EMPLOYEEPROFILE} component={EmployeeProfile} />
    <Stack.Screen name={DETAIL_CUSTOMER} component={DetailCustomer} />
    <Stack.Screen name={NEW_CUSTOMER} component={NewCustomer} />
    <Stack.Screen name={UPDATE_CUSTOMER} component={UpdateCustomer} />
    <Stack.Screen name={FILTER_INSURANCE} component={FilterInsurance} />
    <Stack.Screen name={PRODUCT} component={Product} />
    <Stack.Screen name={DETAIL_PRODUCT} component={DetailProduct} />
    <Stack.Screen name={BUYER} component={Buyer} />
    <Stack.Screen name={RECEIVER} component={Receiver} />
    <Stack.Screen name={PAYMENT} component={Payment} />
    <Stack.Screen name={DETAIL_NEWS} component={DetailNews} />
    <Stack.Screen name={SYSTEM_INFOMATION} component={SystemInfomation} />
    <Stack.Screen name={SECURITY_SETTING} component={SecuritySetting} />
    <Stack.Screen name={LINK} component={Link} />
    <Stack.Screen name={SCAN} component={Scan} />
    <Stack.Screen name={CONTRACT} component={Contract} />
    <Stack.Screen name={DETAIL_CONTRACT} component={DetailContract} />
  </Stack.Navigator>
);

const RootStack = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={PUBLIC_STACK} component={PublicStack} />
        <Stack.Screen name={AUTH_STACK} component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
