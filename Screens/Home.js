import React from 'react';
import {Button, Container, Content, Footer, FooterTab, Header, Text} from "native-base";

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Header />

        <Content>
          <Text>Home screen</Text>

        </Content>
        <Footer>
          <FooterTab>
            <Button active onPress={() => navigate('Home')}>
              <Text>Home</Text>
            </Button>
            <Button onPress={() => navigate('Heroes')}>
              <Text>Heroes</Text>
            </Button>
            <Button onPress={() => navigate('Live')}>
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

