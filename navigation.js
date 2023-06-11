import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/homePage';
// import Information from './screens/InformationPage'
import Information from './screens/informationPage';

import { NavigationContainer } from '@react-navigation/native';
import { Header } from '@rneui/themed';
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={
        {headerShown:false}
      }/>
      <Stack.Screen name="Information" component={Information} options={
        {
          headerStyle:{
            backgroundColor:'#000000',
          },
          headerTitleStyle:{
            color:'white',
          },
          headerBackTitleStyle:{
            color:'white'
          },

        }
      } />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;