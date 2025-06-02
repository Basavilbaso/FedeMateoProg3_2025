import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { auth, db } from "../firebase/config";
import PostCard from "../components/PostCard";
import { FontAwesome } from '@expo/vector-icons'

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
                        <PostCard id={item.id} info={item} likeButton={true} onDelete={(id) => this.borrarPost(id)} />
                    )}/>
                <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
                    <FontAwesome name="sign-out" size={18} color="#fff" />
                    <Text style={styles.logout}> Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default Profile;

const styles = StyleSheet.create({
    container: {
        padding: 16,
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
        justifyContent: 'center',     
        paddingHorizontal: 10,
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
    postflat: {
        marginBottom: 10,
    },
});

