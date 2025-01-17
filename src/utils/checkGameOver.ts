import { Coordinate } from "../types/types";

export const checkGameOver = (
    snakeHead: Coordinate,
    bounderies: any
): boolean => {
    return (
        snakeHead.x < bounderies.xMin ||
        snakeHead.x > bounderies.xMax ||
        snakeHead.y < bounderies.yMin ||
        snakeHead.y > bounderies.yMax
    );
};

