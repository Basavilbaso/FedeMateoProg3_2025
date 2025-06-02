import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { auth } from "../firebase/config";
import { FontAwesome } from '@expo/vector-icons'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      login: false,
      error: ""
    }
  }

  loguearUsuario(email, password){
    if((email !== "" && password !== "") && email.includes("@") && password.length >= 6){
      auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(()=> {
        this.setState({login: true})
        this.props.navigation.navigate("Home")
      })
      .catch(()=> this.setState({error: "Datos incorrectos"}))
    } else {
      if(email === "" || password === ""){
        this.setState({error: "Todos los campos son obligatorios"})
      } else if (!email.includes("@")) {
        this.setState({error: "Formato de email incorrecto"})
      } else if (password.length < 6){
        this.setState({error: "La contraseña debe tener al menos 6 caracteres"})
      }
    }
  }
  componentDidMount(){
    auth.onAuthStateChanged(user =>{
      if(user && !(this.props.route.params?.register)){
        this.props.navigation.navigate("Home")
      }
    })
  }

  render() {
    return (
      <View style={styles.login}>
        <Text style={styles.h1}>Formulario de login</Text>
        <TextInput style={styles.field} keyboardType="email-address" placeholder="email" onChangeText={text => this.setState({email: text})} value={this.state.email} />
        <TextInput style={styles.field} keyboardType="default" placeholder="password" secureTextEntry={true} onChangeText={text => this.setState({password: text})} value={this.state.password} />
        {this.state.error !== "" && (<Text style={styles.error}>{this.state.error}</Text>)}
        <TouchableOpacity style={styles.button} onPress={() => this.loguearUsuario(this.state.email, this.state.password)}>
          <FontAwesome name="sign-in" size={15} color="#fff" />
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Register")}>
          <FontAwesome name="user-plus" size={15} color="#fff" />
          <Text style={styles.text}>No tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
export default Login;

const styles = StyleSheet.create({
    login: {
        flex: 1,                       
        justifyContent: 'center',     
        paddingHorizontal: 10,
    },
    h1: {
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    button: {
      backgroundColor: "#28a745",
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "#28a745",
      marginVertical: 10,
      flexDirection: "row",        
      justifyContent: "center",    
      alignItems: "center",        
    },
    text: {
      color: "#fff",
      fontSize: 15,
      marginLeft: 8                
    },  
    field: {
      height: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderStyle: "solid",
      borderRadius: 6,
      marginVertical: 10
    },
    error: {
      color: "red",
      marginVertical: 10
    }
  });
