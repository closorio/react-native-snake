import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";
import { FontAwesome } from "@expo/vector-icons";

interface HeaderProps {
    reloadGame: () => void;
    pauseGame: () => void;
    children: JSX.Element;
    isPaused: boolean;
}

export default function Header({
    children,
    reloadGame,
    pauseGame,
    isPaused,
}: HeaderProps): JSX.Element {
    return (
        <View style={styles.header}>
          {children} 
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        borderWidth: 1,
        borderColor: Colors.secondary,
    },
});