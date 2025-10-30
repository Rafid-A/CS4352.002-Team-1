import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';


export default function PathFinderApp() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Complete list of all careers for search
  const allCareers = [
    // Sciences
    { title: 'Data Scientist', category: 'Sciences', route: '/data-scientist' },
    { title: 'Research Scientist', category: 'Sciences', route: '/research-scientist' },
    { title: 'Biotech Engineer', category: 'Sciences', route: '/biotech-engineer' },
    { title: 'Environmental Scientist', category: 'Sciences', route: '/environmental-scientist' },
    // Technology
    { title: 'UX Designer', category: 'Technology', route: '/ux-designer' },
    { title: 'Software Engineer', category: 'Technology', route: '/software-engineer' },
    { title: 'Product Manager', category: 'Technology', route: '/product-manager' },
    { title: 'DevOps Engineer', category: 'Technology', route: '/devops-engineer' },
    // Arts
    { title: 'Illustrator', category: 'Arts', route: '/illustrator' },
    { title: 'Art Director', category: 'Arts', route: '/art-director' },
    { title: 'Animator', category: 'Arts', route: '/animator' },
    { title: 'Graphic Designer', category: 'Arts', route: '/graphic-designer' },
    // Business
    { title: 'Financial Manager', category: 'Business', route: '/financial-manager' },
    { title: 'Investment Banker', category: 'Business', route: '/investment-banker' },
    { title: 'Sales Manager', category: 'Business', route: '/sales-manager' },
    { title: 'Marketing Manager', category: 'Business', route: '/marketing-manager' },
  ];

  // Handle logout - goes back to login page
  const handleLogout = () => {
    setMenuOpen(false);
    router.replace('/login' as any);
  };

  // Filter and sort careers based on search query
  const filteredCareers = searchQuery.trim()
    ? allCareers
        .filter(career =>
          career.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
          const query = searchQuery.toLowerCase();
          const aTitle = a.title.toLowerCase();
          const bTitle = b.title.toLowerCase();
          
          // Priority 1: Exact match at the start of the title
          const aStartsWith = aTitle.startsWith(query);
          const bStartsWith = bTitle.startsWith(query);
          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
          
          // Priority 2: Any word in the title starts with the query
          const aWordStartsWith = aTitle.split(' ').some(word => word.startsWith(query));
          const bWordStartsWith = bTitle.split(' ').some(word => word.startsWith(query));
          if (aWordStartsWith && !bWordStartsWith) return -1;
          if (!aWordStartsWith && bWordStartsWith) return 1;
          
          // Priority 3: Position of match (earlier is better)
          const aIndex = aTitle.indexOf(query);
          const bIndex = bTitle.indexOf(query);
          if (aIndex !== bIndex) return aIndex - bIndex;
          
          // Default: Alphabetical order
          return aTitle.localeCompare(bTitle);
        })
    : [];

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={searchQuery.trim() === ''}
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>PathFinder</Text>
              <Text style={styles.subtitle}>Discover your dream career path</Text>
            </View>
            <TouchableOpacity 
              style={styles.hamburgerButton}
              onPress={() => setMenuOpen(!menuOpen)}
              activeOpacity={0.7}
            >
              <Text style={styles.hamburgerIcon}>☰</Text>
            </TouchableOpacity>
          </View>
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
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.push('/quiz' as any)}>
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
                onPress={() => {
                  if (interest.name === 'Sciences') {
                    router.push('/sciences' as any);
                  } else if (interest.name === 'Technology') {
                    router.push('/technology' as any);
                  } else if (interest.name === 'Arts') {
                    router.push('/arts' as any);
                  } else if (interest.name === 'Business') {
                    router.push('/business' as any);
                  }
                }}
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
              <TouchableOpacity 
              key={index} 
              activeOpacity={0.8}
              onPress={() => {
                if (career.title === 'Data Scientist') {
                  router.push('/data-scientist' as any);
                } else if (career.title === 'UX Designer') {
                  router.push('/ux-designer' as any);
                } else if (career.title === 'Marketing Manager') {
                  router.push('/marketing-manager' as any);
                } else if (career.title === 'Graphic Designer') {
                  router.push('/graphic-designer' as any);
                }
              }}
              >
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

      {/* Hamburger Dropdown Menu - Floating */}
      {menuOpen && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text style={styles.menuItemIcon}>🚪</Text>
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Search Results Dropdown - Outside ScrollView */}
      {searchQuery.trim() !== '' && (
        <View style={styles.searchResultsDropdown}>
          {filteredCareers.length > 0 ? (
            <>
              <Text style={styles.searchResultsTitle}>
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
                    style={styles.searchResultCard}
                    activeOpacity={0.8}
                    onPress={() => {
                      Keyboard.dismiss(); // Dismiss keyboard first
                      router.push(career.route as any);
                      // Delay clearing search to keep dropdown visible during transition
                      setTimeout(() => setSearchQuery(''), 300);
                    }}
                  >
                      <View>
                        <Text style={styles.searchResultTitle}>{career.title}</Text>
                        <Text style={styles.searchResultCategory}>{career.category}</Text>
                      </View>
                      <View style={styles.searchResultArrow}>
                        <Text style={styles.searchResultArrowIcon}>→</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </>
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No careers found for "{searchQuery}"</Text>
              <Text style={styles.noResultsSubtext}>Try searching for a different career or category</Text>
            </View>
          )}
        </View>
      )}

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
    zIndex: 1001, // Above dropdown
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
  hamburgerButton: {
    backgroundColor: '#F3E8FF',
    borderRadius: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  hamburgerIcon: {
    fontSize: 24,
    color: '#9333EA',
    fontWeight: '600',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 100, // Position below the hamburger button
    right: 24, // Align with right edge
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1002, // Above everything else
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  menuItemIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  menuItemText: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
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
  // Search Results Styles
  searchResultsDropdown: {
    position: 'absolute',
    top: 175, // Position below the search bar (header + search bar + gap)
    left: 24, // Match search container padding
    right: 24, // Match search container padding
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 999, // Lower than search bar
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
});