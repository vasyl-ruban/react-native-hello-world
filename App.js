import {
  Container, Header, Footer, FooterTab, Button, Text, Content, List, ListItem, Thumbnail, Body, Spinner, Item,
  Input, Icon, Root
} from 'native-base';
import React from 'react';
import {DrawerNavigator, StackNavigator} from "react-navigation";

import Heroes from "./Screens/Heroes";
import Hero from "./Screens/Hero";
import Live from "./Screens/Live";
import SearchPlayer from "./Screens/SearchPlayer";
import Player from "./Screens/Player";
import MatchList from "./Screens/Stream/MatchList";
import MatchOverview from "./Screens/Stream/MatchOverview";
import Stream from "./Screens/Stream/Stream";
import Drawer from "./Components/Drawer";

const playerNavigator = StackNavigator({
  SearchPlayer: {screen: SearchPlayer},
  Player: {screen: Player},
}, {
  initialRouteName: "SearchPlayer",
  headerMode: "none"
});

const AppNavigator = DrawerNavigator({
  Heroes: {screen: Heroes},
  Hero: {screen: Hero},
  Live: {screen: Live},
  Player: {screen: playerNavigator},
  MatchList: {screen: MatchList},
  MatchOverview: {screen: MatchOverview},
  Stream: {screen: Stream}
}, {
  initialRouteName: "Player",
  contentComponent: Drawer,
  backBehavior: "none"
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
    return this.state.fontsLoaded ? <AppNavigator/> : null;
  }
}

