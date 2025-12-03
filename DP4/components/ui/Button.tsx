import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  ViewStyle, 
  TextStyle,
  TouchableOpacityProps 
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  isLoading?: boolean;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  isLoading = false,
  disabled,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    if (disabled && !isLoading) return colors.inputBackground; // Disabled state
    switch (variant) {
      case 'primary': return colors.primary;
      case 'secondary': return colors.primaryLight;
      case 'outline': return 'transparent';
      case 'ghost': return 'transparent';
      case 'danger': return '#EF4444';
      default: return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled && !isLoading) return colors.textTertiary;
    switch (variant) {
      case 'primary': return '#FFFFFF';
      case 'secondary': return colors.primary;
      case 'outline': return colors.text;
      case 'ghost': return colors.primary;
      case 'danger': return '#FFFFFF';
      default: return '#FFFFFF';
    }
  };

  const getBorderColor = () => {
    if (disabled && !isLoading) return colors.border;
    switch (variant) {
      case 'outline': return colors.border;
      default: return 'transparent';
    }
  };

  const getBorderWidth = () => {
    if (variant === 'outline') return 1.5;
    return 0;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: getBorderWidth(),
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <>
          {leftIcon}
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
            {title}
          </Text>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    minHeight: 50,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

