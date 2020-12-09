import React, { Component } from 'react'
import Mapview from 'react-native-maps'
import { View } from 'react-native'
import Geolocation from '@react-native-community/geolocation';

import Search from '../Search'

export default class Map extends Component {
  state = {
    region: null
  }

  async componentDidMount() {
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({ 
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          } 
        })
      },
      (err) => {
        console.log(err)
      },
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    )
  }

  render() {
    const { region } = this.state
    return(
      <View style={{ flex: 1 }}>
        <Mapview 
          style={{ flex: 1 }}
          region={region}
          showsUserLocation
          loadingEnabled
        />
        <Search />
      </View>
    )
  }
}