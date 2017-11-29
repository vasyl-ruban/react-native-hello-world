import React from 'react';
import { WebView, Linking, Dimensions } from 'react-native';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View, Tab, Tabs, TabHeading, Separator, Row, Title, Switch } from "native-base";
import Layout from '../Layout';

const isPortrait = (screen) => screen.height > screen.width;
const isLandscape = (screen) => screen.height < screen.width;

export default class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLandscape: isLandscape(Dimensions.get('screen'))
    };
    Dimensions.addEventListener('change', () => {
      this.setState((prev) => {
        prev.isLandscape = isLandscape(Dimensions.get('screen'))
      }, () => {this.forceUpdate()});
    });
  }
  render() {
    const { navigate } = this.props.navigation;
    const { feedId, articleId, feedSource } = this.props.navigation.state.params;
    const {width, height} = Dimensions.get('screen');

    const topBarHeight = 24;
    const buttonBarHeight = 48;
    const headerHeight = 56;

    const viewHeight = this.state.isLandscape
      ? height - topBarHeight - headerHeight
      : height - topBarHeight - buttonBarHeight - headerHeight;

    const uri = `http://188.226.147.71:3000/news/feed/${feedId}/${articleId}`;

    return (
      <Layout navigate={navigate}>
        <Header>
          <Left>
            <Button transparent onPress={() => {navigate('News')}}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Article</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => {Linking.openURL(feedSource)}}>
            <Icon name="open" />
            </Button>
          </Right>
        </Header>
        <Content>
            <WebView
              ref={(ref) => { this.webview = ref; }}
              source={{uri: uri}}
              style={{width: width, height: viewHeight}}
              onNavigationStateChange={(event) => {
                if (event.url !== uri) {
                  this.webview.stopLoading();
                  Linking.openURL(event.url);
                }
              }}
            />
        </Content>
      </Layout>
    );
  }
}
