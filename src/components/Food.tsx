import { StyleSheet, Text } from "react-native";
import { Coordinate } from "../types/types";

export default function Food({ x,y }: Coordinate): JSX.Element {
    return (
        <Text style={[styles.food, { left: x * x, top: y * 10 }]}>♥</Text>  
    );
}

const styles = StyleSheet.create({
    food: {
        position: "absolute",
        width: 20,
        height: 20,
        borderRadius: 8,
    },
});