import React from 'react';
import {
  Body,
  Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text, Thumbnail, View
} from "native-base";

export default class Layout extends React.Component {
  render() {
    const navigate = this.props.navigate;
    const activeTab = this.props.activeTab;
    return (
      <Container>
        <Header/>

        <Content>
          {this.props.children}
        </Content>

        <Footer>
          <FooterTab>
            <Button active={activeTab === "SearchPlayer"} onPress={() => navigate('SearchPlayer')}>
              <Text>Home</Text>
            </Button>
            <Button active={activeTab === "Heroes"} onPress={() => navigate('Heroes')}>
              <Text>Heroes</Text>
            </Button>
            <Button active={activeTab === "Live"} onPress={() => navigate('Live')}>
              <Text>Live</Text>
            </Button>
            <Button active={activeTab === "Teams"}>
              <Text>Teams</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
