import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

interface JobFooterProps {
  currentRoute: string;
  careerName: string; // e.g. 'data-scientist', 'ux-designer'
}

export default function JobFooter({ currentRoute, careerName }: JobFooterProps) {
  const router = useRouter();
  const { colors } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBackground, borderTopColor: colors.border }]}>
      <TouchableOpacity 
        style={[styles.header, { borderBottomWidth: isCollapsed ? 0 : 1, borderBottomColor: colors.border }]} 
        onPress={toggleCollapse}
        activeOpacity={0.7}
      >
        <Text style={[styles.headerText, { color: colors.text }]}>
          {isCollapsed ? 'Show Career Actions' : 'Hide Career Actions'}
        </Text>
        <Text style={[styles.chevron, { color: colors.text }]}>
          {isCollapsed ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {!isCollapsed && (
        <View style={styles.buttonsContainer}>
           <TouchableOpacity 
            style={[styles.mentorButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.8}
            onPress={() => router.push({ pathname: '/(tabs)/mentors', params: { from: currentRoute } } as any)}
          >
            <Text style={styles.mentorButtonText}>Find a Mentor</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.coursesButton} 
            activeOpacity={0.8}
            onPress={() => router.push(`/courses?career=${careerName}` as any)}
          >
            <Text style={styles.coursesButtonText}>View Courses & Certifications</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.quizButton, { backgroundColor: colors.cardBackground, borderColor: colors.border }]} 
            activeOpacity={0.8} 
            onPress={() => router.push({ pathname: '/(tabs)/quiz', params: { from: currentRoute } } as any)}
          >
            <Text style={[styles.quizButtonText, { color: colors.text }]}>Take Career Quiz</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
    gap: 12,
  },
  mentorButton: {
    paddingVertical: 16,
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
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  coursesButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  quizButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  quizButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
});

