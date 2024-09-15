import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/api'; // Supondo que você tenha um arquivo api.js configurado
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { jwtDecode } from "jwt-decode";

interface AuthContextData {
  user: object | null;
  token: string | null;
  signIn: (usuario: any) => void;
  signOut: () => void;
  loading: boolean;
  logado: boolean;
  consulta: any | null;
  marcarConsulta: ( obj: any ) => void;
  historico: any[];
  deslogar: () => void;
  registrar: (usuario: any) => Promise<boolean>
  nome: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<object | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [logado, setLogado] = useState(false);

  const [nome, setNome] = useState("")

  const [consulta, setConsulta] = useState(null);
  const [historico, setHistorico] = useState<any>([]);

  // Carrega o token do AsyncStorage ao inicializar
    useEffect(() => {
    async function loadStorageData() {
      const storagedToken = await AsyncStorage.getItem('@AppName:token');
      
      setUser({})

      if (storagedToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
        setToken(storagedToken);
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  // Função de login
    async function signIn(usuario: any) {

      // const response = await api.post('/Pacientes/login', usuario);
      // const { token } = response.data;

      // const decodedToken: any = jwtDecode(token);

      // setNome(decodedToken.unique_name);




      // setLogado(true);


      setLoading(true)

      try {
        const res = await api.post('/Pacientes/login', usuario);

        const { token } = res.data;
        const decodedToken: any = jwtDecode(token);

        setNome(decodedToken.unique_name)

        setLogado(true)

      }catch ( error ) {
        Alert.alert("E-mail o senha incorretos")
        setLogado(false)
      }finally {
        setLoading(false)
      }

      


      // setLoading(true)

      // let cadastrado: boolean = false;

      // try {
      //   const res = await api.post("/Pacientes/register", {
      //     ...usuario,
      //     endereco: "Rua qualquer",
      //     dataNasc: "2024-09-08"
      //   });
      //   Alert.alert(res.data);
      //   cadastrado = true;
      // } catch (error) {
      //   Alert.alert("Usuário já cadastrado");
      //   cadastrado = false;
      // } finally {
      //   setLoading(false);
      // }

      // return cadastrado
    
    }

  // Função de logout
    async function signOut() {
        setUser(null);
        setToken(null);

        await AsyncStorage.removeItem('@AppName:token');
        await AsyncStorage.removeItem('@AppName:user');
    }

    function marcarConsulta(obj: any) {
        setConsulta(obj)

        if(obj !== null) {
          setHistorico([...historico, obj])
        }

        
    }

    async function deslogar() {
      setLogado(false)
    }

    async function registrar(usuario: any) {

      setLoading(true)

      let cadastrado: boolean = false;

      try {
        const res = await api.post("/Pacientes/register", {
          ...usuario,
          endereco: "Rua qualquer",
          dataNasc: "2024-09-08"
        });
        Alert.alert(res.data);
        cadastrado = true;
      } catch (error) {
        Alert.alert("Usuário já cadastrado");
        cadastrado = false;
      } finally {
        setLoading(false);
      }

      return cadastrado
    }

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, loading, logado, consulta, marcarConsulta, historico, deslogar, registrar, nome }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}