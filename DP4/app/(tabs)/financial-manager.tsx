import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import JobFooter from '../../components/JobFooter';
import { savedJobsStorage } from '../../utils/storage';

export default function FinancialManagerPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const fromRoute = params.from as string;
  const currentRoute = '/(tabs)/financial-manager';
  const { colors } = useTheme();
  
  const [isSaved, setIsSaved] = useState(false);

  // Job data for this position
  const jobData = {
    id: 11,
    title: 'Financial Manager',
    salary: '$85K - $150K',
    growth: 'High Growth',
    growthColor: '#9333EA'
  };

  // Check if job is already saved
  useFocusEffect(
    React.useCallback(() => {
      const checkIfSaved = async () => {
        const saved = await savedJobsStorage.isSaved(jobData.id);
        setIsSaved(saved);
      };
      checkIfSaved();
    }, [])
  );

  // Toggle save status
  const toggleSave = async () => {
    if (isSaved) {
      await savedJobsStorage.remove(jobData.id);
      setIsSaved(false);
    } else {
      await savedJobsStorage.add(jobData);
      setIsSaved(true);
    }
  };

  const responsibilities = [
    'Oversee financial operations and reporting',
    'Develop budgets and financial forecasts',
    'Analyze financial data and market trends',
    'Ensure compliance with regulations',
    'Lead financial planning and strategy'
  ];

  const skills = [
    'Financial Analysis',
    'Budgeting',
    'Excel/Financial Software',
    'Risk Management',
    'Leadership'
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Back Button and Save Button */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => fromRoute ? router.push(fromRoute as any) : router.push('/(tabs)/' as any)} 
            style={[styles.backButton, { backgroundColor: colors.primaryLight }]}
            activeOpacity={0.7}
          >
            <Text style={[styles.backIcon, { color: colors.primary }]}>←</Text>
            <Text style={[styles.backText, { color: colors.primary }]}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={toggleSave} 
            style={[styles.saveButton, { backgroundColor: colors.inputBackground }]}
            activeOpacity={0.7}
          >
            <Text style={styles.saveIcon}>{isSaved ? '❤️' : '🤍'}</Text>
            <Text style={[styles.saveText, { color: colors.text }]}>{isSaved ? 'Saved' : 'Save'}</Text>
          </TouchableOpacity>
        </View>

        {/* Category Tag */}
        <View style={styles.tagContainer}>
          <View style={[styles.categoryTag, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.categoryText, { color: colors.primary }]}>Business</Text>
          </View>
        </View>

        {/* Job Title */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.text }]}>Financial Manager</Text>
        </View>

        {/* Info Cards */}
        <View style={styles.infoCardsContainer}>
          <View style={[styles.infoCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <Text style={[styles.infoIcon, { color: colors.primary }]}>$</Text>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Salary Range</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>$85K - $150K</Text>
          </View>

          <View style={[styles.infoCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <Text style={[styles.infoIcon, { color: colors.primary }]}>↗</Text>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Job Growth</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>High</Text>
            <Text style={[styles.infoSubValue, { color: colors.textSecondary }]}>(17% annually)</Text>
          </View>
        </View>

        {/* About the Role */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About the Role</Text>
          <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
            Financial Managers oversee an organization's financial health. They produce financial reports, develop strategies for long-term financial goals, and ensure the company's financial operations run efficiently and comply with regulations.
          </Text>
        </View>

        {/* Key Responsibilities */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Responsibilities</Text>
          {responsibilities.map((responsibility, index) => (
            <View key={index} style={styles.listItem}>
              <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
              <Text style={[styles.listText, { color: colors.textSecondary }]}>{responsibility}</Text>
            </View>
          ))}
        </View>

        {/* Required Skills */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Required Skills</Text>
          <View style={styles.skillsContainer}>
            {skills.map((skill, index) => (
              <View key={index} style={[styles.skillTag, { backgroundColor: colors.cardBackground, borderColor: colors.primary }]}>
                <Text style={[styles.skillText, { color: colors.primary }]}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Education</Text>
          <View style={styles.educationContainer}>
            <View style={styles.educationIcon}>
              <Text style={styles.educationIconText}>🎓</Text>
            </View>
            <Text style={[styles.educationText, { color: colors.textSecondary }]}>
              Bachelor's degree in Finance, Accounting, Business Administration, or related field (CPA or MBA preferred)
            </Text>
          </View>
        </View>

        {/* Bottom spacing for buttons */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Buttons */}
      <JobFooter currentRoute={currentRoute} careerName="financial-manager" />
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
  },
  backIcon: {
    fontSize: 20,
    marginRight: 4,
  },
  backText: {
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  saveIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  saveText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tagContainer: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  categoryTag: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  titleContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  infoCardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  infoCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  infoIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoSubValue: {
    fontSize: 12,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 15,
    lineHeight: 24,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: 12,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillTag: {
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skillText: {
    fontSize: 14,
    fontWeight: '500',
  },
  educationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  educationIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  educationIconText: {
    fontSize: 24,
  },
  educationText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
  },
  bottomSpacer: {
    height: 140,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    gap: 12,
  },
  mentorButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  mentorButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  coursesButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  coursesButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  quizButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  quizButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
});

