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
    text: 'A train stops between stations.',
    answers: [
      {
        text: 'Wait quietly.',
        tags: {
          solitude: 3,
          uncertainty: 2,
          calm: 2,
        },
      },
      {
        text: 'Look outside.',
        tags: {
          curiosity: 3,
          movement: 2,
          hope: 1,
        },
      },
      {
        text: 'Leave the carriage.',
        tags: {
          freedom: 3,
          uncertainty: 3,
          movement: 3,
        },
      },
    ],
  },


  {
    id: 2,
    text: 'The road disappears into fog.',
    answers: [
      {
        text: 'Keep walking.',
        tags: {
          movement: 3,
          hope: 2,
          resilience: 2,
        },
      },
      {
        text: 'Stop and listen.',
        tags: {
          solitude: 3,
          reflection: 2,
          uncertainty: 2,
        },
      },
      {
        text: 'Turn back slowly.',
        tags: {
          caution: 3,
          memory: 2,
          fragility: 2,
        },
      },
    ],
  },

  {
    id: 3,
    text: 'You hear footsteps above you.',
    answers: [
      {
        text: 'Ignore them.',
        tags: {
          calm: 2,
          distance: 2,
          solitude: 2,
        },
      },
      {
        text: 'Follow the sound.',
        tags: {
          curiosity: 3,
          uncertainty: 2,
          movement: 2,
        },
      },
      {
        text: 'Wait for silence.',
        tags: {
          reflection: 3,
          night: 2,
          uncertainty: 1,
        },
      },
    ],
  },

  {
    id: 4,
    text: 'The sea is unusually calm tonight.',
    answers: [
      {
        text: 'Stay by the shore.',
        tags: {
          calm: 3,
          transcendence: 2,
          solitude: 2,
        },
      },
      {
        text: 'Walk into the mist.',
        tags: {
          movement: 3,
          uncertainty: 3,
          longing: 2,
        },
      },
      {
        text: 'Watch the horizon.',
        tags: {
          hope: 2,
          distance: 3,
          reflection: 2,
        },
      },
    ],
  },


  {
    id: 5,
    text: 'An empty chair faces the street.',
    answers: [
      {
        text: 'Sit down for a while.',
        tags: {
          solitude: 3,
          memory: 2,
          calm: 2,
        },
      },
      {
        text: 'Keep moving.',
        tags: {
          movement: 3,
          resilience: 2,
          distance: 2,
        },
      },
      {
        text: 'Look through the window.',
        tags: {
          curiosity: 2,
          longing: 2,
          reflection: 3,
        },
      },
    ],
  },

  {
    id: 6,
    text: 'A voice says your name incorrectly.',
    answers: [
      {
        text: 'Correct them softly.',
        tags: {
          humanity: 2,
          warmth: 2,
          calm: 2,
        },
      },
      {
        text: 'Say nothing.',
        tags: {
          solitude: 3,
          distance: 2,
          fragility: 2,
        },
      },
      {
        text: 'Pretend it belongs to someone else.',
        tags: {
          surreal: 3,
          uncertainty: 2,
          dreamlike: 2,
        },
      },
    ],
  },

  {
    id: 7,
    text: 'You miss the last train home.',
    answers: [
      {
        text: 'Walk through the city.',
        tags: {
          movement: 3,
          urban: 3,
          freedom: 2,
        },
      },
      {
        text: 'Wait until morning.',
        tags: {
          resilience: 2,
          calm: 2,
          solitude: 3,
        },
      },
      {
        text: 'Call someone unexpectedly.',
        tags: {
          humanity: 3,
          hope: 2,
          warmth: 2,
        },
      },
    ],
  },


  {
    id: 8,
    text: 'The elevator stops on the wrong floor.',
    answers: [
      {
        text: 'Step outside.',
        tags: {
          curiosity: 3,
          uncertainty: 2,
          movement: 2,
        },
      },
      {
        text: 'Press the button again.',
        tags: {
          control: 2,
          resilience: 2,
          calm: 1,
        },
      },
      {
        text: 'Stay there for a moment.',
        tags: {
          reflection: 3,
          surreal: 2,
          solitude: 2,
        },
      },
    ],
  },

  {
    id: 9,
    text: 'You wake up before the alarm.',
    answers: [
      {
        text: 'Watch the ceiling quietly.',
        tags: {
          reflection: 3,
          calm: 2,
          memory: 1,
        },
      },
      {
        text: 'Go outside immediately.',
        tags: {
          movement: 3,
          freedom: 2,
          hope: 2,
        },
      },
      {
        text: 'Listen to the city waking up.',
        tags: {
          urban: 2,
          hope: 2,
          distance: 2,
        },
      },
    ],
  },

  {
    id: 10,
    text: 'A distant radio plays somewhere.',
    answers: [
      {
        text: 'Follow the sound.',
        tags: {
          curiosity: 3,
          movement: 2,
          memory: 2,
        },
      },
      {
        text: 'Let it fade away.',
        tags: {
          solitude: 2,
          calm: 2,
          distance: 2,
        },
      },
      {
        text: 'Try to remember the song.',
        tags: {
          nostalgia: 3,
          memory: 3,
          longing: 2,
        },
      },
    ],
  },

  {
    id: 11,
    text: 'Someone waves from a passing train.',
    answers: [
      {
        text: 'Wave back.',
        tags: {
          humanity: 3,
          warmth: 2,
          hope: 2,
        },
      },
      {
        text: 'Watch until the train disappears.',
        tags: {
          longing: 3,
          distance: 3,
          reflection: 2,
        },
      },
      {
        text: 'Pretend you know them.',
        tags: {
          dreamlike: 2,
          surreal: 2,
          memory: 2,
        },
      },
    ],
  },


  {
    id: 12,
    text: 'The café is almost empty.',
    answers: [
      {
        text: 'Stay longer than planned.',
        tags: {
          solitude: 3,
          calm: 2,
          reflection: 2,
        },
      },
      {
        text: 'Sit near the window.',
        tags: {
          distance: 2,
          longing: 2,
          night: 2,
        },
      },
      {
        text: 'Leave before finishing your drink.',
        tags: {
          movement: 2,
          uncertainty: 2,
          fragility: 2,
        },
      },
    ],
  },


  {
    id: 13,
    text: 'The city looks softer after midnight.',
    answers: [
      {
        text: 'Keep walking without direction.',
        tags: {
          urban: 3,
          movement: 3,
          dreamlike: 2,
        },
      },
      {
        text: 'Find somewhere quiet.',
        tags: {
          solitude: 3,
          calm: 2,
          night: 3,
        },
      },
      {
        text: 'Call someone you miss.',
        tags: {
          longing: 3,
          humanity: 2,
          vulnerability: 2,
        },
      },
    ],
  },

  {
    id: 14,
    text: 'The rain suddenly stops.',
    answers: [
      {
        text: 'Keep standing there.',
        tags: {
          reflection: 3,
          calm: 2,
          transcendence: 1,
        },
      },
      {
        text: 'Start walking again.',
        tags: {
          movement: 3,
          hope: 2,
          resilience: 2,
        },
      },
      {
        text: 'Look at the sky.',
        tags: {
          hope: 3,
          distance: 2,
          dreamlike: 2,
        },
      },
    ],
  },

  {
    id: 15,
    text: 'A closed café is still warm inside.',
    answers: [
      {
        text: 'Wait nearby.',
        tags: {
          warmth: 3,
          hope: 2,
          solitude: 2,
        },
      },
      {
        text: 'Continue down the street.',
        tags: {
          movement: 3,
          resilience: 2,
          night: 2,
        },
      },
      {
        text: 'Look through the glass.',
        tags: {
          longing: 3,
          memory: 2,
          reflection: 2,
        },
      },
    ],
  },


  {
    id: 16,
    text: 'You notice dawn before anyone else.',
    answers: [
      {
        text: 'Stay awake a little longer.',
        tags: {
          hope: 3,
          transcendence: 2,
          calm: 2,
        },
      },
      {
        text: 'Open the window.',
        tags: {
          freedom: 2,
          movement: 2,
          warmth: 2,
        },
      },
      {
        text: 'Say nothing about it.',
        tags: {
          solitude: 3,
          reflection: 2,
          distance: 2,
        },
      },
    ],
  },

  {
    id: 17,
    text: 'The tunnel opens into morning light.',
    answers: [
      {
        text: 'Keep moving forward.',
        tags: {
          hope: 4,
          movement: 3,
          resilience: 3,
        },
      },
      {
        text: 'Slow down for a moment.',
        tags: {
          reflection: 3,
          calm: 2,
          transcendence: 2,
        },
      },
      {
        text: 'Look back once.',
        tags: {
          memory: 3,
          longing: 2,
          uncertainty: 1,
        },
      },
    ],
  },

  {
    id: 18,
    text: 'You find the road again.',
    answers: [
      {
        text: 'Follow it immediately.',
        tags: {
          movement: 4,
          hope: 3,
          freedom: 2,
        },
      },
      {
        text: 'Stand still for a while.',
        tags: {
          reflection: 3,
          calm: 3,
          solitude: 2,
        },
      },
      {
        text: 'Smile quietly.',
        tags: {
          warmth: 3,
          humanity: 2,
          continuation: 2,
        },
      },
    ],
  },

  {
    id: 19,
    text: 'The station is quieter than usual tonight.',
    answers: [
      {
        text: 'Listen carefully.',
        tags: {
          reflection: 3,
          solitude: 3,
          night: 2,
        },
      },
      {
        text: 'Sit near the tracks.',
        tags: {
          longing: 3,
          distance: 2,
          calm: 2,
        },
      },
      {
        text: 'Leave before the next train arrives.',
        tags: {
          movement: 2,
          uncertainty: 2,
          fragility: 2,
        },
      },
    ],
  },
  {
    id: 20,
    text: 'The city feels less distant tonight.',
    answers: [
      {
        text: 'Walk without headphones.',
        tags: {
          humanity: 2,
          urban: 3,
          openness: 3,
        },
      },
      {
        text: 'Take the longer route home.',
        tags: {
          movement: 3,
          reflection: 2,
          hope: 2,
        },
      },
      {
        text: 'Stay outside a little longer.',
        tags: {
          warmth: 2,
          night: 2,
          continuation: 3,
        },
      },
    ],
  },

  {
    id: 21,
    text: 'Would you rather keep moving\nor finally stop somewhere?',
    answers: [
      {
        text: 'Keep moving',
        tags: {
          movement: 2,
          uncertainty: 1,
          night: 1,
        },
      },
      {
        text: 'Stop somewhere',
        tags: {
          warmth: 1,
          solitude: 1,
          nostalgia: 1,
        },
      },

      {
        text: 'Watch the road a little longer',
        tags: {
          reflection: 3,
          uncertainty: 2,
          longing: 2,
        },
      }
    ],
  },

  {
    id: 22,
    text: 'Do empty streets comfort you\nor unsettle you?',
    answers: [
      {
        text: 'Comfort me',
        tags: {
          solitude: 2,
          night: 2,
        },
      },
      {
        text: 'Unsettle me',
        tags: {
          uncertainty: 2,
          warmth: 1,
        },
      },

      {
        text: 'They feel strangely familiar',
        tags: {
          nostalgia: 3,
          dreamlike: 2,
          solitude: 2,
        },
      }
    ],
  },

  {
    id: 23,
    text: 'Would you rather disappear quietly\nor be remembered intensely?',
    answers: [
      {
        text: 'Disappear quietly',
        tags: {
          solitude: 2,
          night: 1,
          nostalgia: 1,
        },
      },
      {
        text: 'Be remembered',
        tags: {
          warmth: 1,
          movement: 1,
          uncertainty: 1,
        },
      },
      {
        text: 'Be remembered incorrectly',
        tags: {
          surreal: 3,
          distance: 2,
          uncertainty: 2,
        },
      }
    ],
  },

  {
    id: 24,
    text: 'Does silence feel peaceful\nor heavy to you tonight?',
    answers: [
      {
        text: 'Peaceful',
        tags: {
          solitude: 1,
          warmth: 1,
        },
      },
      {
        text: 'Heavy',
        tags: {
          uncertainty: 2,
          night: 1,
        },
      },

      {
        text: 'It feels unfinished',
        tags: {
          uncertainty: 3,
          longing: 2,
          reflection: 2,
        },
      }
    ],
  },

  {
    id: 25,
    text: 'Would you follow distant lights\nor avoid them?',
    answers: [
      {
        text: 'Follow them',
        tags: {
          movement: 2,
          uncertainty: 1,
        },
      },
      {
        text: 'Avoid them',
        tags: {
          solitude: 1,
          nostalgia: 2,
        },
      },

      {
        text: 'Wait until they disappear',
        tags: {
          solitude: 2,
          reflection: 3,
          night: 2,
        },
      }
    ],
  },
];

