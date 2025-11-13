import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const quizQuestions = [
  {
    question: "Which of these tasks sounds most appealing?",
    options: [
      "A) Designing a creative and original solution to a problem.",
      "B) Analyzing complex data to find a logical and efficient answer.",
      "C) Persuading and collaborating with a team to achieve a goal.",
      "D) Building or perfecting a tangible product or system."
    ]
  },
  {
    question: "When facing a major challenge, what is your first instinct?",
    options: [
      "A) Brainstorm a wide variety of new, unconventional ideas.",
      "B) Create a step-by-step logical plan to tackle it systematically.",
      "C) Ask how this challenge impacts people and how I can help them.",
      "D) Look for a practical, hands-on way to start solving it immediately."
    ]
  },
  {
    question: "What kind of work environment do you prefer?",
    options: [
      "A) A flexible, unstructured environment where I can set my own rules.",
      "B) A quiet, organized, and predictable environment focused on deep work.",
      "C) A highly social and collaborative environment with lots of interaction.",
      "D) A results-oriented, fast-paced setting focused on execution."
    ]
  },
  {
    question: "You feel most satisfied after...",
    options: [
      "A) You've created something entirely new and unique.",
      "B) You've solved a difficult puzzle or optimized a complex system.",
      "C) You've successfully helped a client or taught a colleague something.",
      "D) You've completed a project and can see the physical results."
    ]
  },
  {
    question: "Which activity would you rather do for a living?",
    options: [
      "A) Inventing new products, stories, or art.",
      "B) Researching, fact-checking, and ensuring accuracy.",
      "C) Leading a team, public speaking, or negotiating a deal.",
      "D) Following precise instructions to build or repair something complex."
    ]
  },
  {
    question: "How do you prefer to learn new things?",
    options: [
      "A) By experimenting, tinkering, and trying things out myself.",
      "B) By reading books, taking structured courses, and analyzing theory.",
      "C) By discussing ideas with mentors, peers, and experts.",
      "D) Through an apprenticeship or on-the-job, hands-on training."
    ]
  },
  {
    question: "What's more important in a project?",
    options: [
      "A) The originality and artistic vision of the final product.",
      "B) The efficiency, accuracy, and logic of the process.",
      "C) The team's harmony and the positive impact on the end-user.",
      "D) The quality, reliability, and functionality of the final product."
    ]
  },
  {
    question: "You are most energized by...",
    options: [
      "A) Abstract ideas, 'what-if' scenarios, and future possibilities.",
      "B) Concrete facts, proven patterns, and data-driven truths.",
      "C) Human connection, understanding motivations, and building relationships.",
      "D) Seeing a project through from start to tangible finish."
    ]
  },
  {
    question: "Pick a problem-solving style:",
    options: [
      "A) 'Thinking outside the box' to find a solution no one has thought of.",
      "B) Using deductive reasoning and evidence to find the single best solution.",
      "C) Facilitating a group discussion to build consensus on a solution.",
      "D) Using established procedures and best practices to find a reliable solution."
    ]
  },
  {
    question: "Ultimately, you want your career to be...",
    options: [
      "A) A platform for self-expression and innovation.",
      "B) A source of intellectual challenge and mastery of a subject.",
      "C) A way to make a difference and contribute to a community.",
      "D) A stable path where I can produce high-quality, consistent work."
    ]
  }
];

const careerRecommendations = {
  A: [
    { title: 'Illustrator', route: '/illustrator' },
    { title: 'Art Director', route: '/art-director' },
    { title: 'Animator', route: '/animator' },
    { title: 'Graphic Designer', route: '/graphic-designer' }
  ],
  B: [
    { title: 'Data Scientist', route: '/data-scientist' },
    { title: 'Research Scientist', route: '/research-scientist' },
    { title: 'Biotech Engineer', route: '/biotech-engineer' },
    { title: 'Environmental Scientist', route: '/environmental-scientist' }
  ],
  C: [
    { title: 'Marketing Manager', route: '/marketing-manager' },
    { title: 'Sales Manager', route: '/sales-manager' },
    { title: 'Financial Manager', route: '/financial-manager' },
    { title: 'Investment Banker', route: '/investment-banker' }
  ],
  D: [
    { title: 'Software Engineer', route: '/software-engineer' },
    { title: 'DevOps Engineer', route: '/devops-engineer' },
    { title: 'Product Manager', route: '/product-manager' },
    { title: 'UX Designer', route: '/ux-designer' }
  ]
};

