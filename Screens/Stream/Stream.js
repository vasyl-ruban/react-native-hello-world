import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";
import { WebView, Dimensions } from 'react-native';
import Layout from '../Layout';

const isPortrait = (screen) => screen.height > screen.width;
const isLandscape = (screen) => screen.height < screen.width;

export default class Stream extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      streamLink: this.props.navigation.state.params.streamLink,
      chatLink: this.props.navigation.state.params.chatLink,
      isLandscape: isLandscape(Dimensions.get('screen'))
    };

    Dimensions.addEventListener('change', () => {
      this.setState((prev) => {
        prev.isLandscape = isLandscape(Dimensions.get('screen'))
      }, () => {this.forceUpdate()});
    });

  }

  render() {
    const {navigate} = this.props.navigation;
    let {width, height} = Dimensions.get('screen');
    return (
      <Layout navigate={navigate} isCollapsed={this.state.isLandscape}>
        <Header>
          <Left>
            <Icon name="arrow-back" style={{color: 'white'}} onPress={() => {this.props.navigation.goBack()}}/>
          </Left>
          <Body />
          <Right />
        </Header>
        <WebView
          source={{uri: this.state.streamLink}}
          allowfullscreen="false"
          style={{width: width, height: this.state.isLandscape ? height : height/3}}
          height={200}
        />
        <WebView
          source={{uri: this.state.chatLink}}
          style={{width: width, height: this.state.isLandscape ? 0 : height * 2/3 - 175}}
        />
      </Layout>
    );
  }
}

