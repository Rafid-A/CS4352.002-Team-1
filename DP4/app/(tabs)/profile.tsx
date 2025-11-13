import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Switch } from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { savedJobs, favoriteMentors, savedCourses } from '../../data/savedData';
import { savedJobsStorage, favoriteMentorsStorage, savedCoursesStorage } from '../../utils/storage';
import { useTheme } from '../../context/ThemeContext';

export default function ProfileScreen() {
  const router = useRouter();
  const currentRoute = '/(tabs)/profile';
  const params = useLocalSearchParams();
  const fromRoute = params.from as string;
  const { isDarkMode, toggleDarkMode, colors } = useTheme();
  
  // User settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [username, setUsername] = useState('User');
  
  // Dynamic counts from storage
  const [savedJobsCount, setSavedJobsCount] = useState(0);
  const [favoriteMentorsCount, setFavoriteMentorsCount] = useState(0);
  const [savedCoursesCount, setSavedCoursesCount] = useState(0);

  // Load username from storage
  useEffect(() => {
    const loadUsername = async () => {
      try {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.log('Error loading username:', error);
      }
    };
    loadUsername();
  }, []);

  // Load counts from storage - refresh every time the page is focused
  useFocusEffect(
    React.useCallback(() => {
      const loadCounts = async () => {
        try {
          const jobs = await savedJobsStorage.get();
          const mentors = await favoriteMentorsStorage.get();
          const courses = await savedCoursesStorage.get();
          
          setSavedJobsCount(jobs.length);
          setFavoriteMentorsCount(mentors.length);
          setSavedCoursesCount(courses.length);
        } catch (error) {
          console.log('Error loading counts:', error);
        }
      };
      loadCounts();
    }, [])
  );

  // Get initials from username
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Sample data - In a real app, this would come from a database/API
  const userProfile = {
    name: username,
    location: 'San Francisco, CA',
    memberSince: 'January 2024',
    careerField: 'Technology',
    initials: getInitials(username),
  };


  const stats = [
    { label: 'Saved Jobs', value: savedJobsCount, icon: '💼' },
    { label: 'Mentors', value: favoriteMentorsCount, icon: '👥' },
    { label: 'Courses', value: savedCoursesCount, icon: '📚' },
    { label: 'Career Field', value: userProfile.careerField, icon: '🎯' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
          <TouchableOpacity 
            style={styles.editButton}
            activeOpacity={0.7}
            onPress={() => {/* Edit profile logic */}}
          >
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>{userProfile.initials}</Text>
          </View>
          <Text style={[styles.profileName, { color: colors.text }]}>{userProfile.name}</Text>
          <View style={styles.profileMetaRow}>
            <Text style={[styles.profileMeta, { color: colors.textTertiary }]}>📍 {userProfile.location}</Text>
            <Text style={[styles.profileMetaDot, { color: colors.border }]}>•</Text>
            <Text style={[styles.profileMeta, { color: colors.textTertiary }]}>Member since {userProfile.memberSince}</Text>
          </View>
        </View>

        {/* Stats Grid - Now Clickable */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => {
            const isClickable = stat.label === 'Saved Jobs' || stat.label === 'Mentors' || stat.label === 'Courses';
            const StatWrapper = isClickable ? TouchableOpacity : View;
            const statProps = isClickable ? {
              activeOpacity: 0.7,
              onPress: () => {
                if (stat.label === 'Saved Jobs') {
                  router.push({ pathname: '/(tabs)/saved-jobs', params: { from: currentRoute } } as any);
                } else if (stat.label === 'Mentors') {
                  router.push({ pathname: '/(tabs)/favorite-mentors', params: { from: currentRoute } } as any);
                } else if (stat.label === 'Courses') {
                  router.push({ pathname: '/(tabs)/saved-courses', params: { from: currentRoute } } as any);
                }
              }
            } : {};
            
            return (
              <StatWrapper key={index} style={[styles.statCard, { backgroundColor: colors.cardBackground }]} {...statProps}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
                {isClickable && <Text style={styles.statArrow}>→</Text>}
              </StatWrapper>
            );
          })}
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>⚙️ Settings & Preferences</Text>
          
          <View style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Push Notifications</Text>
              <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>Get notified about new jobs and messages</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#D1D5DB', true: '#C084FC' }}
              thumbColor={notificationsEnabled ? '#9333EA' : '#F3F4F6'}
            />
          </View>

          <View style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Email Updates</Text>
              <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>Receive weekly career insights</Text>
            </View>
            <Switch
              value={emailUpdates}
              onValueChange={setEmailUpdates}
              trackColor={{ false: '#D1D5DB', true: '#C084FC' }}
              thumbColor={emailUpdates ? '#9333EA' : '#F3F4F6'}
            />
          </View>

          <View style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Dark Mode</Text>
              <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>Switch to dark theme</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#D1D5DB', true: '#C084FC' }}
              thumbColor={isDarkMode ? '#9333EA' : '#F3F4F6'}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.cardBackground }]}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonIcon}>🔒</Text>
            <Text style={[styles.actionButtonText, { color: colors.text }]}>Privacy & Security</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.cardBackground }]}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonIcon}>❓</Text>
            <Text style={[styles.actionButtonText, { color: colors.text }]}>Help & Support</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.logoutButton]}
            activeOpacity={0.8}
            onPress={() => {
              // Logout logic
              router.push('/(tabs)/login' as any);
            }}
          >
            <Text style={styles.actionButtonIcon}>🚪</Text>
            <Text style={[styles.actionButtonText, styles.logoutText]}>Log Out</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2F8',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    fontSize: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#9333EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarLargeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  profileMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileMeta: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  profileMetaDot: {
    fontSize: 13,
    color: '#D1D5DB',
    marginHorizontal: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  statArrow: {
    fontSize: 16,
    color: '#9333EA',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  viewAllButton: {
    fontSize: 14,
    color: '#9333EA',
    fontWeight: '500',
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  mentorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#C084FC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  mentorAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemMetaText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  itemMetaDot: {
    fontSize: 13,
    color: '#D1D5DB',
    marginHorizontal: 6,
  },
  growthIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  ratingText: {
    fontSize: 13,
    color: '#F59E0B',
    fontWeight: '600',
  },
  itemArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    fontSize: 18,
    color: '#9333EA',
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  courseInfo: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#9333EA',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9333EA',
    minWidth: 40,
  },
  settingItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1F2937',
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
  },
  logoutText: {
    color: '#DC2626',
  },
  bottomPadding: {
    height: 24,
  },
});

