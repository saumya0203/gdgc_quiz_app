import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

const leaderboardData = [
  { id: 1, name: 'Davis Curtis', points: 2569, avatar: '👨‍💼', rank: 1, flag: '🇨🇦' },
  { id: 2, name: 'Alena Donin', points: 1469, avatar: '👩‍💼', rank: 2, flag: '🇫🇷' },
  { id: 3, name: 'Craig Gouse', points: 1053, avatar: '👨‍💼', rank: 3, flag: '🇨🇦' },
  { id: 4, name: 'Madelyn Dias', points: 590, avatar: '👩', rank: 4, flag: '🇮🇳' },
  { id: 5, name: 'Zain Vaccaro', points: 448, avatar: '👨‍💼', rank: 5, flag: '🇮🇹' },
];

export default function LeaderboardScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('Weekly');

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return '#FFD700';
    if (rank === 2) return '#C0C0C0';
    if (rank === 3) return '#CD7F32';
    return '#E5E7EB';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#22C55E" />
      
      {/* Header */}
      <View style={styles.header}>
        <ArrowLeft size={24} color="white" />
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Period Selector */}
      <View style={styles.periodContainer}>
        <View style={styles.periodSelector}>
          <TouchableOpacity
            style={[
              styles.periodButton,
              selectedPeriod === 'Weekly' && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod('Weekly')}>
            <Text
              style={[
                styles.periodText,
                selectedPeriod === 'Weekly' && styles.periodTextActive,
              ]}>
              Weekly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.periodButton,
              selectedPeriod === 'All Time' && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod('All Time')}>
            <Text
              style={[
                styles.periodText,
                selectedPeriod === 'All Time' && styles.periodTextActive,
              ]}>
              All Time
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Leaderboard List */}
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {leaderboardData.map((user) => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.rankContainer}>
              <Text style={styles.rankNumber}>{user.rank}</Text>
            </View>
            
            <View style={styles.userInfo}>
              <View style={styles.avatarContainer}>
                <View style={[styles.avatar, { backgroundColor: user.rank <= 3 ? getRankColor(user.rank) : '#8B5CF6' }]}>
                  <Text style={styles.avatarEmoji}>{user.avatar}</Text>
                </View>
                <View style={styles.flagContainer}>
                  <Text style={styles.flag}>{user.flag}</Text>
                </View>
              </View>
              
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userPoints}>{user.points.toLocaleString()} points</Text>
              </View>
            </View>
            
            <View style={styles.rankIconContainer}>
              {getRankIcon(user.rank) && (
                <Text style={styles.rankIcon}>{getRankIcon(user.rank)}</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Indicator */}
      <View style={styles.indicator}>
        <View style={styles.indicatorDot} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22C55E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  periodContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  periodTextActive: {
    color: 'white',
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rankContainer: {
    width: 30,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  flagContainer: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  flag: {
    fontSize: 12,
  },
  userDetails: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  userPoints: {
    fontSize: 14,
    color: '#6B7280',
  },
  rankIconContainer: {
    width: 30,
    alignItems: 'center',
  },
  rankIcon: {
    fontSize: 24,
  },
  indicator: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
});