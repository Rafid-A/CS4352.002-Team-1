import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/Button';

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
          <Button
            title="Find a Mentor"
            variant="primary"
            onPress={() => router.push({ pathname: '/(tabs)/mentors', params: { from: currentRoute } } as any)}
          />

          <Button
            title="View Courses & Certifications"
            variant="secondary"
            onPress={() => router.push(`/courses?career=${careerName}` as any)}
          />
          
          <Button
            title="Take Career Quiz"
            variant="outline"
            onPress={() => router.push({ pathname: '/(tabs)/quiz', params: { from: currentRoute } } as any)}
          />
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
});

