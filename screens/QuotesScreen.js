import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

export default function QuotesScreen() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://zenquotes.io/api/random');
      const data = await response.json();
      if (data && data.length > 0) {
        setQuote({ text: data[0].q, author: data[0].a });
      } else throw new Error('No data');
    } catch (e) {
      setError('Could not fetch online quote.');
      setQuote({
        text: 'The body achieves what the mind believes.',
        author: 'Napoleon Hill',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuote(); }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.bgAlt} />

      <View style={styles.header}>
        <Text style={styles.headerAccent}>DAILY INSPIRATION</Text>
        <Text style={styles.headerTitle}>Stay Motivated</Text>
        <Text style={styles.headerSubtitle}>A quote to keep you going</Text>
      </View>

      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="small" color={theme.pink} />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <View style={styles.quoteGlowWrap}>
            <View style={styles.quoteCard}>
              <Text style={styles.quoteText}>"{quote?.text}"</Text>
              <Text style={styles.quoteAuthor}>— {quote?.author}</Text>
              {error && <Text style={styles.errorNote}>{error}</Text>}
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[styles.refreshBtn, loading && { opacity: 0.5 }]}
          onPress={fetchQuote}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Ionicons name="refresh" size={16} color="#fff" />
          <Text style={styles.refreshBtnText}>New Quote</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Powered by ZenQuotes API</Text>
      </View>
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

  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingWrap: {
    alignItems: 'center',
    marginBottom: 24,
    gap: 10,
  },
  loadingText: {
    fontSize: 13,
    color: theme.textDim,
  },

  quoteGlowWrap: {
    width: '100%',
    marginBottom: 24,
    padding: 3,
    borderRadius: 14,
    backgroundColor: theme.pink,
    shadowColor: theme.pink,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 14,
  },
  quoteCard: {
    backgroundColor: theme.surface,
    borderRadius: 11,
    padding: 24,
  },
  quoteText: {
    fontSize: 16,
    color: theme.text,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  quoteAuthor: {
    fontSize: 13,
    color: theme.textDim,
    marginTop: 14,
    textAlign: 'right',
    fontWeight: '500',
  },
  errorNote: {
    fontSize: 12,
    color: theme.textDim,
    marginTop: 10,
    fontStyle: 'italic',
  },

  refreshBtn: {
    backgroundColor: theme.pink,
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  refreshBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  footerText: {
    marginTop: 20,
    fontSize: 11,
    color: theme.textMuted,
  },
});