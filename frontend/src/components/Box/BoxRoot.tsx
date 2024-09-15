import { ReactNode } from "react";
import { Pressable, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Animated from "react-native-reanimated";

interface BoxRootProps {
    children?: ReactNode,
    bgColor?: string,
    onClick?: () => void
}

export function BoxRoot ( { children, bgColor = "#ededed", onClick }: BoxRootProps ) {
    return (
        
        <Pressable onPress={onClick} style={{...styles.box, backgroundColor: bgColor }} >
            { children }
        </Pressable>
        
    )
}

const styles = StyleSheet.create({
    box: {
        flex: 1, 
        height: 150,
        // backgroundColor: '#ededed',
        borderRadius: 4,
        padding: 10,
        position: "relative",
        overflow: "hidden"
    }
});