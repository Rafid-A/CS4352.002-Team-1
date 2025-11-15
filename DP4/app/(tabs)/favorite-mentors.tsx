import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { favoriteMentors as mentorsData } from '../../data/savedData';
import { favoriteMentorsStorage } from '../../utils/storage';
import { useTheme } from '../../context/ThemeContext';

export default function FavoriteMentorsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const fromRoute = params.from as string;
  const currentRoute = '/(tabs)/favorite-mentors';
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteMentors, setFavoriteMentors] = useState<any[]>([]);
  const { colors } = useTheme();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [mentorToRemove, setMentorToRemove] = useState<{id: number, name: string} | null>(null);

  // Load favorite mentors from storage
  useFocusEffect(
    React.useCallback(() => {
      const loadFavoriteMentors = async () => {
        try {
          const storedMentors = await favoriteMentorsStorage.get();
          setFavoriteMentors(storedMentors);
        } catch (error) {
          console.log('Error loading favorite mentors:', error);
        }
      };
      loadFavoriteMentors();
    }, [])
  );

  // Show confirmation modal
  const handleRemoveMentor = (mentorId: number, mentorName: string) => {
    console.log('Remove mentor button clicked for:', mentorName, 'ID:', mentorId);
    setMentorToRemove({ id: mentorId, name: mentorName });
    setShowConfirmModal(true);
  };

  // Actually remove the mentor
  const confirmRemoveMentor = async () => {
    if (!mentorToRemove) return;
    
    console.log('User confirmed mentor removal, removing...');
    try {
      await favoriteMentorsStorage.remove(mentorToRemove.id);
      console.log('Mentor removed from storage, refreshing list...');
      // Refresh the list
      const updatedMentors = await favoriteMentorsStorage.get();
      console.log('Updated mentors:', updatedMentors.length);
      setFavoriteMentors(updatedMentors);
    } catch (error) {
      console.error('Error removing mentor:', error);
    } finally {
      setShowConfirmModal(false);
      setMentorToRemove(null);
    }
  };

  const cancelRemoveMentor = () => {
    console.log('User cancelled mentor removal');
    setShowConfirmModal(false);
    setMentorToRemove(null);
  };

  // Filter mentors based on search
  const filteredMentors = favoriteMentors.filter((mentor) => {
    const query = searchQuery.toLowerCase().trim();
    if (query === '') return true;
    
    return (
      mentor.name.toLowerCase().includes(query) ||
      mentor.company.toLowerCase().includes(query) ||
      mentor.title.toLowerCase().includes(query)
    );
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.cardBackground }]}>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: colors.primaryLight }]}
            onPress={() => fromRoute ? router.push(fromRoute as any) : router.push('/(tabs)/' as any)}
            activeOpacity={0.7}
          >
            <Text style={[styles.backIcon, { color: colors.primary }]}>←</Text>
            <Text style={[styles.backText, { color: colors.primary }]}>Back</Text>
          </TouchableOpacity>
          
          <Text style={[styles.title, { color: colors.text }]}>Favorite Mentors</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Connect with your saved mentors</Text>

          {/* Search Bar */}
          <View style={[styles.searchContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search mentors..."
              placeholderTextColor={colors.textTertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                onPress={() => setSearchQuery('')}
                style={styles.clearButton}
                activeOpacity={0.7}
              >
                <Text style={[styles.clearIcon, { color: colors.textTertiary }]}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Results count */}
          <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
            {filteredMentors.length} {filteredMentors.length === 1 ? 'mentor' : 'mentors'}
          </Text>
        </View>

        {/* Mentors List */}
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor, index) => (
            <View key={mentor.id} style={[styles.mentorCard, { backgroundColor: colors.cardBackground }, index === 0 && styles.firstMentorCard]}>
              <View style={styles.mentorHeader}>
                <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
                  <Text style={styles.avatarText}>{mentor.initials}</Text>
                </View>
                <View style={styles.mentorInfo}>
                  <Text style={[styles.mentorName, { color: colors.text }]}>{mentor.name}</Text>
                  <Text style={[styles.mentorTitle, { color: colors.textSecondary }]}>{mentor.title}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.star}>⭐</Text>
                    <Text style={[styles.rating, { color: colors.text }]}>{mentor.rating}</Text>
                    <Text style={[styles.sessions, { color: colors.textTertiary }]}> • {mentor.sessions} sessions</Text>
                  </View>
                </View>
              </View>

              <View style={styles.mentorDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>🏢</Text>
                  <Text style={[styles.detailText, { color: colors.textSecondary }]}>{mentor.company}</Text>
                </View>
              </View>

              <Text style={[styles.bio, { color: colors.textSecondary }]}>{mentor.bio}</Text>

              <View style={styles.skills}>
                {mentor.skills.map((skill, index) => (
                  <View key={index} style={[styles.skillBadge, { backgroundColor: colors.primaryLight }]}>
                    <Text style={[styles.skillText, { color: colors.primary }]}>{skill}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={[styles.connectButton, { backgroundColor: colors.primary }]}
                  activeOpacity={0.8}
                  onPress={() => router.push({
                    pathname: '/(tabs)/chat',
                    params: {
                      name: mentor.name,
                      title: mentor.title,
                      company: mentor.company,
                      initials: mentor.initials,
                      bio: mentor.bio,
                      skills: mentor.skills.join(', '),
                      from: currentRoute
                    }
                  } as any)}
                >
                  <Text style={styles.connectIcon}>💬</Text>
                  <Text style={styles.connectText}>Message</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.removeButton, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
                  activeOpacity={0.8}
                  onPress={() => {
                    console.log('Mentor remove button pressed directly');
                    handleRemoveMentor(mentor.id, mentor.name);
                  }}
                >
                  <Text style={styles.removeIcon}>🗑️</Text>
                  <Text style={[styles.removeText, { color: colors.text }]}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.noResults}>
            <Text style={styles.noResultsIcon}>
              {searchQuery.length > 0 ? '🔍' : '👥'}
            </Text>
            <Text style={[styles.noResultsTitle, { color: colors.text }]}>
              {searchQuery.length > 0 ? 'No mentors found' : 'No favorite mentors yet'}
            </Text>
            <Text style={[styles.noResultsText, { color: colors.textSecondary }]}>
              {searchQuery.length > 0 
                ? 'Try adjusting your search terms' 
                : 'Mentors you favorite will appear here'}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelRemoveMentor}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Remove Mentor</Text>
            <Text style={[styles.modalMessage, { color: colors.textSecondary }]}>
              Remove "{mentorToRemove?.name}" from your favorites?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton, { backgroundColor: colors.inputBackground }]}
                onPress={cancelRemoveMentor}
                activeOpacity={0.8}
              >
                <Text style={[styles.cancelButtonText, { color: colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.removeButtonModal]}
                onPress={confirmRemoveMentor}
                activeOpacity={0.8}
              >
                <Text style={styles.removeButtonTextModal}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backIcon: {
    fontSize: 20,
    marginRight: 4,
  },
  backText: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
    padding: 0,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearIcon: {
    fontSize: 18,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  resultsCount: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 12,
    fontWeight: '500',
  },
  mentorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  firstMentorCard: {
    marginTop: 24,
  },
  mentorHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#C084FC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  mentorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  mentorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  mentorTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 14,
    marginRight: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  sessions: {
    fontSize: 14,
    color: '#6B7280',
  },
  mentorDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  bio: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  skillBadge: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skillText: {
    fontSize: 13,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  connectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  connectIcon: {
    fontSize: 18,
  },
  connectText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  removeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
  },
  removeIcon: {
    fontSize: 18,
  },
  removeText: {
    fontSize: 15,
    fontWeight: '600',
  },
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  noResultsIcon: {
    fontSize: 64,
    marginBottom: 16,
    opacity: 0.5,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  removeButtonModal: {
    backgroundColor: '#DC2626',
  },
  removeButtonTextModal: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

