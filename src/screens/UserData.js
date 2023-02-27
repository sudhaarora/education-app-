import { View, Text, FlatList, StyleSheet, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";

const UserData = () => {
  const [myData, setMyData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  const getUserData = async () => {
    try {
      const response = await fetch(
        "https://thapatechnical.github.io/userapi/users.json"
      );
      const realData = await response.json();
      setMyData(realData);
      setIsLoaded(false);
      // console.log(realData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getUserData(), []);

  const showUserData = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.imgContainer}>
          <Image style={styles.imgStyle} source={{ uri: item.image }} />
        </View>

        <View>
          <View style={styles.bioDataContainer}>
            <Text style={styles.bioData}>Bio Data</Text>
            <Text style={styles.idNumber}>
              {item.id < 10 ? `#0${item.id}` : `${item.id}`}
            </Text>
          </View>

          <View style={styles.mainContainer}>
            <Text style={styles.myName}>Name: {item.name}</Text>
            <Text style={styles.myName}>Email: {item.email}</Text>
            <Text style={styles.myName}>Contact No: {item.mobile}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <FlatList 
        data={myData} 
        renderItem={showUserData}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        snapToInterval={Dimensions.get('window').height} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    minHeight: "100%",
    paddingVertical: 50,
    backgroundColor: "#353535",
    padding: 10,
  },
  card: {
    width: 250,
    height: 450,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginHorizontal: 50,
  },
  bioDataContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#353535",
    paddingVertical: 10,
    fontFamily: "WorkSans_400Regular",
    padding: 10,
  },
  idNumber: {
    fontSize: 20,
    color: "rgba(255, 255, 255, 0.5)",
    fontFamily: "WorkSans_400Regular",
    paddingRight: 10,
  },
  bioData: {
    fontSize: 30,
    color: "#fff",
    fontFamily: "WorkSans_400Regular",
  },
  mainHeader: {
    fontSize: 30,
    color: "#a18ce5",
    textAlign: "center",
    fontFamily: "WorkSans_400Regular",
    paddingVertical: 50,
  },
  imgContainer: {
    padding: 10,
  },
  imgStyle: {
    width: "100%",
    height: 180,
  },
  mainContain: {
    padding: 10,
    backgroundColor: "#353535",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingBottom: 20,
  },
  myName: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
    alignSelf: "flex-start",
    textTransform: "capitalize",
    fontFamily: "WorkSans_400Regular",
  },
});

export default UserData;
