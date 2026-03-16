import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native';
import SubscriptionItem from '../components/SubscriptionItem';
import { getSubscriptions } from '../utils/storage';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';

export default function Subscriptions({ navigation }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [search, setSearch] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await getSubscriptions();
      setSubscriptions(data || []);
    });

    return unsubscribe;
  }, [navigation]);

  const handlePress = (item) => {
    navigation.navigate('SubscriptionDetails', { subscription: item });
  };

  const filtered = subscriptions.filter(sub =>
    sub.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      <View style={[styles.searchContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Ionicons name="search" size={20} color={theme.subText} style={{ marginLeft: 10 }} />

        <TextInput
          placeholder="Пошук..."
          placeholderTextColor={theme.subText}
          value={search}
          onChangeText={setSearch}
          style={[styles.search, { color: theme.text }]}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <SubscriptionItem
            item={item}
            onPress={() => handlePress(item)}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.subText }]}>
            Список порожній
          </Text>
        }
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.accent }]}
        onPress={() => navigation.navigate('AddSubscription')}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={35} color="#000" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 10,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 15,
    marginHorizontal: 10,
    borderWidth: 1,
  },

  search: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 70,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    zIndex: 999,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  }

});