import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';
import { getSubscriptions, saveSubscriptions } from '../utils/storage';

export default function SubscriptionDetails({ route, navigation }) {
  const { subscription } = route.params;
  const { theme } = useTheme();

  const handleDelete = () => {
    Alert.alert(
      "Видалити підписку?",
      `Ви впевнені, що хочете видалити ${subscription.name}?`,
      [
        { text: "Скасувати", style: "cancel" },
        { 
          text: "Видалити", 
          style: "destructive", 
          onPress: async () => {
            const subs = await getSubscriptions();
            const filtered = subs.filter(s => s.id !== subscription.id);
            await saveSubscriptions(filtered);
            navigation.navigate('SubscriptionsList'); // Повертаємось до списку
          } 
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={[styles.iconCircle, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Ionicons name="card-outline" size={45} color={theme.accent} />
          </View>
          <Text style={[styles.name, { color: theme.text }]}>{subscription.name}</Text>
          <Text style={[styles.price, { color: theme.accent }]}>
            ${subscription.price} 
            <Text style={[styles.period, { color: theme.subText }]}>
              / {subscription.period === 'monthly' ? 'міс' : 'рік'}
            </Text>
          </Text>
        </View>

        <View style={[styles.infoSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.infoRow}>
            <Ionicons name="repeat-outline" size={22} color={theme.subText} />
            <Text style={[styles.infoText, { color: theme.subText }]}>
              Періодичність: {subscription.period === 'monthly' ? 'Щомісячно' : 'Щорічно'}
            </Text>
          </View>
          <View style={[styles.infoRow, { marginTop: 15 }]}>
            <Ionicons name="shield-outline" size={22} color={theme.subText} />
            <Text style={[styles.infoText, { color: theme.subText }]}>
              Статус: Активна
            </Text>
          </View>
        </View>

        {/* КНОПКА РЕДАГУВАННЯ */}
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.accent }]} 
          onPress={() => navigation.navigate('AddSubscription', { subscription })}
        >
          <Ionicons name="create-outline" size={22} color="#000" />
          <Text style={[styles.actionButtonText, { color: '#000' }]}>Редагувати підписку</Text>
        </TouchableOpacity>

        {/* КНОПКА ВИДАЛЕННЯ (Одразу під редагуванням) */}
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#ff4444', marginTop: 15 }]} 
          onPress={handleDelete}
        >
          <Ionicons name="trash-outline" size={22} color="#ff4444" />
          <Text style={[styles.actionButtonText, { color: '#ff4444' }]}>Видалити підписку</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 30, alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 35 },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
  },
  name: { fontSize: 26, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 32, fontWeight: '800' },
  period: { fontSize: 16, fontWeight: '400' },
  infoSection: { 
    width: '100%', 
    borderRadius: 20, 
    padding: 20, 
    marginBottom: 30,
    borderWidth: 1,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  infoText: { fontSize: 16, marginLeft: 15 },
  actionButton: { 
    flexDirection: 'row', 
    width: '100%', 
    padding: 18, 
    borderRadius: 16, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  actionButtonText: { fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
});