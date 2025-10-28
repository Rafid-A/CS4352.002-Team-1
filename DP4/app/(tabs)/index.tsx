import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function PathFinderApp() {
  const [searchQuery, setSearchQuery] = useState('');

  const interests = [
    { name: 'Sciences', icon: '🔬' },
    { name: 'Arts', icon: '🎨' },
    { name: 'Technology', icon: '💻' },
    { name: 'Business', icon: '📈' }
  ];

  const careerPaths = [
    { title: 'UX Designer', category: 'Technology' },
    { title: 'Data Scientist', category: 'Technology' },
    { title: 'Marketing Manager', category: 'Business' },
    { title: 'Graphic Designer', category: 'Arts' }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>PathFinder</Text>
          <Text style={styles.subtitle}>Discover your dream career path</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="Search career paths and interests..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        <View style={styles.quizContainer}>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.quizCard}>
              <View style={styles.quizTextContainer}>
                <Text style={styles.quizTitle}>Not sure where to start?</Text>
                <Text style={styles.quizSubtitle}>Take our Career Path Quiz</Text>
              </View>
              <Text style={styles.quizIcon}>💼</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Explore by Interest</Text>
          <View style={styles.interestGrid}>
            {interests.map((interest, index) => (
              <TouchableOpacity
                key={interest.name}
                style={styles.interestCard}
                activeOpacity={0.8}
              >
                <Text style={styles.interestIcon}>{interest.icon}</Text>
                <Text style={styles.interestName}>{interest.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.careerSection}>
          <Text style={styles.sectionTitle}>Popular Career Paths</Text>
          <View style={styles.careerList}>
            {careerPaths.map((career, index) => (
              <TouchableOpacity key={index} activeOpacity={0.8}>
                <View style={styles.careerCard}>
                  <View>
                    <Text style={styles.careerTitle}>{career.title}</Text>
                    <Text style={styles.careerCategory}>{career.category}</Text>
                  </View>
                  <View style={styles.arrowContainer}>
                    <Text style={styles.arrowIcon}>→</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.mentorButtonContainer}>
        <TouchableOpacity activeOpacity={0.9}>
          <View style={styles.mentorButton}>
            <Text style={styles.mentorButtonText}>Find a Mentor</Text>
          </View>
        </TouchableOpacity>
      </View>
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9333EA',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  searchBar: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchIcon: {
    fontSize: 18,
    color: '#9CA3AF',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1F2937',
  },
  quizContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  quizCard: {
    backgroundColor: '#F9A8D4',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quizTextContainer: {
    flex: 1,
  },
  quizTitle: {
    color: '#7E22CE',
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 4,
  },
  quizSubtitle: {
    color: '#9333EA',
    fontSize: 13,
  },
  quizIcon: {
    fontSize: 48,
    marginLeft: 16,
  },
  sectionContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  interestGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  interestCard: {
    backgroundColor: '#FBCFE8',
    borderRadius: 16,
    padding: 24,
    width: '47%',
    height: 128,
    justifyContent: 'space-between',
  },
  interestIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  interestName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  careerSection: {
    paddingHorizontal: 24,
    marginBottom: 120,
  },
  careerList: {
    gap: 12,
  },
  careerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  careerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  careerCategory: {
    fontSize: 13,
    color: '#6B7280',
  },
  arrowContainer: {
    backgroundColor: '#FCE7F3',
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
  mentorButtonContainer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },
  mentorButton: {
    backgroundColor: '#9333EA',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  mentorButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});