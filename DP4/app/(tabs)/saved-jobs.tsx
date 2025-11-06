import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SavedJobsPage() {
    const router = useRouter();


    const careers = [
    {
      title: 'Illustrator',
      salary: '$45K - $85K',
      growth: 'Medium Growth',
      growthColor: '#3B82F6'
    },
    {
      title: 'Art Director',
      salary: '$70K - $130K',
      growth: 'High Growth',
      growthColor: '#9333EA'
    }
    ]

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
              <Text style={styles.title}>Saved Jobs</Text>
              <Text style={styles.subtitle}>
                View the jobs you've saved
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
                    if (career.title === 'Illustrator') {
                      router.push('/illustrator' as any);
                    } else if (career.title === 'Art Director') {
                      router.push('/art-director' as any);
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
});