export default function QuestionsScreen({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] =
      useState(0);

  const addScores = useEmotionStore(
      (state) => state.addScores
  );

  const fadeAnim = useRef(
      new Animated.Value(0)
  ).current;

  // RANDOMIZE QUESTIONS

  const shuffleArray = (array) => {
    return [...array].sort(
        () => Math.random() - 0.5
    );
  };

  const [sessionQuestions] = useState(
      shuffleArray(questions).slice(0, 5)
  );

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

  const handleAnswer = (tags) => {
    addScores(tags);

    fadeOut(() => {
      if (
          currentQuestion <
          sessionQuestions.length - 1
      ) {
        setCurrentQuestion(
            (prev) => prev + 1
        );

        fadeAnim.setValue(0);

        setTimeout(() => {
          fadeIn();
        }, 350);
      } else {
        onComplete();
      }
    });
  };

  const question =
      sessionQuestions[currentQuestion];

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
            {question.answers.map(
                (answer, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.7}
                        onPress={() =>
                            handleAnswer(
                                answer.tags
                            )
                        }
                        style={
                          styles.answerButton
                        }
                    >
                      <Text
                          style={
                            styles.answerText
                          }
                      >
                        {answer.text}
                      </Text>
                    </TouchableOpacity>
                )
            )}
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
    fontFamily: 'serif'
  },

  answersContainer: {
    gap: 28,
  },

  answerButton: {
    alignItems: 'center',

  },

  answerText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: '300',
    fontFamily: 'serif'
  },
});
