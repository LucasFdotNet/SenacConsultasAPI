import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

interface BoxRootProps {
    children?: ReactNode
    iconName: keyof typeof Ionicons.glyphMap
    size: number
    color: string
    right: number
    bottom: number
}

export function boxIcon({ iconName = "accessibility", size, color, right, bottom }: BoxRootProps) {


    return (
        <View style={{ zIndex: -1, position: "absolute", right, bottom  }} >
            <Ionicons  name={iconName} size={size} color={color} />
        </View>
    );
}
