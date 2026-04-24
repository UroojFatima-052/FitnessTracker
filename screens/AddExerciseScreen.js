import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExercises } from '../context/ExerciseContext';
import { theme } from '../theme';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800';

const CATEGORIES = ['Chest', 'Legs', 'Core', 'Cardio', 'Full Body', 'Arms'];

export default function AddExerciseScreen({ navigation }) {
  const { addExercise } = useExercises();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSave = () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert('Missing Information', 'Name and description are required.');
      return;
    }

    addExercise({
      name: name.trim(),
      category: category.trim() || 'Custom',
      duration: duration.trim() || 'Not specified',
      description: description.trim(),
      image: image.trim() || DEFAULT_IMAGE,
    });

    Alert.alert('Success', 'Exercise added successfully.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={theme.bgAlt} />

      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color="#0F1419" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Add Exercise</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.form}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Exercise Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Mountain Climbers"
            placeholderTextColor={theme.textMuted}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.chipRow}>
            {CATEGORIES.map((chip) => {
              const active = category === chip;
              return (
                <TouchableOpacity
                  key={chip}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setCategory(chip)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {chip}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TextInput
            style={[styles.input, { marginTop: 8 }]}
            placeholder="Or type a custom category"
            placeholderTextColor={theme.textMuted}
            value={category}
            onChangeText={setCategory}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Duration / Reps</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 3 sets of 15 reps"
            placeholderTextColor={theme.textMuted}
            value={duration}
            onChangeText={setDuration}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Image URL (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="https://..."
            placeholderTextColor={theme.textMuted}
            value={image}
            onChangeText={setImage}
            autoCapitalize="none"
            keyboardType="url"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Explain how to perform this exercise..."
            placeholderTextColor={theme.textMuted}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
          <Text style={styles.saveBtnText}>Save Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },

  topBar: {
    paddingTop: 55,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: theme.pink,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: theme.pink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(15,23,42,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtnText: {
    fontSize: 15,
    color: '#0F1419',
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F1419',
    letterSpacing: -0.3,
  },

  form: {
    padding: 20,
    paddingBottom: 40,
  },

  inputGroup: { marginBottom: 16 },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: theme.bg,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: theme.text,
  },
  textArea: { height: 100, paddingTop: 10 },

  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: theme.bg,
    borderWidth: 1,
    borderColor: theme.border,
  },
  chipActive: {
    backgroundColor: theme.pink,
    borderColor: theme.pink,
  },
  chipText: {
    fontSize: 13,
    color: theme.textDim,
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },

  saveBtn: {
    backgroundColor: theme.pink,
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});