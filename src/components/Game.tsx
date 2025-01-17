import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Colors from '../styles/Colors';
import Header from './Header';
import { Coordinate, Direction, GestureEventType } from '../types/types';
import Snake from './Snake';
import { checkGameOver } from '../utils/checkGameOver';
import Food from './Food';
import { checkEatsFood } from '../utils/checkEatsFood';
import { randomFoodPosition } from '../utils/randomFoodPosition';

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = {xMin: 0, xMax: 35, yMin: 0, yMax: 63};
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

export default function Game():JSX.Element {
   const [direction, setDirection] = React.useState<Direction>(Direction.RIGHT);
   const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
   const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);
   const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
   const [score, setScore] = React.useState<number>(0);

    React.useEffect(() => {
        if (!isGameOver) {
            const intervalID = setInterval(() => {
                moveSnake();
            }, MOVE_INTERVAL);
            return () => clearInterval(intervalID);
        }
    }, [isGameOver, snake]);

    const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = {  ...snakeHead };

    // game over
    if (checkGameOver (snakeHead, GAME_BOUNDS)) {
        setIsGameOver((prev) => !prev);
        return;
    }

    switch (direction) {
        case Direction.UP:
            newHead.y -= 1;
            break;
        case Direction.DOWN:
            newHead.y += 1;
            break;
        case Direction.LEFT:
            newHead.x -= 1;
            break;
        case Direction.RIGHT:
            newHead.x += 1;
            break;
        default:
            break;
    };

    // check if snake eats food 
    if (checkEatsFood(newHead, food, 2)) {
        setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
        setSnake([newHead, ...snake]);
        setScore(score + SCORE_INCREMENT);
    } else {
        setSnake([newHead, ...snake.slice(0, -1)]); // move snake
    };
    }

   const handleGesture = (event: GestureEventType) => {
    const {translationX, translationY} = event.nativeEvent;
    console.log(direction);

    if (Math.abs(translationX) > Math.abs(translationY)) {
        if (translationX > 0) {
            setDirection(Direction.RIGHT);
        } else {
            setDirection(Direction.LEFT);
        }
    } else {
        if (translationY > 0) {
            setDirection(Direction.DOWN);
        } else {
            setDirection(Direction.UP);
        }
    }
    };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
        <SafeAreaView style={styles.container}>
        {/*<Header>
                
            </Header>*/}
            <View style={styles.boundaries}>
                <Snake snake={snake}/>
                <Food x={food.x} y={food.y}/>
            </View>
        </SafeAreaView>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({  
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    boundaries: {
        flex: 1,
        borderWidth: 12,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderColor: Colors.secondary,
        backgroundColor: Colors.background,
    },
});