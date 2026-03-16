import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';

export default function Settings() {
  const { isDark, theme, toggleTheme } = useTheme();

  const clearData = () => {
    Alert.alert(
      "Очистити дані?",
      "Ви видалите всі свої підписки без можливості відновлення.",
      [
        { text: "Скасувати", style: "cancel" },
        { 
          text: "Видалити все", 
          style: "destructive", 
          onPress: async () => {
            await AsyncStorage.removeItem('@subscriptions');
            Alert.alert("Готово", "Всі дані видалено.");
          } 
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Налаштування" />
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.subText }]}>Зовнішній вигляд</Text>
        <View style={[styles.row, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.rowLeft}>
            <Ionicons name={isDark ? "moon" : "sunny"} size={22} color={theme.accent} />
            <Text style={[styles.rowText, { color: theme.text }]}>Темна тема</Text>
          </View>
          <Switch 
            value={isDark} 
            onValueChange={toggleTheme} 
            trackColor={{ false: "#767577", true: theme.accent }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.subText }]}>Дані</Text>
        <TouchableOpacity style={[styles.row, { backgroundColor: theme.card, borderColor: theme.border }]} onPress={clearData}>
          <View style={styles.rowLeft}>
            <Ionicons name="trash-outline" size={22} color="#ff4444" />
            <Text style={[styles.rowText, { color: '#ff4444' }]}>Стерти всі підписки</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.subText} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.version, { color: theme.subText }]}>Версія 1.0.0 (Beta)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { marginTop: 25, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 13, textTransform: 'uppercase', marginBottom: 10, marginLeft: 5 },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 18, 
    borderRadius: 16,
    borderWidth: 1,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowText: { fontSize: 16, marginLeft: 15, fontWeight: '500' },
  footer: { marginTop: 50, alignItems: 'center' },
  version: { fontSize: 12 },
});