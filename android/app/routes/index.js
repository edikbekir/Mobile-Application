import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

const AppStack = createStackNavigator({ Main: Main, Root: Root, Home: Home });
const AuthStack = createStackNavigator({ Login: Login, SignUp: SignUp  });

export default createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Root',
  }
));
