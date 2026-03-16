import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; 
import { useTheme } from '../utils/ThemeContext';

export default function SubscriptionItem({ item, onPress }) {
  const { theme, isDark } = useTheme();

  const getServiceStyle = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('netflix')) return { icon: 'videocam', color: '#E50914' };
    if (lowerName.includes('spotify')) return { icon: 'spotify', color: '#1DB954', isFA: true };
    if (lowerName.includes('youtube')) return { icon: 'youtube', color: '#FF0000', isFA: true };
    if (lowerName.includes('apple')) return { icon: 'logo-apple', color: '#FFFFFF' };
    if (lowerName.includes('xbox')) return { icon: 'logo-xbox', color: '#107C10' };
    if (lowerName.includes('playstation') || lowerName.includes('ps plus')) return { icon: 'logo-playstation', color: '#003087' };
    if (lowerName.includes('steam')) return { icon: 'steam', color: '#00ADEE', isFA: true };
    if (lowerName.includes('discord')) return { icon: 'discord', color: '#5865F2', isFA: true };
    if (lowerName.includes('google') || lowerName.includes('drive')) return { icon: 'logo-google', color: '#4285F4' };
    if (lowerName.includes('cloud')) return { icon: 'cloud-outline', color: '#00A1E0' };
    if (lowerName.includes('github')) return { icon: 'logo-github', color: '#FFFFFF' };
    if (lowerName.includes('figma')) return { icon: 'figma', color: '#F24E1E', isFA: true };
    return { icon: 'card-outline', color: theme.accent };
  };

  const serviceStyle = getServiceStyle(item.name);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(item)}>
      <View style={[styles.card, { backgroundColor: theme.card, shadowColor: isDark ? '#000' : '#888' }]}>
        <View style={[styles.iconContainer, { backgroundColor: isDark ? '#2A2A2A' : '#F0F0F0', borderColor: theme.border }]}>
          {serviceStyle.isFA ? (
            <FontAwesome5 name={serviceStyle.icon} size={22} color={serviceStyle.color} />
          ) : (
            <Ionicons name={serviceStyle.icon} size={24} color={serviceStyle.color} />
          )}
        </View>
        
        <View style={styles.info}>
          <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
          <Text style={[styles.period, { color: theme.subText }]}>
            {item.period === 'monthly' ? 'Щомісячно' : 'Щорічно'}
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: theme.text }]}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 10,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  info: { flex: 1, marginLeft: 15 },
  name: { fontSize: 16, fontWeight: 'bold' },
  period: { fontSize: 12, marginTop: 2 },
  price: { fontSize: 17, fontWeight: '700' },
});