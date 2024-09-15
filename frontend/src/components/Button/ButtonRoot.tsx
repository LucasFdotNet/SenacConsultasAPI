import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, View } from "react-native";

interface ButtonProps {
    title: string,
    onPress?: () => void
    isLoading?: boolean
    textLoading?: string
}

export function ButtonRoot ( { title, onPress, isLoading = false, textLoading = "Carregando..." }: ButtonProps ) { 


    return(
        <TouchableOpacity style={styles.button} onPress={onPress}>

            {
              isLoading ? (
                <View style={{flexDirection: "row", alignItems: "center", gap: 20}}>
                  <ActivityIndicator size="small" color="#fff" />
                  <Text style={styles.text}>{textLoading}</Text>
                </View>
              ) : (
                <>
                  <Text style={styles.text}>{title}</Text>
                </>
              )
            }
            
                
            
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      elevation: 3,
      backgroundColor: "#015baa",
    },
    text: {
      fontSize: 14,
      lineHeight: 21,
      fontWeight: '500',
      letterSpacing: 0.25,
      color: 'white',
    },
  });