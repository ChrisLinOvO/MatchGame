import React, { useEffect, useState } from 'react';
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

const App = () => {
  const [cardSymbols, setCardSymbols] = useState({
    emoji: ['π©', 'β€οΈ', 'π₯Ά', 'π', 'π', 'π»', 'π€', 'π€ͺ']
  })
  const [cardSymbolsInRand, setCardSymbolsInRand] = useState([]);
  const [isOpen, setIsOpen] = useState([]);
  const [firstPickedIndex, setFirstPickedIndex] = useState(null);
  const [secondPickedIndex, setSecondPickedIndex] = useState(null);
  const [step, setStep] = useState(0);
  const [isEnded, setIsEnded] = useState(false);

   
  useEffect(() => {
    initGame();

  }, [])

  useEffect(() => {
    if(firstPickedIndex!=secondPickedIndex){
      calculateGameResult()
    }
    

  }, [firstPickedIndex,secondPickedIndex])

  const initGame =()=>{
    let newCardsSymbols = [...cardSymbols.emoji, ...cardSymbols.emoji];//η΅ζ2ε°ι£ε
    let cardSymbolsInRand = shuffleArray(newCardsSymbols);
    let isOpen = [];
    for(let i =0; i<newCardsSymbols.length; i++){
      isOpen.push(false)
    }

    setCardSymbolsInRand(cardSymbolsInRand);//ζ¨ζζ°emojiι£ε
    setIsOpen(isOpen);
  
  }


  const shuffleArray = (arr) => { //ι¨ζ©ζδΊι£ε
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random()*(i+1));
      [newArr[i],newArr[rand]]=[newArr[rand],newArr[i]]
      
    }
    return newArr;
  }

  const cardPressHandler = (index) => { //ι»ζδΊδ»ΆηΏ»η 
    let open= [...isOpen];
    if(open[index]){
      return;
    }
    open[index]= true;
  

    if(firstPickedIndex==null&&secondPickedIndex==null){
      setIsOpen(open);
      setFirstPickedIndex(index);
    }else if(firstPickedIndex!=null &&secondPickedIndex==null){
      setIsOpen(open);
      setSecondPickedIndex(index);
    }
    setStep(step+1)

  }

  const calculateGameResult = () => { 
    if(firstPickedIndex !=null && secondPickedIndex!=null){
      if(cardSymbolsInRand.length>0){
        let totalOpens = isOpen.filter((isOpen)=>isOpen);
        if(totalOpens.length === cardSymbolsInRand.length){
          setIsEnded(true) 
          return;
        }
      }

      let firstSymbol = cardSymbolsInRand[firstPickedIndex];
      let secondSymbol = cardSymbolsInRand[secondPickedIndex];
      if(firstSymbol!=secondSymbol){
        setTimeout(()=>{
          let open = [...isOpen];
          open[firstPickedIndex]=false;
          open[secondPickedIndex]=false;

          setFirstPickedIndex(null);
          setSecondPickedIndex(null);
          setIsOpen(open);
        },1000)
     
      }else{ //ηΏ»ιε©εΌ΅δΈζ¨£οΌε―ηΏ»εΆδ»η
        setFirstPickedIndex(null);
        setSecondPickedIndex(null);
      }
    }

  }

  const resetGame=()=>{
    initGame();
    setFirstPickedIndex(null);
    setSecondPickedIndex(null);
    setStep(0);
    setIsEnded(false);
  }
  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Matching Game</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.gameBoard}>
           {cardSymbolsInRand.map((symbol,index)=>
            <Card key={index} onPress={()=>cardPressHandler(index)} style={styles.button} fontSize={30} title={symbol} cover="β" isShow={isOpen[index]} />)}
           

          </View>

        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>{
            isEnded?`ζ­εδ½ ε·²ε?ζ ε±${step}ζ¬‘`:
         `δ½ εθ©¦${step}ζ¬‘` }</Text>
         {isEnded?
         <TouchableOpacity onPress={resetGame} style={styles.tryAgainButton}>
            <Text style={styles.tryAgainButtonText}>ιζ°</Text>
         </TouchableOpacity>:null}
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
    textAlign: 'center'

  },
  main: {
    flex: 3,
    backgroundColor: '#fff'
  },
  footer: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center'
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
    alignContent: 'center'
  },
  button: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    margin: (Dimensions.get('window').width - (48 * 4)) / (5 * 2),//εζ=>ζζ©θ’εΉε―¬-ε―¬εΊ¦48*4εζι ι€δ»₯ 4εζιεΉ³εειη©Ίι*ζιε·¦ε³ι2 5=>εζ¬4+1θ?ιθ·ηΈη­
  },
  tryAgainButton:{
     backgroundColor:'#eee',
     padding:8,
     borderRadius:8,
     marginTop:20,

  },
tryAgainButtonText:{
  fontSize:18,
}

})

