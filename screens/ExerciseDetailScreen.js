import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExercises } from '../context/ExerciseContext';
import { theme } from '../theme';

export default function ExerciseDetailScreen({ route, navigation }) {
  const { exercise } = route.params;
  const { toggleComplete, isCompleted } = useExercises();
  const completed = isCompleted(exercise.id);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.bgAlt} />

      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color="#0F1419" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Exercise Details</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        <Image source={{ uri: exercise.image }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.category}>{exercise.category}</Text>
          <Text style={styles.title}>{exercise.name}</Text>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={16} color={theme.textDim} />
              <View>
                <Text style={styles.infoLabel}>Duration</Text>
                <Text style={styles.infoValue}>{exercise.duration}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Ionicons
                name={completed ? 'checkmark-circle' : 'ellipse-outline'}
                size={16}
                color={theme.textDim}
              />
              <View>
                <Text style={styles.infoLabel}>Status</Text>
                <Text style={styles.infoValue}>
                  {completed ? 'Completed' : 'Not done'}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{exercise.description}</Text>

          <TouchableOpacity
            style={[styles.actionBtn, completed && styles.actionBtnDone]}
            onPress={() => toggleComplete(exercise.id)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={completed ? 'refresh' : 'checkmark'}
              size={18}
              color="#fff"
            />
            <Text style={styles.actionBtnText}>
              {completed ? 'Mark as Not Done' : 'Mark as Completed'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
  topBarTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F1419',
    letterSpacing: -0.3,
  },

  image: {
    width: '100%',
    height: 220,
    backgroundColor: theme.surfaceLight,
  },

  content: {
    padding: 20,
  },
  category: {
    fontSize: 12,
    color: theme.pink,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.text,
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: theme.border,
    marginVertical: 18,
  },

  infoRow: {
    flexDirection: 'row',
    gap: 16,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: theme.textDim,
  },
  infoValue: {
    fontSize: 14,
    color: theme.text,
    fontWeight: '600',
    marginTop: 1,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: theme.textDim,
    marginBottom: 24,
  },

  actionBtn: {
    backgroundColor: theme.pink,
    paddingVertical: 13,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionBtnDone: {
    backgroundColor: theme.textDim,
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});