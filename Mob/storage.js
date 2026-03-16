import AsyncStorage from '@react-native-async-storage/async-storage';

export const getSubscriptions = async () => {
  try {
    const json = await AsyncStorage.getItem('@subscriptions');
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error("Помилка при читанні підписок:", e);
    return [];
  }
};

export const saveSubscriptions = async (subscriptions) => {
  try {
    await AsyncStorage.setItem('@subscriptions', JSON.stringify(subscriptions));
  } catch (e) {
    console.error("Помилка при збереженні підписок:", e);
  }
};