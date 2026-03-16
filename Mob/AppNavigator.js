import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';

import Home from '../screens/Home';
import Subscriptions from '../screens/Subscriptions';
import SubscriptionDetails from '../screens/SubscriptionDetails';
import AddSubscription from '../screens/AddSubscription';
import Settings from '../screens/Settings';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function SubscriptionsStack() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen
        name="SubscriptionsList"
        component={Subscriptions}
        options={{ title: 'Мої підписки' }}
      />

      <Stack.Screen
        name="SubscriptionDetails"
        component={SubscriptionDetails}
        options={{ title: 'Деталі' }}
      />

      <Stack.Screen
        name="AddSubscription"
        component={AddSubscription}
        options={{ title: 'Нова підписка' }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { theme, isDark } = useTheme();

  const MyTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: theme.background,
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          sceneContainerStyle: {
            backgroundColor: theme.background,
          },

          tabBarStyle: {
            backgroundColor: theme.card,
            borderTopWidth: 0,
            height: 60
          },

          tabBarActiveTintColor: theme.accent,
          tabBarInactiveTintColor: theme.subText,

          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') iconName = 'pie-chart';
            else if (route.name === 'Subscriptions') iconName = 'list';
            else if (route.name === 'Settings') iconName = 'settings';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ title: 'Аналітика' }}
        />

        <Tab.Screen
          name="Subscriptions"
          component={SubscriptionsStack}
          options={{ title: 'Підписки' }}
        />

        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{ title: 'Налаштування' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}