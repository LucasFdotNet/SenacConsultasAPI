import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, Image, TouchableOpacity } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useAuth } from '../../components/context/AuthContext';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const signinSchema = z.object({
    email: z.string({ required_error: "O e-mail e obrigatorio" }).email("Digite um e-mail"),
    senha: z.string({ required_error: "A senha e obrigatoria" }).min(6, "A senha deve ter no minimo 6 caracteres"),
})

type signinSchemaType = z.infer<typeof signinSchema>


export function SigninScreen () {

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const { register , handleSubmit, formState: { errors }, control} = useForm<signinSchemaType>({
        resolver: zodResolver(signinSchema),  
    })

    const { signIn, loading } = useAuth();

    const submit = async (data: signinSchemaType) => {
        const logado = await signIn(data)

        

    }

    return (
        <View style={styles.container}>
            <Image 
                style={styles.tinyLogo}
                source={require('@expo/../../assets/logo_sus.png')}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 0, width: "100%" }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, width: "100%", justifyContent: 'center' }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={{ height: 12 }}></View>

                        <Input.Root 
                            control={control}
                            label='E-mail'
                            name='email'
                            error={errors.email}
                        />
                        <Input.Root 
                            control={control}
                            label='Senha'
                            name='senha'
                            error={errors.senha}
                            secureTextEntry
                        />
                        
                    </ScrollView>
                </TouchableWithoutFeedback>
                
                <Button.Root  title='Entrar' onPress={handleSubmit(submit)} isLoading={loading} />

            </KeyboardAvoidingView>

            <Text style={{ marginTop: 18 }}>
                Nao tem uma conta?{' '}
                <TouchableOpacity onPress={() => {navigation.navigate('Signup')}}>
                    <Text style={styles.link}>Clique aqui</Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: "5%",
      paddingRight: "5%",
    },
    button: {

    },
    tinyLogo: {
        width: 200,
        height: 110,
        marginBottom: 30
    },
    link: {
        color: 'blue', // Cor do link
        textDecorationLine: 'underline', // Adiciona sublinhado para parecer um link
    },
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
    }
  });


//   <View style={styles.inputField}>

//                             <View style={styles.textBg}>
//                                 <Text style={{ ...styles.text, }}>E-mail</Text>
//                             </View>
//                             <TextInput
//                                 style={styles.input}
//                                 value={form.email}
//                                 onChangeText={(text) => setForm({...form, email: text})}
                                
//                             />
//                         </View>
                        
//                         <View style={styles.inputField}>

//                             <View style={styles.textBg}>
//                                 <Text style={{ ...styles.text, }}>Senha</Text>
//                             </View>
//                             <TextInput
//                                 style={styles.input}
//                                 value={form.senha}
//                                 onChangeText={(text) => setForm({...form, senha: text})}
//                                 secureTextEntry
//                             />
//                         </View>