import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function TechnologyPage() {
  const router = useRouter();

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
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>←</Text>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Technology</Text>
          <Text style={styles.subtitle}>
            Find opportunities in software, design, and tech innovation
          </Text>
        </View>

        {/* Career Cards */}
        <View style={styles.careerContainer}>
          {careers.map((career, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.careerCard}
              activeOpacity={0.8}
              onPress={() => {
                if (career.title === 'UX Designer') {
                  router.push('/ux-designer' as any);
                } else if (career.title === 'Software Engineer') {
                  router.push('/software-engineer' as any);
                } else if (career.title === 'Product Manager') {
                  router.push('/product-manager' as any);
                } else if (career.title === 'DevOps Engineer') {
                  router.push('/devops-engineer' as any);
                }
              }}
            >
              <View style={styles.careerInfo}>
                <Text style={styles.careerTitle}>{career.title}</Text>
                <View style={styles.careerDetails}>
                  <Text style={styles.salaryText}>{career.salary}</Text>
                  <Text style={styles.dot}>•</Text>
                  <View style={[styles.growthIndicator, { backgroundColor: career.growthColor }]} />
                  <Text style={styles.growthText}>{career.growth}</Text>
                </View>
              </View>
              <View style={styles.arrowContainer}>
                <Text style={styles.arrowIcon}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Guidance Section */}
        <View style={styles.guidanceContainer}>
          <Text style={styles.guidanceTitle}>Need guidance?</Text>
          <Text style={styles.guidanceSubtitle}>
            Take our career quiz or connect with a mentor to find the perfect path for you.
          </Text>
          
          <View style={styles.buttonColumn}>
            <TouchableOpacity 
              style={styles.mentorButton} 
              activeOpacity={0.8}
              onPress={() => router.push('/mentors' as any)}
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

            <TouchableOpacity style={styles.quizButton} activeOpacity={0.8} onPress={() => router.push('/quiz' as any)}>
              <Text style={styles.quizButtonText}>Take Career Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: '#60A5FA',
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
  guidanceContainer: {
    backgroundColor: '#FCE7F3',
    marginHorizontal: 24,
    marginBottom: 40,
    padding: 24,
    borderRadius: 16,
  },
  guidanceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7E22CE',
    marginBottom: 8,
  },
  guidanceSubtitle: {
    fontSize: 14,
    color: '#7E22CE',
    lineHeight: 20,
    marginBottom: 20,
  },
  buttonColumn: {
    gap: 12,
  },
  mentorButton: {
    backgroundColor: '#9333EA',
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
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#9333EA',
  },
  quizButtonText: {
    color: '#9333EA',
    fontWeight: '600',
    fontSize: 16,
  },
});