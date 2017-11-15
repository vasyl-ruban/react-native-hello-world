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

export default class SearchPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  searchPlayer() {

  }

  render () {
    return (
      <Container>
        <Header>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search player" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent onPress={this.searchPlayer}>
            <Text>Search</Text>
          </Button>
        </Header>

        <Content>
        </Content>

        <Footer>
          <FooterTab>
            <Button onPress={() => navigate('Home')}>
              <Text>Home</Text>
            </Button>
            <Button onPress={() => navigate('Heroes')}>
              <Text>Heroes</Text>
            </Button>
            <Button active onPress={() => navigate('Live')}>
              <Text>Live</Text>
            </Button>
            <Button>
              <Text>Teams</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}