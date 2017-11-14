import {
  Container, Header, Footer, FooterTab, Button, Text, Content, List, ListItem, Thumbnail, Body, Spinner, Item,
  Input, Icon, Root
} from 'native-base';
import React from 'react';
import {StackNavigator} from "react-navigation";

import Home from './Screens/Home';
import Heroes from "./Screens/Heroes";
import Hero from "./Screens/Hero";
import Live from "./Screens/Live";

const AppNavigator = StackNavigator({
  Home: { screen: Home },
  Heroes: {screen: Heroes},
  Hero: {screen: Hero},
  Live: {screen: Live}
}, {
  initialRouteName: "Home",
  headerMode: "none",
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState(prevState => {
      prevState.fontsLoaded = true;
      return prevState;
    })
  }

  render() {
    return this.state.fontsLoaded ? <AppNavigator/> : null
  }
}

