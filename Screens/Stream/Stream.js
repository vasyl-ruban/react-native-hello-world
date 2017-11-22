import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Title } from "native-base";
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
    let headerStyle = this.state.isLandscape ? {height: 0} : {};

    let topBarHeight = 24;
    let buttonBarHeight = 48;
    let headerHeight = 56;

    let streamStyle = {
      height: this.state.isLandscape ? height - topBarHeight : height/3,
      width: this.state.isLandscape ? width - buttonBarHeight : width
    };
    let chatStyle = {
      height: this.state.isLandscape ? 0 : (height * 2/3) - topBarHeight - buttonBarHeight - headerHeight,
      width: width
    };
    return (
      <Layout navigate={navigate} isCollapsed={this.state.isLandscape}>
        <Header style={headerStyle}>
          <Left>
            <Button transparent onPress={() => {this.props.navigation.goBack()}}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Stream</Title>
          </Body>
          <Right />
        </Header>

        <WebView
          source={{uri: this.state.streamLink}}
          allowfullscreen="false"
          style={streamStyle}
          height={200}
        />
        <WebView
          source={{uri: this.state.chatLink}}
          style={chatStyle}
        />
      </Layout>
    );
  }
}

