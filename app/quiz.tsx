import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

const quizQuestions = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "Home Tool Markup Language", 
      "Hyperlinks and Text Markup Language",
      "HyperText Making Language"
    ],
    correct: 0,
    timer: 30
  },
  {
    id: 2,
    question: "Which programming language is known as the 'language of the web'?",
    options: ["Python", "JavaScript", "Java", "C++"],
    correct: 1,
    timer: 25
  },
  {
    id: 3,
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets", 
      "Colorful Style Sheets"
    ],
    correct: 2,
    timer: 20
  }
];

const mockLeaderboard = [
  { name: 'Davis Curtis', points: 2850, avatar: '👨‍💼', time: '2.3s' },
  { name: 'Alena Donin', points: 2340, avatar: '👩‍💼', time: '3.1s' },
  { name: 'Craig Gouse', points: 2100, avatar: '👨‍💼', time: '4.2s' },
  { name: 'Madelyn Dias', points: 1890, avatar: '👩', time: '5.1s' },
  { name: 'Zain Vaccaro', points: 1650, avatar: '👨‍💼', time: '6.8s' },
];

export default function QuizScreen() {
  const [step, setStep] = useState('name'); // 'name', 'question', 'leaderboard', 'final'
  const [displayName, setDisplayName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [userAnswered, setUserAnswered] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [score, setScore] = useState(0);
  const router = useRouter();
  const { code } = useLocalSearchParams();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (step === 'question' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (step === 'question' && timeLeft === 0) {
      // Time up, show leaderboard
      setShowLeaderboard(true);
    }

    return () => clearTimeout(timer);
  }, [timeLeft, step]);

  useEffect(() => {
    if (showLeaderboard) {
      const leaderboardTimer = setTimeout(() => {
        setShowLeaderboard(false);
        if (currentQuestion < quizQuestions.length - 1) {
          // Next question
          setCurrentQuestion(prev => prev + 1);
          setSelectedAnswer(null);
          setUserAnswered(false);
          setTimeLeft(quizQuestions[currentQuestion + 1].timer);
        } else {
          // Quiz complete
          setStep('final');
        }
      }, 10000); // 10 seconds

      return () => clearTimeout(leaderboardTimer);
    }
  }, [showLeaderboard, currentQuestion]);

  const handleStartQuiz = () => {
    if (displayName.trim()) {
      setStep('question');
      setTimeLeft(quizQuestions[0].timer);
    } else {
      Alert.alert('Name Required', 'Please enter your display name');
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!userAnswered) {
      setSelectedAnswer(answerIndex);
      setUserAnswered(true);
      
      // Check if correct
      if (answerIndex === quizQuestions[currentQuestion].correct) {
        setScore(prev => prev + 100);
      }
    }
  };

  if (step === 'name') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Quiz: {code}</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.nameTitle}>Enter Your Display Name</Text>
          <TextInput
            style={styles.nameInput}
            placeholder="Your name"
            placeholderTextColor="#999"
            value={displayName}
            onChangeText={setDisplayName}
          />
          <TouchableOpacity style={styles.startButton} onPress={handleStartQuiz}>
            <Text style={styles.startButtonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (showLeaderboard) {
    return (
      <SafeAreaView style={styles.leaderboardContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#22C55E" />
        
        <View style={styles.leaderboardHeader}>
          <Text style={styles.leaderboardTitle}>Question {currentQuestion + 1} Results</Text>
          <Text style={styles.correctAnswer}>
            Correct Answer: {quizQuestions[currentQuestion].options[quizQuestions[currentQuestion].correct]}
          </Text>
        </View>

        <View style={styles.fastestContainer}>
          <Text style={styles.fastestTitle}>🚀 Fastest Answer</Text>
          <Text style={styles.fastestName}>Davis Curtis - 2.3s</Text>
        </View>

        <ScrollView style={styles.leaderboardList}>
          {mockLeaderboard.map((player, index) => (
            <View key={index} style={styles.leaderboardItem}>
              <Text style={styles.leaderboardRank}>{index + 1}</Text>
              <Text style={styles.leaderboardAvatar}>{player.avatar}</Text>
              <View style={styles.leaderboardInfo}>
                <Text style={styles.leaderboardName}>{player.name}</Text>
                <Text style={styles.leaderboardPoints}>{player.points} points</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (step === 'final') {
    return (
      <SafeAreaView style={styles.finalContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#22C55E" />
        
        <View style={styles.finalHeader}>
          <Text style={styles.finalTitle}>Quiz Complete!</Text>
          <View style={styles.finalStatsContainer}>
            <Text style={styles.finalStats}>#4</Text>
            <Text style={styles.finalMessage}>You are doing better than 60% of other players!</Text>
          </View>
        </View>

        <View style={styles.podium}>
          <View style={styles.podiumSecond}>
            <Text style={styles.podiumAvatar}>👩‍💼</Text>
            <Text style={styles.podiumName}>Alena Donin</Text>
            <Text style={styles.podiumPoints}>1,469 GP</Text>
            <View style={styles.podiumRank}>
              <Text style={styles.podiumRankText}>2</Text>
            </View>
          </View>
          
          <View style={styles.podiumFirst}>
            <Text style={styles.podiumCrown}>👑</Text>
            <Text style={styles.podiumAvatar}>👨‍💼</Text>
            <Text style={styles.podiumName}>Davis Curtis</Text>
            <Text style={styles.podiumPoints}>2,569 GP</Text>
            <View style={styles.podiumRank}>
              <Text style={styles.podiumRankText}>1</Text>
            </View>
          </View>
          
          <View style={styles.podiumThird}>
            <Text style={styles.podiumAvatar}>👨‍💼</Text>
            <Text style={styles.podiumName}>Craig Gouse</Text>
            <Text style={styles.podiumPoints}>1,053 GP</Text>
            <View style={styles.podiumRank}>
              <Text style={styles.podiumRankText}>3</Text>
            </View>
          </View>
        </View>

        <View style={styles.finalLeaderboard}>
          <View style={styles.finalLeaderboardItem}>
            <Text style={styles.finalRank}>4</Text>
            <Text style={styles.finalAvatar}>👩</Text>
            <Text style={styles.finalName}>Madelyn Dias</Text>
            <Text style={styles.finalPoints}>590 points</Text>
          </View>
          <View style={styles.finalLeaderboardItem}>
            <Text style={styles.finalRank}>5</Text>
            <Text style={styles.finalAvatar}>👨‍💼</Text>
            <Text style={styles.finalName}>Zain Vaccaro</Text>
            <Text style={styles.finalPoints}>448 points</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.backHomeButton} 
          onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.backHomeText}>Back to Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View style={styles.questionHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{timeLeft}s</Text>
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionNumber}>
          Question {currentQuestion + 1} of {quizQuestions.length}
        </Text>
        <Text style={styles.questionText}>
          {quizQuestions[currentQuestion].question}
        </Text>

        <View style={styles.optionsContainer}>
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === index && styles.selectedOption,
                userAnswered && styles.disabledOption,
              ]}
              onPress={() => handleAnswerSelect(index)}
              disabled={userAnswered}>
              <Text
                style={[
                  styles.optionText,
                  selectedAnswer === index && styles.selectedOptionText,
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {userAnswered && (
          <View style={styles.waitingContainer}>
            <Text style={styles.waitingText}>
              ✓ Answer submitted! Waiting for other players...
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  nameTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  nameInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  startButton: {
    backgroundColor: '#F97316',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  timerContainer: {
    backgroundColor: '#EF4444',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  timerText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  questionContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  questionNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginBottom: 30,
    lineHeight: 30,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#FEF3E2',
    borderColor: '#F97316',
  },
  disabledOption: {
    opacity: 0.6,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#F97316',
    fontWeight: '600',
  },
  waitingContainer: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    alignItems: 'center',
  },
  waitingText: {
    color: '#15803D',
    fontSize: 14,
    fontWeight: '500',
  },
  leaderboardContainer: {
    flex: 1,
    backgroundColor: '#22C55E',
  },
  leaderboardHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  leaderboardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  correctAnswer: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  fastestContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  fastestTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  fastestName: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  leaderboardList: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    paddingTop: 20,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  leaderboardRank: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    width: 30,
  },
  leaderboardAvatar: {
    fontSize: 32,
    marginHorizontal: 16,
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  leaderboardPoints: {
    fontSize: 14,
    color: '#666',
  },
  finalContainer: {
    flex: 1,
    backgroundColor: '#22C55E',
  },
  finalHeader: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  finalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 20,
  },
  finalStatsContainer: {
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  finalStats: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  finalMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'end',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  podiumSecond: {
    alignItems: 'center',
    marginRight: 10,
  },
  podiumFirst: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  podiumThird: {
    alignItems: 'center',
    marginLeft: 10,
  },
  podiumCrown: {
    fontSize: 32,
    marginBottom: 8,
  },
  podiumAvatar: {
    fontSize: 40,
    marginBottom: 8,
  },
  podiumName: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
  },
  podiumPoints: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 12,
  },
  podiumRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  podiumRankText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  finalLeaderboard: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    paddingTop: 20,
  },
  finalLeaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  finalRank: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    width: 30,
  },
  finalAvatar: {
    fontSize: 32,
    marginHorizontal: 16,
  },
  finalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  finalPoints: {
    fontSize: 14,
    color: '#666',
  },
  backHomeButton: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  backHomeText: {
    color: '#22C55E',
    fontSize: 16,
    fontWeight: '600',
  },
});