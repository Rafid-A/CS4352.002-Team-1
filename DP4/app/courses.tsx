import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

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
}

const coursesData: { [key: string]: Course[] } = {
  'ux-designer': [
    {
      id: 1,
      title: 'Google UX Design Professional Certificate',
      provider: 'Google (Coursera)',
      duration: '6 months',
      level: 'Beginner',
      type: 'Certification',
      cost: '$49/month',
      description: 'Complete a series of 7 courses to build job-ready skills in UX design.',
      skills: ['User Research', 'Wireframing', 'Prototyping', 'Figma']
    },
    {
      id: 2,
      title: 'UI/UX Design Specialization',
      provider: 'California Institute of the Arts',
      duration: '4 months',
      level: 'Intermediate',
      type: 'Course',
      cost: '$39/month',
      description: 'Learn the full UX design process from user research to interactive prototypes.',
      skills: ['Design Thinking', 'Visual Design', 'Interface Design']
    },
    {
      id: 3,
      title: 'Certified User Experience Professional',
      provider: 'UXPA',
      duration: 'Self-paced',
      level: 'Advanced',
      type: 'Certification',
      cost: '$1,200',
      description: 'Industry-recognized certification for experienced UX professionals.',
      skills: ['UX Strategy', 'Usability Testing', 'Information Architecture']
    }
  ],
  'data-scientist': [
    {
      id: 1,
      title: 'IBM Data Science Professional Certificate',
      provider: 'IBM (Coursera)',
      duration: '5 months',
      level: 'Beginner',
      type: 'Certification',
      cost: '$49/month',
      description: 'Master data science tools including Python, SQL, and machine learning.',
      skills: ['Python', 'Machine Learning', 'Data Visualization', 'SQL']
    },
    {
      id: 2,
      title: 'Applied Data Science with Python',
      provider: 'University of Michigan',
      duration: '4 months',
      level: 'Intermediate',
      type: 'Course',
      cost: '$49/month',
      description: 'Learn data manipulation, visualization, and machine learning techniques.',
      skills: ['Pandas', 'Matplotlib', 'Scikit-learn', 'NumPy']
    },
    {
      id: 3,
      title: 'AWS Certified Machine Learning',
      provider: 'Amazon Web Services',
      duration: '3 months prep',
      level: 'Advanced',
      type: 'Certification',
      cost: '$300 exam fee',
      description: 'Industry-leading certification for ML on AWS cloud platform.',
      skills: ['AWS SageMaker', 'Deep Learning', 'MLOps']
    }
  ],
  'software-engineer': [
    {
      id: 1,
      title: 'Meta Front-End Developer Certificate',
      provider: 'Meta (Coursera)',
      duration: '7 months',
      level: 'Beginner',
      type: 'Certification',
      cost: '$49/month',
      description: 'Build job-ready skills for a front-end developer role.',
      skills: ['React', 'JavaScript', 'HTML/CSS', 'Git']
    },
    {
      id: 2,
      title: 'Full Stack Web Development Bootcamp',
      provider: 'Udemy',
      duration: '60 hours',
      level: 'Intermediate',
      type: 'Bootcamp',
      cost: '$89.99',
      description: 'Comprehensive bootcamp covering front-end and back-end development.',
      skills: ['Node.js', 'MongoDB', 'Express', 'React']
    },
    {
      id: 3,
      title: 'AWS Certified Developer Associate',
      provider: 'Amazon Web Services',
      duration: '2 months prep',
      level: 'Intermediate',
      type: 'Certification',
      cost: '$150 exam fee',
      description: 'Prove your expertise in developing cloud applications on AWS.',
      skills: ['AWS Services', 'Cloud Architecture', 'DevOps']
    }
  ],
  'product-manager': [
    {
      id: 1,
      title: 'Digital Product Management',
      provider: 'University of Virginia',
      duration: '3 months',
      level: 'Beginner',
      type: 'Course',
      cost: '$49/month',
      description: 'Learn the fundamentals of modern product management.',
      skills: ['Product Strategy', 'Agile', 'User Stories', 'Roadmapping']
    },
    {
      id: 2,
      title: 'Product Management Certificate',
      provider: 'Product School',
      duration: '8 weeks',
      level: 'Intermediate',
      type: 'Certification',
      cost: '$4,999',
      description: 'Industry-recognized PM certification with real-world projects.',
      skills: ['Product Vision', 'Metrics', 'Stakeholder Management']
    },
    {
      id: 3,
      title: 'Certified Scrum Product Owner',
      provider: 'Scrum Alliance',
      duration: '2 days',
      level: 'Intermediate',
      type: 'Certification',
      cost: '$1,000-1,500',
      description: 'Widely recognized certification for product owners in Agile teams.',
      skills: ['Scrum Framework', 'Backlog Management', 'Sprint Planning']
    }
  ],
  'devops-engineer': [
    {
      id: 1,
      title: 'DevOps Foundations',
      provider: 'LinkedIn Learning',
      duration: '2 hours',
      level: 'Beginner',
      type: 'Course',
      cost: '$39.99/month',
      description: 'Introduction to DevOps principles and practices.',
      skills: ['CI/CD', 'Automation', 'Infrastructure as Code']
    },
    {
      id: 2,
      title: 'Docker & Kubernetes Complete Course',
      provider: 'Udemy',
      duration: '22 hours',
      level: 'Intermediate',
      type: 'Course',
      cost: '$84.99',
      description: 'Master containerization and orchestration technologies.',
      skills: ['Docker', 'Kubernetes', 'Container Orchestration']
    },
    {
      id: 3,
      title: 'Certified Kubernetes Administrator',
      provider: 'Cloud Native Computing Foundation',
      duration: '3 months prep',
      level: 'Advanced',
      type: 'Certification',
      cost: '$395 exam fee',
      description: 'Industry-standard certification for Kubernetes administrators.',
      skills: ['Kubernetes', 'Cluster Management', 'Troubleshooting']
    }
  ],
  'graphic-designer': [
    {
      id: 1,
      title: 'Graphic Design Specialization',
      provider: 'California Institute of the Arts',
      duration: '6 months',
      level: 'Beginner',
      type: 'Course',
      cost: '$49/month',
      description: 'Learn the fundamentals of graphic design and visual communication.',
      skills: ['Typography', 'Color Theory', 'Layout Design', 'Adobe Creative Suite']
    },
    {
      id: 2,
      title: 'Adobe Certified Professional',
      provider: 'Adobe',
      duration: 'Self-paced',
      level: 'Intermediate',
      type: 'Certification',
      cost: '$180 per exam',
      description: 'Industry-recognized certification in Adobe Creative Cloud tools.',
      skills: ['Photoshop', 'Illustrator', 'InDesign']
    },
    {
      id: 3,
      title: 'Brand Identity Design',
      provider: 'Skillshare',
      duration: '2 hours',
      level: 'Intermediate',
      type: 'Course',
      cost: '$32/month',
      description: 'Learn to create cohesive brand identities and visual systems.',
      skills: ['Branding', 'Logo Design', 'Brand Guidelines']
    }
  ],
  'marketing-manager': [
    {
      id: 1,
      title: 'Google Digital Marketing Certificate',
      provider: 'Google (Coursera)',
      duration: '6 months',
      level: 'Beginner',
      type: 'Certification',
      cost: '$49/month',
      description: 'Comprehensive digital marketing training from Google.',
      skills: ['SEO', 'SEM', 'Social Media Marketing', 'Analytics']
    },
    {
      id: 2,
      title: 'Meta Social Media Marketing',
      provider: 'Meta (Coursera)',
      duration: '5 months',
      level: 'Intermediate',
      type: 'Certification',
      cost: '$49/month',
      description: 'Master social media marketing on Facebook and Instagram.',
      skills: ['Social Media Strategy', 'Ad Campaigns', 'Analytics']
    },
    {
      id: 3,
      title: 'HubSpot Inbound Marketing',
      provider: 'HubSpot Academy',
      duration: '4 hours',
      level: 'Beginner',
      type: 'Certification',
      cost: 'Free',
      description: 'Learn inbound marketing methodology and best practices.',
      skills: ['Content Marketing', 'Lead Generation', 'Marketing Automation']
    }
  ],
  'sales-manager': [
    {
      id: 1,
      title: 'Sales Training: Practical Sales Techniques',
      provider: 'LinkedIn Learning',
      duration: '3 hours',
      level: 'Beginner',
      type: 'Course',
      cost: '$39.99/month',
      description: 'Master essential sales techniques and strategies.',
      skills: ['Sales Process', 'Negotiation', 'Closing Techniques']
    },
    {
      id: 2,
      title: 'Certified Professional Sales Person',
      provider: 'National Association of Sales Professionals',
      duration: 'Self-paced',
      level: 'Intermediate',
      type: 'Certification',
      cost: '$495',
      description: 'Recognized certification demonstrating sales expertise.',
      skills: ['Sales Strategy', 'Account Management', 'Pipeline Management']
    },
    {
      id: 3,
      title: 'Salesforce Administrator Certification',
      provider: 'Salesforce',
      duration: '2 months prep',
      level: 'Intermediate',
      type: 'Certification',
      cost: '$200 exam fee',
      description: 'Industry-leading CRM certification for sales professionals.',
      skills: ['Salesforce', 'CRM Management', 'Sales Analytics']
    }
  ],
  'financial-manager': [
    {
      id: 1,
      title: 'Financial Analyst Training',
      provider: 'Corporate Finance Institute',
      duration: '4 months',
      level: 'Beginner',
      type: 'Course',
      cost: '$497',
      description: 'Comprehensive financial analysis and modeling training.',
      skills: ['Financial Modeling', 'Excel', 'Valuation', 'Financial Analysis']
    },
    {
      id: 2,
      title: 'Chartered Financial Analyst (CFA)',
      provider: 'CFA Institute',
      duration: '1-4 years',
      level: 'Advanced',
      type: 'Certification',
      cost: '$1,000-4,000',
      description: 'Gold standard certification for investment professionals.',
      skills: ['Portfolio Management', 'Investment Analysis', 'Ethics']
    },
    {
      id: 3,
      title: 'Financial Planning & Analysis',
      provider: 'LinkedIn Learning',
      duration: '5 hours',
      level: 'Intermediate',
      type: 'Course',
      cost: '$39.99/month',
      description: 'Learn FP&A processes and strategic financial planning.',
      skills: ['Budgeting', 'Forecasting', 'Financial Planning']
    }
  ],
  'investment-banker': [
    {
      id: 1,
      title: 'Investment Banking Foundations',
      provider: 'Wall Street Prep',
      duration: '8 weeks',
      level: 'Beginner',
      type: 'Course',
      cost: '$499',
      description: 'Learn core investment banking concepts and financial modeling.',
      skills: ['DCF Modeling', 'LBO Models', 'M&A Analysis']
    },
    {
      id: 2,
      title: 'Chartered Financial Analyst (CFA)',
      provider: 'CFA Institute',
      duration: '1-4 years',
      level: 'Advanced',
      type: 'Certification',
      cost: '$1,000-4,000',
      description: 'Prestigious certification for investment professionals.',
      skills: ['Equity Valuation', 'Fixed Income', 'Derivatives']
    },
    {
      id: 3,
      title: 'Financial Modeling & Valuation',
      provider: 'Corporate Finance Institute',
      duration: '6 months',
      level: 'Intermediate',
      type: 'Certification',
      cost: '$1,497',
      description: 'Master financial modeling for investment banking.',
      skills: ['Excel Modeling', 'Company Valuation', 'Deal Analysis']
    }
  ],
  'research-scientist': [
    {
      id: 1,
      title: 'Research Methods Specialization',
      provider: 'University of London',
      duration: '8 months',
      level: 'Beginner',
      type: 'Course',
      cost: '$49/month',
      description: 'Learn the fundamentals of scientific research methodology.',
      skills: ['Research Design', 'Data Collection', 'Statistical Analysis']
    },
    {
      id: 2,
      title: 'Scientific Writing for Researchers',
      provider: 'Stanford University',
      duration: '10 weeks',
      level: 'Intermediate',
      type: 'Course',
      cost: 'Free',
      description: 'Improve your scientific writing and publication skills.',
      skills: ['Academic Writing', 'Publication', 'Grant Writing']
    },
    {
      id: 3,
      title: 'Bioinformatics Specialization',
      provider: 'UC San Diego',
      duration: '7 months',
      level: 'Advanced',
      type: 'Course',
      cost: '$49/month',
      description: 'Learn computational approaches to biological data analysis.',
      skills: ['Python', 'Genomics', 'Algorithm Development']
    }
  ],
  'biotech-engineer': [
    {
      id: 1,
      title: 'Biotechnology Fundamentals',
      provider: 'MIT OpenCourseWare',
      duration: '12 weeks',
      level: 'Beginner',
      type: 'Course',
      cost: 'Free',
      description: 'Introduction to the principles and applications of biotechnology.',
      skills: ['Genetic Engineering', 'Cell Culture', 'Bioprocessing']
    },
    {
      id: 2,
      title: 'Biomanufacturing Certificate',
      provider: 'NC Biotech Center',
      duration: '6 months',
      level: 'Intermediate',
      type: 'Certification',
      cost: '$2,500',
      description: 'Learn GMP and biomanufacturing best practices.',
      skills: ['GMP', 'Quality Control', 'Regulatory Affairs']
    },
    {
      id: 3,
      title: 'CRISPR Gene Editing',
      provider: 'Coursera',
      duration: '4 weeks',
      level: 'Advanced',
      type: 'Course',
      cost: '$49',
      description: 'Master cutting-edge gene editing technologies.',
      skills: ['CRISPR', 'Gene Therapy', 'Molecular Biology']
    }
  ],
  'environmental-scientist': [
    {
      id: 1,
      title: 'Environmental Science & Sustainability',
      provider: 'University of Copenhagen',
      duration: '6 months',
      level: 'Beginner',
      type: 'Course',
      cost: 'Free',
      description: 'Explore environmental challenges and sustainable solutions.',
      skills: ['Environmental Assessment', 'Sustainability', 'Climate Science']
    },
    {
      id: 2,
      title: 'GIS Specialization',
      provider: 'UC Davis',
      duration: '5 months',
      level: 'Intermediate',
      type: 'Course',
      cost: '$49/month',
      description: 'Learn Geographic Information Systems for environmental analysis.',
      skills: ['ArcGIS', 'Remote Sensing', 'Spatial Analysis']
    },
    {
      id: 3,
      title: 'LEED Green Associate',
      provider: 'USGBC',
      duration: '2 months prep',
      level: 'Intermediate',
      type: 'Certification',
      cost: '$250 exam fee',
      description: 'Recognized certification in green building practices.',
      skills: ['Sustainable Design', 'LEED Standards', 'Green Building']
    }
  ],
  'illustrator': [
    {
      id: 1,
      title: 'Digital Illustration Fundamentals',
      provider: 'Skillshare',
      duration: '3 hours',
      level: 'Beginner',
      type: 'Course',
      cost: '$32/month',
      description: 'Learn the basics of digital illustration and drawing.',
      skills: ['Digital Drawing', 'Procreate', 'Character Design']
    },
    {
      id: 2,
      title: 'Illustration Techniques & Styles',
      provider: 'Domestika',
      duration: '5 hours',
      level: 'Intermediate',
      type: 'Course',
      cost: '$11.90',
      description: 'Develop your unique illustration style and techniques.',
      skills: ['Style Development', 'Visual Storytelling', 'Composition']
    },
    {
      id: 3,
      title: 'Commercial Illustration Bootcamp',
      provider: 'Society of Illustrators',
      duration: '8 weeks',
      level: 'Advanced',
      type: 'Bootcamp',
      cost: '$1,200',
      description: 'Professional training for commercial illustration work.',
      skills: ['Client Work', 'Portfolio Development', 'Licensing']
    }
  ],
  'art-director': [
    {
      id: 1,
      title: 'Art Direction Fundamentals',
      provider: 'Skillshare',
      duration: '2 hours',
      level: 'Beginner',
      type: 'Course',
      cost: '$32/month',
      description: 'Learn the principles of effective art direction.',
      skills: ['Visual Communication', 'Creative Direction', 'Concept Development']
    },
    {
      id: 2,
      title: 'Creative Leadership',
      provider: 'LinkedIn Learning',
      duration: '4 hours',
      level: 'Intermediate',
      type: 'Course',
      cost: '$39.99/month',
      description: 'Develop leadership skills for managing creative teams.',
      skills: ['Team Leadership', 'Creative Strategy', 'Project Management']
    },
    {
      id: 3,
      title: 'Advertising Art Direction',
      provider: 'Miami Ad School',
      duration: '2 years',
      level: 'Advanced',
      type: 'Degree Program',
      cost: '$40,000',
      description: 'Professional art direction program for advertising careers.',
      skills: ['Campaign Development', 'Brand Strategy', 'Portfolio Creation']
    }
  ],
  'animator': [
    {
      id: 1,
      title: '3D Animation Fundamentals',
      provider: 'Udemy',
      duration: '15 hours',
      level: 'Beginner',
      type: 'Course',
      cost: '$89.99',
      description: 'Learn the basics of 3D animation and character movement.',
      skills: ['Maya', 'Blender', 'Animation Principles']
    },
    {
      id: 2,
      title: 'Character Animation Bootcamp',
      provider: 'Animation Mentor',
      duration: '18 months',
      level: 'Intermediate',
      type: 'Bootcamp',
      cost: '$18,999',
      description: 'Professional character animation training from Pixar veterans.',
      skills: ['Character Animation', 'Acting for Animators', 'Demo Reel']
    },
    {
      id: 3,
      title: 'Unity Certified Developer',
      provider: 'Unity Technologies',
      duration: '3 months prep',
      level: 'Intermediate',
      type: 'Certification',
      cost: '$200 exam fee',
      description: 'Certification for creating interactive 3D experiences.',
      skills: ['Unity', 'Game Animation', 'Real-time Animation']
    }
  ],
  'technology': [
    {
      id: 1,
      title: 'Introduction to Computer Science',
      provider: 'Harvard (CS50)',
      duration: '12 weeks',
      level: 'Beginner',
      type: 'Course',
      cost: 'Free',
      description: 'Foundational computer science course covering programming and problem-solving.',
      skills: ['Programming', 'Algorithms', 'Data Structures']
    },
    {
      id: 2,
      title: 'Full Stack Web Development',
      provider: 'The Odin Project',
      duration: '6 months',
      level: 'Intermediate',
      type: 'Bootcamp',
      cost: 'Free',
      description: 'Comprehensive free bootcamp for full-stack development.',
      skills: ['JavaScript', 'React', 'Node.js', 'Databases']
    },
    {
      id: 3,
      title: 'AWS Solutions Architect',
      provider: 'Amazon Web Services',
      duration: '3 months prep',
      level: 'Advanced',
      type: 'Certification',
      cost: '$150 exam fee',
      description: 'Industry-leading cloud architecture certification.',
      skills: ['Cloud Computing', 'AWS Services', 'System Design']
    },
    {
      id: 4,
      title: 'Cybersecurity Fundamentals',
      provider: 'IBM',
      duration: '4 months',
      level: 'Beginner',
      type: 'Course',
      cost: '$49/month',
      description: 'Learn the basics of cybersecurity and network protection.',
      skills: ['Network Security', 'Threat Detection', 'Ethical Hacking']
    }
  ],
  'business': [
    {
      id: 1,
      title: 'Business Foundations Specialization',
      provider: 'University of Pennsylvania (Wharton)',
      duration: '8 months',
      level: 'Beginner',
      type: 'Course',
      cost: '$49/month',
      description: 'Learn business fundamentals including marketing, finance, and operations.',
      skills: ['Business Strategy', 'Finance', 'Marketing', 'Operations']
    },
    {
      id: 2,
      title: 'MBA Essentials',
      provider: 'Coursera',
      duration: '6 months',
      level: 'Intermediate',
      type: 'Course',
      cost: '$399',
      description: 'Core MBA concepts without the full degree commitment.',
      skills: ['Leadership', 'Financial Analysis', 'Strategic Planning']
    },
    {
      id: 3,
      title: 'Project Management Professional (PMP)',
      provider: 'PMI',
      duration: '3 months prep',
      level: 'Advanced',
      type: 'Certification',
      cost: '$555 exam fee',
      description: 'World-renowned project management certification.',
      skills: ['Project Management', 'Agile', 'Risk Management']
    },
    {
      id: 4,
      title: 'Entrepreneurship Specialization',
      provider: 'University of Pennsylvania',
      duration: '5 months',
      level: 'Intermediate',
      type: 'Course',
      cost: '$49/month',
      description: 'Learn to develop, fund, and launch new business ventures.',
      skills: ['Business Planning', 'Startup Finance', 'Pitching']
    }
  ],
  'arts': [
    {
      id: 1,
      title: 'Modern & Contemporary Art',
      provider: 'Museum of Modern Art',
      duration: '4 weeks',
      level: 'Beginner',
      type: 'Course',
      cost: 'Free',
      description: 'Explore modern art movements and contemporary practices.',
      skills: ['Art History', 'Visual Analysis', 'Critical Thinking']
    },
    {
      id: 2,
      title: 'Graphic Design Bootcamp',
      provider: 'Shillington',
      duration: '3 months',
      level: 'Intermediate',
      type: 'Bootcamp',
      cost: '$13,950',
      description: 'Intensive graphic design bootcamp for career changers.',
      skills: ['Design Software', 'Typography', 'Layout', 'Branding']
    },
    {
      id: 3,
      title: 'Creative Writing Specialization',
      provider: 'Wesleyan University',
      duration: '6 months',
      level: 'Beginner',
      type: 'Course',
      cost: '$49/month',
      description: 'Develop your creative writing skills across multiple genres.',
      skills: ['Storytelling', 'Character Development', 'Narrative Structure']
    },
    {
      id: 4,
      title: 'Motion Graphics Design',
      provider: 'School of Motion',
      duration: '12 weeks',
      level: 'Advanced',
      type: 'Course',
      cost: '$999',
      description: 'Professional motion graphics training for After Effects.',
      skills: ['After Effects', 'Animation', 'Visual Effects']
    }
  ],
  'sciences': [
    {
      id: 1,
      title: 'Introduction to Biology',
      provider: 'MIT OpenCourseWare',
      duration: '15 weeks',
      level: 'Beginner',
      type: 'Course',
      cost: 'Free',
      description: 'Comprehensive introduction to molecular and cellular biology.',
      skills: ['Biology', 'Genetics', 'Biochemistry']
    },
    {
      id: 2,
      title: 'Data Science for Life Sciences',
      provider: 'Harvard',
      duration: '7 months',
      level: 'Intermediate',
      type: 'Course',
      cost: '$49/month',
      description: 'Apply data science methods to biological research.',
      skills: ['R Programming', 'Biostatistics', 'Genomics']
    },
    {
      id: 3,
      title: 'Clinical Research Certification',
      provider: 'ACRP',
      duration: '6 months prep',
      level: 'Advanced',
      type: 'Certification',
      cost: '$495 exam fee',
      description: 'Professional certification for clinical research coordinators.',
      skills: ['Clinical Trials', 'GCP', 'Regulatory Compliance']
    },
    {
      id: 4,
      title: 'Environmental Science Certificate',
      provider: 'Cornell University',
      duration: '9 months',
      level: 'Intermediate',
      type: 'Certification',
      cost: '$2,700',
      description: 'Professional certificate in environmental science and conservation.',
      skills: ['Ecology', 'Conservation', 'Environmental Policy']
    }
  ]
};

