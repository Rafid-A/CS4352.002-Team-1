import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useThemedStyles } from '../../hooks/useThemedStyles';

export default function TechnologyPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const fromRoute = params.from as string;
  const currentRoute = '/(tabs)/technology';
  const { colors, globalStyles } = useThemedStyles();

  const careers = [
    {
      title: 'UX Designer',
      salary: '$70K - $120K',
      growth: 'High Growth',
      growthColor: '#9333EA'
    },
    {
      title: 'Software Engineer',
      salary: '$90K - $160K',
      growth: 'Very High Growth',
      growthColor: '#22C55E'
    },
    {
      title: 'Product Manager',
      salary: '$95K - $170K',
      growth: 'High Growth',
      growthColor: '#9333EA'
    },
    {
      title: 'DevOps Engineer',
      salary: '$85K - $145K',
      growth: 'Very High Growth',
      growthColor: '#22C55E'
    }
  ];

  return (
    <View style={globalStyles.container}>
      <ScrollView style={globalStyles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <View style={[styles.header, { backgroundColor: colors.background }]}>
          <TouchableOpacity 
            onPress={() => fromRoute ? router.push(fromRoute as any) : router.push('/(tabs)/' as any)} 
            style={globalStyles.backButton}
            activeOpacity={0.7}
          >
            <Text style={globalStyles.backIcon}>←</Text>
            <Text style={globalStyles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.text }]}>Technology</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Find opportunities in software, design, and tech innovation
          </Text>
        </View>

        {/* Career Cards */}
        <View style={styles.careerContainer}>
          {careers.map((career, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.careerCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
              activeOpacity={0.8}
              onPress={() => {
                if (career.title === 'UX Designer') {
                  router.push({ pathname: '/(tabs)/ux-designer', params: { from: currentRoute } } as any);
                } else if (career.title === 'Software Engineer') {
                  router.push({ pathname: '/(tabs)/software-engineer', params: { from: currentRoute } } as any);
                } else if (career.title === 'Product Manager') {
                  router.push({ pathname: '/(tabs)/product-manager', params: { from: currentRoute } } as any);
                } else if (career.title === 'DevOps Engineer') {
                  router.push({ pathname: '/(tabs)/devops-engineer', params: { from: currentRoute } } as any);
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
                <Text style={[styles.arrowIcon, { color: colors.primary }]}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Guidance Section */}
        <View style={[styles.guidanceContainer, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.guidanceTitle, { color: colors.primaryDark }]}>Need guidance?</Text>
          <Text style={[styles.guidanceSubtitle, { color: colors.primaryDark }]}>
            Take our career quiz or connect with a mentor to find the perfect path for you.
          </Text>
          
          <View style={styles.buttonColumn}>
            <TouchableOpacity 
              style={[styles.mentorButton, { backgroundColor: colors.primary }]}
              activeOpacity={0.8}
              onPress={() => router.push({ pathname: '/(tabs)/mentors', params: { from: currentRoute } } as any)}
            >
              <Text style={styles.mentorButtonText}>Find Mentor</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.coursesButton} 
              activeOpacity={0.8}
              onPress={() => router.push('/courses?category=technology' as any)}
            >
              <Text style={styles.coursesButtonText}>Browse Courses</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.quizButton, { backgroundColor: colors.cardBackground, borderColor: colors.primary }]} activeOpacity={0.8} onPress={() => router.push({ pathname: '/(tabs)/quiz', params: { from: currentRoute } } as any)}>
              <Text style={[styles.quizButtonText, { color: colors.primary }]}>Take Career Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  careerContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  careerCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderStyle: 'dotted',
  },
  careerInfo: {
    flex: 1,
  },
  careerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  careerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  salaryText: {
    fontSize: 14,
    marginRight: 8,
  },
  dot: {
    fontSize: 14,
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
  },
  arrowContainer: {
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    fontSize: 20,
  },
  guidanceContainer: {
    marginHorizontal: 24,
    marginBottom: 40,
    padding: 24,
    borderRadius: 16,
  },
  guidanceTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  guidanceSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  buttonColumn: {
    gap: 12,
  },
  mentorButton: {
    paddingVertical: 14,
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
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  coursesButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  quizButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  quizButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
});