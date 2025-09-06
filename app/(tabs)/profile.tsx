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
import { ArrowLeft, Settings } from 'lucide-react-native';

const badges = [
  { id: 1, icon: '⏰', color: '#22D3EE', unlocked: true },
  { id: 2, icon: '📊', color: '#F59E0B', unlocked: true },
  { id: 3, icon: '😊', color: '#60A5FA', unlocked: true },
  { id: 4, icon: '🏆', color: '#F472B6', unlocked: true },
  { id: 5, icon: '✨', color: '#A78BFA', unlocked: true },
  { id: 6, icon: '🔒', color: '#6B7280', unlocked: false },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('Badge');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#F59E0B" />
      
      {/* Header */}
      <View style={styles.header}>
        <ArrowLeft size={24} color="white" />
        <View style={styles.headerIcons}>
          <View style={styles.headerDot} />
          <View style={styles.headerDot} />
          <Settings size={24} color="white" />
        </View>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>👩</Text>
            </View>
            <View style={styles.flagContainer}>
              <Text style={styles.flag}>🇮🇳</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.userName}>Madelyn Dias</Text>
        
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>⭐</Text>
            </View>
            <Text style={styles.statLabel}>POINTS</Text>
            <Text style={styles.statValue}>590</Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>🌍</Text>
            </View>
            <Text style={styles.statLabel}>WORLD RANK</Text>
            <Text style={styles.statValue}>#1,438</Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>⚙️</Text>
            </View>
            <Text style={styles.statLabel}>LOCAL RANK</Text>
            <Text style={styles.statValue}>#56</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Badge' && styles.activeTab]}
            onPress={() => setActiveTab('Badge')}>
            <Text style={[styles.tabText, activeTab === 'Badge' && styles.activeTabText]}>
              Badge
            </Text>
            {activeTab === 'Badge' && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Stats' && styles.activeTab]}
            onPress={() => setActiveTab('Stats')}>
            <Text style={[styles.tabText, activeTab === 'Stats' && styles.activeTabText]}>
              Stats
            </Text>
            {activeTab === 'Stats' && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Details' && styles.activeTab]}
            onPress={() => setActiveTab('Details')}>
            <Text style={[styles.tabText, activeTab === 'Details' && styles.activeTabText]}>
              Details
            </Text>
            {activeTab === 'Details' && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        </View>

        {/* Badges Grid */}
        {activeTab === 'Badge' && (
          <View style={styles.badgesContainer}>
            <View style={styles.badgesGrid}>
              {badges.map((badge) => (
                <View
                  key={badge.id}
                  style={[
                    styles.badgeItem,
                    { backgroundColor: badge.unlocked ? badge.color : '#E5E7EB' },
                    !badge.unlocked && styles.lockedBadge,
                  ]}>
                  <Text style={[styles.badgeIcon, !badge.unlocked && styles.lockedIcon]}>
                    {badge.icon}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F59E0B',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginRight: 12,
  },
  profileCard: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 0,
    marginTop: 20,
    overflow: 'hidden',
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 40,
  },
  flagContainer: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  flag: {
    fontSize: 14,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
  },
  statsContainer: {
    backgroundColor: '#F59E0B',
    marginHorizontal: 20,
    borderRadius: 16,
    flexDirection: 'row',
    paddingVertical: 20,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 24,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  activeTab: {},
  tabText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8B5CF6',
  },
  badgesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeItem: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  lockedBadge: {
    opacity: 0.5,
  },
  badgeIcon: {
    fontSize: 32,
  },
  lockedIcon: {
    opacity: 0.6,
  },
});