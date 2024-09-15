import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

interface DoctorModelTitleProps {
    children?: ReactNode
}

export function DoctorModelTitle ({ children }: DoctorModelTitleProps) {
    return(
        <Text style={styles.title}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "600",

    }
})