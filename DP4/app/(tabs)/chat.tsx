import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'mentor';
  timestamp: Date;
}

export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const fromRoute = params.from as string;
  const { colors } = useTheme();
  
  // Mentor details from params
  const mentorName = params.name as string || 'Mentor';
  const mentorTitle = params.title as string || '';
  const mentorCompany = params.company as string || '';
  const mentorInitials = params.initials as string || 'M';
  const mentorBio = params.bio as string || '';
  const mentorSkills = params.skills as string || '';

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Use API key from config file instead of environment variable
  const { GEMINI_API_KEY } = require('../../config/gemini');
  const apiKey = GEMINI_API_KEY || '';

  useEffect(() => {
    // Scroll to bottom when messages change
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    setInputText('');

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Create system prompt for the mentor persona
      const systemPrompt = `You are ${mentorName}, a ${mentorTitle} at ${mentorCompany}. 
${mentorBio}
Your expertise includes: ${mentorSkills}.
Respond as this mentor character, providing helpful career advice and insights based on your experience. 
Keep responses concise and conversational (2-3 sentences max).`;

      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout - the API took too long to respond')), 30000); // 30 second timeout
      });

      // Create the fetch promise
      const fetchPromise = fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\nUser: ${userMessage}\n\n${mentorName}:` }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
              topP: 0.8,
              topK: 40,
            },
            safetySettings: [
              {
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
              },
              {
                category: 'HARM_CATEGORY_HATE_SPEECH',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
              },
              {
                category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
              },
              {
                category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
              }
            ]
          }),
        }
      );

      // Race between fetch and timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP Status: ${response.status} - ${errorData.error?.message || 'API request failed'}`);
      }

      const data = await response.json();
      
      // Better error handling for API response
      let mentorResponse = '';
      
      // Check for blocked/filtered content
      if (data.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0];
        
        // Check if response was blocked by safety filters
        if (candidate.finishReason === 'SAFETY' || candidate.finishReason === 'RECITATION') {
          mentorResponse = "I apologize, but I can't respond to that particular question. Could you try rephrasing it?";
        } else if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          mentorResponse = candidate.content.parts[0].text || '';
        }
      }
      
      // Check for prompt feedback (alternative response structure)
      if (!mentorResponse && data.promptFeedback) {
        console.log('Prompt feedback:', data.promptFeedback);
        mentorResponse = "I apologize, but I'm having trouble processing that request. Could you try asking in a different way?";
      }
      
      // If still no response, check for errors in the response
      if (!mentorResponse) {
        console.log('Full API response:', JSON.stringify(data, null, 2));
        
        if (data.error) {
          mentorResponse = `I apologize, but I encountered an error: ${data.error.message || 'Unknown error'}. Please try again.`;
        } else {
          mentorResponse = "I'm having trouble responding right now. Please try again.";
        }
      }

      // Add mentor response
      const newMentorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: mentorResponse.trim(),
        sender: 'mentor',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMentorMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      
      let errorMessage = 'Sorry, I encountered an error. ';
      
      if (Platform.OS === 'web') {
        errorMessage += 'Direct API calls from web browsers are blocked by CORS. Please run this app on Android or iOS, or use a proxy server.';
      } else if (!apiKey) {
        errorMessage += 'API key is not configured. Please add EXPO_PUBLIC_GEMINI_API_KEY to your .env file.';
      } else {
        errorMessage += `Error: ${error.message}`;
      }

      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        sender: 'mentor',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.primaryLight }]}
          onPress={() => fromRoute ? router.push(fromRoute as any) : router.push('/(tabs)/' as any)}
          activeOpacity={0.7}
        >
          <Text style={[styles.backIcon, { color: colors.primary }]}>←</Text>
          <Text style={[styles.backText, { color: colors.primary }]}>Back</Text>
        </TouchableOpacity>

        <View style={styles.mentorHeader}>
          <View style={[styles.mentorAvatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.mentorAvatarText}>{mentorInitials}</Text>
          </View>
          <View style={styles.mentorHeaderInfo}>
            <Text style={[styles.mentorHeaderName, { color: colors.text }]}>{mentorName}</Text>
            <Text style={[styles.mentorHeaderTitle, { color: colors.textSecondary }]}>{mentorTitle}</Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>💬</Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Start a conversation with {mentorName}</Text>
          </View>
        )}

        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'user' ? [styles.userBubble, { backgroundColor: colors.primary }] : [styles.mentorBubble, { backgroundColor: colors.cardBackground, borderColor: colors.border }],
            ]}
          >
            <Text
              style={[
                styles.messageText,
                message.sender === 'user' ? styles.userText : [styles.mentorText, { color: colors.text }],
              ]}
            >
              {message.text}
            </Text>
          </View>
        ))}

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Typing...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View style={[styles.inputContainer, { backgroundColor: colors.cardBackground, borderTopColor: colors.border }]}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
          placeholder="Type a message..."
          placeholderTextColor={colors.textTertiary}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[
            styles.sendButton, 
            { backgroundColor: colors.primary },
            (!inputText.trim() || isLoading) && { backgroundColor: colors.border }
          ]}
          onPress={sendMessage}
          disabled={!inputText.trim() || isLoading}
          activeOpacity={0.7}
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
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 24,
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
  mentorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mentorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  mentorAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  mentorHeaderInfo: {
    flex: 1,
  },
  mentorHeaderName: {
    fontSize: 18,
    fontWeight: '600',
  },
  mentorHeaderTitle: {
    fontSize: 14,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
  },
  mentorBubble: {
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: '#FFFFFF',
  },
  mentorText: {
    // Color applied inline
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 14,
    marginLeft: 8,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

