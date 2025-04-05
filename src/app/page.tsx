'use client';

import { Jersey_25 } from 'next/font/google';
import { useEffect, useState, useRef } from 'react';
import AddMoney from './components/AddMoney';
import Winning from './components/Winning';
import { Wallet } from 'lucide-react';
import {
  oneBombArr,
  twoBombArr,
  threeBombArr,
  fourBombArr,
  fiveBombArr,
  sixBombArr,
  sevenBombArr,
  eightBombArr,
  nineBombArr,
  tenBombArr,
  elevenBombArr,
  twelveBombArr,
  thirteenBombArr,
  fourteenBombArr,
  fifteenBombArr,
  sixteenBombArr,
  seventeenBombArr,
  eighteenBombArr,
  nineteenBombArr,
  twentyBombArr,
  twentyOneBombArr,
  twentyTwoBombArr,
  twentyThreeBombArr,
  twentyFourBombArr,
} from './utils/multiplier';

import AlertBox from './components/AlertBox';
import ReShuffle from './components/ReShuffle';
import WalletDisplay from './components/Wallet';
import GameControls from './components/GameControls';
import ProfitDisplay from './components/ProfitDisplay';

export default function Home() {
  const [addMoneyButton, setAddMoneyButton] = useState(false);
  const [winningPopUp, setWinningPopUp] = useState<boolean>(false);
  const [betAmountAlert, setBetAmountAlert] = useState<boolean>(false);
  const [bombClicked, setBombClicked] = useState<boolean>(false);
  const [activeBet, setActiveBet] = useState<boolean>(false);
  const [shuffleAllowed, setShuffleAllowed] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isBombPresent, setIsBombPresent] = useState<boolean>(false);
  const [maxWin, setMaxWin] = useState<boolean>(false);
  const [reshuffling, setReshuffling] = useState<boolean>(false);
  const [greaterBet, setGreaterBet] = useState<boolean>(false);
  const [negativeBet, setNegativeBet] = useState<boolean>(false);

  //STATE FOR AMOUNT SHOWING IN WALLET AND ALSO SAVING IT IN THE LOCAL STORAGE FOR FUTURE USE
  const [amountInWallet, setAmountInWallet] = useState<number>(0);

  const [addAmountField, setAddAmountField] = useState<string>('');

  const [betAmount, setBetAmount] = useState<string>('1');
  const [bomb, SetBomb] = useState<string>('3');
  const [gemCount, setGemCount] = useState<number>(0);
  const [winAmount, setWinAmount] = useState<number>(0);
  const [bombCount, SetBombCount] = useState<number[]>([]);
  const [maxWinAmount, setMaxWinAmount] = useState<number>(0);

  const [profit, setProfit] = useState<number>(0.0);

  const [clickedIndices, setClickedIndices] = useState<{
    [key: number]: 'bomb' | 'gem';
  }>({});

  //AUDIOS USED
  // let betSound = new Audio('betButtonSound.mp3');
  // let bombSound = new Audio('bombSound.mp3');
  // let gemSound = new Audio('gemSound.mp3');
  // let cashoutSound = new Audio('cashoutSound.mp3');

  const betSoundRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio('./betButtonSound.mp3') : undefined
  );

  const bombSoundRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio('./bombSound.mp3') : undefined
  );

  const gemSoundRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio('./gemSound.mp3') : undefined
  );

  const cashoutSoundRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio('./cashoutSound.mp3') : undefined
  );

  // const betSoundRef = useRef(new Audio('./betButtonSound.mp3'));
  // const bombSoundRef = useRef(new Audio('./bombSound.mp3'));
  // const gemSoundRef = useRef(new Audio('./gemSound.mp3'));
  // const cashoutSoundRef = useRef(new Audio('./cashoutSound.mp3'));

  const playSound = (soundRef: any) => {
    soundRef.current.currentTime = 0; // Reset sound to start
    soundRef.current.play();
  };

  //CALCULATING THE NUMBER OF GEMS
  const gems = 25 - Number(bomb);

  //SETTING ISCLIENT TO TRUE WHEN THE COMPONENT LOADS ON CLIENT SIDE
  useEffect(() => {
    setIsClient(true);
  }, []);

  //USE EFFECT TO SET THE NEW AMOUNT IN LOCAL STORAGE WHENEVER THE AMOUNT IN WALLET CHANGES
  useEffect(() => {
    if (isClient) {
      const storedAmount = localStorage.getItem('walletAmount');
      const storedBetAmount = localStorage.getItem('betAmount');
      if (storedAmount) {
        setAmountInWallet(JSON.parse(storedAmount));
      }
      if (storedBetAmount) {
        setBetAmount(storedBetAmount);
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('walletAmount', JSON.stringify(amountInWallet));
      localStorage.setItem('betAmount', betAmount);
    }
  }, [amountInWallet, betAmount, isClient]);

  const addMoneyButtonClicked = () => {
    setAddMoneyButton(true);
  };

  //FUNCTION WHICH IS HANDLING THE ADD BUTTON ON ADD MONEY COMPONENT AND ADDING THE AMOUNT TO WALLET
  const addButtonClicked = () => {
    // FUNCTION THAT SETS THE WALLET AMOUNT UPTO 2 DECIMAL PLACES AFTER ADDING MONEY IN THE WALLET
    setAmountInWallet((prevAmount) => {
      const amountToAdd = Number(addAmountField) || 0;
      const updatedAmount = (prevAmount || 0) + amountToAdd;
      return parseFloat(updatedAmount.toFixed(2));
    });

    setAddMoneyButton(false);
    setAddAmountField('');
  };

  //FUNCTION TO GENERATE A RANDOM NUMBER BETWEEN 0 AND 24
  const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 25);
  };

  //FUNCTION HANDLING THE BET BUTTON AND IT WILL SUBTRACT THE BET AMOUNT FROM THE AMOUNT IN WALLET ONLY IF AMOUNT IN WALLET IS GREATER THAN OR EQUAL TO THE BET AMOUNT
  const betButtonClicked = () => {
    if (betAmount === '') {
      setBetAmountAlert(true);
      console.log('bet amount is not entered');
    } else {
      if (Number(betAmount) < 0) {
        setNegativeBet(true);
      } else if (
        amountInWallet !== null &&
        amountInWallet >= Number(betAmount)
      ) {
        //LOGIC TO IMPLEMENT THE WALLET BALANCE UPTO 2 DECIMAL PLACES AFTER SUBTRACTING THE AMOUNT IN WALLET WITH BET AMOUNT
        setAmountInWallet((prevAmount) => {
          let updatedAmountInWallet;
          if (prevAmount !== null) {
            updatedAmountInWallet = prevAmount - Number(betAmount);
          } else {
            updatedAmountInWallet = amountInWallet;
          }

          if (updatedAmountInWallet !== null) {
            return parseFloat(updatedAmountInWallet.toFixed(2));
          }
          return amountInWallet;
        });

        //ARRAY STORING THE INDEX WHERE BOMB WILL BE PLACED
        let bombArr: number[] = [];

        //GENERATING RANDOM NUMBERS AND THEN STORING THEM IN THE BOMBCOUNT ARRAY
        while (bombArr.length < Number(bomb)) {
          let randomNumber = generateRandomNumber();
          if (!bombArr.includes(randomNumber)) {
            bombArr.push(randomNumber);
          }
        }
        // console.log("Generated bomb array:", bombArr);
        SetBombCount(bombArr);

        //SWITCHING OFF THE BET BUTTON WHEN THE USER STARTS A BET
        setActiveBet(true);
        setBombClicked(false);
        console.log('new bet started and active bet is ON');

        //SWITCHING ON THE SHUFFLING BUTTON WHEN THE USER STARTS A BET
        setShuffleAllowed(true);
        setWinningPopUp(false);
        setClickedIndices({});
        setProfit(1);
        setGemCount(0);
        setMaxWin(false);
        console.log('Number of gems:', gems);
        setWinAmount(0);
        playSound(betSoundRef);
      } else {
        setGreaterBet(true);
      }
    }
  };

  //FUNCTION TO HANDLE THE LOGIC WHEN CASHOUT BUTTON IS CLICKED
  const cashoutClicked = () => {
    setActiveBet(false);
    setWinningPopUp(true);
    const calculatedWinAmount = (profit * Number(betAmount)).toFixed(2);
    setAmountInWallet((prev) =>
      Number((prev! + Number(calculatedWinAmount)).toFixed(2))
    );
    setWinAmount(Number(calculatedWinAmount));

    //WHEN CASHOUT BUTTON CLICKED, THIS SOUND PLAYS
    playSound(cashoutSoundRef);
  };

  const clickingMine = (index: any) => {
    if (activeBet) {
      mineClicked(index);
    }
  };

  //FUNCTION TO UPDATE MULTIPLIER ON EVERY MINE CLICK
  const profitMultiplier = () => {
    if (bomb === '1') {
      setProfit(oneBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '2') {
      setProfit(twoBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '3') {
      setProfit(threeBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '4') {
      setProfit(fourBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '5') {
      setProfit(fiveBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '6') {
      setProfit(sixBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '7') {
      setProfit(sevenBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '8') {
      setProfit(eightBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '9') {
      setProfit(nineBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '10') {
      setProfit(tenBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '11') {
      setProfit(elevenBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '12') {
      setProfit(twelveBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '13') {
      setProfit(thirteenBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '14') {
      setProfit(fourteenBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '15') {
      setProfit(fifteenBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '16') {
      setProfit(sixteenBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '17') {
      setProfit(seventeenBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '18') {
      setProfit(eighteenBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '19') {
      setProfit(nineteenBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '20') {
      setProfit(twentyBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '21') {
      setProfit(twentyOneBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '22') {
      setProfit(twentyTwoBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '23') {
      setProfit(twentyThreeBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    } else if (bomb === '24') {
      setProfit(twentyFourBombArr[gemCount]);
      // setWinAmount( profit * Number(betAmount) );
    }
  };

  //FUNCTION WHICH WILL WORK WHEN A MINE IS CLICKED, LOGGING TO THE CONSOLE
  const mineClicked = (index: number) => {
    console.log('Clicked index:', index);
    console.log('Bomb count array:', bombCount);
    if (bombCount.includes(index)) {
      setClickedIndices((prev) => ({ ...prev, [index]: 'bomb' }));
      console.log('Bomb Clicked');
      playSound(bombSoundRef);
    } else {
      setClickedIndices((prev) => ({ ...prev, [index]: 'gem' }));
      console.log('Gem Clicked');
      setGemCount((prev) => prev + 1);
      playSound(gemSoundRef);

      if (gemCount === gems) {
        maxWinFunction();
      }

      profitMultiplier();
    }

    if (bombCount.includes(index)) {
      setBombClicked(true);
      setActiveBet(false);
      setProfit(0);
      console.log('bet has been set to false again');
    }
  };

  const maxWinFunction = () => {
    setMaxWin(true);

    if (bomb === '1') {
      const lastIndex = oneBombArr.length - 1;
      //  maxWinAmount = oneBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(oneBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '2') {
      const lastIndex = twoBombArr.length - 1;
      //  maxWinAmount = twoBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(twoBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '3') {
      const lastIndex = threeBombArr.length - 1;
      // maxWinAmount = threeBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(threeBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '4') {
      const lastIndex = fourBombArr.length - 1;
      //  maxWinAmount = fourBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(fourBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '5') {
      const lastIndex = fiveBombArr.length - 1;
      //  maxWinAmount = fiveBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(fiveBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '6') {
      const lastIndex = sixBombArr.length - 1;
      // maxWinAmount = sixBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(sixBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '7') {
      const lastIndex = sevenBombArr.length - 1;
      //  maxWinAmount = sevenBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(sevenBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '8') {
      const lastIndex = eightBombArr.length - 1;
      //  maxWinAmount = eightBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(eightBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '9') {
      const lastIndex = nineBombArr.length - 1;
      //  maxWinAmount = nineBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(nineBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '10') {
      const lastIndex = tenBombArr.length - 1;
      //  maxWinAmount = tenBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(tenBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '11') {
      const lastIndex = elevenBombArr.length - 1;
      //  maxWinAmount = elevenBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(elevenBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '12') {
      const lastIndex = twelveBombArr.length - 1;
      //  maxWinAmount = twelveBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(twelveBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '13') {
      const lastIndex = thirteenBombArr.length - 1;
      //  maxWinAmount = thirteenBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(thirteenBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '14') {
      const lastIndex = fourteenBombArr.length - 1;
      //  maxWinAmount = fourteenBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(fourteenBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '15') {
      const lastIndex = fifteenBombArr.length - 1;
      //  maxWinAmount = fifteenBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(fifteenBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '16') {
      const lastIndex = sixteenBombArr.length - 1;
      //  maxWinAmount = sixteenBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(sixteenBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '17') {
      const lastIndex = seventeenBombArr.length - 1;
      //  maxWinAmount = seventeenBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(seventeenBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '18') {
      const lastIndex = eighteenBombArr.length - 1;
      //  maxWinAmount = eighteenBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(eighteenBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '19') {
      const lastIndex = nineteenBombArr.length - 1;
      // maxWinAmount = nineteenBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(nineteenBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '20') {
      const lastIndex = twentyBombArr.length - 1;
      //  maxWinAmount = twentyBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(twentyBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '21') {
      const lastIndex = twentyOneBombArr.length - 1;
      //  maxWinAmount = twentyOneBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(twentyOneBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '22') {
      const lastIndex = twentyTwoBombArr.length - 1;
      //  maxWinAmount = twentyTwoBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(twentyTwoBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '23') {
      const lastIndex = twentyThreeBombArr.length - 1;
      // maxWinAmount = twentyThreeBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(twentyThreeBombArr[lastIndex] * Number(betAmount));
    } else if (bomb === '24') {
      const lastIndex = twentyFourBombArr.length - 1;
      //  maxWinAmount = twentyFourBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(twentyFourBombArr[lastIndex] * Number(betAmount));
    }

    setActiveBet(false);

    console.log('All gems are clicked');
  };

  useEffect(() => {
    if (gemCount === gems) {
      maxWinFunction();
    }
  }, [gemCount]);

  //array of length 25 to display all div boxes through loop
  const divs = Array.from({ length: 25 });

  console.log(bombCount);

  const closeAlertClicked = () => {
    setBetAmountAlert(false);
    setGreaterBet(false);
    setNegativeBet(false);
  };

  const reshuffleClicked = () => {
    setReshuffling(true);

    setTimeout(() => {
      setReshuffling(false);
    }, 2000);
  };

  return (
    <>
      <div
        className={`h-full w-full bg-[#1A2C38] flex flex-col justify-center items-center

        sm:h-full sm:w-full sm:bg-[#1A2C38] sm:flex sm:flex-col sm:justify-center sm:items-center

        md:h-screen md:w-full md:bg-[#1A2C38] md:flex md:flex-col md:justify-center md:items-center

        lg:h-screen lg:w-full lg:bg-[#1A2C38] lg:flex lg:flex-col lg:justify-center lg:items-center

        xl:h-screen xl:w-full xl:bg-[#1A2C38] xl:flex xl:flex-col xl:justify-center xl:items-center

        2xl:h-screen 2xl:w-full 2xl:bg-[#1A2C38] 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center ${
          addMoneyButton ? 'blur-sm' : ''
        } ${betAmountAlert ? 'blur-sm' : ''} `}>
        {/* WALLET SECTION */}
        <div className='absolute top-4 right-4 w-[90%] max-w-md'>
          <WalletDisplay
            amount={amountInWallet}
            onAddMoney={addMoneyButtonClicked}
          />
        </div>

        {/* PROFIT DISPLAY SECTION */}
        <div className='absolute top-24 right-4 w-[90%] max-w-md'>
          <ProfitDisplay
            profit={profit}
            betAmount={betAmount}
            activeBet={activeBet}
          />
        </div>

        <h1
          className='mt-10 text-4xl text-[#a4bcd3] font-extrabold

        sm:mt-8 sm:text-5xl sm:text-[#a4bcd3] sm:font-extrabold

        md:mt-8 md:text-5xl md:text-[#a4bcd3] md:font-extrabold

        lg:mt-8 lg:text-5xl lg:text-[#a4bcd3] lg:font-extrabold

        xl:mt-8 xl:text-5xl xl:text-[#a4bcd3] xl:font-extrabold

        2xl:mt-8 2xl:text-5xl 2xl:text-[#a4bcd3] 2xl:font-extrabold'>
          {' '}
          Mine Rush
        </h1>

        <div
          className={`my-8 h-[44rem] w-[20rem] bg-[#0f212e] rounded-xl flex flex-col-reverse justify-between items-center shadow-2xl

        sm:my-7 sm:h-[48rem] sm:w-[31rem] sm:bg-[#0f212e] sm:rounded-xl sm:flex sm:flex-col-reverse sm:justify-between sm:items-center sm:shadow-2xl

        md:my-5 md:h-[31rem] md:w-[44rem] md:bg-[#0f212e] md:rounded-xl md:flex md:flex-row md:justify-between md:items-center md:shadow-2xl

        lg:my-6 lg:h-[30rem] lg:w-[58rem] lg:bg-[#0f212e] lg:rounded-xl lg:flex lg:flex-row lg:justify-between lg:items-center lg:shadow-2xl

        xl:my-6 xl:h-[32rem] xl:w-[75rem] xl:bg-[#0f212e] xl:rounded-xl xl:flex xl:flex-row xl:justify-between xl:items-center xl:shadow-2xl

        2xl:my-6 2xl:h-[32rem] 2xl:w-[80rem] 2xl:bg-[#0f212e] 2xl:rounded-xl 2xl:flex 2xl:flex-row 2xl:justify-between 2xl:items-center 2xl:shadow-2xl ${
          reshuffling ? 'blur-sm' : ''
        } `}>
          {/* GAME CONTROLS SECTION */}
          <div
            className='py-5 my-8 flex flex-col justify-center items-center ml-0 h-[18rem] w-[17rem] bg-[#213743] text-[#a4bcd3] rounded-xl

          sm:py-5 sm:my-8 sm:flex sm:flex-col sm:justify-center sm:items-center sm:ml-0 sm:h-[19rem] sm:w-[22rem] sm:bg-[#213743] sm:text-[#a4bcd3] sm:rounded-xl

          md:flex md:flex-col md:justify-center md:items-center md:ml-9 md:h-[21rem] md:w-[17.5rem] md:bg-[#213743] md:text-[#a4bcd3] md:rounded-xl

          lg:flex lg:flex-col lg:justify-center lg:items-center lg:ml-10 lg:h-[26rem] lg:w-[22rem] lg:bg-[#213743] lg:text-[#a4bcd3] lg:rounded-2xl

          xl:flex xl:flex-col xl:justify-center xl:items-center xl:ml-10 xl:h-[26rem] xl:w-[30rem] xl:bg-[#213743] xl:text-[#a4bcd3] xl:rounded-2xl

          2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center 2xl:ml-10 2xl:h-[26rem] 2xl:w-[30rem] 2xl:bg-[#213743] 2xl:text-[#a4bcd3] 2xl:rounded-2xl'>
            <GameControls
              betAmount={betAmount}
              setBetAmount={setBetAmount}
              bomb={bomb}
              setBomb={SetBomb}
              activeBet={activeBet}
              onBet={betButtonClicked}
              onCashout={cashoutClicked}
              onReshuffle={reshuffleClicked}
            />
          </div>

          {/* GRID WALA BOX */}
          <div
            className={`my-12 grid grid-rows-5 grid-cols-5 gap-y-3 justify-items-center items-center mr-0 h-[20rem] w-[17rem] rounded-2xl

            sm:my-12 sm:grid sm:grid-rows-5 sm:grid-cols-5 sm:gap-y-4 sm:justify-items-center sm:items-center sm:mr-0 sm:h-[21rem] sm:w-[21rem] sm:rounded-2xl

            md:grid md:grid-rows-5 md:grid-cols-5 md:gap-y-2 md:justify-items-center md:items-center md:mr-8 md:h-[20rem] md:w-[20rem] md:rounded-2xl

            lg:grid lg:grid-rows-5 lg:grid-cols-5 lg:gap-y-3 lg:justify-items-center lg:items-center lg:mr-14 lg:h-[25rem] lg:w-[24rem] lg:rounded-2xl

            xl:grid xl:grid-rows-5 xl:grid-cols-5 xl:gap-y-4 xl:justify-items-center xl:items-center xl:mr-24 xl:h-[27rem] xl:w-[28rem] xl:rounded-2xl

            2xl:grid 2xl:grid-rows-5 2xl:grid-cols-5 2xl:gap-y-4 2xl:justify-items-center 2xl:items-center 2xl:mr-24 2xl:h-[27rem] 2xl:w-[28rem] 2xl:rounded-2xl ${
              winningPopUp ? 'blur-sm' : ''
            } ${bombClicked ? 'blur-sm' : ''} ${maxWin ? 'blur-sm' : ''} `}>
            {/* LOOPING THROUGH THE DIV TO SHOW MINES */}
            {divs.map((_, index) => {
              const isClicked = clickedIndices.hasOwnProperty(index);
              return (
                <div
                  key={index}
                  className={`h-[2.8rem] w-[2.8rem] bg-[#2f4553] flex justify-center items-center rounded-sm mineField

                      sm:h-[3.4rem] sm:w-[3.4rem] sm:bg-[#2f4553] sm:flex sm:justify-center sm:items-center sm:rounded-sm sm:mineField

                      md:h-[3.2rem] md:w-[3.2rem] md:bg-[#2f4553] md:flex md:justify-center md:items-center md:rounded-md md:mineField

                      lg:h-[4.2rem] lg:w-[4.2rem] lg:bg-[#2f4553] lg:flex lg:justify-center lg:items-center lg:rounded-lg lg:mineField

                      xl:h-[4.5rem] xl:w-[4.5rem] xl:bg-[#2f4553] xl:flex xl:justify-center xl:items-center xl:rounded-lg xl:mineField

                      2xl:h-[4.5rem] 2xl:w-[4.5rem] 2xl:bg-[#2f4553] 2xl:flex 2xl:justify-center 2xl:items-center 2xl:rounded-lg hover:cursor-pointer 2xl:mineField ${
                        isClicked ? 'mineClicked' : ''
                      } `}
                  onClick={() => {
                    if (!isClicked) {
                      clickingMine(index);
                    }
                  }}>
                  {isClicked && (
                    // Showing image of gem or bomb according to the index clicked
                    <img
                      src={
                        clickedIndices[index] === 'bomb'
                          ? 'bomb.png'
                          : 'gems.png'
                      }
                      alt={clickedIndices[index]}
                      className={`${
                        clickedIndices[index] === 'bomb'
                          ? 'mr-1 sm:mr-1 md:mr-1 lg:mr-1 xl:mr-1 2xl:mr-1 image-size'
                          : 'ml-1 sm:ml-1 md:ml-1 lg:ml-1 xl:ml-1 2xl:ml-1'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ADD MONEY COMPONENT */}
      {addMoneyButton && (
        <AddMoney
          addAmount={addAmountField}
          addAmountOnChange={(e) => setAddAmountField(e.target.value)}
          addButton={addButtonClicked}
        />
      )}

      {/* MAX WIN COMPONENT */}
      {maxWin && (
        <Winning
          winningMultiplier={profit}
          winningAmount={maxWinAmount}
          isBombClicked={false}
          onClose={() => {
            setMaxWin(false);
            setActiveBet(false);
            setProfit(0);
            setMaxWinAmount(0);
          }}
        />
      )}

      {/* WINNING COMPONENT */}
      {winningPopUp && (
        <Winning
          winningMultiplier={profit}
          winningAmount={winAmount}
          isBombClicked={bombClicked}
          onClose={() => {
            setWinningPopUp(false);
            setActiveBet(false);
            setBombClicked(false);
            setProfit(0);
            setWinAmount(0);
          }}
        />
      )}

      {/* WHEN A BOMB IS CLICKED */}
      {bombClicked && (
        <Winning
          winningMultiplier={0}
          winningAmount={0}
          isBombClicked={true}
          onClose={() => {
            setBombClicked(false);
            setActiveBet(false);
            setProfit(0);
            setWinAmount(0);
          }}
        />
      )}

      {betAmountAlert && (
        <AlertBox
          alertTitle='No Bet Amount Set'
          alertDescription='Please set a bet amount (atleast 0)'
          closeAlertBox={closeAlertClicked}
        />
      )}

      {greaterBet && (
        <AlertBox
          alertTitle='Low Balance'
          alertDescription='Insufficient balance in the wallet'
          closeAlertBox={closeAlertClicked}
        />
      )}

      {negativeBet && (
        <AlertBox
          alertTitle='Negative Bet'
          alertDescription='Bet amount cannot be less than 0'
          closeAlertBox={closeAlertClicked}
        />
      )}

      {reshuffling && <ReShuffle />}
    </>
  );
}