export default function QuizPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const fromRoute = params.from as string;
  const currentRoute = '/(tabs)/quiz';
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const answer = quizQuestions[currentQuestion].options[selectedOption].charAt(0); // Get A, B, C, or D
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      // Quiz completed, calculate results
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: string[]) => {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    finalAnswers.forEach(answer => {
      counts[answer as keyof typeof counts]++;
    });

    // Find the most common answer
    const maxCount = Math.max(counts.A, counts.B, counts.C, counts.D);
    const topAnswer = (Object.keys(counts) as Array<keyof typeof counts>).find(
      key => counts[key] === maxCount
    )!;

    setShowResults(true);
  };

  const getTopAnswer = () => {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    answers.forEach(answer => {
      counts[answer as keyof typeof counts]++;
    });
    const maxCount = Math.max(counts.A, counts.B, counts.C, counts.D);
    return (Object.keys(counts) as Array<keyof typeof counts>).find(
      key => counts[key] === maxCount
    )!;
  };

  const getResultMessage = () => {
    const topAnswer = getTopAnswer();
    const messages = {
      A: { category: 'Creative & Artistic', description: 'You thrive in creative environments and excel at designing innovative solutions.' },
      B: { category: 'Analytical & Scientific', description: 'You excel at logical thinking and solving complex problems with data and research.' },
      C: { category: 'People-Oriented & Business', description: 'You shine in collaborative settings and enjoy helping others achieve their goals.' },
      D: { category: 'Practical & Technical', description: 'You prefer hands-on work and building tangible, functional solutions.' }
    };
    return messages[topAnswer];
  };

  if (showResults) {
    const topAnswer = getTopAnswer();
    const recommendations = careerRecommendations[topAnswer];
    const resultMessage = getResultMessage();

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => fromRoute ? router.push(fromRoute as any) : router.push('/(tabs)/' as any)} style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Your Results!</Text>
            <View style={styles.resultCard}>
              <Text style={styles.resultCategory}>{resultMessage.category}</Text>
              <Text style={styles.resultDescription}>{resultMessage.description}</Text>
            </View>

            <Text style={styles.recommendationsTitle}>Recommended Careers for You:</Text>
            <View style={styles.careersList}>
              {recommendations.map((career, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.careerCard}
                  onPress={() => router.push({ pathname: career.route, params: { from: currentRoute } } as any)}
                >
                  <Text style={styles.careerTitle}>{career.title}</Text>
                  <View style={styles.careerArrow}>
                    <Text style={styles.arrowIcon}>→</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.retakeButton}
              onPress={() => {
                setCurrentQuestion(0);
                setAnswers([]);
                setSelectedOption(null);
                setShowResults(false);
              }}
            >
              <Text style={styles.retakeButtonText}>Retake Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => router.push('/')}
            >
              <Text style={styles.homeButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => fromRoute ? router.push(fromRoute as any) : router.push('/(tabs)/' as any)} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.questionCounter}>
            Question {currentQuestion + 1} of {quizQuestions.length}
          </Text>
          <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.questionText}>{quizQuestions[currentQuestion].question}</Text>

        <View style={styles.optionsContainer}>
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionCard,
                selectedOption === index && styles.optionCardSelected
              ]}
              onPress={() => handleSelectOption(index)}
            >
              <Text style={styles.optionText}>{option}</Text>
              <View style={[
                styles.radioButton,
                selectedOption === index && styles.radioButtonSelected
              ]}>
                {selectedOption === index && <View style={styles.radioButtonInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.nextButton, selectedOption === null && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={selectedOption === null}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestion === quizQuestions.length - 1 ? 'See Results' : 'Next Question'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
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
  },
  backIcon: {
    fontSize: 24,
    color: '#1F2937',
    marginRight: 8,
  },
  backText: {
    fontSize: 18,
    color: '#1F2937',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  questionCounter: {
    fontSize: 16,
    color: '#6B7280',
  },
  progressPercent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D946EF',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 24,
    borderRadius: 4,
    marginBottom: 32,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#D946EF',
    borderRadius: 4,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    paddingHorizontal: 24,
    marginBottom: 24,
    lineHeight: 28,
  },
  optionsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionCardSelected: {
    borderColor: '#D946EF',
    backgroundColor: '#FDF2F8',
  },
  optionText: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
    marginRight: 12,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#D946EF',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D946EF',
  },
  nextButton: {
    backgroundColor: '#9333EA',
    marginHorizontal: 24,
    marginTop: 32,
    marginBottom: 40,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Results Styles
  resultsContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9333EA',
    marginBottom: 24,
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: '#FDF2F8',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#F9A8D4',
  },
  resultCategory: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#9333EA',
    marginBottom: 12,
  },
  resultDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  recommendationsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  careersList: {
    gap: 12,
    marginBottom: 24,
  },
  careerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  careerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  careerArrow: {
    backgroundColor: '#FCE7F3',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#9333EA',
  },
  retakeButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#9333EA',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  retakeButtonText: {
    color: '#9333EA',
    fontSize: 16,
    fontWeight: '600',
  },
  homeButton: {
    backgroundColor: '#9333EA',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

