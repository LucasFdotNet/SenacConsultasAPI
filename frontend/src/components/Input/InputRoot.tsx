import { Controller } from 'react-hook-form';
import { TextInput, View, StyleSheet, Text, KeyboardAvoidingView, Platform, KeyboardTypeOptions } from "react-native";

interface InputFieldProps {
    label: string;
    //control: Control<FormData> | any;
    //control: Control<FormData> | any;
    name: string;
    secureTextEntry?: boolean;
    //error?: FieldError;
    //register: UseFormRegisterReturn;

    register?: any
    error?: any
    control: any

    keyboardType?: KeyboardTypeOptions
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined
}


export function InputRoot ( { label, secureTextEntry = false, name, control, error, keyboardType = "default", autoCapitalize = "none" }: InputFieldProps ) {



    return (
        <View style={styles.inputField}>    
            
                <View style={styles.textBg}>
                    <Text style={{ ...styles.text, color: error && "#e74c3c" }}>{ label }</Text>
                </View>

                <Controller 

                    control={control}
                    name={name}

                    

                    render={({ field: { value, onChange, onBlur } }) => {
                        return(
                            <>
                                <TextInput
                                    style={{...styles.input, borderColor: error && "#e74c3c"}}
                                    secureTextEntry={secureTextEntry}
                                    
                                    autoCapitalize={autoCapitalize}
                                    autoComplete="off"
                                    textContentType="none"

                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    spellCheck={false}
                                    keyboardType={keyboardType}
                                />

                                {error && <Text style={styles.errorText}>{error.message}</Text>}
                            </>
                        )
                    }}

                
                />
                
                

        </View>
    )

}

const styles = StyleSheet.create({
    inputField: {
        width: "100%",
        marginBottom: 18,
        position: "relative"
    },
    input: {
        
        padding: 14,
        borderRadius: 8,
        width: "100%",
        borderWidth: 1,
        borderColor: "#6b6b6b"
    },
    textBg: {
        backgroundColor: "#fff",
        paddingLeft: 4,
        paddingRight: 4,
        position: "absolute",
        left: 12,
        top: -8,
        zIndex: 1000
    },
    text: {
        color: "#6b6b6b"
    },
    errorText: {
        fontSize: 12,
        marginTop: 8,
        color: "#e74c3c"
    }
  });