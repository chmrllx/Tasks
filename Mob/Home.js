import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getSubscriptions } from '../utils/storage';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';

export default function Home() {
  const [subscriptions, setSubscriptions] = useState([]);
  const { theme, isDark } = useTheme();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = await getSubscriptions();
        setSubscriptions(data || []);
      };
      fetchData();
    }, [])
  );

  const totalMonthly = subscriptions.reduce((sum, sub) => {
    const price = Number(sub.price) || 0;
    return sub.period === 'yearly' ? sum + (price / 12) : sum + price;
  }, 0);

  const mostExpensive = subscriptions.length > 0 
    ? subscriptions.reduce((prev, curr) => (Number(prev.price) > Number(curr.price)) ? prev : curr)
    : null;

  return (
    <View style={[styles.mainContainer, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.statusBar} />
      <Header title="Аналітика" totalBudget={totalMonthly.toFixed(2)} />
      
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.statRow}>
          <View style={[styles.statCard, { backgroundColor: theme.card }]}>
            <Ionicons name="apps-outline" size={24} color={theme.accent} />
            <Text style={[styles.statNumber, { color: theme.text }]}>{subscriptions.length}</Text>
            <Text style={[styles.statLabel, { color: theme.subText }]}>Сервісів</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: theme.card }]}>
            <Ionicons name="stats-chart-outline" size={24} color={theme.accent} />
            <Text style={[styles.statNumber, { color: theme.text }]}>${(totalMonthly * 12).toFixed(0)}</Text>
            <Text style={[styles.statLabel, { color: theme.subText }]}>Прогноз на рік</Text>
          </View>
        </View>

        {mostExpensive && (
          <View style={[styles.highlightCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.highlightTitle, { color: theme.subText }]}>Найдорожча підписка</Text>
            <View style={styles.highlightRow}>
              <Text style={[styles.highlightName, { color: theme.text }]}>{mostExpensive.name}</Text>
              <Text style={styles.highlightPrice}>${Number(mostExpensive.price).toFixed(2)}</Text>
            </View>
            <Text style={[styles.highlightPeriod, { color: theme.subText }]}>
              {mostExpensive.period === 'monthly' ? 'Списання кожного місяця' : 'Списання раз на рік'}
            </Text>
          </View>
        )}

        <View style={[styles.budgetStatus, { backgroundColor: theme.card, borderLeftColor: theme.accent }]}>
          <View style={styles.statusHeader}>
            <Text style={[styles.statusTitle, { color: theme.text }]}>Статус бюджету</Text>
            <Ionicons name="information-circle-outline" size={20} color={theme.accent} />
          </View>
          <Text style={[styles.statusText, { color: theme.subText }]}>
            {totalMonthly > 50 
              ? "Ваші підписки складають значну частину регулярних витрат. Перевірте, чи всіма ви користуєтесь."
              : "Ваші витрати на цифрові сервіси в ідеальному стані. Так тримати!"}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: { padding: 20 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { width: '48%', padding: 20, borderRadius: 20, alignItems: 'center', elevation: 2 },
  statNumber: { fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  statLabel: { fontSize: 12, marginTop: 4 },
  highlightCard: { padding: 20, borderRadius: 20, marginBottom: 20, borderWidth: 1 },
  highlightTitle: { fontSize: 12, textTransform: 'uppercase', marginBottom: 10, letterSpacing: 1 },
  highlightRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  highlightName: { fontSize: 22, fontWeight: 'bold' },
  highlightPrice: { fontSize: 22, fontWeight: 'bold', color: '#ff4444' },
  highlightPeriod: { fontSize: 12, marginTop: 5 },
  budgetStatus: { padding: 20, borderRadius: 20, borderLeftWidth: 4 },
  statusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  statusTitle: { fontWeight: 'bold', fontSize: 16 },
  statusText: { lineHeight: 22 }
});