import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function InvestmentBankerPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const fromRoute = params.from as string;
  const currentRoute = '/(tabs)/investment-banker';

  const responsibilities = [
    'Advise clients on mergers and acquisitions',
    'Raise capital through debt and equity offerings',
    'Conduct financial modeling and valuations',
    'Build relationships with clients and investors',
    'Present investment strategies and recommendations'
  ];

  const skills = [
    'Financial Modeling',
    'Valuation',
    'Excel/PowerPoint',
    'Deal Structuring',
    'Client Relations'
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => fromRoute ? router.push(fromRoute as any) : router.push('/(tabs)/' as any)} 
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>←</Text>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* Category Tag */}
        <View style={styles.tagContainer}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>Business</Text>
          </View>
        </View>

        {/* Job Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Investment Banker</Text>
        </View>

        {/* Info Cards */}
        <View style={styles.infoCardsContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>$</Text>
            <Text style={styles.infoLabel}>Salary Range</Text>
            <Text style={styles.infoValue}>$100K - $200K</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>↗</Text>
            <Text style={styles.infoLabel}>Job Growth</Text>
            <Text style={styles.infoValue}>Very High</Text>
            <Text style={styles.infoSubValue}>(19% annually)</Text>
          </View>
        </View>

        {/* About the Role */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the Role</Text>
          <Text style={styles.aboutText}>
            Investment Bankers help companies and governments raise capital and provide strategic advisory services. They work on high-stakes deals including mergers, acquisitions, and initial public offerings (IPOs).
          </Text>
        </View>

        {/* Key Responsibilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Responsibilities</Text>
          {responsibilities.map((responsibility, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bullet} />
              <Text style={styles.listText}>{responsibility}</Text>
            </View>
          ))}
        </View>

        {/* Required Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Required Skills</Text>
          <View style={styles.skillsContainer}>
            {skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.educationContainer}>
            <View style={styles.educationIcon}>
              <Text style={styles.educationIconText}>🎓</Text>
            </View>
            <Text style={styles.educationText}>
              Bachelor's degree in Finance, Economics, or Business (MBA from top school highly preferred)
            </Text>
          </View>
        </View>

        {/* Bottom spacing for buttons */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.mentorButton} 
          activeOpacity={0.8}
          onPress={() => router.push({ pathname: '/(tabs)/mentors', params: { from: currentRoute } } as any)}
        >
          <Text style={styles.mentorButtonText}>Find a Mentor</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.coursesButton} 
          activeOpacity={0.8}
          onPress={() => router.push('/courses?career=investment-banker' as any)}
        >
          <Text style={styles.coursesButtonText}>View Courses & Certifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quizButton} activeOpacity={0.8} onPress={() => router.push({ pathname: '/(tabs)/quiz', params: { from: currentRoute } } as any)}>
          <Text style={styles.quizButtonText}>Take Career Quiz</Text>
        </TouchableOpacity>
      </View>
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
  tagContainer: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  categoryTag: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  categoryText: {
    color: '#9333EA',
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
    color: '#1F2937',
  },
  infoCardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoIcon: {
    fontSize: 24,
    color: '#9333EA',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  infoSubValue: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 15,
    color: '#4B5563',
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
    backgroundColor: '#9333EA',
    marginTop: 8,
    marginRight: 12,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 24,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillTag: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E879F9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skillText: {
    color: '#C026D3',
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
    color: '#4B5563',
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  mentorButton: {
    backgroundColor: '#9333EA',
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
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  quizButtonText: {
    color: '#1F2937',
    fontWeight: '600',
    fontSize: 16,
  },
});

