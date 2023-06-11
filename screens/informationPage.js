import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {back} from 'react-native/Libraries/Animated/Easing';
import Icon from 'react-native-vector-icons/FontAwesome';

const Information = ({route}) => {
  let [data, setData] = useState({});
  let [isFetching, setFetching] = useState(false);
  let [genre, setGenre] = useState([]);
  let [responseError, setResponseError] = useState(false);
  console.log(route.params);
  const id = route.params.id;
  async function fetchData() {
    if (id.lenght === 0) {
      console.log('SOMETHING WENT WRONG NO ID');
    } else {
      try {
        setFetching(true);
        const response = await fetch(
          'https://www.omdbapi.com/?apikey=your_api_key&i=' + id,
        );
        const json = await response.json();
        if (json.Response == 'True') {
          console.log(json);
          // console.log((json.Genre).split(","))
          setGenre(json.Genre.split(','));
          setData(json);
        } else {
          console.log('RESPONSE FALSE');
          setResponseError(true);
        }
      } catch (error) {
        console.log('Something went wrong : Catch Error : ', error);
        setResponseError(true);
      } finally {
        setFetching(false);
      }
    }
  }
  //     console.log("STR : ",str);
  //     return str.charAt(0).toUpperCase() + str.slice(1);
  //     };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={stylesInfo.background}>
      {isFetching ? (
        <View style={stylesInfo.activityIndicatorContainer}>
          <ActivityIndicator size={40} color={'white'} />
        </View>
      ) : (
        <ScrollView>
          {responseError ? (
            <View style={stylesInfo.errorContainer}>
              <Text style={stylesInfo.errorText}>Something Went Wrong</Text>
            </View>
          ) : (
            <View>
              <View
                style={{flexDirection: 'row', margin: 30, marginBottom: 20}}>
                <View>
                  <Image
                    source={{
                      uri:
                        data.Poster === 'N/A'
                          ? 'https://media.istockphoto.com/id/1244034031/vector/cinema-poster-with-cola-film-strip-and-clapper-vector.jpg?s=612x612&w=0&k=20&c=JN4E5qJgcq3qm89rSc2BIJT6AZ80MvRJie__r3OENY8='
                          : data.Poster,
                    }}
                    style={stylesInfo.moviePoster}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                    marginLeft: 35,
                    marginTop: 20,
                  }}>
                  <View style={stylesInfo.infoContainer}>
                    <Icon name="video-camera" color="white" size={20} />
                    <Text style={{fontSize: 10}}>Type {data.Response}</Text>
                    <Text
                      style={{
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                        fontSize: 12,
                        color: 'yellow',
                      }}>
                      {data.Type}
                    </Text>
                  </View>

                  <View style={stylesInfo.infoContainer}>
                    <Icon name="clock-o" color="white" size={20} />
                    <Text style={{fontSize: 10}}>Duration</Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 12,
                        color: 'yellow',
                      }}>
                      {data.Runtime}
                    </Text>
                  </View>
                  <View style={stylesInfo.infoContainer}>
                    <Icon name="star" color="white" size={20} />
                    <Text style={{fontSize: 10, color: 'grey'}}>Rating</Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 12,
                        color: 'yellow',
                      }}>
                      {data.imdbRating}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{marginHorizontal: 30, marginBottom: 30}}>
                <Text style={stylesInfo.title}>{data.Title}</Text>
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                  {genre.map(item => {
                    console.log(item);
                    return (
                      <View key={item} style={stylesInfo.genreCard}>
                        <Text style={stylesInfo.genreText}>{item}</Text>
                      </View>
                    );
                  })}
                </View>
                <Text
                  style={stylesInfo.infoTitle}>
                  Plot
                </Text>
                <Text style={stylesInfo.infoContent}>
                  {data.Plot}
                </Text>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View style={{marginHorizontal: 15}}>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontsize: 13,
                        color: 'white',
                        fontWeight: 'bold',
                        paddingTop: 10,
                      }}>
                      Language
                    </Text>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#bfbdbd',
                          paddingTop: 10,
                          paddingRight: 20,
                          marginRight: 20,
                        }}>
                        {data.Language}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontsize: 13,
                        color: 'white',
                        fontWeight: 'bold',
                        paddingTop: 10,
                      }}>
                      Released
                    </Text>
                    <Text
                      style={{fontSize: 16, color: '#bfbdbd', paddingTop: 10}}>
                      {data.Released}
                    </Text>
                  </View>
                </View> */}
                <View style={{flexDirection:'row',justifyContent:'space-evenly',alignSelf:'flex-start'}}>
                    <View style={{marginRight:30,marginLeft:25}}>
                        <Text style={[stylesInfo.infoTitle]}>
                        Language
                        </Text>
                        <Text numberOfLines={2}>
                            {data.Language}
                        </Text>
                    </View>
                    <View style={{marginRight:9,width:'40%'}}>
                        <Text style={stylesInfo.infoTitle}>
                        Released
                        </Text>
                        <Text>
                            {data.Released}
                        </Text>
                    </View>
                </View>
                <Text
                  style={stylesInfo.infoTitle}>
                  Actors
                </Text>
                <Text style={stylesInfo.infoContent}>
                  {data.Actors}
                </Text>

                <Text
                  style={stylesInfo.infoTitle}>
                  Director
                </Text>
                <Text style={stylesInfo.infoContent}>
                  {data.Director}
                </Text>
                {data.Awards != 'N/A' ? (
                  <View>
                    <Text
                      style={stylesInfo.infoTitle}>
                      Awards
                    </Text>
                    <Text style={stylesInfo.infoContent}>
                      {data.Awards}.
                    </Text>
                  </View>
                ) : null}
                {data.BoxOffice != 'N/A' ? (
                  <View>
                    <Text
                      style={stylesInfo.infoTitle}>
                      Box Office
                    </Text>
                    <Text
                      style={stylesInfo.infoContent}>
                        {data.BoxOffice}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};
const stylesInfo = StyleSheet.create({
  background: {
    backgroundColor: '#000000',
    flex: 1,
    verticalAlign: 'top',
  },
  moviePoster: {
    width: 200,
    height: 300,
    borderRadius: 20,
  },
  activityIndicatorContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {},
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250,
  },
  errorText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoContainer: {
    height: 70,
    width: 70,
    alignItems: 'center',
    verticalAlign: 'center',
    borderRadius: 20,
    backgroundColor: '#1D1D1D',
    justifyContent: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'white',
    textShadowRadius: 5,
    paddingBottom: 15,
  },
  genreCard: {
    backgroundColor: '#1D1D1D',
     marginRight: 10,
      borderRadius: 15
  },
  genreText: {fontSize: 15,
     padding: 8,
     paddingHorizontal: 10,
     color: 'white'
    },
    infoTitle:{
        fontsize: 13,
        color: 'white',
        fontWeight: 'bold',
        paddingTop: 10,
      },
    infoContent:{fontSize: 16, color: '#bfbdbd', paddingTop: 10}

});
export default Information;
