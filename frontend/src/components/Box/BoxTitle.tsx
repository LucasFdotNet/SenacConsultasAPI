import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

interface BoxRootProps {
    children?: ReactNode
}

export function BoxTitle({ children }: BoxRootProps) {


    return (
        <Text style={styles.boxTitle}>{ children }</Text>
    );
}

const styles = StyleSheet.create({
    boxTitle: {
        fontWeight: "500",
        fontSize: 16,
        marginBottom: 12,
        color: "#fff"
    },
})