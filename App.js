import {
  Container, Header, Footer, FooterTab, Button, Text, Content, List, ListItem, Thumbnail, Body, Spinner, Item,
  Input, Icon, Root, View
} from 'native-base';
import React from 'react';
import {DrawerNavigator, StackNavigator} from "react-navigation";

import SearchPlayer from "./Screens/Player/SearchPlayer";
import Player from "./Screens/Player/Player";
import Match from "./Screens/Player/Match"
import MatchList from "./Screens/Stream/MatchList";
import MatchOverview from "./Screens/Stream/MatchOverview";
import Stream from "./Screens/Stream/Stream";
import Feedback from "./Screens/Feedback/Feedback";
import Settings from "./Screens/Settings/Settings";
import About from "./Screens/About/About";
import News from "./Screens/News/News";
import Article from "./Screens/News/Article";
import Drawer from "./Components/Drawer";

const PlayerNavigator = StackNavigator({
  SearchPlayer: {screen: SearchPlayer},
  Player: {screen: Player},
  Match: {screen: Match}
}, {
  initialRouteName: "SearchPlayer",
  headerMode: "none"
});

const StreamNavigator = StackNavigator({
  MatchList: {screen: MatchList},
  MatchOverview: {screen: MatchOverview},
  Stream: {screen: Stream}
}, {
  initialRouteName: "MatchList",
  headerMode: "none"
});

const SettingsNavigator = StackNavigator({
  Settings: {screen: Settings}
}, {
  initialRouteName: "Settings",
  headerMode: "none"
});
const FeedbackNavigator = StackNavigator({
  Feedback: {screen: Feedback}
}, {
  initialRouteName: "Feedback",
  headerMode: "none"
});
const AboutNavigator = StackNavigator({
  About: {screen: About}
}, {
  initialRouteName: "About",
  headerMode: "none"
});
const NewsNavigator = StackNavigator({
  News: {screen: News},
  Article: {screen: Article},
}, {
  initialRouteName: "News",
  headerMode: "none"
});

const AppNavigator = DrawerNavigator({
  PlayerModule: {screen: PlayerNavigator},
  StreamModule: {screen: StreamNavigator},
  SettingsModule: {screen: SettingsNavigator},
  FeedbackModule: {screen: FeedbackNavigator},
  AboutModule: {screen: AboutNavigator},
  NewsModule: {screen: NewsNavigator},
}, {
  initialRouteName: "NewsModule",
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
    return this.state.fontsLoaded
      ?
      <Root>
        <View
          style={{
            height: 24,
            backgroundColor: "#512DA8",
          }}
        />
        <AppNavigator/>
      </Root>
      : null;
  }
}

