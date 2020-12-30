import React, { useState, useEffect } from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

// App drawer

function AppDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Wellcome"
        drawerContentOptions={{
          activeTintColor: '#e91e63',
        }}>
        <Drawer.Screen
          name="Wellcome"
          options={{ headerShown: false }}
          component={SplashScreen}
        />
        <Drawer.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />

        <Drawer.Screen
          name="FetchCountry"
          component={FetchCountries}
          options={{
            title: 'Countries',
            headerStyle: {
              paddingVertical: 10,
            },
            headerTitleStyle: {
              color: '#111726',
              fontSize: 24,
            },
          }}
        />
        <Drawer.Screen
          name="Favourites"
          component={Favourites}
          options={{
            title: 'Favourites',
            headerStyle: {
              paddingVertical: 10,
            },
            headerTitleStyle: {
              color: '#111726',
              fontSize: 24,
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

//Splash or first Screen

function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./components/assets/images/back2.png')}
        style={styles.image}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.startBtn}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text
              style={{ color: 'white', fontWeight: 'bold', fontSize: '16' }}>
              Covid-19 Report
            </Text>
            <Image
              style={{ width: 20, height: 20, marginLeft: 15 }}
              source={require('./components/assets/images/profit-report.png')}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

// Screen 1: Home Screen
function HomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [datalist, setDatalist] = useState({});

  useEffect(() => {
    fetch('https://coronavirus-19-api.herokuapp.com/all')
      .then((response) => response.json())
      .then((json) => setDatalist(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  function WorldStats() {
    return (
      <ImageBackground
        source={require('./components/assets/images/homeBack.png')}
        style={styles.image}>
        <View>
          <Text style={styles.title}>World's Covid Statistics</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            top: 30,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.mainBtns}>
              <Image
                style={{ width: 40, height: 40, marginBottom: 10 }}
                source={require('./components/assets/images/select.png')}
              />
              <Text
                style={{ color: '#ffb100', fontSize: 16, fontWeight: 'bold' }}>
                Confirmed Cases
              </Text>
              <Text style={styles.mainBtnsText}>{datalist.cases} </Text>
            </View>
            <View style={styles.mainBtns}>
              <Image
                style={{ width: 50, height: 50, marginBottom: 10 }}
                source={require('./components/assets/images/heartbeat.png')}
              />
              <Text
                style={{ color: '#50b948', fontSize: 16, fontWeight: 'bold' }}>
                Recovered
              </Text>
              <Text style={styles.mainBtnsText}>{datalist.recovered}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.mainBtns}>
              <Image
                style={{ width: 50, height: 50, marginBottom: 10 }}
                source={require('./components/assets/images/police-light.png')}
              />
              <Text
                style={{ color: '#1e5cd9', fontSize: 16, fontWeight: 'bold' }}>
                Critical Cases
              </Text>
              <Text style={styles.mainBtnsText}>940380</Text>
            </View>
            <View style={styles.mainBtns}>
              <Image
                style={{ width: 50, height: 50, marginBottom: 10 }}
                source={require('./components/assets/images/grave.png')}
              />
              <Text
                style={{ color: '#ea5569', fontSize: 16, fontWeight: 'bold' }}>
                Deaths
              </Text>
              <Text style={styles.mainBtnsText}>{datalist.deaths}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity
              style={styles.main5thBtns}
              onPress={() => navigation.navigate('Precautions')}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                  fontWeight: 'bold',
                  paddingRight: 60,
                }}>
                Precautions
              </Text>
              <Image
                style={{ width: 50, height: 50, marginBottom: 10 }}
                source={require('./components/assets/images/alert2.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <TouchableOpacity
              style={styles.main5thBtns}
              onPress={() => navigation.navigate('Symptoms')}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                  fontWeight: 'bold',
                  paddingRight: 60,
                }}>
                Symptoms
              </Text>
              <Image
                style={{ width: 50, height: 50, marginBottom: 10 }}
                source={require('./components/assets/images/fever.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={WorldStats}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Precautions"
        options={{
          title: 'Precautions',
          headerStyle: {
            paddingVertical: 10,
          },
          headerTitleStyle: {
            color: '#111726',
            fontSize: 22,
          },
        }}
        component={Precautions}
      />
      <Stack.Screen
        name="Symptoms"
        options={{
          title: 'Symptoms',
          headerStyle: {
            paddingVertical: 10,
          },
          headerTitleStyle: {
            color: '#111726',
            fontSize: 22,
          },
        }}
        component={Symptoms}
      />
    </Stack.Navigator>
  );
}

// Screen 2 :Countries List Screen
function FetchCountries({ navigation }) {
  //fetching data from thorugh API
  const [isLoading, setLoading] = useState(true);
  const [datalist, setDatalist] = useState([]);

  useEffect(() => {
    fetch('https://coronavirus-19-api.herokuapp.com/countries')
      .then((response) => response.json())
      .then((json) => setDatalist(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  //this is the component for displaying country list
  function Country({ countryName, countryObj }) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CountryStats', {
            obj: countryObj,
          })
        }
        style={styles.countryBtns}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{ width: 20, height: 20, marginRight: 15 }}
            source={require('./components/assets/images/5.png')}
          />
          <Text style={styles.countriesList}> {countryName}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  //this is the rendering duntion to fetch country list and display with the help of Country function

  function CountryRender() {
    return (
      <View style={{ backgroundColor: '#111726', flex: 1, padding: 24 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={datalist}
            keyExtractor={(item) => item.country}
            renderItem={({ item }) => {
              return <Country countryName={item.country} countryObj={item} />;
            }}
          />
        )}
      </View>
    );
  }
  const Stack1 = createStackNavigator();
  return (
    <Stack1.Navigator>
      <Stack1.Screen
        name="CountryList"
        component={CountryRender}
        options={{
          title: 'Countries',
          headerStyle: {
            paddingVertical: 10,
          },
          headerTitleStyle: {
            color: '#111726',
            fontSize: 22,
          },
        }}
      />
      <Stack1.Screen
        name="CountryStats"
        component={CountryStats}
        options={{
          title: 'Country Stats',
          headerStyle: {
            paddingVertical: 10,
          },
          headerTitleStyle: {
            color: '#111726',
            fontSize: 22,
          },
        }}
      />
    </Stack1.Navigator>
  );
}

//Screen 3: Stats
function CountryStats({ navigation, route }) {
  const countryStats = route.params.obj;
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={{
          marginHorizontal: 5,
          padding: 10,
          borderRadius: 5,
        }}
        onPress={() => {
          AddtoFav(countryStats);
        }}>
        <Ionicons name="star-outline" size={25} color="red" />
      </TouchableOpacity>
    ),
  });
  // Adding country stats to the Async storage
  const AddtoFav = async (cObj) => {
    const jsonValue = JSON.stringify(cObj);
    await AsyncStorage.setItem(cObj.country, jsonValue);
    console.log('KEY: ' + cObj.country);
    console.log(cObj);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./components/assets/images/counteriesBack.png')}
        style={styles.image}>
        <View>
          <Text style={styles.countryName}>{countryStats.country}</Text>
        </View>
        <View style={{ alignItems: 'center', top: 20 }}>
          <Text style={{ color: 'white', fontSize: 22 }}>
            Cases Per Million
          </Text>
          <Text style={{ color: '#ea5569', fontSize: 20, fontWeight: 'bold' }}>
            {countryStats.casesPerOneMillion}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            top: 10,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.mainBtns}>
              <Image
                style={{ width: 40, height: 40, marginBottom: 10 }}
                source={require('./components/assets/images/select.png')}
              />
              <Text
                style={{ color: '#ffb100', fontSize: 16, fontWeight: 'bold' }}>
                Confirmed Cases
              </Text>
              <Text style={styles.mainBtnsText}>{countryStats.active} </Text>
            </View>
            <View style={styles.mainBtns}>
              <Image
                style={{ width: 50, height: 50, marginBottom: 10 }}
                source={require('./components/assets/images/heartbeat.png')}
              />
              <Text
                style={{ color: '#50b948', fontSize: 16, fontWeight: 'bold' }}>
                Recovered
              </Text>
              <Text style={styles.mainBtnsText}>{countryStats.recovered} </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.mainBtns}>
              <Image
                style={{ width: 50, height: 50, marginBottom: 10 }}
                source={require('./components/assets/images/police-light.png')}
              />
              <Text
                style={{ color: '#1e5cd9', fontSize: 16, fontWeight: 'bold' }}>
                Critical Cases
              </Text>
              <Text style={styles.mainBtnsText}>{countryStats.critical} </Text>
            </View>
            <View style={styles.mainBtns}>
              <Image
                style={{ width: 50, height: 50, marginBottom: 10 }}
                source={require('./components/assets/images/grave.png')}
              />
              <Text
                style={{ color: '#ea5569', fontSize: 16, fontWeight: 'bold' }}>
                Deaths
              </Text>
              <Text style={styles.mainBtnsText}>{countryStats.deaths} </Text>
            </View>
          </View>
          <View style={styles.main6thBtns}>
            <Image
              style={{ width: 60, height: 60, marginBottom: 10 }}
              source={require('./components/assets/images/test-tube.png')}
            />
            <Text
              style={{ color: '#7e2c40', fontSize: 16, fontWeight: 'bold' }}>
              Total Tests
            </Text>
            <Text style={styles.mainBtnsText}>{countryStats.totalTests} </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

//Screen 4: Favourites

function Favourites({ navigation }) {
  return (
    <ImageBackground
      source={require('./components/assets/images/counteriesBack.png')}
      style={{ flex: 1, resizeMode: 'cover', justifyContent: 'flex-start' }}>
      <View
        style={{
          margin: 10,
          alignItems: 'center',
          paddingTop: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{ color: 'white', fontSize: 42 }}> Favourites</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#d62543', padding: 15, borderRadius: 10 }}
          onPress={() => {}}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: '16' }}>
            Load Data
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

//Screen 5: Precations
function Precautions({ navigation }) {
  return (
    <ImageBackground
      source={require('./components/assets/images/cautions.png')}
      style={styles.image1}>
      <View>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
          PRECAUTIONS For
        </Text>
        <Text style={styles.screenTitle}> COVID-19</Text>
      </View>
      <View style={styles.preCautionSection}>
        <View>
          <Image
            style={{ width: 80, height: 80, marginRight: 35 }}
            source={require('./components/assets/images/stayhome.png')}
          />
        </View>
        <View>
          <Text style={styles.precautionsStyle}>Stay Home</Text>
        </View>
      </View>
      <View style={styles.preCautionSection}>
        <View>
          <Image
            style={{ width: 80, height: 80, marginRight: 35 }}
            source={require('./components/assets/images/SocialDistancing.png')}
          />
        </View>
        <View>
          <Text style={styles.precautionsStyle}>Social Distancing</Text>
        </View>
      </View>
      <View style={styles.preCautionSection}>
        <View>
          <Image
            style={{ width: 80, height: 80, marginRight: 35 }}
            source={require('./components/assets/images/mask.png')}
          />
        </View>
        <View>
          <Text style={styles.precautionsStyle}>Wearing Mask</Text>
        </View>
      </View>
      <View style={styles.preCautionSection}>
        <View>
          <Image
            style={{ width: 80, height: 80, marginRight: 35 }}
            source={require('./components/assets/images/wash.png')}
          />
        </View>
        <View>
          <Text style={styles.precautionsStyle}>Wash Hands</Text>
        </View>
      </View>
      <View style={styles.preCautionSection}>
        <View>
          <Image
            style={{ width: 80, height: 80, marginRight: 35 }}
            source={require('./components/assets/images/Gloves.png')}
          />
        </View>
        <View>
          <Text style={styles.precautionsStyle}>Wear Gloves</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

//Screen 6: Symotoms
function Symptoms({ navigation }) {
  return (
    <ImageBackground
      source={require('./components/assets/images/cautions.png')}
      style={styles.image1}>
      <View>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
          Symptoms of
        </Text>
        <Text style={styles.screenTitle}> COVID-19</Text>
      </View>
      <View style={styles.preCautionSection}>
        <View>
          <Image
            style={{ width: 80, height: 80, marginRight: 35 }}
            source={require('./components/assets/images/s1.png')}
          />
        </View>
        <View>
          <Text style={styles.precautionsStyle}>Fever</Text>
        </View>
      </View>
      <View style={styles.preCautionSection}>
        <View>
          <Image
            style={{ width: 80, height: 80, marginRight: 35 }}
            source={require('./components/assets/images/s2.png')}
          />
        </View>
        <View>
          <Text style={styles.precautionsStyle}>Dry Cough</Text>
        </View>
      </View>
      <View style={styles.preCautionSection}>
        <View>
          <Image
            style={{ width: 80, height: 80, marginRight: 35 }}
            source={require('./components/assets/images/s7.png')}
          />
        </View>
        <View>
          <Text style={styles.precautionsStyle}>Sore Throat</Text>
        </View>
      </View>
      <View style={styles.preCautionSection}>
        <View>
          <Image
            style={{ width: 80, height: 80, marginRight: 35 }}
            source={require('./components/assets/images/s3.png')}
          />
        </View>
        <View>
          <Text style={styles.precautionsStyle}>Shortness of Breath</Text>
        </View>
      </View>
      <View style={styles.preCautionSection}>
        <View>
          <Image
            style={{ width: 80, height: 80, marginRight: 35 }}
            source={require('./components/assets/images/s4.png')}
          />
        </View>
        <View>
          <Text style={styles.precautionsStyle}>Body Aches</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  image1: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    paddingTop: 80,
  },

  screenTitle: {
    fontSize: 42,
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    marginBottom: 50,
    textAlign: 'center',
    alignItems: 'center',
  },
  preCautionSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 100,
    width: 370,
    shadowColor: '#b7b7b7',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 5 },
    marginHorizontal: 20,
    marginVertical: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 30,
  },

  startBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#d62543',
    width: 220,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    bottom: 100,
  },
  mainBtns: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 180,
    width: 180,
    shadowColor: '#b7b7b7',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 5 },
    margin: 8,
  },
  main5thBtns: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#7e2c40',
    height: 90,
    width: 370,
    shadowColor: '#b7b7b7',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 5 },
    margin: 8,
    paddingHorizontal: '10%',

    borderRadius: 10,
    flexDirection: 'row',
  },
  main6thBtns: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 180,
    width: 370,
    shadowColor: '#b7b7b7',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 5 },
    margin: 8,
  },

  mainBtnsText: {
    color: 'Black',
    fontWeight: 'bold',
    fontSize: 22,
    justifyContent: 'center',
    marginVertical: 8,
  },
  countryBtns: {
    justifyContent: 'flex-end',
    height: 50,
    borderRadius: 10,
    elevation: 4.0,
    borderColor: 'white',
    borderBottomWidth: '0.2',
  },

  title: {
    fontSize: 42,
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    marginBottom: 30,
    textAlign: 'center',
    alignItems: 'center',
    top: 100,
  },
  countryName: {
    fontSize: 42,
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    marginBottom: 30,
    textAlign: 'center',
    alignItems: 'center',
    top: 40,
  },

  countriesList: {
    fontSize: 22,
    color: 'white',
  },
  precautionsStyle: {
    justifyContent: 'space-between',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ea5569',
  },
});

export default AppDrawer;
