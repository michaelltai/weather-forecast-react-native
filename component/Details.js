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
import { connect } from "react-redux";
import { getHourlyWeather } from "../reduxConfig/actions/weatherAction";
import { imageMap } from "./imgSrc";
function Details(props) {
  const { date } = props.route.params;

  const [selectedDate, setSelectedDate] = useState("");

  //? convert and set the selected weather date to appropriate format
  const getDetailInfo = () => {
    let d = convertToDate(date);
    setSelectedDate(d);
  };

  //? function to conver UNIX to datetime
  const convertToDate = (i) => {
    let t = new Date(i * 1000);
    let date = t.toLocaleDateString();
    return date;
  };

  //? convert unix to time
  const displayTime = (unix) => {
    let unix_timestamp = unix;
    var tmp = new Date(unix_timestamp * 1000);
    var toDate = tmp.toLocaleTimeString();
    return toDate;
  };

  const renderWeather = () => {
    var weatherInfo = props.hourlyData.list;
    var arr = [];
    for (var i = 0; i < weatherInfo.length; i++) {
      let int = convertToDate(weatherInfo[i].dt);

      if (int === selectedDate) {
        arr.push(
          <TouchableOpacity key={i} style={styles.mainWeatherButton}>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={styles.image}
                source={imageMap[weatherInfo[i].weather[0].icon]}
              />
              <View style={{ marginLeft: 25, alignSelf: "center" }}>
                <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                  {`Feels Like ${weatherInfo[i].main.feels_like} °C`}
                </Text>
                <Text>{`${weatherInfo[i].weather[0].main}`}</Text>
                <Text style={{ color: "#767676" }}>
                  {`Time : ${displayTime(weatherInfo[i].dt)}`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      } else if (i === weatherInfo.length - 1 && arr.length === 0) {
        arr.push(
          <TouchableOpacity style={styles.mainWeatherButton}>
            <View style={{ alignSelf: "center" }}>
              <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                Weather Data Not Found!
              </Text>
            </View>
          </TouchableOpacity>
        );
      }
    }

    return arr;
  };

  useEffect(() => {
    props.populateHourlyData();
    getDetailInfo();
  }, []);

  return (
    <View style={styles.backdrop}>
      <Appbar style={styles.bottom}>
        <Appbar.BackAction onPress={() => props.navigation.navigate("Home")} />
        <Appbar.Content title="Weather Forecast ⛅" />
      </Appbar>
      <ScrollView>
        <Text style={styles.container}>{selectedDate}</Text>
        <View style={{ marginTop: 30 }}></View>
        {props.fetchStatus && renderWeather()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "#5F86FE",
  },
  bottom: {
    position: "relative",
    top: 30,
  },
  container: {
    marginTop: 40,
    marginLeft: 20,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
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
    hourlyData: state.weatherReducers.hourlyList,
    fetchStatus: state.weatherReducers.hourlyFetchComplete,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    populateHourlyData: () => {
      dispatch(getHourlyWeather());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
