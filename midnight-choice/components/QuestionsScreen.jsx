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
    text: 'A train stops between stations',
    answers: [
      {
        text: 'Wait quietly',
        tags: {
          solitude: 2,
          reflection: 2,
          uncertainty: 1,
        },
      },
      {
        text: 'Look outside',
        tags: {
          movement: 2,
          uncertainty: 1,
          longing: 1
        },
      },
      {
        text: 'Leave the carriage',
        tags: {
          movement: 3,
          uncertainty: 2,
          continuation: 1,
        },
      },
    ],
  },


  {
    id: 2,
    text: 'The road disappears into fog',
    answers: [
      {
        text: 'Keep walking',
        tags: {
          movement: 3,
          resilience: 2,
          continuation: 2,
        },
      },
      {
        text: 'Stop and listen',
        tags: {
          solitude: 2,
          reflection: 3,
          uncertainty: 2,
        },
      },
      {
        text: 'Turn back slowly',
        tags: {
          nostalgia: 2,
          longing: 2,
          uncertainty: 2,
        },
      },
    ],
  },

  {
    id: 3,
    text: 'You hear footsteps above you',
    answers: [
      {
        text: 'Ignore them',
        tags: {
          solitude: 2,
          reflection: 1,
          uncertainty: 1,
        },
      },
      {
        text: 'Follow the sound',
        tags: {
          movement: 2,
          uncertainty: 2,
          dreamlike: 1,
        },
      },
      {
        text: 'Wait for silence',
        tags: {
          reflection: 3,
          night: 2,
          solitude: 1,
        },
      },
    ],
  },

  {
    id: 4,
    text: 'The sea is unusually calm tonight',
    answers: [
      {
        text: 'Stay by the shore',
        tags: {
          transcendence: 2,
          solitude: 2,
          reflection: 2,
        },
      },
      {
        text: 'Walk into the mist',
        tags: {
          movement: 3,
          uncertainty: 3,
          longing: 2,
        },
      },
      {
        text: 'Watch the horizon',
        tags: {
          reflection: 3,
          transcendence: 1,
          longing: 1,
        },
      },
    ],
  },


  {
    id: 5,
    text: 'An empty chair faces the street',
    answers: [
      {
        text: 'Sit down for a while',
        tags: {
          solitude: 3,
          nostalgia: 2,
          reflection: 2,
        },
      },
      {
        text: 'Passing by it slowly',
        tags: {
          movement: 3,
          resilience: 2,
          continuation: 2,
        },
      },
      {
        text: 'Feel uncomfortable standing there',
        tags: {
          longing: 2,
          reflection: 3,
          dreamlike: 1,
        },
      },
    ],
  },

  {
    id: 6,
    text: 'A voice says your name incorrectly',
    answers: [
      {
        text: 'Do not correct them',
        tags: {
          humanity: 2,
          warmth: 1,
          reflection: 2,
        },
      },
      {
        text: 'Remain silent for a moment',
        tags: {
          solitude: 3,
          uncertainty: 2,
          longing: 1,
        },
      },
      {
        text: 'Wonder if you were the right person',
        tags: {
          dreamlike: 3,
          uncertainty: 2,
          reflection: 2,
        },
      },
    ],
  },

  {
    id: 7,
    text: 'You miss the last train home',
    answers: [
      {
        text: 'Walk through the city',
        tags: {
          movement: 3,
          night: 2,
          continuation: 2,
        },
      },
      {
        text: 'Wait until morning',
        tags: {
          resilience: 2,
          solitude: 3,
          reflection: 1,
        },
      },
      {
        text: 'Call someone unexpectedly',
        tags: {
          humanity: 3,
          warmth: 2,
          longing: 1,
        },
      },
    ],
  },


  {
    id: 8,
    text: 'The elevator stops on the wrong floor',
    answers: [
      {
        text: 'Step outside',
        tags: {
          uncertainty: 2,
          movement: 2,
          dreamlike: 1,
        },
      },
      {
        text: 'Press the button again',
        tags: {
          resilience: 2,
          continuation: 1,
          reflection: 1,
        },
      },
      {
        text: 'Stay there for a moment',
        tags: {
          reflection: 3,
          dreamlike: 2,
          solitude: 2,
        },
      },
    ],
  },

  {
    id: 9,
    text: 'You wake up before the alarm',
    answers: [
      {
        text: 'Watch the ceiling quietly',
        tags: {
          reflection: 3,
          solitude: 2,
          nostalgia: 1,
        },
      },
      {
        text: 'Go outside immediately',
        tags: {
          movement: 3,
          continuation: 2,
          resilience: 1,
        },
      },
      {
        text: 'Listen to the city waking up',
        tags: {
          reflection: 2,
          night: 1,
          humanity: 1,
        },
      },
    ],
  },

  {
    id: 10,
    text: 'A distant radio plays somewhere',
    answers: [
      {
        text: 'Follow the sound',
        tags: {
          movement: 2,
          nostalgia: 2,
          longing: 1,
        },
      },
      {
        text: 'Let it fade away',
        tags: {
          solitude: 2,
          reflection: 2,
          longing: 1,
        },
      },
      {
        text: 'Try to remember the song',
        tags: {
          nostalgia: 3,
          longing: 2,
          reflection: 1,
        },
      },
    ],
  },

  {
    id: 11,
    text: 'Someone waves from a passing train',
    answers: [
      {
        text: 'Wave back',
        tags: {
          humanity: 3,
          warmth: 2,
          continuation: 1,
        },
      },
      {
        text: 'Watch until the train disappears',
        tags: {
          longing: 3,
          reflection: 2,
          nostalgia: 1,
        },
      },
      {
        text: 'Pretend you know them',
        tags: {
          dreamlike: 2,
          nostalgia: 2,
          longing: 1,
        },
      },
    ],
  },


  {
    id: 12,
    text: 'The café is almost empty',
    answers: [
      {
        text: 'Stay longer than planned',
        tags: {
          solitude: 3,
          reflection: 2,
          night: 1,
        },
      },
      {
        text: 'Sit near the window',
        tags: {
          longing: 2,
          reflection: 2,
          night: 2,
        },
      },
      {
        text: 'Leave before finishing your drink',
        tags: {
          movement: 2,
          uncertainty: 2,
          resilience: 1,
        },
      },
    ],
  },


  {
    id: 13,
    text: 'The city looks softer after midnight',
    answers: [
      {
        text: 'Keep walking without direction',
        tags: {
          movement: 3,
          dreamlike: 2,
          night: 2,
        },
      },
      {
        text: 'Find somewhere quiet',
        tags: {
          solitude: 3,
          reflection: 2,
          night: 3,
        },
      },
      {
        text: 'Call someone you miss',
        tags: {
          longing: 3,
          humanity: 2,
          warmth: 2,
        },
      },
    ],
  },

  {
    id: 14,
    text: 'The rain suddenly stops',
    answers: [
      {
        text: 'Keep standing there.',
        tags: {
          reflection: 3,
          transcendence: 1,
          solitude: 1,
        },
      },
      {
        text: 'Start walking again',
        tags: {
          movement: 3,
          resilience: 2,
          continuation: 2,
        },
      },
      {
        text: 'Look at the sky',
        tags: {
          transcendence: 2,
          dreamlike: 2,
          reflection: 1,
        },
      },
    ],
  },

  {
    id: 15,
    text: 'A closed café is still warm inside',
    answers: [
      {
        text: 'Wait nearby',
        tags: {
          warmth: 3,
          longing: 1,
          solitude: 1,
        },
      },
      {
        text: 'Continue down the street',
        tags: {
          movement: 3,
          continuation: 2,
          resilience: 1,
        },
      },
      {
        text: 'Look through the glass',
        tags: {
          longing: 3,
          nostalgia: 2,
          reflection: 2,
        },
      },
    ],
  },


  {
    id: 16,
    text: 'You notice dawn before anyone else',
    answers: [
      {
        text: 'Stay awake a little longer',
        tags: {
          transcendence: 2,
          reflection: 2,
          continuation: 1,
        },
      },
      {
        text: 'Open the window',
        tags: {
          movement: 2,
          warmth: 2,
          humanity: 1,
        },
      },
      {
        text: 'Keep the moment to yourself',
        tags: {
          solitude: 3,
          reflection: 2,
          nostalgia: 1,
        },
      },
    ],
  },

  {
    id: 17,
    text: 'The tunnel opens into morning light',
    answers: [
      {
        text: 'Keep moving forward',
        tags: {
          movement: 3,
          resilience: 3,
          continuation: 3,
        },
      },
      {
        text: 'Slow down for a moment',
        tags: {
          reflection: 3,
          transcendence: 2,
          solitude: 1,
        },
      },
      {
        text: 'Look back once',
        tags: {
          nostalgia: 3,
          longing: 2,
          reflection: 1,
        },
      },
    ],
  },

  {
    id: 18,
    text: 'You find the road again',
    answers: [
      {
        text: 'Follow it immediately',
        tags: {
          movement: 4,
          continuation: 3,
          resilience: 2,
        },
      },
      {
        text: 'Stand still for a while',
        tags: {
          reflection: 3,
          solitude: 2,
          uncertainty: 1,
        },
      },
      {
        text: 'Smile quietly',
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
    text: 'The station is quieter than usual tonight',
    answers: [
      {
        text: 'Listen carefully',
        tags: {
          reflection: 3,
          solitude: 3,
          night: 2,
        },
      },
      {
        text: 'Sit near the tracks',
        tags: {
          longing: 3,
          reflection: 2,
          solitude: 1,
        },
      },
      {
        text: 'Leave before the next train arrives',
        tags: {
          movement: 2,
          uncertainty: 2,
          resilience: 1,
        },
      },
    ],
  },
  {
    id: 20,
    text: 'The city feels less distant tonight',
    answers: [
      {
        text: 'Walk without headphones',
        tags: {
          humanity: 2,
          warmth: 1,
          reflection: 1,
        },
      },
      {
        text: 'Take the longer route home',
        tags: {
          movement: 3,
          reflection: 2,
          continuation: 1,
        },
      },
      {
        text: 'Stay outside a little longer',
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
          continuation: 1,
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
          reflection: 1,
        },
      },
      {
        text: 'Unsettle me',
        tags: {
          uncertainty: 2,
          warmth: 1,
          solitude: 1,
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
          night: 2,
          reflection: 1,
        },
      },
      {
        text: 'Be remembered',
        tags: {
          humanity: 2,
          longing: 2,
          warmth: 1,
        },
      },
      {
        text: 'Be remembered differently',
        tags: {
          dreamlike: 2,
          uncertainty: 2,
          nostalgia: 1,
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
          reflection: 2,
          warmth: 1,
        },
      },
      {
        text: 'Heavy',
        tags: {
          uncertainty: 2,
          longing: 2,
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
          continuation: 1,
        },
      },
      {
        text: 'Avoid them',
        tags: {
          solitude: 1,
          nostalgia: 2,
          reflection: 1,
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

  {
    id: 26,
    text: 'A cat approaches you on an empty street',
    answers: [
      {
        text: 'You stop, kneel down, and start talking to the cat',
        tags: {
          warmth: 3,
          humanity: 3,
          reflection: 1,
        },
      },
      {
        text: 'You feel uneasy and slowly step away',
        tags: {
          uncertainty: 2,
          solitude: 2,
          night: 1,
        },
      },

      {
        text: 'You barely notice the cat and keep walking',
        tags: {
          movement: 2,
          continuation: 2,
          solitude: 1,
        },
      }
    ],
  },

  {
    id: 27,
    text: 'Someone drops a photograph on the street',
    answers: [
      {
        text: 'You call after them immediately',
        tags: {
          humanity: 3,
          warmth: 2,
          continuation: 1,
        },
      },
      {
        text: 'You hesitate before deciding',
        tags: {
          reflection: 2,
          uncertainty: 1,
          humanity: 1,
        },
      },

      {
        text: 'You quietly leave it where it fell',
        tags: {
          solitude: 2,
          reflection: 1,
          night: 1,
        },
      }
    ],
  },
  {
    id: 28,
    text: 'A café is almost empty late at night',
    answers: [
      {
        text: 'You sit near the window',
        tags: {
          reflection: 2,
          solitude: 1,
          night: 1,
        },
      },
      {
        text: 'You choose the darkest corner',
        tags: {
          solitude: 3,
          night: 2,
        },
      },

      {
        text: 'You sit where other people are nearby',
        tags: {
          humanity: 2,
          warmth: 2,
        },
      }
    ],
  },

  {
    id: 29,
    text: 'A stranger smiles at you for no reason',
    answers: [
      {
        text: 'You smile back immediately',
        tags: {
          warmth: 3,
          humanity: 2,
        },
      },
      {
        text: 'You wonder what they meant by it',
        tags: {
          uncertainty: 2,
          reflection: 2,
        },
      },

      {
        text: 'You think about it much later',
        tags: {
          nostalgia: 2,
          longing: 1,
          reflection: 1,
        },
      }
    ],
  },

  {
    id: 30,
    text: 'Something important no longer feels possible',
    answers: [
      {
        text: 'You begin again anyway',
        tags: {
          resilience: 3,
          continuation: 3,
        },
      },
      {
        text: 'You wait for the feeling to change',
        tags: {
          reflection: 2,
          longing: 2,
        },
      },

      {
        text: 'You quietly let it go',
        tags: {
          solitude: 2,
          nostalgia: 2,
        },
      }
    ],
  },

  {
    id: 31,
    text: 'For a moment, the city feels unreal',
    answers: [
      {
        text: 'You slow down and notice everything',
        tags: {
          transcendence: 3,
          reflection: 2,
        },
      },
      {
        text: 'You continue walking without thinking about it',
        tags: {
          continuation: 2,
          movement: 2,
        },
      },

      {
        text: 'You suddenly feel far away from yourself',
        tags: {
          dreamlike: 2,
          solitude: 2,
          uncertainty: 1,
        },
      }
    ],
  },

  {
    id: 32,
    text: 'Light moves across the room late at night',
    answers: [
      {
        text: 'Watch it move across the wall',
        tags: {
          reflection: 2,
          transcendence: 2,
          night: 1,
        },
      },
      {
        text: 'You barely notice it',
        tags: {
          continuation: 2,
        },
      },

      {
        text: 'It reminds you of something impossible to explain',
        tags: {
          dreamlike: 2,
          nostalgia: 2,
          longing: 1,
        },
      }
    ],
  },

  {
    id: 33,
    text: 'You hear distant music while walking alone',
    answers: [
      {
        text: 'You try to follow the sound',
        tags: {
          movement: 2,
          transcendence: 2,
          longing: 1,
        },
      },
      {
        text: 'You keep walking, but listen carefully',
        tags: {
          reflection: 2,
          solitude: 1,
          night: 1,
        },
      },

      {
        text: 'It feels like it came from another life',
        tags: {
          nostalgia: 2,
          dreamlike: 2,
          transcendence: 1,
        },
      }
    ],
  },




  {
    id: 34,
    text: 'A distant apartment window glows softly while the entire street remains silent',
    answers: [
      {
        text: 'Slow your pace without realizing it',
        tags: {
          reflection: 2,
          night: 2,
          transcendence: 1,
        },
      },
      {
        text: 'Imagine the life behind the window',
        tags: {
          humanity: 2,
          transcendence: 2,
          warmth: 1,
        },
      },

      {
        text: 'Keep your eyes on the empty street instead',
        tags: {
          solitude: 2,
          noir: 1,
          reflection: 1,
        },
      }
    ],
  },

  {
    id: 35,
    text: 'The last convenience store on the empty street still keeps its lights on after midnight',
    answers: [
      {
        text: 'Step inside for no particular reason',
        tags: {
          transcendence: 2,
          warmth: 1,
          humanity: 1,
          night: 1,
        },
      },
      {
        text: 'Pause outside and listen to the silence',
        tags: {
          reflection: 2,
          solitude: 1,
          night: 2,
        },
      },

      {
        text: 'Continue walking beneath the flickering signs',
        tags: {
          noir: 2,
          movement: 1,
          solitude: 1,
        },
      }
    ],
  },
  {
    id: 36,
    text: 'Passing an old theater late at night, you suddenly hear applause coming from inside — though the building has seemed abandoned for years',
    answers: [
      {
        text: 'Stop beneath the dim marquee lights',
        tags: {
          reflection: 2,
          nostalgia: 2,
          night: 1,
          transcendence: 1,
        },
      },
      {
        text: 'Slow down without turning around',
        tags: {
          solitude: 2,
          longing: 2,
          noir: 1,
        },
      },

      {
        text: 'Quietly step inside the theater',
        tags: {
          transcendence: 3,
          mystery: 2,
          reflection: 1,
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
      shuffleArray(questions).slice(0, 3)
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

        setTimeout(() => {

          onComplete();

        }, 1000);

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
