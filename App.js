import React, { useEffect, useState, useCallback } from 'react';
import {
  StatusBar,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Card from './Card';

const EMOJI_POOL = ['💩', '❤️', '🥶', '😈', '😂', '👻', '🤗', '🤪'];
const CARD_COUNT = EMOJI_POOL.length * 2;

const shuffleArray = (arr) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

const App = () => {
  const [cardSymbolsInRand, setCardSymbolsInRand] = useState([]);
  const [isOpen, setIsOpen] = useState([]);
  const [firstPickedIndex, setFirstPickedIndex] = useState(null);
  const [secondPickedIndex, setSecondPickedIndex] = useState(null);
  const [step, setStep] = useState(0);
  const [isEnded, setIsEnded] = useState(false);

  const initGame = useCallback(() => {
    const newCardsSymbols = [...EMOJI_POOL, ...EMOJI_POOL];
    const shuffled = shuffleArray(newCardsSymbols);
    setCardSymbolsInRand(shuffled);
    setIsOpen(new Array(CARD_COUNT).fill(false));
    setFirstPickedIndex(null);
    setSecondPickedIndex(null);
    setStep(0);
    setIsEnded(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (firstPickedIndex !== null && secondPickedIndex !== null) {
      calculateGameResult();
    }
  }, [firstPickedIndex, secondPickedIndex]);

  const calculateGameResult = () => {
    if (firstPickedIndex !== null && secondPickedIndex !== null) {
      const totalOpens = isOpen.filter(Boolean);
      if (totalOpens.length === cardSymbolsInRand.length) {
        setIsEnded(true);
        return;
      }

      const firstSymbol = cardSymbolsInRand[firstPickedIndex];
      const secondSymbol = cardSymbolsInRand[secondPickedIndex];
      if (firstSymbol !== secondSymbol) {
        setTimeout(() => {
          setIsOpen((prev) => {
            const open = [...prev];
            open[firstPickedIndex] = false;
            open[secondPickedIndex] = false;
            return open;
          });
          setFirstPickedIndex(null);
          setSecondPickedIndex(null);
        }, 1000);
      } else {
        setFirstPickedIndex(null);
        setSecondPickedIndex(null);
      }
    }
  };

  const cardPressHandler = (index) => {
    if (isOpen[index]) return;

    const newIsOpen = [...isOpen];
    newIsOpen[index] = true;
    setIsOpen(newIsOpen);

    if (firstPickedIndex === null && secondPickedIndex === null) {
      setFirstPickedIndex(index);
    } else if (firstPickedIndex !== null && secondPickedIndex === null) {
      setSecondPickedIndex(index);
    }
    setStep((prev) => prev + 1);
  };

  const resetGame = () => {
    initGame();
  };

  const screenWidth = Dimensions.get('window').width;
  const buttonSize = 48;
  const buttonMargin = (screenWidth - buttonSize * 4) / (5 * 2);

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Matching Game</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.gameBoard}>
            {cardSymbolsInRand.map((symbol, index) => (
              <Card
                key={`card-${index}`}
                onPress={() => cardPressHandler(index)}
                style={[
                  styles.button,
                  { margin: buttonMargin },
                ]}
                fontSize={30}
                title={symbol}
                cover="❓"
                isShow={isOpen[index]}
              />
            ))}
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {isEnded ? `恭喜你已完成 共${step}次` : `你嘗試${step}次`}
          </Text>
          {isEnded ? (
            <TouchableOpacity onPress={resetGame} style={styles.tryAgainButton}>
              <Text style={styles.tryAgainButtonText}>重新</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  main: {
    flex: 3,
    backgroundColor: '#fff',
  },
  footer: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 20,
  },
  gameBoard: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  button: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tryAgainButton: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 8,
    marginTop: 20,
  },
  tryAgainButtonText: {
    fontSize: 18,
  },
});
