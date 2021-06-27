import React, { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { imageMap } from "./imgSrc";
import { connect } from "react-redux";
import { getWeather } from "../reduxConfig/actions/weatherAction";

function Home(props) {
  //? directory for weather images

  //? function to conver UNIX to datetime
  const convertToDate = (i) => {
    let t = new Date(i * 1000);
    let date = t.toLocaleDateString();
    return date;
  };

  //? function for rendering Today's weather
  const renderMainWeather = () => {
    var data = props.weatherData.daily;
    let tmp = data[0].dt;
    return (
      <TouchableOpacity
        style={styles.mainWeatherButton}
        onPress={() => props.navigation.navigate("Details", { date: tmp })}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.image}
            source={imageMap[data[0].weather[0].icon]}
          />
          <View style={{ marginLeft: 25, alignSelf: "center" }}>
            <Text style={{ fontSize: 19, fontWeight: "bold" }}>
              {`Feels Like ${data[0].feels_like.day} °C`}
            </Text>
            <Text>
              {"High " +
                `${data[0].temp.max}` +
                "°C |" +
                " Low " +
                `${data[0].temp.min}` +
                "°C"}
            </Text>
            <Text style={{ color: "#767676" }}>
              {convertToDate(data[0].dt)}
            </Text>
            <Text style={{ color: "#767676" }}>{data[0].weather[0].main}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  //? function for rendering the remaining 6 day's weather
  const renderSubWeather = () => {
    var data = props.weatherData.daily;
    var arr = [];

    for (var i = 1; i <= 6; i++) {
      let tmp = data[i].dt;
      arr.push(
        <TouchableOpacity
          key={i}
          style={styles.subWeatherButton}
          onPress={() => props.navigation.navigate("Details", { date: tmp })}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.image}
              source={imageMap[data[i].weather[0].icon]}
            />
            <View style={{ alignSelf: "center" }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {`Feels Like ${data[i].feels_like.day} °C`}
              </Text>
              <Text style={{ fontSize: 12 }}>
                {"High " +
                  `${data[i].temp.max}` +
                  "°C |" +
                  " Low " +
                  `${data[i].temp.min}` +
                  "°C"}
              </Text>
              <Text style={{ fontSize: 12, color: "#767676" }}>
                {convertToDate(data[i].dt)}
              </Text>
              <Text style={{ fontSize: 12, color: "#767676" }}>
                {data[i].weather[0].main}
              </Text>
            </View>
            <View style={{ alignSelf: "center", marginLeft: 20 }}>
              <Icon name="chevron-right" size={30} />
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return arr;
  };

  useEffect(() => {
    props.populateData();
  }, []);

  return (
    <View style={styles.backdrop}>
      <Appbar style={styles.bottom}>
        <Appbar.Content
          title="Weather Forecast ⛅"
          titleStyle={{ alignSelf: "center" }}
        />
      </Appbar>
      {props.fetchStatus && (
        <ScrollView>
          <Text style={styles.container}>{props.weatherData.timezone}</Text>
          <View style={{ marginTop: 30 }}>
            {renderMainWeather()}
            {renderSubWeather()}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "#5F86FE",
  },
  container: {
    marginTop: 40,
    marginLeft: 20,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  bottom: {
    position: "relative",
    top: 30,
  },
  subWeatherButton: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    maxWidth: "100%",
    elevation: 3,
    borderRadius: 8,
  },
  mainWeatherButton: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    paddingHorizontal: 26,
    paddingVertical: 15,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    maxWidth: "100%",
    elevation: 3,
    borderRadius: 8,
  },
  image: {
    margin: "auto",
    width: 80,
    height: 80,
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

const mapStateToProps = (state) => {
  return {
    weatherData: state.weatherReducers.weatherList,
    fetchStatus: state.weatherReducers.fetchComplete,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    populateData: () => {
      dispatch(getWeather());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
