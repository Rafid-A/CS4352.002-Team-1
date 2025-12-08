import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { GEMINI_API_KEY, mentorPrompts } from '../config/gemini';
import { useTheme } from '../context/ThemeContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'mentor';
  timestamp: Date;
}

interface Mentor {
  id: number;
  name: string;
  title: string;
  initials: string;
}

const mentorsData: { [key: string]: Mentor } = {
  '1': { id: 1, name: 'Sarah Chen', title: 'Senior UX Designer', initials: 'SC' },
  '2': { id: 2, name: 'Michael Rodriguez', title: 'Lead Product Manager', initials: 'MR' },
  '3': { id: 3, name: 'Emily Watson', title: 'Creative Director', initials: 'EW' },
  '4': { id: 4, name: 'David Kim', title: 'Data Science Manager', initials: 'DK' },
  '5': { id: 5, name: 'Jennifer Park', title: 'Principal Software Engineer', initials: 'JP' },
  '6': { id: 6, name: 'Dr. Robert Taylor', title: 'Senior Research Scientist', initials: 'RT' },
  '7': { id: 7, name: 'Amanda Foster', title: 'Marketing Director', initials: 'AF' },
  '8': { id: 8, name: 'James Wilson', title: 'VP of Sales', initials: 'JW' },
  '9': { id: 9, name: 'Lisa Anderson', title: 'VP of Finance', initials: 'LA' },
  '10': { id: 10, name: 'Marcus Johnson', title: 'Managing Director', initials: 'MJ' },
  '11': { id: 11, name: 'Rachel Green', title: 'Senior DevOps Engineer', initials: 'RG' },
  '12': { id: 12, name: 'Dr. Maria Santos', title: 'Biotechnology Director', initials: 'MS' },
  '13': { id: 13, name: 'Thomas Carter', title: 'Environmental Program Director', initials: 'TC' },
  '14': { id: 14, name: 'Sophie Martinez', title: 'Lead Illustrator', initials: 'SM' },
  '15': { id: 15, name: 'Alex Thompson', title: 'Executive Art Director', initials: 'AT' },
  '16': { id: 16, name: 'Nina Patel', title: 'Lead Animator', initials: 'NP' },
};

const initialMessages: { [key: string]: Message[] } = {};

