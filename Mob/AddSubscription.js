import React, { useEffect } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Alert, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { subscriptionSchema } from '../utils/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { getSubscriptions, saveSubscriptions } from '../utils/storage';
import { useTheme } from '../utils/ThemeContext';
import uuid from 'react-native-uuid';

export default function AddSubscription({ navigation, route }) {
  const { theme } = useTheme();
  const editingSub = route.params?.subscription;

  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(subscriptionSchema),
    defaultValues: { period: editingSub?.period || 'monthly' }
  });

  const currentPeriod = watch('period');

  useEffect(() => {
    if (editingSub) {
      setValue('name', editingSub.name);
      setValue('price', String(editingSub.price));
      setValue('period', editingSub.period);
    }
  }, [editingSub]);

  const onSubmit = async (data) => {
    try {
      const subscriptions = await getSubscriptions() || [];
      if (editingSub) {
        const updated = subscriptions.map(sub =>
          sub.id === editingSub.id ? { ...sub, ...data } : sub
        );
        await saveSubscriptions(updated);
      } else {
        const newSub = { id: uuid.v4(), ...data, active: true };
        await saveSubscriptions([...subscriptions, newSub]);
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert("Помилка", "Не вдалося зберегти дані");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
      <ScrollView style={[styles.main, { backgroundColor: theme.background }]}>
        <View style={styles.container}>
          <Text style={[styles.label, { color: theme.subText }]}>Назва сервісу</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput 
                placeholder="Напр. Netflix" 
                placeholderTextColor={theme.subText} 
                style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]} 
                onChangeText={onChange} 
                value={value} 
              />
            )}
          />
          {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

          <Text style={[styles.label, { color: theme.subText }]}>Ціна ($)</Text>
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <TextInput 
                placeholder="9.99" 
                placeholderTextColor={theme.subText} 
                style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]} 
                onChangeText={onChange} 
                value={value} 
                keyboardType="numeric" 
              />
            )}
          />
          {errors.price && <Text style={styles.error}>{errors.price.message}</Text>}

          <Text style={[styles.label, { color: theme.subText }]}>Період оплати</Text>
          <View style={styles.pickerContainer}>
            <TouchableOpacity 
              style={[
                styles.pickerButton, 
                { backgroundColor: theme.card, borderColor: theme.border }, 
                currentPeriod === 'monthly' && { backgroundColor: theme.accent, borderColor: theme.accent }
              ]} 
              onPress={() => setValue('period', 'monthly')}
            >
              <Text style={[styles.pickerText, { color: theme.subText }, currentPeriod === 'monthly' && { color: '#000' }]}>Щомісячно</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.pickerButton, 
                { backgroundColor: theme.card, borderColor: theme.border }, 
                currentPeriod === 'yearly' && { backgroundColor: theme.accent, borderColor: theme.accent }
              ]} 
              onPress={() => setValue('period', 'yearly')}
            >
              <Text style={[styles.pickerText, { color: theme.subText }, currentPeriod === 'yearly' && { color: '#000' }]}>Щорічно</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: theme.accent }]} 
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.saveButtonText}>{editingSub ? "Оновити дані" : "Зберегти"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1 },
  container: { padding: 25 },
  label: { marginBottom: 8, fontSize: 14, fontWeight: 'bold' },
  input: { borderRadius: 12, padding: 15, marginBottom: 15, fontSize: 16, borderWidth: 1 },
  pickerContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  pickerButton: { flex: 1, padding: 15, alignItems: 'center', borderRadius: 12, marginHorizontal: 5, borderWidth: 1 },
  pickerText: { fontWeight: 'bold' },
  error: { color: '#ff4444', marginBottom: 15, fontSize: 12 },
  saveButton: { padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
});