export default function CoursesScreen() {
  const router = useRouter();
  const { career, category } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const pageId = (career || category) as string;
  const courses = coursesData[pageId] || [];

  const getPageTitle = () => {
    if (category) {
      const titles: { [key: string]: string } = {
        'technology': 'Technology Courses',
        'business': 'Business Courses',
        'arts': 'Arts Courses',
        'sciences': 'Sciences Courses'
      };
      return titles[category as string] || 'Courses & Certifications';
    }
    return 'Recommended Courses & Certifications';
  };

  const filteredCourses = courses.filter((course) => {
    const query = searchQuery.toLowerCase();
    return (
      course.title.toLowerCase().includes(query) ||
      course.provider.toLowerCase().includes(query) ||
      course.type.toLowerCase().includes(query) ||
      course.skills.some(skill => skill.toLowerCase().includes(query))
    );
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
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>{getPageTitle()}</Text>
        <Text style={styles.subtitle}>
          {category ? 'Browse courses across this field' : 'Level up your skills with these recommended courses'}
        </Text>

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
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredCourses.length === 0 ? (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No courses found</Text>
            <Text style={styles.noResultsSubtext}>Try adjusting your search</Text>
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
                {course.skills.map((skill, index) => (
                  <View key={index} style={styles.skillBadge}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backIcon: {
    fontSize: 24,
    color: '#9333EA',
    marginRight: 8,
  },
  backText: {
    fontSize: 16,
    color: '#9333EA',
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

