import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Sun, Users } from 'lucide-react-native';

export default function HomeScreen() {
  const [quizCode, setQuizCode] = useState('');
  const router = useRouter();

  const handleJoinQuiz = () => {
    if (quizCode.trim()) {
      router.push(`/quiz?code=${quizCode}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
          <View style={styles.sunContainer}>
            <Sun size={20} color="#F59E0B" />
          </View>
          <Text style={styles.greeting}>GOOD MORNING</Text>
        </View>
        <Text style={styles.userName}>Madelyn Dias</Text>
        
        {/* Profile Avatar */}
        <View style={styles.avatar}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>👩</Text>
          </View>
        </View>
      </View>

      {/* Join Quiz Section */}
      <View style={styles.joinQuizContainer}>
        <Text style={styles.joinQuizTitle}>JOIN A QUIZ</Text>
        <View style={styles.codeInputContainer}>
          <Text style={styles.hashSymbol}>#</Text>
          <Text style={styles.enterCodeText}>Enter Code</Text>
        </View>
        <TextInput
          style={styles.codeInput}
          placeholder="eg. abc231"
          placeholderTextColor="#999"
          value={quizCode}
          onChangeText={setQuizCode}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.joinButton} onPress={handleJoinQuiz}>
          <Text style={styles.joinButtonText}>JOIN</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Section */}
      <View style={styles.featuredContainer}>
        <View style={styles.featuredHeader}>
          <View style={styles.featuredIcon}>
            <Text style={styles.featuredIconText}>👨‍💼</Text>
          </View>
          <Text style={styles.featuredLabel}>FEATURED</Text>
        </View>
        
        <Text style={styles.featuredTitle}>
          Take part in challenges{'\n'}with friends or other{'\n'}players
        </Text>
        
        <TouchableOpacity style={styles.findFriendsButton}>
          <Users size={20} color="#F59E0B" />
          <Text style={styles.findFriendsText}>Find Friends</Text>
        </TouchableOpacity>
        
        <View style={styles.featuredAvatars}>
          <View style={styles.featuredAvatar1}>
            <Text>👩‍💼</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sunContainer: {
    marginRight: 8,
  },
  greeting: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  avatar: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
  },
  joinQuizContainer: {
    backgroundColor: '#F8D7DA',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  joinQuizTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#721C24',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  codeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  hashSymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: '#721C24',
    marginRight: 8,
  },
  enterCodeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#721C24',
  },
  codeInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  joinButton: {
    backgroundColor: '#F97316',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  featuredContainer: {
    backgroundColor: '#F59E0B',
    borderRadius: 20,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  featuredHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featuredIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featuredIconText: {
    fontSize: 16,
  },
  featuredLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 20,
    lineHeight: 24,
  },
  findFriendsButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  findFriendsText: {
    color: '#F59E0B',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  featuredAvatars: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  featuredAvatar1: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});