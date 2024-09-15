import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, Image, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../components/context/AuthContext';

const signupSchema = z.object({
    nome: z.string({ required_error: "O nome e obrigatorio" }).min(2, "Digite um nome valido"),
    email: z.string({ required_error: "O e-mail e obrigatorio" }).email("Digite um e-mail"),
    cpf: z.string({ required_error: "O CPF e obrigatorio" }).min(11, "Digite um CPF valido").max(11, "Digite um CPF valido"),
    telefone: z.string({ required_error: "O telefone e obrigatorio" }).min(1, "Digite um numero valido"),
    senha: z.string({ required_error: "A senha e obrigatoria" }).min(6, "A senha deve ter no minimo 6 caracteres"),
    dataNasc: z.string({ required_error: "A data de nascimento e obrigatoria" })
})

type signupSchemaType = z.infer<typeof signupSchema>

export function SignupScreen () {

    const { register , handleSubmit, formState: { errors }, control} = useForm<signupSchemaType>({
        resolver: zodResolver(signupSchema),  
    })

    const { registrar, loading } = useAuth();

    const submit = async (data: any) => {
        const create = await registrar(data)

        console.log(create)

        if (create){
            navigation.navigate("Signin")
        }
    }
    
    

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

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
                            label="Nome completo" 
                            name='nome'

                            autoCapitalize='words'
                            
                            error={errors.nome}

                            register={register("nome")}
                        />
                        <Input.Root 
                            
                            control={control}
                            label="CPF" 
                            name='cpf'
                            keyboardType='numeric'
                            error={errors.cpf}

                            register={register("cpf")}
                        />
                        <Input.Root 
                            
                            control={control}
                            label="Data de nascimento" 
                            name='dataNasc' 
                            
                            keyboardType='numeric'

                            error={errors.dataNasc} 

                            register={register("dataNasc")}
                        />

                        <Input.Root 
                            
                            control={control}

                            label="Telefone" 
                            name='telefone' 
                            error={errors.telefone}
                            keyboardType='phone-pad'
                            register={register("telefone")}
                        />

                        <Input.Root

                            control={control}
                            
                            label="E-mail"
                            name='email' 

                            
                            
                            
                            error={errors.email} 

                            
                        />
                        <Input.Root 
                            
                            control={control}
                            
                            label="Senha" 
                            name='senha'
                            secureTextEntry
                            
                            error={errors.senha} 

                            register={register("senha")}
                        />
                        {/* <Input.Root 
                            
                            register={register("cSenha")}
                            label="Confirmar senha" 
                            name='cSenha' 
                            errorMessage={errors.cSenha?.message} 
                        /> */}

                        
                        
                    </ScrollView>
                </TouchableWithoutFeedback>
                
                <Button.Root  title='Registrar' onPress={handleSubmit(submit)} isLoading={loading} />

            </KeyboardAvoidingView>

            <Text style={{ marginTop: 18 }}>
                Já tem uma conta?{' '}
                <TouchableOpacity onPress={() => {navigation.navigate('Signin')}}>

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






{/* <View style={styles.inputField}>

<View style={styles.textBg}>
    <Text style={{ ...styles.text, }}>Nome</Text>
</View>
<TextInput
    style={styles.input}
    value={form.nome}
    onChangeText={(text) => setForm({...form, nome: text})}
/>
</View>

<View style={styles.inputField}>

<View style={styles.textBg}>
    <Text style={{ ...styles.text, }}>CPF</Text>
</View>
<TextInput
    style={styles.input}
    value={form.cpf}
    onChangeText={(text) => setForm({...form, cpf: text})}
/>
</View>

<View style={styles.inputField}>

<View style={styles.textBg}>
    <Text style={{ ...styles.text, }}>Telefone</Text>
</View>
<TextInput
    style={styles.input}
    value={form.telefone}
    onChangeText={(text) => setForm({...form, telefone: text})}
/>
</View>

<View style={styles.inputField}>

<View style={styles.textBg}>
    <Text style={{ ...styles.text, }}>Endereco</Text>
</View>
<TextInput
    style={styles.input}
    value={form.endereco}
    onChangeText={(text) => setForm({...form, endereco: text})}
/>
</View>



<View style={styles.inputField}>

<View style={styles.textBg}>
    <Text style={{ ...styles.text, }}>E-mail</Text>
</View>
<TextInput
    style={styles.input}
    value={form.email}
    onChangeText={(text) => setForm({...form, email: text})}
/>
</View>
<View style={styles.inputField}>

<View style={styles.textBg}>
    <Text style={{ ...styles.text, }}>Senha</Text>
</View>
<TextInput
    style={styles.input}
    value={form.senha}
    onChangeText={(text) => setForm({...form, senha: text})}
    secureTextEntry
/>
</View> */}