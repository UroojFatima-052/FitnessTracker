import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExercises } from '../context/ExerciseContext';
import { theme } from '../theme';

export default function HomeScreen({ navigation }) {
  const { exercises, isCompleted, completedIds } = useExercises();

  const renderItem = ({ item }) => {
    const completed = isCompleted(item.id);
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ExerciseDetail', { exercise: item })}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            {completed && (
              <View style={styles.completedBadge}>
                <Ionicons name="checkmark" size={13} color="#fff" />
              </View>
            )}
          </View>
          <Text style={styles.cardCategory}>{item.category}</Text>
          <View style={styles.cardMeta}>
            <Ionicons name="time-outline" size={13} color={theme.textDim} />
            <Text style={styles.cardDuration}>{item.duration}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.bgAlt} />

      <View style={styles.header}>
        <Text style={styles.headerAccent}>WELCOME BACK</Text>
        <Text style={styles.headerTitle}>Let's Work Out</Text>
        <Text style={styles.headerSubtitle}>
          {exercises.length} exercises · {completedIds.length} completed
        </Text>
      </View>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddExercise')}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },

  header: {
    paddingTop: 60,
    paddingBottom: 26,
    paddingHorizontal: 22,
    backgroundColor: theme.pink,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: theme.pink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  headerAccent: {
    fontSize: 12,
    color: 'rgba(15,23,42,0.65)',
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0F1419',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(15,23,42,0.7)',
    marginTop: 4,
    fontWeight: '500',
  },

  listContent: {
    padding: 16,
    paddingBottom: 90,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: theme.surface,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.border,
    overflow: 'hidden',
  },
  cardImage: {
    width: 90,
    height: 90,
    backgroundColor: theme.surfaceLight,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
    flex: 1,
  },
  cardCategory: {
    fontSize: 12,
    color: theme.pink,
    fontWeight: '500',
    marginTop: 2,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  cardDuration: {
    fontSize: 12,
    color: theme.textDim,
  },
  completedBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.pink,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.pink,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});