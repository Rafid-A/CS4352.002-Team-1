import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { savedCourses as coursesData } from '../../data/savedData';
import { savedCoursesStorage } from '../../utils/storage';
import { useTheme } from '../../context/ThemeContext';

export default function SavedCoursesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const fromRoute = params.from as string;
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [savedCourses, setSavedCourses] = useState<any[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [courseToRemove, setCourseToRemove] = useState<{id: number, title: string} | null>(null);

  // Load saved courses from storage
  useFocusEffect(
    React.useCallback(() => {
      const loadSavedCourses = async () => {
        try {
          const storedCourses = await savedCoursesStorage.get();
          setSavedCourses(storedCourses);
        } catch (error) {
          console.log('Error loading saved courses:', error);
        }
      };
      loadSavedCourses();
    }, [])
  );

  // Show confirmation modal
  const handleRemoveCourse = (courseId: number, courseTitle: string) => {
    console.log('Remove course button clicked for:', courseTitle, 'ID:', courseId);
    setCourseToRemove({ id: courseId, title: courseTitle });
    setShowConfirmModal(true);
  };

  // Actually remove the course
  const confirmRemoveCourse = async () => {
    if (!courseToRemove) return;
    
    console.log('User confirmed course removal, removing...');
    try {
      await savedCoursesStorage.remove(courseToRemove.id);
      console.log('Course removed from storage, refreshing list...');
      // Refresh the list
      const updatedCourses = await savedCoursesStorage.get();
      console.log('Updated courses:', updatedCourses.length);
      setSavedCourses(updatedCourses);
    } catch (error) {
      console.error('Error removing course:', error);
    } finally {
      setShowConfirmModal(false);
      setCourseToRemove(null);
    }
  };

  const cancelRemoveCourse = () => {
    console.log('User cancelled course removal');
    setShowConfirmModal(false);
    setCourseToRemove(null);
  };

  // Filter courses based on search
  const filteredCourses = savedCourses.filter((course) => {
    const query = searchQuery.toLowerCase().trim();
    if (query === '') return true;
    
    return (
      course.title.toLowerCase().includes(query) ||
      course.provider.toLowerCase().includes(query) ||
      course.category.toLowerCase().includes(query)
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
        <View style={styles.header}>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: colors.primaryLight }]}
            onPress={() => fromRoute ? router.push(fromRoute as any) : router.push('/(tabs)/' as any)}
            activeOpacity={0.7}
          >
            <Text style={[styles.backIcon, { color: colors.primary }]}>←</Text>
            <Text style={[styles.backText, { color: colors.primary }]}>Back</Text>
          </TouchableOpacity>
          
          <Text style={[styles.title, { color: colors.text }]}>Saved Courses</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Continue your learning journey</Text>

          {/* Search Bar */}
          <View style={[styles.searchContainer, { backgroundColor: colors.inputBackground }]}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search courses..."
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
            {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
          </Text>
        </View>

        {/* Courses List */}
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <View key={course.id} style={[styles.courseCard, { backgroundColor: colors.cardBackground }]}>
              <View style={styles.courseHeader}>
                <View style={[styles.categoryBadge, { backgroundColor: colors.primaryLight }]}>
                  <Text style={[styles.categoryText, { color: colors.primary }]}>{course.category}</Text>
                </View>
                <View style={[styles.levelBadge, { backgroundColor: colors.primaryLight }]}>
                  <Text style={[styles.levelText, { color: colors.primary }]}>{course.level}</Text>
                </View>
              </View>

              <Text style={[styles.courseTitle, { color: colors.text }]}>{course.title}</Text>
              <Text style={[styles.courseProvider, { color: colors.textSecondary }]}>{course.provider} • {course.duration}</Text>
              
              <Text style={[styles.courseDescription, { color: colors.textSecondary }]}>{course.description}</Text>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={[styles.externalButton, { backgroundColor: colors.primary }]}
                  activeOpacity={0.8}
                >
                  <Text style={styles.externalIcon}>🔗</Text>
                  <Text style={styles.externalText}>Open Course</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.removeButton, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
                  activeOpacity={0.8}
                  onPress={() => {
                    console.log('Course remove button pressed directly');
                    handleRemoveCourse(course.id, course.title);
                  }}
                >
                  <Text style={styles.removeIcon}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.noResults}>
            <Text style={styles.noResultsIcon}>
              {searchQuery.length > 0 ? '🔍' : '📚'}
            </Text>
            <Text style={[styles.noResultsTitle, { color: colors.text }]}>
              {searchQuery.length > 0 ? 'No courses found' : 'No saved courses yet'}
            </Text>
            <Text style={[styles.noResultsText, { color: colors.textSecondary }]}>
              {searchQuery.length > 0 
                ? 'Try adjusting your search terms' 
                : 'Courses you save will appear here'}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelRemoveCourse}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Remove Course</Text>
            <Text style={[styles.modalMessage, { color: colors.textSecondary }]}>
              Remove "{courseToRemove?.title}" from your saved courses?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.inputBackground }]}
                onPress={cancelRemoveCourse}
                activeOpacity={0.8}
              >
                <Text style={[styles.cancelButtonText, { color: colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.removeButtonModal]}
                onPress={confirmRemoveCourse}
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
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  backIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  backText: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    padding: 0,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearIcon: {
    fontSize: 18,
    fontWeight: '600',
  },
  resultsCount: {
    fontSize: 14,
    marginTop: 12,
    fontWeight: '500',
  },
  courseCard: {
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  courseHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
  },
  courseProvider: {
    fontSize: 14,
    marginBottom: 12,
  },
  courseDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  externalButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  externalIcon: {
    fontSize: 16,
  },
  externalText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  removeButton: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  removeIcon: {
    fontSize: 18,
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
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 15,
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
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 15,
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
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
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

