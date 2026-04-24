import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExercises } from '../context/ExerciseContext';
import { theme } from '../theme';

export default function HomeScreen({ navigation }) {
  const { exercises, isCompleted, completedIds } = useExercises();

  // Pick the first incomplete exercise as the "Featured" pick.
  // If everything's done, just show the first one.
  const featured =
    exercises.find((ex) => !isCompleted(ex.id)) || exercises[0];
  const restOfList = exercises.filter((ex) => ex.id !== featured?.id);

  // Render a compact row in the "All Exercises" list
  const renderRow = ({ item }) => {
    const completed = isCompleted(item.id);
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate('ExerciseDetail', { exercise: item })}
        activeOpacity={0.75}
      >
        <Image source={{ uri: item.image }} style={styles.rowImage} />
        <View style={styles.rowText}>
          <Text style={styles.rowTitle}>{item.name}</Text>
          <Text style={styles.rowMeta}>
            {item.category} · {item.duration}
          </Text>
        </View>
        {completed ? (
          <View style={styles.rowCheck}>
            <Ionicons name="checkmark" size={14} color="#0F1419" />
          </View>
        ) : (
          <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
        )}
      </TouchableOpacity>
    );
  };

  // Header rendered as part of FlatList so it scrolls with the list
  const ListHeader = () => (
    <View>
      {/* Featured / Hero card */}
      {featured && (
        <View style={styles.sectionHead}>
          <Text style={styles.sectionLabel}>FEATURED</Text>
          <Text style={styles.sectionHint}>Today's pick</Text>
        </View>
      )}

      {featured && (
        <TouchableOpacity
          style={styles.heroCard}
          onPress={() =>
            navigation.navigate('ExerciseDetail', { exercise: featured })
          }
          activeOpacity={0.85}
        >
          <ImageBackground
            source={{ uri: featured.image }}
            style={styles.heroImage}
            imageStyle={styles.heroImageRadius}
          >
            <View style={styles.heroOverlay}>
              <View style={styles.heroPlay}>
                <Ionicons name="play" size={16} color={theme.pink} />
              </View>
              <View style={styles.heroBottom}>
                <View style={styles.heroBadge}>
                  <Text style={styles.heroBadgeText}>{featured.category}</Text>
                </View>
                <Text style={styles.heroTitle}>{featured.name}</Text>
                <View style={styles.heroMetaRow}>
                  <Ionicons
                    name="time-outline"
                    size={13}
                    color={theme.textDim}
                  />
                  <Text style={styles.heroMeta}>{featured.duration}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}

      {/* All Exercises section header */}
      <View style={styles.sectionHead}>
        <Text style={styles.sectionLabel}>ALL EXERCISES</Text>
        <Text style={styles.sectionHint}>
          {restOfList.length} {restOfList.length === 1 ? 'item' : 'items'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.pink} />

      {/* Compact teal header */}
      <View style={styles.header}>
        <Text style={styles.headerAccent}>WELCOME BACK</Text>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Let's Work Out</Text>
          <View style={styles.progressChip}>
            <Text style={styles.progressChipText}>
              {completedIds.length}/{exercises.length} done
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={restOfList}
        keyExtractor={(item) => item.id}
        renderItem={renderRow}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddExercise')}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={26} color="#0F1419" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },

  // === Header ===
  header: {
    paddingTop: 55,
    paddingBottom: 22,
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
    fontSize: 11,
    color: 'rgba(15,23,42,0.65)',
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F1419',
    letterSpacing: -0.5,
  },
  progressChip: {
    backgroundColor: 'rgba(15,23,42,0.18)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  progressChipText: {
    color: '#0F1419',
    fontSize: 12,
    fontWeight: '700',
  },

  // === Section labels ===
  listContent: { padding: 16, paddingBottom: 100 },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 12,
    color: theme.pink,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  sectionHint: {
    fontSize: 11,
    color: theme.textDim,
  },

  // === Hero / Featured card ===
  heroCard: {
    height: 180,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 22,
    borderWidth: 1,
    borderColor: theme.pink,
    shadowColor: theme.pink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  heroImage: { flex: 1, justifyContent: 'flex-end' },
  heroImageRadius: { borderRadius: 13 },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(28,30,34,0.4)',
    padding: 14,
    justifyContent: 'space-between',
  },
  heroPlay: {
    alignSelf: 'flex-end',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(15,23,42,0.75)',
    borderWidth: 1,
    borderColor: theme.pink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroBottom: { gap: 6 },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.pink,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  heroBadgeText: {
    color: '#0F1419',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.text,
    letterSpacing: -0.4,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  heroMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  heroMeta: {
    fontSize: 12,
    color: theme.textDim,
    fontWeight: '500',
  },

  // === Compact rows ===
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.surface,
    borderRadius: 10,
    padding: 11,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: theme.border,
  },
  rowImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: theme.surfaceLight,
  },
  rowText: { flex: 1, minWidth: 0 },
  rowTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.text,
  },
  rowMeta: {
    fontSize: 11,
    color: theme.textDim,
    marginTop: 2,
  },
  rowCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.pink,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // === FAB ===
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: theme.pink,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.pink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
});
