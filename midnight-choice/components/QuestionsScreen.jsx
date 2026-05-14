import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import useEmotionStore from '../store/useEmotionStore';

const questions = [
  {
    id: 1,
    text: 'Would you rather keep moving\nor finally stop somewhere?',
    answers: [
      {
        text: 'Keep moving',
        scores: {
          movement: 2,
          uncertainty: 1,
          night: 1,
        },
      },
      {
        text: 'Stop somewhere',
        scores: {
          warmth: 1,
          solitude: 1,
          nostalgia: 1,
        },
      },
    ],
  },

  {
    id: 2,
    text: 'Do empty streets comfort you\nor unsettle you?',
    answers: [
      {
        text: 'Comfort me',
        scores: {
          solitude: 2,
          night: 2,
        },
      },
      {
        text: 'Unsettle me',
        scores: {
          uncertainty: 2,
          warmth: 1,
        },
      },
    ],
  },

  {
    id: 3,
    text: 'Would you rather disappear quietly\nor be remembered intensely?',
    answers: [
      {
        text: 'Disappear quietly',
        scores: {
          solitude: 2,
          night: 1,
          nostalgia: 1,
        },
      },
      {
        text: 'Be remembered',
        scores: {
          warmth: 1,
          movement: 1,
          uncertainty: 1,
        },
      },
    ],
  },

  {
    id: 4,
    text: 'Does silence feel peaceful\nor heavy to you tonight?',
    answers: [
      {
        text: 'Peaceful',
        scores: {
          solitude: 1,
          warmth: 1,
        },
      },
      {
        text: 'Heavy',
        scores: {
          uncertainty: 2,
          night: 1,
        },
      },
    ],
  },

  {
    id: 5,
    text: 'Would you follow distant lights\nor avoid them?',
    answers: [
      {
        text: 'Follow them',
        scores: {
          movement: 2,
          uncertainty: 1,
        },
      },
      {
        text: 'Avoid them',
        scores: {
          solitude: 1,
          nostalgia: 2,
        },
      },
    ],
  },
];

export default function QuestionsScreen({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const addScores = useEmotionStore(
      (state) => state.addScores
  );

  const fadeAnim = useRef(
      new Animated.Value(0)
  ).current;

  useEffect(() => {
    fadeIn();
  }, []);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1400,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = (callback) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 900,
      useNativeDriver: true,
    }).start(callback);
  };

  const handleAnswer = (scores) => {
    addScores(scores);

    fadeOut(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);

        fadeAnim.setValue(0);

        setTimeout(() => {
          fadeIn();
        }, 350);
      } else {
        onComplete();
      }
    });
  };

  const question = questions[currentQuestion];

  return (
      <View style={styles.container}>
        <Animated.View
            style={{
              opacity: fadeAnim,
              width: '100%',
            }}
        >
          <Text style={styles.questionText}>
            {question.text}
          </Text>

          <View style={styles.answersContainer}>
            {question.answers.map((answer, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                    onPress={() =>
                        handleAnswer(answer.scores)
                    }
                    style={styles.answerButton}
                >
                  <Text style={styles.answerText}>
                    {answer.text}
                  </Text>
                </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  questionText: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 42,
    textAlign: 'center',
    fontWeight: '300',
    marginBottom: 90,
    letterSpacing: 0.5,
  },

  answersContainer: {
    gap: 28,
  },

  answerButton: {
    alignItems: 'center',
  },

  answerText: {
    color: '#888',
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: '300',
  },
});
