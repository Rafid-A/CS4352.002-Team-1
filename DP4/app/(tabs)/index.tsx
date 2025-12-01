import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Keyboard, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';


export default function PathFinderApp() {
  const router = useRouter();
  const currentRoute = '/(tabs)/';
  const [searchQuery, setSearchQuery] = useState('');
  const { colors } = useTheme();

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

  const popularMentors = [
    { id: 1, name: 'Sarah Chen', title: 'Senior UX Designer', company: 'Tech Corp', initials: 'SC', rating: 4.9 },
    { id: 5, name: 'Jennifer Park', title: 'Principal Software Engineer', company: 'CloudTech', initials: 'JP', rating: 4.9 },
    { id: 3, name: 'Emily Watson', title: 'Creative Director', company: 'Design Studio', initials: 'EW', rating: 5.0 },
    { id: 4, name: 'David Kim', title: 'Data Science Manager', company: 'Analytics Inc', initials: 'DK', rating: 4.7 },
  ];

  const popularCourses = [
    { id: 1, title: 'Google UX Design Professional Certificate', provider: 'Google', level: 'Beginner', duration: '6 months' },
    { id: 2, title: 'IBM Data Science Professional Certificate', provider: 'IBM', level: 'Beginner', duration: '5 months' },
    { id: 20, title: 'Full Stack Web Development', provider: 'The Odin Project', level: 'Intermediate', duration: '6 months' },
    { id: 4, title: 'Google Digital Marketing Certificate', provider: 'Google', level: 'Beginner', duration: '6 months' },
  ];

  const allCareers = [
    { title: 'Data Scientist', category: 'Sciences', route: '/data-scientist' },
    { title: 'Research Scientist', category: 'Sciences', route: '/research-scientist' },
    { title: 'Biotech Engineer', category: 'Sciences', route: '/biotech-engineer' },
    { title: 'Environmental Scientist', category: 'Sciences', route: '/environmental-scientist' },
    { title: 'UX Designer', category: 'Technology', route: '/ux-designer' },
    { title: 'Software Engineer', category: 'Technology', route: '/software-engineer' },
    { title: 'Product Manager', category: 'Technology', route: '/product-manager' },
    { title: 'DevOps Engineer', category: 'Technology', route: '/devops-engineer' },
    { title: 'Illustrator', category: 'Arts', route: '/illustrator' },
    { title: 'Art Director', category: 'Arts', route: '/art-director' },
    { title: 'Animator', category: 'Arts', route: '/animator' },
    { title: 'Graphic Designer', category: 'Arts', route: '/graphic-designer' },
    { title: 'Financial Manager', category: 'Business', route: '/financial-manager' },
    { title: 'Investment Banker', category: 'Business', route: '/investment-banker' },
    { title: 'Sales Manager', category: 'Business', route: '/sales-manager' },
    { title: 'Marketing Manager', category: 'Business', route: '/marketing-manager' },
  ];

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      const confirm = window.confirm("Are you sure you want to log out?");
      if (confirm) {
        router.replace('/login' as any);
      }
    } else {
      Alert.alert(
        "Logout",
        "Are you sure you want to log out?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Logout", 
            onPress: () => router.replace('/login' as any),
            style: "destructive"
          }
        ]
      );
    }
  };
  const filteredCareers = searchQuery.trim()
    ? allCareers
        .filter(career =>
          career.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
          const query = searchQuery.toLowerCase();
          const aTitle = a.title.toLowerCase();
          const bTitle = b.title.toLowerCase();
          
          const aStartsWith = aTitle.startsWith(query);
          const bStartsWith = bTitle.startsWith(query);
          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
          
          const aWordStartsWith = aTitle.split(' ').some(word => word.startsWith(query));
          const bWordStartsWith = bTitle.split(' ').some(word => word.startsWith(query));
          if (aWordStartsWith && !bWordStartsWith) return -1;
          if (!aWordStartsWith && bWordStartsWith) return 1;
          
          const aIndex = aTitle.indexOf(query);
          const bIndex = bTitle.indexOf(query);
          if (aIndex !== bIndex) return aIndex - bIndex;
          
          return aTitle.localeCompare(bTitle);
        })
    : [];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
      >
        <View style={[styles.header, { backgroundColor: colors.background }]}>
          <View style={styles.headerTop}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>PathFinder</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Discover your dream career path</Text>
            </View>
            <TouchableOpacity 
              style={[styles.logoutButton, { backgroundColor: colors.primaryLight }]}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Text style={[styles.logoutText, { color: colors.primary }]}>Logout</Text>
              <Text style={styles.logoutIcon}>🚪</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.searchContainer, { backgroundColor: colors.background }]}>
          <View style={[styles.searchBar, { backgroundColor: colors.inputBackground }]}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="Search career paths and interests..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={[styles.searchInput, { color: colors.text }]}
              placeholderTextColor={colors.textTertiary}
            />
          </View>
          {searchQuery.trim() !== '' && (
            <View style={[styles.searchResultsDropdown, { backgroundColor: colors.cardBackground }]}>
              {filteredCareers.length > 0 ? (
                <>
                  <Text style={[styles.searchResultsTitle, { color: colors.text }]}>
                    Found {filteredCareers.length} result{filteredCareers.length !== 1 ? 's' : ''}
                  </Text>
                  <ScrollView 
                    style={styles.searchResultsScroll}
                    showsVerticalScrollIndicator={true}
                    nestedScrollEnabled={true}
                    keyboardShouldPersistTaps="handled"
                    bounces={false}
                  >
                    <View style={styles.searchResultsList}>
                      {filteredCareers.map((career, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[styles.searchResultCard, { backgroundColor: colors.primaryLight, borderColor: colors.border }]}
                        activeOpacity={0.8}
                        onPress={() => {
                          Keyboard.dismiss(); // Dismiss keyboard first
                          router.push(career.route as any);
                          // Delay clearing search to keep dropdown visible during transition
                          setTimeout(() => setSearchQuery(''), 300);
                        }}
                      >
                          <View>
                            <Text style={[styles.searchResultTitle, { color: colors.text }]}>{career.title}</Text>
                            <Text style={[styles.searchResultCategory, { color: colors.textSecondary }]}>{career.category}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </>
              ) : (
                <View style={[styles.noResultsContainer, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
                  <Text style={[styles.noResultsText, { color: colors.text }]}>No careers found for "{searchQuery}"</Text>
                  <Text style={[styles.noResultsSubtext, { color: colors.textSecondary }]}>Try searching for a different career or category</Text>
                </View>
              )}
            </View>
          )}
        </View>

        <View style={styles.quizContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.push({ pathname: '/(tabs)/quiz', params: { from: currentRoute } } as any)}>
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
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Explore by Job Category</Text>
          <View style={styles.interestGrid}>
            {interests.map((interest, index) => (
              <TouchableOpacity
                key={interest.name}
                style={styles.interestCard}
                activeOpacity={0.8}
                onPress={() => {
                  if (interest.name === 'Sciences') {
                    router.push({ pathname: '/(tabs)/sciences', params: { from: currentRoute } } as any);
                  } else if (interest.name === 'Technology') {
                    router.push({ pathname: '/(tabs)/technology', params: { from: currentRoute } } as any);
                  } else if (interest.name === 'Arts') {
                    router.push({ pathname: '/(tabs)/arts', params: { from: currentRoute } } as any);
                  } else if (interest.name === 'Business') {
                    router.push({ pathname: '/(tabs)/business', params: { from: currentRoute } } as any);
                  }
                }}
              >
                <Text style={styles.interestIcon}>{interest.icon}</Text>
                <Text style={[styles.interestName, { color: colors.text }]}>{interest.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.careerSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Career Paths</Text>
          <View style={styles.careerList}>
            {careerPaths.map((career, index) => (
              <TouchableOpacity 
              key={index} 
              activeOpacity={0.8}
              onPress={() => {
                if (career.title === 'Data Scientist') {
                  router.push({ pathname: '/(tabs)/data-scientist', params: { from: currentRoute } } as any);
                } else if (career.title === 'UX Designer') {
                  router.push({ pathname: '/(tabs)/ux-designer', params: { from: currentRoute } } as any);
                } else if (career.title === 'Marketing Manager') {
                  router.push({ pathname: '/(tabs)/marketing-manager', params: { from: currentRoute } } as any);
                } else if (career.title === 'Graphic Designer') {
                  router.push({ pathname: '/(tabs)/graphic-designer', params: { from: currentRoute } } as any);
                }
              }}
              >
                <View style={[styles.careerCard, { backgroundColor: colors.cardBackground }]}>
                  <View>
                    <Text style={[styles.careerTitle, { color: colors.text }]}>{career.title}</Text>
                    <Text style={[styles.careerCategory, { color: colors.textSecondary }]}>{career.category}</Text>
                  </View>
                  <View style={[styles.arrowContainer, { backgroundColor: colors.primaryLight }]}>
                    <Text style={styles.arrowIcon}>→</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Mentors Section */}
        <View style={styles.mentorSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Mentors</Text>
            <TouchableOpacity 
              onPress={() => router.push({ pathname: '/(tabs)/mentors', params: { from: currentRoute } } as any)}
              activeOpacity={0.7}
            >
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {popularMentors.map((mentor) => (
              <TouchableOpacity 
                key={mentor.id}
                style={[styles.mentorCard, { backgroundColor: colors.cardBackground }]}
                activeOpacity={0.8}
                onPress={() => router.push({ pathname: '/(tabs)/mentors', params: { from: currentRoute } } as any)}
              >
                <View style={[styles.mentorAvatar, { backgroundColor: colors.primaryLight }]}>
                  <Text style={styles.mentorAvatarText}>{mentor.initials}</Text>
                </View>
                <Text style={[styles.mentorName, { color: colors.text }]}>{mentor.name}</Text>
                <Text style={[styles.mentorTitle, { color: colors.textSecondary }]}>{mentor.title}</Text>
                <Text style={[styles.mentorCompany, { color: colors.textTertiary }]}>{mentor.company}</Text>
                <View style={styles.mentorRating}>
                  <Text style={styles.mentorStar}>⭐</Text>
                  <Text style={styles.mentorRatingText}>{mentor.rating}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Courses Section */}
        <View style={styles.courseSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Courses</Text>
            <TouchableOpacity 
              onPress={() => router.push({ pathname: '/(tabs)/all-courses', params: { from: currentRoute } } as any)}
              activeOpacity={0.7}
            >
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {popularCourses.map((course) => (
              <TouchableOpacity 
                key={course.id}
                style={[styles.courseCard, { backgroundColor: colors.cardBackground }]}
                activeOpacity={0.8}
                onPress={() => router.push({ pathname: '/(tabs)/all-courses', params: { from: currentRoute } } as any)}
              >
                <View style={styles.courseBadge}>
                  <Text style={styles.courseBadgeText}>{course.level}</Text>
                </View>
                <Text style={[styles.courseTitle, { color: colors.text }]}>{course.title}</Text>
                <Text style={styles.courseProvider}>by {course.provider}</Text>
                <View style={styles.courseDuration}>
                  <Text style={styles.courseDurationIcon}>⏱️</Text>
                  <Text style={[styles.courseDurationText, { color: colors.textSecondary }]}>{course.duration}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>


      {/* <View style={styles.mentorButtonContainer}>
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => router.push({ pathname: '/(tabs)/mentors', params: { from: currentRoute } } as any)}
        >
          <View style={styles.mentorButton}>
            <Text style={styles.mentorButtonText}>Find a Mentor</Text>
          </View>
        </TouchableOpacity>
      </View> */}
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
    zIndex: 1005, // Above dropdown and search
    backgroundColor: '#FDF2F8', // Match container background
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTextContainer: {
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#F3E8FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  logoutIcon: {
    fontSize: 20,
    color: '#9333EA',
    fontWeight: '600',
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9333EA',
    marginRight: 8,
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
    zIndex: 1001, // Above dropdown
    backgroundColor: '#FDF2F8', // Match container background
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
    marginBottom: 32,
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
  // Search Results Styles
  searchResultsDropdown: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  searchResultsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  searchResultsScroll: {
    maxHeight: 200, // Shorter to account for keyboard
  },
  searchResultsList: {
    gap: 8,
  },
  searchResultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchResultTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  searchResultCategory: {
    fontSize: 12,
    color: '#6B7280',
  },
  searchResultArrow: {
    backgroundColor: '#FCE7F3',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchResultArrowIcon: {
    fontSize: 16,
    color: '#9333EA',
  },
  noResultsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  // Popular Mentors Section
  mentorSection: {
    paddingLeft: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 24,
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9333EA',
  },
  horizontalScroll: {
    paddingRight: 24,
    gap: 16,
  },
  mentorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  mentorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  mentorAvatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#9333EA',
  },
  mentorName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  mentorTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
    textAlign: 'center',
  },
  mentorCompany: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 8,
    textAlign: 'center',
  },
  mentorRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  mentorStar: {
    fontSize: 12,
    marginRight: 4,
  },
  mentorRatingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400E',
  },
  // Popular Courses Section
  courseSection: {
    paddingLeft: 24,
    marginBottom: 120,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  courseBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  courseBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E40AF',
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 20,
  },
  courseProvider: {
    fontSize: 13,
    color: '#9333EA',
    fontWeight: '500',
    marginBottom: 12,
  },
  courseDuration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseDurationIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  courseDurationText: {
    fontSize: 13,
    color: '#6B7280',
  },
});