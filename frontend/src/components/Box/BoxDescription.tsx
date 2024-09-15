import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

interface BoxRootProps {
    children?: ReactNode
}

export function BoxDescription({ children }: BoxRootProps) {


    return (
        <Text style={styles.boxDescription}>{ children }</Text>
    );
}

const styles = StyleSheet.create({
    boxDescription: {
        color: "#f7f7f7"
    }
});