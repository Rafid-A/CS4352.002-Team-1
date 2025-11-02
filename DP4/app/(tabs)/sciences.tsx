import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function SciencesPage() {
  const router = useRouter();

  const careers = [
    {
      title: 'Data Scientist',
      salary: '$90K - $150K',
      growth: 'Very High Growth',
      growthColor: '#22C55E'
    },
    {
      title: 'Research Scientist',
      salary: '$70K - $120K',
      growth: 'High Growth',
      growthColor: '#9333EA'
    },
    {
      title: 'Biotech Engineer',
      salary: '$75K - $130K',
      growth: 'High Growth',
      growthColor: '#9333EA'
    },
    {
      title: 'Environmental Scientist',
      salary: '$60K - $100K',
      growth: 'Medium Growth',
      growthColor: '#3B82F6'
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
          <Text style={styles.title}>Sciences</Text>
          <Text style={styles.subtitle}>
            Explore careers in research, healthcare, and scientific innovation
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
                if (career.title === 'Data Scientist') {
                  router.push('/data-scientist' as any);
                } else if (career.title === 'Research Scientist') {
                  router.push('/research-scientist' as any);
                } else if (career.title === 'Biotech Engineer') {
                  router.push('/biotech-engineer' as any);
                } else if (career.title === 'Environmental Scientist') {
                  router.push('/environmental-scientist' as any);
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
          
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.quizButton} activeOpacity={0.8} onPress={() => router.push('/quiz' as any)}>
              <Text style={styles.quizButtonText}>Take Quiz</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.mentorButton} 
              activeOpacity={0.8}
              onPress={() => router.push('/mentors' as any)}
            >
              <Text style={styles.mentorButtonText}>Find Mentor</Text>
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
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  quizButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  quizButtonText: {
    color: '#1F2937',
    fontWeight: '600',
    fontSize: 15,
  },
  mentorButton: {
    flex: 1,
    backgroundColor: '#D946EF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  mentorButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
});