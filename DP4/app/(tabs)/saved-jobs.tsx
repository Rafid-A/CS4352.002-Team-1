import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Platform } from 'react-native';
import { savedJobs } from '../../data/savedData';
import { savedJobsStorage } from '../../utils/storage';
import { useTheme } from '../../context/ThemeContext';

export default function SavedJobsPage() {
    const router = useRouter();
  const params = useLocalSearchParams();
  const fromRoute = params.from as string;
  const currentRoute = '/(tabs)/saved-jobs';
  const { colors } = useTheme();
  
  const [careers, setCareers] = useState<any[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [jobToRemove, setJobToRemove] = useState<{id: number, title: string} | null>(null);

  // Load saved jobs from storage
  useFocusEffect(
    React.useCallback(() => {
      const loadSavedJobs = async () => {
        try {
          const storedJobs = await savedJobsStorage.get();
          setCareers(storedJobs);
        } catch (error) {
          console.log('Error loading saved jobs:', error);
        }
      };
      loadSavedJobs();
    }, [])
  );

  // Show confirmation modal
  const handleRemoveJob = (jobId: number, jobTitle: string) => {
    console.log('Remove button clicked for:', jobTitle, 'ID:', jobId);
    setJobToRemove({ id: jobId, title: jobTitle });
    setShowConfirmModal(true);
  };

  // Actually remove the job
  const confirmRemoveJob = async () => {
    if (!jobToRemove) return;
    
    console.log('User confirmed removal, removing job...');
    try {
      await savedJobsStorage.remove(jobToRemove.id);
      console.log('Job removed from storage, refreshing list...');
      // Refresh the list
      const updatedJobs = await savedJobsStorage.get();
      console.log('Updated jobs:', updatedJobs.length);
      setCareers(updatedJobs);
    } catch (error) {
      console.error('Error removing job:', error);
    } finally {
      setShowConfirmModal(false);
      setJobToRemove(null);
    }
  };

  const cancelRemoveJob = () => {
    console.log('User cancelled removal');
    setShowConfirmModal(false);
    setJobToRemove(null);
  };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Header with Back Button */}
            <View style={styles.header}>
              <TouchableOpacity 
                onPress={() => fromRoute ? router.push(fromRoute as any) : router.push('/(tabs)/' as any)} 
                style={[styles.backButton, { backgroundColor: colors.primaryLight }]}
                activeOpacity={0.7}
              >
                <Text style={styles.backIcon}>←</Text>
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
            </View>
    
            {/* Title Section */}
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { color: colors.text }]}>Saved Jobs</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                View the jobs you've saved
              </Text>
            </View>
    
            {/* Career Cards */}
            <View style={styles.careerContainer}>
              {careers.length > 0 ? (
                careers.map((career, index) => (
                  <View key={index} style={[styles.careerCard, { backgroundColor: colors.cardBackground }]}>
                    <TouchableOpacity 
                      style={styles.careerContent}
                      activeOpacity={0.8}
                      onPress={() => {
                        if (career.title === 'Illustrator') {
                          router.push({ pathname: '/(tabs)/illustrator', params: { from: currentRoute } } as any);
                        } else if (career.title === 'Art Director') {
                          router.push({ pathname: '/(tabs)/art-director', params: { from: currentRoute } } as any);
                        }
                      }}
                    >
                      <View style={styles.careerInfo}>
                        <Text style={[styles.careerTitle, { color: colors.text }]}>{career.title}</Text>
                        <View style={styles.careerDetails}>
                          <Text style={[styles.salaryText, { color: colors.textSecondary }]}>{career.salary}</Text>
                          <Text style={[styles.dot, { color: colors.textTertiary }]}>•</Text>
                          <View style={[styles.growthIndicator, { backgroundColor: career.growthColor }]} />
                          <Text style={[styles.growthText, { color: colors.textSecondary }]}>{career.growth}</Text>
                        </View>
                      </View>
                      <View style={[styles.arrowContainer, { backgroundColor: colors.primaryLight }]}>
                        <Text style={styles.arrowIcon}>→</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => {
                        console.log('Remove button pressed directly');
                        handleRemoveJob(career.id, career.title);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.removeIcon}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyIcon}>💼</Text>
                  <Text style={[styles.emptyTitle, { color: colors.text }]}>No saved jobs yet</Text>
                  <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Jobs you save will appear here</Text>
                </View>
              )}
            </View>



          </ScrollView>

          {/* Confirmation Modal */}
          <Modal
            visible={showConfirmModal}
            transparent={true}
            animationType="fade"
            onRequestClose={cancelRemoveJob}
          >
            <View style={styles.modalOverlay}>
              <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>Remove Job</Text>
                <Text style={[styles.modalMessage, { color: colors.textSecondary }]}>
                  Remove "{jobToRemove?.title}" from saved jobs?
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton, { backgroundColor: colors.inputBackground }]}
                    onPress={cancelRemoveJob}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.cancelButtonText, { color: colors.text }]}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.removeButtonModal]}
                    onPress={confirmRemoveJob}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
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
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#1F2937',
    marginRight: 4,
  },
  backText: {
    fontSize: 16,
    color: '#1F2937',
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  careerContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  careerCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: '#60A5FA',
    overflow: 'hidden',
  },
  careerContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  careerInfo: {
    flex: 1,
  },
  careerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  careerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  salaryText: {
    fontSize: 14,
    color: '#4B5563',
    marginRight: 8,
  },
  dot: {
    fontSize: 14,
    color: '#9CA3AF',
    marginRight: 8,
  },
  growthIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  growthText: {
    fontSize: 14,
    color: '#4B5563',
  },
  arrowContainer: {
    backgroundColor: '#E0E7FF',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#9333EA',
  },
  removeButton: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#FCA5A5',
    width: '100%',
    minHeight: 44, // Ensure minimum touch target
  },
  removeIcon: {
    fontSize: 18,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
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
  removeButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});