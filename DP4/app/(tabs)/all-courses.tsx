import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

interface Course {
  id: number;
  title: string;
  provider: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'Course' | 'Certification' | 'Bootcamp' | 'Degree Program';
  cost: string;
  description: string;
  skills: string[];
  category: string;
}

const allCoursesData: Course[] = [
  { id: 1, title: 'Google UX Design Professional Certificate', provider: 'Google (Coursera)', duration: '6 months', level: 'Beginner', type: 'Certification', cost: '$49/month', description: 'Complete a series of 7 courses to build job-ready skills in UX design.', skills: ['User Research', 'Wireframing', 'Prototyping', 'Figma'], category: 'UX Design' },
  { id: 2, title: 'IBM Data Science Professional Certificate', provider: 'IBM (Coursera)', duration: '5 months', level: 'Beginner', type: 'Certification', cost: '$49/month', description: 'Master data science tools including Python, SQL, and machine learning.', skills: ['Python', 'Machine Learning', 'Data Visualization', 'SQL'], category: 'Data Science' },
  { id: 3, title: 'Meta Front-End Developer Certificate', provider: 'Meta (Coursera)', duration: '7 months', level: 'Beginner', type: 'Certification', cost: '$49/month', description: 'Build job-ready skills for a front-end developer role.', skills: ['React', 'JavaScript', 'HTML/CSS', 'Git'], category: 'Software Engineering' },
  { id: 4, title: 'Google Digital Marketing Certificate', provider: 'Google (Coursera)', duration: '6 months', level: 'Beginner', type: 'Certification', cost: '$49/month', description: 'Comprehensive digital marketing training from Google.', skills: ['SEO', 'SEM', 'Social Media Marketing', 'Analytics'], category: 'Marketing' },
  { id: 5, title: 'AWS Solutions Architect', provider: 'Amazon Web Services', duration: '3 months prep', level: 'Advanced', type: 'Certification', cost: '$150 exam fee', description: 'Industry-leading cloud architecture certification.', skills: ['Cloud Computing', 'AWS Services', 'System Design'], category: 'Technology' },
  { id: 6, title: 'Chartered Financial Analyst (CFA)', provider: 'CFA Institute', duration: '1-4 years', level: 'Advanced', type: 'Certification', cost: '$1,000-4,000', description: 'Gold standard certification for investment professionals.', skills: ['Portfolio Management', 'Investment Analysis', 'Ethics'], category: 'Finance' },
  { id: 7, title: 'Product Management Certificate', provider: 'Product School', duration: '8 weeks', level: 'Intermediate', type: 'Certification', cost: '$4,999', description: 'Industry-recognized PM certification with real-world projects.', skills: ['Product Vision', 'Metrics', 'Stakeholder Management'], category: 'Product Management' },
  { id: 8, title: 'Certified Kubernetes Administrator', provider: 'Cloud Native Computing Foundation', duration: '3 months prep', level: 'Advanced', type: 'Certification', cost: '$395 exam fee', description: 'Industry-standard certification for Kubernetes administrators.', skills: ['Kubernetes', 'Cluster Management', 'Troubleshooting'], category: 'DevOps' },
  { id: 9, title: 'Graphic Design Specialization', provider: 'California Institute of the Arts', duration: '6 months', level: 'Beginner', type: 'Course', cost: '$49/month', description: 'Learn the fundamentals of graphic design and visual communication.', skills: ['Typography', 'Color Theory', 'Layout Design', 'Adobe Creative Suite'], category: 'Graphic Design' },
  { id: 10, title: 'Adobe Certified Professional', provider: 'Adobe', duration: 'Self-paced', level: 'Intermediate', type: 'Certification', cost: '$180 per exam', description: 'Industry-recognized certification in Adobe Creative Cloud tools.', skills: ['Photoshop', 'Illustrator', 'InDesign'], category: 'Design' },
  { id: 11, title: 'HubSpot Inbound Marketing', provider: 'HubSpot Academy', duration: '4 hours', level: 'Beginner', type: 'Certification', cost: 'Free', description: 'Learn inbound marketing methodology and best practices.', skills: ['Content Marketing', 'Lead Generation', 'Marketing Automation'], category: 'Marketing' },
  { id: 12, title: 'Salesforce Administrator Certification', provider: 'Salesforce', duration: '2 months prep', level: 'Intermediate', type: 'Certification', cost: '$200 exam fee', description: 'Industry-leading CRM certification for sales professionals.', skills: ['Salesforce', 'CRM Management', 'Sales Analytics'], category: 'Sales' },
  { id: 13, title: 'Project Management Professional (PMP)', provider: 'PMI', duration: '3 months prep', level: 'Advanced', type: 'Certification', cost: '$555 exam fee', description: 'World-renowned project management certification.', skills: ['Project Management', 'Agile', 'Risk Management'], category: 'Business' },
  { id: 14, title: 'Research Methods Specialization', provider: 'University of London', duration: '8 months', level: 'Beginner', type: 'Course', cost: '$49/month', description: 'Learn the fundamentals of scientific research methodology.', skills: ['Research Design', 'Data Collection', 'Statistical Analysis'], category: 'Research' },
  { id: 15, title: 'Biotechnology Fundamentals', provider: 'MIT OpenCourseWare', duration: '12 weeks', level: 'Beginner', type: 'Course', cost: 'Free', description: 'Introduction to the principles and applications of biotechnology.', skills: ['Genetic Engineering', 'Cell Culture', 'Bioprocessing'], category: 'Biotechnology' },
  { id: 16, title: 'GIS Specialization', provider: 'UC Davis', duration: '5 months', level: 'Intermediate', type: 'Course', cost: '$49/month', description: 'Learn Geographic Information Systems for environmental analysis.', skills: ['ArcGIS', 'Remote Sensing', 'Spatial Analysis'], category: 'Environmental Science' },
  { id: 17, title: 'Digital Illustration Fundamentals', provider: 'Skillshare', duration: '3 hours', level: 'Beginner', type: 'Course', cost: '$32/month', description: 'Learn the basics of digital illustration and drawing.', skills: ['Digital Drawing', 'Procreate', 'Character Design'], category: 'Illustration' },
  { id: 18, title: 'Creative Leadership', provider: 'LinkedIn Learning', duration: '4 hours', level: 'Intermediate', type: 'Course', cost: '$39.99/month', description: 'Develop leadership skills for managing creative teams.', skills: ['Team Leadership', 'Creative Strategy', 'Project Management'], category: 'Art Direction' },
  { id: 19, title: 'Character Animation Bootcamp', provider: 'Animation Mentor', duration: '18 months', level: 'Intermediate', type: 'Bootcamp', cost: '$18,999', description: 'Professional character animation training from Pixar veterans.', skills: ['Character Animation', 'Acting for Animators', 'Demo Reel'], category: 'Animation' },
  { id: 20, title: 'Full Stack Web Development', provider: 'The Odin Project', duration: '6 months', level: 'Intermediate', type: 'Bootcamp', cost: 'Free', description: 'Comprehensive free bootcamp for full-stack development.', skills: ['JavaScript', 'React', 'Node.js', 'Databases'], category: 'Technology' },
  { id: 21, title: 'Introduction to Computer Science', provider: 'Harvard (CS50)', duration: '12 weeks', level: 'Beginner', type: 'Course', cost: 'Free', description: 'Foundational computer science course covering programming and problem-solving.', skills: ['Programming', 'Algorithms', 'Data Structures'], category: 'Technology' },
  { id: 22, title: 'Business Foundations Specialization', provider: 'University of Pennsylvania (Wharton)', duration: '8 months', level: 'Beginner', type: 'Course', cost: '$49/month', description: 'Learn business fundamentals including marketing, finance, and operations.', skills: ['Business Strategy', 'Finance', 'Marketing', 'Operations'], category: 'Business' },
  { id: 23, title: 'Modern & Contemporary Art', provider: 'Museum of Modern Art', duration: '4 weeks', level: 'Beginner', type: 'Course', cost: 'Free', description: 'Explore modern art movements and contemporary practices.', skills: ['Art History', 'Visual Analysis', 'Critical Thinking'], category: 'Arts' },
  { id: 24, title: 'Data Science for Life Sciences', provider: 'Harvard', duration: '7 months', level: 'Intermediate', type: 'Course', cost: '$49/month', description: 'Apply data science methods to biological research.', skills: ['R Programming', 'Biostatistics', 'Genomics'], category: 'Sciences' },
];