export default function ChatScreen() {
  const router = useRouter();
  const { mentorId } = useLocalSearchParams();
  const { colors } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  const mentor = mentorsData[mentorId as string];
  const [messages, setMessages] = useState<Message[]>(() => {
    if (!initialMessages[mentorId as string]) {
      initialMessages[mentorId as string] = [];
    }
    return initialMessages[mentorId as string];
  });
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSend = async () => {
    if (inputText.trim() === '' || isLoading) return;

    const userMessageText = inputText.trim();
    const newMessage: Message = {
      id: messages.length + 1,
      text: userMessageText,
      sender: 'user',
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    initialMessages[mentorId as string] = updatedMessages;
    setInputText('');
    Keyboard.dismiss();
    setIsLoading(true);

    try {
      const mentorContext = mentorPrompts[mentorId as string];
      
      const conversationHistory = updatedMessages
        .map(msg => `${msg.sender === 'user' ? 'User' : 'Mentor'}: ${msg.text}`)
        .join('\n');

      const prompt = `${mentorContext}\n\nConversation so far:\n${conversationHistory}\n\nRespond to the user's latest message as the mentor. Keep your response helpful, professional, and under 200 words.`;

      // Use REST API instead of SDK to avoid CORS issues
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: prompt }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 250000,
            }
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP Status: ${response.status} - ${errorData.error?.message || 'API request failed'}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                   "I apologize, but I'm having trouble responding right now. Please try again in a moment.";

      const mentorResponse: Message = {
        id: updatedMessages.length + 1,
        text: text,
        sender: 'mentor',
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, mentorResponse];
      setMessages(finalMessages);
      initialMessages[mentorId as string] = finalMessages;
    } catch (error: any) {
      console.error('Error calling Gemini:', error);
      
      let errorMessage = "I apologize, but I'm having trouble connecting right now. ";
      
      if (Platform.OS === 'web') {
        // CORS error - provide helpful message
        if (error.message?.includes('CORS') || error.message?.includes('Failed to fetch')) {
          errorMessage += "Direct API calls from web browsers are blocked by CORS. Please run this app on Android or iOS for the full experience.";
        } else {
          errorMessage += `Error: ${error.message || 'Please try again in a moment.'}`;
        }
      } else if (!GEMINI_API_KEY || GEMINI_API_KEY.length < 20) {
        errorMessage += "API key is not configured. Please check your config/gemini.ts file.";
      } else {
        errorMessage += `Error: ${error.message || 'Please try again in a moment.'}`;
      }
      
      const errorResponse: Message = {
        id: updatedMessages.length + 1,
        text: errorMessage,
        sender: 'mentor',
        timestamp: new Date(),
      };
      const finalMessages = [...updatedMessages, errorResponse];
      setMessages(finalMessages);
      initialMessages[mentorId as string] = finalMessages;
    } finally {
      setIsLoading(false);
    }
  };

  if (!mentor) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>Mentor not found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={[styles.header, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.primaryLight }]}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={[styles.backIcon, { color: colors.primary }]}>←</Text>
          <Text style={[styles.backText, { color: colors.primary }]}>Back</Text>
        </TouchableOpacity>

        <View style={styles.mentorHeaderInfo}>
          <View style={[styles.smallAvatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.smallAvatarText}>{mentor.initials}</Text>
          </View>
          <View style={styles.mentorTextInfo}>
            <Text style={[styles.headerName, { color: colors.text }]}>{mentor.name}</Text>
            <Text style={[styles.headerTitle, { color: colors.textSecondary }]}>{mentor.title}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userMessage : styles.mentorMessage,
            ]}
          >
            {message.sender === 'mentor' && (
              <View style={[styles.tinyAvatar, { backgroundColor: colors.primary }]}>
                <Text style={styles.tinyAvatarText}>{mentor.initials}</Text>
              </View>
            )}
            <View
              style={[
                styles.messageContent,
                message.sender === 'user' 
                  ? [styles.userMessageContent, { backgroundColor: colors.primary }]
                  : [styles.mentorMessageContent, { backgroundColor: colors.cardBackground }],
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.sender === 'user' ? styles.userMessageText : [styles.mentorMessageText, { color: colors.text }],
                ]}
              >
                {message.text}
              </Text>
              <Text
                style={[
                  styles.timestamp,
                  message.sender === 'user' 
                    ? [styles.userTimestamp, { color: colors.primaryLight }]
                    : [styles.mentorTimestamp, { color: colors.textTertiary }],
                ]}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          </View>
        ))}
        
        {isLoading && (
          <View style={[styles.messageBubble, styles.mentorMessage]}>
            <View style={[styles.tinyAvatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.tinyAvatarText}>{mentor.initials}</Text>
            </View>
            <View style={[styles.messageContent, styles.mentorMessageContent, styles.loadingContent, { backgroundColor: colors.cardBackground }]}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={[styles.loadingText, { color: colors.primary }]}>Typing...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={[styles.inputContainer, { backgroundColor: colors.cardBackground, borderTopColor: colors.border }]}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor={colors.textTertiary}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: inputText.trim() === '' ? colors.inputBackground : colors.primary }]}
          onPress={handleSend}
          activeOpacity={0.7}
          disabled={inputText.trim() === ''}
        >
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  backIcon: {
    fontSize: 20,
    marginRight: 4,
  },
  backText: {
    fontSize: 16,
    fontWeight: '500',
  },
  mentorHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 12,
  },
  smallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  smallAvatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  mentorTextInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 17,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 13,
    marginTop: 2,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 12,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  mentorMessage: {
    alignSelf: 'flex-start',
  },
  tinyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 4,
  },
  tinyAvatarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  messageContent: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    flexShrink: 1,
  },
  userMessageContent: {
    borderBottomRightRadius: 4,
  },
  mentorMessageContent: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 4,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  mentorMessageText: {
  },
  timestamp: {
    fontSize: 11,
  },
  userTimestamp: {
    textAlign: 'right',
  },
  mentorTimestamp: {
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
  },
  sendIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
  },
  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  loadingText: {
    fontSize: 14,
    marginLeft: 8,
  },
});

