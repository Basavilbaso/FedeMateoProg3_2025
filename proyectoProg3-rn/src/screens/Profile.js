import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { auth, db } from "../firebase/config";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            posts: [],
            loading: true
        }
    }

    componentDidMount() {
        const currentUserEmail = auth.currentUser.email;
        db.collection("users").where("email", "==", currentUserEmail).onSnapshot((docs) => {
            let usuario = [];
            docs.forEach((doc) => {
                usuario.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                usuarios: usuario,
                loading: false
            })
        })
        db.collection("posts").where("owner", "==", currentUserEmail).onSnapshot((docs) => {
            let post = [];
            docs.forEach((doc) => {
                post.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                posts: post,
                loading: false
            })
        })
    }

    borrarPost(id) {
        db.collection("posts").doc(id).delete()
    }

    logout() {
        auth.signOut()
            .then(() => this.props.navigation.navigate("Login"))
            .catch(err => console.log(err, "Error de logout")
        )
    }

    render() {
        const { usuarios, posts } = this.state;
        const user = usuarios[0]; 
    
        return (
            <View style={styles.container}>
                <Text style={styles.h1}>Profile</Text>
                {user && (
                    <View style={styles.userview}>
                        <Text style={styles.user}>Email: {user.data.email}</Text>
                        <Text style={styles.user}>Nombre de usuario: {user.data.username}</Text>
                    </View>
                )}
                <Text style={styles.h1}>Posteos: {posts.length}</Text>
                <FlatList style={styles.postflat} data={posts} keyExtractor={(item) => item.id} renderItem={({ item }) => (
                        <View style={styles.postview}>
                            <Text style={styles.post}>{item.data.post}</Text>
                            <Text style={styles.like}>Likes: {item.data.likes.length}</Text>
                            <TouchableOpacity style={styles.delete} onPress={() => this.borrarPost(item.id)}>
                                <Text style={styles.deleteText}>Borrar Post</Text>
                            </TouchableOpacity>
                        </View>
                    )} />
                <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
                    <Text style={styles.logout}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
    
}
export default Profile;

const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: "grey", 
      flex: 1,
    },
    h1: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 16,
      textAlign: "center",
      color: "#222",
    },
    button: {
      backgroundColor: "black",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      marginTop: 20,
      marginBottom: 30,
    },
    logout: {
      color: "white",
      fontSize: 16,
    },
    user: {
      marginBottom: 20,
      backgroundColor: "#f2f2f2",
      padding: 10,
      borderRadius: 5,
    },
    userview: {
      fontSize: 15,
      marginBottom: 4,
      color: "#333",
    },
    postview: {
      marginBottom: 12,
      backgroundColor: "#2c3e50", 
      padding: 16,
      borderRadius: 8,
      alignItems: "center",       
      justifyContent: "center",   
    },
    post: {
      fontSize: 15,
      marginBottom: 6,
      color: "#ecf0f1", 
      textAlign: "center"
    },
    like: {
      fontSize: 13,
      marginBottom: 8,
      color: "#bdc3c7", 
      textAlign: "center"
    },
    delete: {
      backgroundColor: "#e74c3c",
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 5,
      marginTop: 6,
    },
    deleteText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
    },
    postflat: {
      marginBottom: 10,
    },
  });
  
  