export default function AllCoursesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technology', 'Business', 'Arts', 'Sciences', 'Design', 'Marketing', 'Finance'];

  const filteredCourses = allCoursesData.filter((course) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = (
      course.title.toLowerCase().includes(query) ||
      course.provider.toLowerCase().includes(query) ||
      course.category.toLowerCase().includes(query) ||
      course.skills.some(skill => skill.toLowerCase().includes(query))
    );
    const matchesCategory = selectedCategory === 'All' || course.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return '#10B981';
      case 'Intermediate': return '#F59E0B';
      case 'Advanced': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Certification': return '#9333EA';
      case 'Course': return '#3B82F6';
      case 'Bootcamp': return '#EC4899';
      case 'Degree Program': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Courses</Text>
        <Text style={styles.subtitle}>Explore {allCoursesData.length}+ courses across all career paths</Text>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses, providers, or skills..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
              activeOpacity={0.7}
            >
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterChip,
                selectedCategory === category && styles.filterChipActive
              ]}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.filterChipText,
                selectedCategory === category && styles.filterChipTextActive
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
        contentContainerStyle={styles.scrollContent}
      >
        {filteredCourses.length === 0 ? (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No courses found</Text>
            <Text style={styles.noResultsSubtext}>Try adjusting your search or filters</Text>
          </View>
        ) : (
          filteredCourses.map((course) => (
            <View key={course.id} style={styles.courseCard}>
              <View style={styles.courseHeader}>
                <View style={styles.courseTitleRow}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <View style={[styles.typeBadge, { backgroundColor: getTypeColor(course.type) }]}>
                    <Text style={styles.typeBadgeText}>{course.type}</Text>
                  </View>
                </View>
                <Text style={styles.provider}>by {course.provider}</Text>
                <Text style={styles.categoryLabel}>{course.category}</Text>
              </View>

              <Text style={styles.description}>{course.description}</Text>

              <View style={styles.courseDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>⏱️</Text>
                  <Text style={styles.detailText}>{course.duration}</Text>
                </View>
                <View style={styles.detailRow}>
                  <View style={[styles.levelDot, { backgroundColor: getLevelColor(course.level) }]} />
                  <Text style={styles.detailText}>{course.level}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>💰</Text>
                  <Text style={styles.detailText}>{course.cost}</Text>
                </View>
              </View>

              <View style={styles.skills}>
                {course.skills.slice(0, 3).map((skill, index) => (
                  <View key={index} style={styles.skillBadge}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
                {course.skills.length > 3 && (
                  <View style={styles.skillBadge}>
                    <Text style={styles.skillText}>+{course.skills.length - 3}</Text>
                  </View>
                )}
              </View>

              <TouchableOpacity 
                style={styles.enrollButton}
                activeOpacity={0.8}
              >
                <Text style={styles.enrollText}>Learn More</Text>
                <Text style={styles.enrollIcon}>→</Text>
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3E8FF',
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
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF2F8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    marginBottom: 16,
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
  filterScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  filterContainer: {
    gap: 8,
    paddingRight: 24,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3E8FF',
  },
  filterChipActive: {
    backgroundColor: '#9333EA',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9333EA',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  courseHeader: {
    marginBottom: 12,
  },
  courseTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  provider: {
    fontSize: 14,
    color: '#9333EA',
    fontWeight: '500',
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  courseDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#6B7280',
  },
  levelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  skillBadge: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  skillText: {
    fontSize: 12,
    color: '#9333EA',
    fontWeight: '500',
  },
  enrollButton: {
    backgroundColor: '#9333EA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  enrollText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  enrollIcon: {
    color: '#FFFFFF',
    fontSize: 18,
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

