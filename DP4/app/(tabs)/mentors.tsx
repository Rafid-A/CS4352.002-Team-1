import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { favoriteMentorsStorage } from '../../utils/storage';
import { useTheme } from '../../context/ThemeContext';

export default function MentorsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const fromRoute = params.from as string;
  const [searchQuery, setSearchQuery] = useState('');
  const [favoritedMentorIds, setFavoritedMentorIds] = useState<Set<number>>(new Set());
  const { colors } = useTheme();

  // Load favorited mentors when page is focused
  useFocusEffect(
    React.useCallback(() => {
      const loadFavorites = async () => {
        const favorites = await favoriteMentorsStorage.get();
        const ids = new Set(favorites.map(m => m.id));
        setFavoritedMentorIds(ids);
      };
      loadFavorites();
    }, [])
  );

  // Toggle favorite status
  const toggleFavorite = async (mentor: any) => {
    const isFavorited = favoritedMentorIds.has(mentor.id);
    
    if (isFavorited) {
      await favoriteMentorsStorage.remove(mentor.id);
      setFavoritedMentorIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(mentor.id);
        return newSet;
      });
    } else {
      await favoriteMentorsStorage.add(mentor);
      setFavoritedMentorIds(prev => new Set(prev).add(mentor.id));
    }
  };

  const mentors = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'Senior UX Designer',
      company: 'Tech Corp',
      years: 8,
      location: 'San Francisco, CA',
      rating: 4.9,
      sessions: 127,
      bio: 'I help aspiring designers navigate their career path and develop strong portfolios. My focus is on user-centered design and creating impactful digital experiences.',
      skills: ['UX Design', 'Product Design', 'User Research'],
      initials: 'SC',
      category: 'UX Designer'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      title: 'Lead Product Manager',
      company: 'Innovation Labs',
      years: 10,
      location: 'New York, NY',
      rating: 4.8,
      sessions: 94,
      bio: 'With a decade of experience in product management, I guide professionals in product strategy, stakeholder management, and career advancement.',
      skills: ['Product Strategy', 'Agile', 'Leadership'],
      initials: 'MR',
      category: 'Product Manager'
    },
    {
      id: 3,
      name: 'Emily Watson',
      title: 'Creative Director',
      company: 'Design Studio',
      years: 12,
      location: 'Los Angeles, CA',
      rating: 5.0,
      sessions: 156,
      bio: 'I mentor creative professionals in developing their unique style, building strong brands, and advancing their careers in the design industry.',
      skills: ['Branding', 'Visual Design', 'Creative Strategy'],
      initials: 'EW',
      category: 'Graphic Designer'
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Data Science Manager',
      company: 'Analytics Inc',
      years: 9,
      location: 'Seattle, WA',
      rating: 4.7,
      sessions: 83,
      bio: 'I specialize in helping data professionals transition into data science roles and advance their technical skills in machine learning and analytics.',
      skills: ['Machine Learning', 'Python', 'Data Analysis'],
      initials: 'DK',
      category: 'Data Scientist'
    },
    {
      id: 5,
      name: 'Jennifer Park',
      title: 'Principal Software Engineer',
      company: 'CloudTech',
      years: 11,
      location: 'Austin, TX',
      rating: 4.9,
      sessions: 142,
      bio: 'I guide engineers in mastering system design, cloud architecture, and advancing to senior technical roles. Passionate about mentoring the next generation of developers.',
      skills: ['System Design', 'Cloud Architecture', 'Leadership'],
      initials: 'JP',
      category: 'Software Engineer'
    },
    {
      id: 6,
      name: 'Dr. Robert Taylor',
      title: 'Senior Research Scientist',
      company: 'BioMed Labs',
      years: 15,
      location: 'Boston, MA',
      rating: 5.0,
      sessions: 78,
      bio: 'With 15 years in pharmaceutical research, I mentor scientists in experimental design, publication strategies, and navigating academic and industry research careers.',
      skills: ['Clinical Research', 'Lab Management', 'Scientific Writing'],
      initials: 'RT',
      category: 'Research Scientist'
    },
    {
      id: 7,
      name: 'Amanda Foster',
      title: 'Marketing Director',
      company: 'Brand Solutions',
      years: 10,
      location: 'Chicago, IL',
      rating: 4.8,
      sessions: 119,
      bio: 'I help marketing professionals develop data-driven strategies, build successful campaigns, and advance into leadership positions.',
      skills: ['Digital Marketing', 'Brand Strategy', 'Team Leadership'],
      initials: 'AF',
      category: 'Marketing Manager'
    },
    {
      id: 8,
      name: 'James Wilson',
      title: 'VP of Sales',
      company: 'Enterprise Corp',
      years: 14,
      location: 'Dallas, TX',
      rating: 4.7,
      sessions: 96,
      bio: 'I mentor sales professionals in developing winning strategies, building client relationships, and scaling sales teams to exceed targets.',
      skills: ['Enterprise Sales', 'Negotiation', 'Team Building'],
      initials: 'JW',
      category: 'Sales Manager'
    },
    {
      id: 9,
      name: 'Lisa Anderson',
      title: 'VP of Finance',
      company: 'Capital Group',
      years: 16,
      location: 'New York, NY',
      rating: 4.9,
      sessions: 104,
      bio: 'I guide finance professionals in portfolio management, risk assessment, and career advancement in investment banking and wealth management.',
      skills: ['Portfolio Management', 'Financial Analysis', 'Risk Management'],
      initials: 'LA',
      category: 'Financial Manager'
    },
    {
      id: 10,
      name: 'Marcus Johnson',
      title: 'Managing Director',
      company: 'Global Investments',
      years: 18,
      location: 'New York, NY',
      rating: 5.0,
      sessions: 87,
      bio: 'With nearly two decades in investment banking, I mentor professionals in deal structuring, client relations, and navigating Wall Street careers.',
      skills: ['Mergers & Acquisitions', 'Deal Structuring', 'Client Relations'],
      initials: 'MJ',
      category: 'Investment Banker'
    },
    {
      id: 11,
      name: 'Rachel Green',
      title: 'Senior DevOps Engineer',
      company: 'Cloud Systems',
      years: 9,
      location: 'San Francisco, CA',
      rating: 4.8,
      sessions: 112,
      bio: 'I help engineers transition into DevOps roles and master CI/CD pipelines, infrastructure as code, and cloud platform management.',
      skills: ['Kubernetes', 'AWS', 'CI/CD'],
      initials: 'RG',
      category: 'DevOps Engineer'
    },
    {
      id: 12,
      name: 'Dr. Maria Santos',
      title: 'Biotechnology Director',
      company: 'GeneTech',
      years: 13,
      location: 'San Diego, CA',
      rating: 4.9,
      sessions: 91,
      bio: 'I mentor biotech professionals in advancing research careers, navigating regulatory processes, and developing innovative biotech solutions.',
      skills: ['Genetic Engineering', 'Regulatory Affairs', 'R&D Management'],
      initials: 'MS',
      category: 'Biotech Engineer'
    },
    {
      id: 13,
      name: 'Thomas Carter',
      title: 'Environmental Program Director',
      company: 'EcoSolutions',
      years: 11,
      location: 'Portland, OR',
      rating: 4.7,
      sessions: 76,
      bio: 'I guide environmental scientists in developing sustainability programs, conducting impact assessments, and advancing environmental policy careers.',
      skills: ['Sustainability', 'Environmental Policy', 'Impact Assessment'],
      initials: 'TC',
      category: 'Environmental Scientist'
    },
    {
      id: 14,
      name: 'Sophie Martinez',
      title: 'Lead Illustrator',
      company: 'Creative Agency',
      years: 10,
      location: 'Brooklyn, NY',
      rating: 5.0,
      sessions: 134,
      bio: 'I mentor illustrators in developing their unique artistic voice, building client relationships, and creating successful freelance careers.',
      skills: ['Digital Illustration', 'Character Design', 'Storytelling'],
      initials: 'SM',
      category: 'Illustrator'
    },
    {
      id: 15,
      name: 'Alex Thompson',
      title: 'Executive Art Director',
      company: 'Pixar Studios',
      years: 14,
      location: 'Los Angeles, CA',
      rating: 4.9,
      sessions: 108,
      bio: 'With experience leading creative teams at major studios, I mentor art directors in visual storytelling, team leadership, and career growth.',
      skills: ['Art Direction', 'Team Leadership', 'Visual Storytelling'],
      initials: 'AT',
      category: 'Art Director'
    },
    {
      id: 16,
      name: 'Nina Patel',
      title: 'Lead Animator',
      company: 'Animation Studios',
      years: 12,
      location: 'San Francisco, CA',
      rating: 4.8,
      sessions: 122,
      bio: 'I help animators master their craft, build impressive demo reels, and land positions at top animation studios and game companies.',
      skills: ['3D Animation', 'Character Animation', 'Motion Graphics'],
      initials: 'NP',
      category: 'Animator'
    },
  ];

  const filteredMentors = mentors.filter((mentor) => {
    const query = searchQuery.toLowerCase();
    return (
      mentor.name.toLowerCase().includes(query) ||
      mentor.title.toLowerCase().includes(query) ||
      mentor.company.toLowerCase().includes(query)
    );
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.cardBackground }]}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: colors.primaryLight }]}
          onPress={() => fromRoute ? router.push(fromRoute as any) : router.push('/(tabs)/' as any)}
          activeOpacity={0.7}
        >
          <Text style={[styles.backIcon, { color: colors.primary }]}>←</Text>
          <Text style={[styles.backText, { color: colors.primary }]}>Back</Text>
        </TouchableOpacity>
        
        <Text style={[styles.title, { color: colors.text }]}>Find Your Mentor</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Connect with experienced professionals in your field</Text>

        <View style={[styles.searchContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search by name, position, or company..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
              activeOpacity={0.7}
            >
              <Text style={[styles.clearIcon, { color: colors.textTertiary }]}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredMentors.length === 0 ? (
          <View style={styles.noResults}>
            <Text style={[styles.noResultsText, { color: colors.text }]}>No mentors found</Text>
            <Text style={[styles.noResultsSubtext, { color: colors.textSecondary }]}>Try adjusting your search</Text>
          </View>
        ) : (
          filteredMentors.map((mentor) => (
          <View key={mentor.id} style={[styles.mentorCard, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.mentorHeader}>
              <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
                <Text style={styles.avatarText}>{mentor.initials}</Text>
              </View>
              <View style={styles.mentorInfo}>
                <Text style={[styles.mentorName, { color: colors.text }]}>{mentor.name}</Text>
                <Text style={[styles.mentorTitle, { color: colors.textSecondary }]}>{mentor.title}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.star}>⭐</Text>
                  <Text style={styles.rating}>{mentor.rating}</Text>
                  <Text style={[styles.sessions, { color: colors.textTertiary }]}> • {mentor.sessions} sessions</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(mentor)}
                activeOpacity={0.7}
              >
                <Text style={styles.favoriteIcon}>
                  {favoritedMentorIds.has(mentor.id) ? '❤️' : '🤍'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.mentorDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>🏢</Text>
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>{mentor.company} • {mentor.years} years</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>📍</Text>
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>{mentor.location}</Text>
              </View>
            </View>

            <Text style={[styles.bio, { color: colors.textSecondary }]}>{mentor.bio}</Text>

            <View style={styles.skills}>
              {mentor.skills.map((skill, index) => (
                <View key={index} style={[styles.skillBadge, { backgroundColor: colors.primaryLight }]}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.connectButton}
              activeOpacity={0.8}
              onPress={() => router.push(`/chat-mentor?mentorId=${mentor.id}` as any)}
            >
              <Text style={styles.connectIcon}>💬</Text>
              <Text style={styles.connectText}>Connect with {mentor.name.split(' ')[0]}</Text>
            </TouchableOpacity>
          </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2F8',
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
    marginBottom: 16,
  },
  backIcon: {
    fontSize: 20,
    marginRight: 4,
  },
  backText: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  mentorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  mentorHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#C084FC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  mentorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  favoriteButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  favoriteIcon: {
    fontSize: 24,
  },
  mentorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  mentorTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 14,
    marginRight: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  sessions: {
    fontSize: 14,
    color: '#6B7280',
  },
  mentorDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  bio: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  skillBadge: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skillText: {
    fontSize: 13,
    color: '#9333EA',
    fontWeight: '500',
  },
  connectButton: {
    backgroundColor: '#9333EA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  connectIcon: {
    fontSize: 18,
  },
  connectText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
  },
  clearButton: {
    padding: 4,
  },
  clearIcon: {
    fontSize: 18,
    color: '#9CA3AF',
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

