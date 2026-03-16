import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../utils/ThemeContext';

export default function Header({ title, totalBudget }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.subtitle, { color: theme.subText }]}>Трекер</Text>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      
      {totalBudget && totalBudget !== "0.00" && (
        <View style={[styles.budgetBadge, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.budgetText, { color: theme.accent }]}>${totalBudget} / міс</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  subtitle: { fontSize: 12, textTransform: 'uppercase', letterSpacing: 2 },
  title: { fontSize: 32, fontWeight: '800', marginTop: 4 },
  budgetBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    marginTop: 15,
    borderWidth: 1,
  },
  budgetText: { fontWeight: 'bold', fontSize: 14 },
});