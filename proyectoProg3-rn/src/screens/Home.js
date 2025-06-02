import React, {Component} from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";
import { db } from "../firebase/config";
import PostCard from "../components/PostCard";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            loading: true
        }
    }

    componentDidMount(){
        db.collection("posts").onSnapshot(docs => {
            let posts = [];
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
                this.setState({
                    posts: posts,
                    loading: false
                })
            })
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.heading}>Posteos</Text>
                <FlatList data={this.state.posts} keyExtractor={item => item.id.toString()} renderItem={({item})=> <PostCard id={item.id} info={item}/>} />
            </View>
        )
    }
}
export default Home;

const styles = StyleSheet.create({
    container:{
        flex: 1,                       
        justifyContent: 'center',     
        paddingHorizontal: 10,
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",              
    },  
})
