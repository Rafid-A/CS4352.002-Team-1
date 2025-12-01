import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { savedJobsStorage } from '../../utils/storage';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';

export default function JobBoardScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const fromRoute = params.from as string;
  const [filter, setFilter] = useState('All');
  const [savedJobIds, setSavedJobIds] = useState<Set<number>>(new Set());
  const { colors } = useTheme();

  // Load saved jobs when page is focused
  useFocusEffect(
    React.useCallback(() => {
      const loadSavedJobs = async () => {
        const saved = await savedJobsStorage.get();
        const ids = new Set(saved.map((job: any) => job.id));
        setSavedJobIds(ids);
      };
      loadSavedJobs();
    }, [])
  );

  // Toggle save status for a job
  const toggleSave = async (job: any) => {
    const isSaved = savedJobIds.has(job.id);
    
    if (isSaved) {
      await savedJobsStorage.remove(job.id);
      setSavedJobIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(job.id);
        return newSet;
      });
    } else {
      // Save job with company name included
      const jobToSave = {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        salary: job.salary,
        category: job.category,
        posted: job.posted,
        description: job.description,
      };
      await savedJobsStorage.add(jobToSave);
      setSavedJobIds(prev => new Set(prev).add(job.id));
    }
  };

  const jobs = [
    {
      id: 1,
      title: 'Senior UX Designer',
      company: 'Adobe',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $160k',
      category: 'Technology',
      posted: '2 days ago',
      description: 'Design intuitive user experiences for Creative Cloud applications. Work closely with product teams to create wireframes, prototypes, and user flows. 5+ years experience required.',
    },
    {
      id: 2,
      title: 'Data Scientist',
      company: 'Google',
      location: 'Mountain View, CA',
      type: 'Full-time',
      salary: '$140k - $180k',
      category: 'Technology',
      posted: '1 day ago',
      description: 'Build and deploy machine learning models to improve search ranking algorithms. Analyze large datasets using Python and TensorFlow. PhD or Masters in Computer Science preferred.',
    },
    {
      id: 3,
      title: 'Marketing Manager',
      company: 'Nike',
      location: 'Portland, OR',
      type: 'Full-time',
      salary: '$90k - $130k',
      category: 'Business',
      posted: '3 days ago',
      description: 'Lead digital marketing campaigns for athletic footwear product lines. Manage cross-functional teams and develop brand strategies to increase market share. 7+ years marketing experience.',
    },
    {
      id: 4,
      title: 'Graphic Designer',
      company: 'Apple',
      location: 'Cupertino, CA',
      type: 'Full-time',
      salary: '$85k - $120k',
      category: 'Arts',
      posted: '1 week ago',
      description: 'Create compelling visual designs for product marketing campaigns and retail experiences. Strong portfolio showcasing typography, layout, and brand identity work required.',
    },
    {
      id: 5,
      title: 'Software Engineer',
      company: 'Microsoft',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$130k - $170k',
      category: 'Technology',
      posted: '2 days ago',
      description: 'Develop scalable cloud infrastructure solutions for Azure platform. Work with C#, .NET, and distributed systems. Strong understanding of microservices architecture required.',
    },
    {
      id: 6,
      title: 'Research Scientist',
      company: 'Pfizer',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$110k - $150k',
      category: 'Sciences',
      posted: '5 days ago',
      description: 'Conduct clinical trials and analyze pharmaceutical research data. Design experimental protocols and publish findings in peer-reviewed journals. PhD in Biology or related field required.',
    },
    {
      id: 7,
      title: 'Product Manager',
      company: 'Amazon',
      location: 'Remote',
      type: 'Full-time',
      salary: '$125k - $165k',
      category: 'Technology',
      posted: '4 days ago',
      description: 'Define product strategy and roadmap for AWS cloud services. Collaborate with engineering teams to deliver features that meet customer needs. 5+ years PM experience in tech.',
    },
    {
      id: 8,
      title: 'Financial Manager',
      company: 'Goldman Sachs',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$150k - $200k',
      category: 'Business',
      posted: '1 week ago',
      description: 'Oversee investment portfolios and provide strategic financial guidance to high-net-worth clients. CFA certification and 10+ years experience in wealth management required.',
    },
    {
      id: 9,
      title: 'Art Director',
      company: 'Disney',
      location: 'Los Angeles, CA',
      type: 'Full-time',
      salary: '$100k - $140k',
      category: 'Arts',
      posted: '3 days ago',
      description: 'Lead creative direction for animated feature films. Collaborate with directors and animators to develop visual style guides and character designs. Strong leadership skills essential.',
    },
    {
      id: 10,
      title: 'DevOps Engineer',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      type: 'Full-time',
      salary: '$135k - $175k',
      category: 'Technology',
      posted: '2 days ago',
      description: 'Build and maintain streaming infrastructure serving millions of users globally. Expertise in Kubernetes, AWS, and CI/CD pipelines required. On-call rotation included.',
    },
    {
      id: 11,
      title: 'Biotech Engineer',
      company: 'Moderna',
      location: 'Cambridge, MA',
      type: 'Full-time',
      salary: '$105k - $145k',
      category: 'Sciences',
      posted: '1 week ago',
      description: 'Develop innovative mRNA vaccine technologies and optimize manufacturing processes. Work on cutting-edge biotech solutions. MS or PhD in Bioengineering required.',
    },
    {
      id: 12,
      title: 'Sales Manager',
      company: 'Salesforce',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$95k - $135k',
      category: 'Business',
      posted: '4 days ago',
      description: 'Lead enterprise sales team to exceed quarterly targets. Build relationships with Fortune 500 clients and manage complex sales cycles. 5+ years B2B sales experience required.',
    },
  ];

  const categories = ['All', 'Technology', 'Business', 'Arts', 'Sciences'];

  const filteredJobs = filter === 'All' 
    ? jobs 
    : jobs.filter(job => job.category === filter);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: colors.primaryLight }]}
          onPress={() => fromRoute ? router.push(fromRoute as any) : router.push('/(tabs)/' as any)}
          activeOpacity={0.7}
        >
          <Text style={[styles.backIcon, { color: colors.primary }]}>←</Text>
          <Text style={[styles.backText, { color: colors.primary }]}>Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.primary }]}>Job Board</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Discover opportunities in your field</Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterButton,
                { backgroundColor: filter === category ? colors.primary : colors.cardBackground, borderColor: filter === category ? colors.primary : colors.border }
              ]}
              onPress={() => setFilter(category)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.filterText,
                { color: filter === category ? '#FFFFFF' : colors.textSecondary }
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.jobListContainer}
      >
        {filteredJobs.map((job) => (
          <View key={job.id} style={[styles.jobCard, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.jobHeader}>
              <View style={[styles.companyBadge, { backgroundColor: colors.primaryLight }]}>
                <Text style={[styles.companyInitial, { color: colors.primary }]}>
                  {job.company.charAt(0)}
                </Text>
              </View>
              <View style={styles.jobInfo}>
                <Text style={[styles.jobTitle, { color: colors.text }]}>{job.title}</Text>
                <Text style={[styles.companyName, { color: colors.textSecondary }]}>{job.company}</Text>
              </View>
              <TouchableOpacity
                onPress={() => toggleSave(job)}
                style={styles.saveButton}
                activeOpacity={0.7}
              >
                <Text style={styles.saveIcon}>
                  {savedJobIds.has(job.id) ? '❤️' : '🤍'}
                </Text>
                <Text style={[styles.saveText, { color: colors.textSecondary }]}>
                  {savedJobIds.has(job.id) ? 'Saved' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.jobDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>📍</Text>
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>{job.location}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>💼</Text>
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>{job.type}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>💰</Text>
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>{job.salary}</Text>
              </View>
            </View>

            <Text style={[styles.jobDescription, { color: colors.textSecondary }]}>{job.description}</Text>

            <View style={[styles.jobFooter, { borderTopColor: colors.border }]}>
              <Text style={[styles.postedTime, { color: colors.textTertiary }]}>{job.posted}</Text>
              <TouchableOpacity 
                style={[styles.applyButton, { backgroundColor: colors.primary }]}
                activeOpacity={0.8}
              >
                <Text style={styles.applyButtonText}>Apply Externally</Text>
                <Text style={styles.externalIcon}>↗</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
  },
  filterContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  filterScroll: {
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  jobListContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  jobCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  jobHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  companyBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  companyInitial: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  jobInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  jobTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    fontWeight: '500',
  },
  jobDetails: {
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
  },
  jobDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  postedTime: {
    fontSize: 12,
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  externalIcon: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    padding: 8,
    marginLeft: 'auto',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  saveIcon: {
    fontSize: 20,
    marginRight: 4,
  },
  saveText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
