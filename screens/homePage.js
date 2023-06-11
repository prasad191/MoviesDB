import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = ({navigation}) => {
  let [movieName, setMovieName] = useState("Pokemon");
  let [movieList, setMovieList] = useState([]);
  let [isFetching, setFetching] = useState(false);
  let [reponseError,setReponseError] = useState(false);
  let greet = getGreeting();

  function getGreeting() {
    const currentHour = new Date().getHours();
    let greeting;
  
    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }
  
    return greeting;
  }    
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData = async () => {
    if (movieName.length === 0) {
      console.log('EMPTY');
      displayToastWithGravityAndOffset("Oops! Looks like you forgot to enter title");
    } else {
      try {
        setFetching(true);
        let response = await fetch(
          'https://www.omdbapi.com/?apikey=your_api_key&s=' + movieName,
        );
        let jsonData = await response.json();
        // console.log(jsonData);
        if (jsonData.Response === 'True') {
          setReponseError(false);
          console.log('True');
          let searchData = await jsonData.Search;
          setMovieList(searchData);
          console.log(movieList.length);
        } else {
          setReponseError(true);
          console.log('False');
        }
      } catch (error) {
        setReponseError(true);
        console.log(error);
      } finally {
        setFetching(false);
      }
    }
  };
  const displayToastWithGravityAndOffset = (msg) => {  
    ToastAndroid.showWithGravityAndOffset(  
      msg,
      ToastAndroid.LONG,  
      ToastAndroid.BOTTOM,  
      25,  
      50  
    );  
    setReponseError(false);
  };  
  return (
    <View style={styles.background}>
      <View style={styles.nav}>
        <View>
          <Text style={styles.title}>Hello {greet},</Text>
          <Text style={styles.subtitle}>Movies Database</Text>
        </View>

      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.searchInput}
          value={movieName}
          onChangeText={text => setMovieName(text)}
          placeholder="Search"
        />
        <TouchableOpacity onPress={async () => await fetchData()}>
          {/* <Text style={styles.searchIcon}>🔍</Text> */}
          <Icon name="search" style={styles.searchIcon} color="white" size={20} />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1,marginBottom:100}}>
        <Text style={[styles.title, {padding: 30}]}>Media</Text>
        {/* <ScrollView contentContainerStyle={{flexGrow: 1}}> */}
        {isFetching  ? (
        <ActivityIndicator style={{    position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'     }} size={40} color={'white'}/>
        ) : 
          // <View
          <View>{ reponseError ? displayToastWithGravityAndOffset("Unable to find any results!") : <FlatList
            data={movieList}
            renderItem={({item}) => <View
            style={{
              marginHorizontal: 30,
              borderRadius: 20,
              backgroundColor: '#1D1D1D',
              marginBottom: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                style={styles.movieImage}
                source={{

                  uri: item.Poster === "N/A" ? "https://media.istockphoto.com/id/1244034031/vector/cinema-poster-with-cola-film-strip-and-clapper-vector.jpg?s=612x612&w=0&k=20&c=JN4E5qJgcq3qm89rSc2BIJT6AZ80MvRJie__r3OENY8=" : item.Poster,
                }}
              />


              <View style={{flex: 1}}>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.title,
                    {paddingTop: 20, paddingRight: 20,fontSize:18},
                  ]}>
                  {item.Title}
                </Text>
                <View>
                <Text style={{paddingTop: 5, paddingRight: 20, textTransform: 'capitalize'}}>
                  {item.Year} | {item.Type}
                  </Text>
                </View>
                                <TouchableOpacity
                  onPress={()=>{
                    console.log("VIEW : ",item.imdbID);
                    navigation.navigate(
                      'Information',
                      {'id':item.imdbID}
                    )
                  }}
                  style={{
                    backgroundColor: '#363535',
                    width: '80%',
                    borderRadius: 10,
                    marginTop: 10,
                    alignSelf:'center',
                    justifyContent:'center',
                    alignItems:'center',
                    position:'absolute',
                    bottom:15,
                    right:23
                    // right:5,
                  }}> 
                  <View>
                    <Text
                      style={{
                        fontSize: 17,
                        //color: 'black',
                        color: '#d9d7d7',
                        // paddingHorizontal: 20
                        
                        paddingVertical: 5,
                      }}>
                      View More
                    </Text>
                  </View>
                </TouchableOpacity>
                </View>
              </View>
            </View>

        }/>}</View>
        }
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    backgroundColor:'#000000',
    flex: 1,
    verticalAlign: 'top',
  },
  title: {
    color: 'whitesmoke',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '',
  },
  pfpimage: {
    height: 40,
    width: 40,
    paddingTop: 10,
    borderRadius: 50,
  },
  nav: {
    paddingTop: 20,
    paddingLeft: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputRow: {
    flexDirection: 'row',
    alignContent: 'stretch',
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 30,
    paddingHorizontal: 8,
    backgroundColor: '#1D1D1D',
    borderRadius: 50,
  },
  searchInput: {
    fontSize: 20,
    // borderWidth: 1,
    // borderColor: 'white',
    
    paddingLeft: 20,
    flex: 1,
    marginRight: 5,
    color: 'white',
  },
  searchIcon: {
    paddingLeft: 15,
    paddingRight:15,
    backgroundColor: '#00000',
    fontSize: 20,
  },
  movieImage:{
    height: 140,
    margin: 10,
    width: 120,
    borderRadius: 10,
  }
});
export default Home;
