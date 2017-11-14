import { Container, Header, Footer, FooterTab, Button, Text, Content, List, ListItem, Thumbnail, Body, Spinner, Item, Input, Icon } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// async componentWillMount() {
//   await Expo.Font.loadAsync({
//     'Roboto': require('native-base/Fonts/Roboto.ttf'),
//     'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
//   });
// }

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      heroes: [],
      searchText: ''
    };

    fetch('https://api.opendota.com/api/heroStats')
      .then((response) => response.json())
      .then((response) => {
        this.setState((prevState) => {
          prevState.heroes = response;
          return prevState;
        })
      });
    this.updateSearch = this.updateSearch.bind(this);
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

  updateSearch(text) {
    this.setState(prev => {
      prev.searchText = text;
      return prev;
    });
  }
  render() {
    let heroView = (hero, index) => {
      return (
        <ListItem key={index}>
          <Thumbnail square size={80} source={{uri: "http://api.opendota.com" + hero.img}}/>
          <Body>
            <Text>{hero.localized_name}</Text>
            <Text note>{hero.roles.join(', ')}</Text>
          </Body>
        </ListItem>
      );
    };
    let isNameMatch = (hero) => {
      if (!this.state.searchText) {
        return true;
      } else {
        return hero.localized_name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1
      }
    };
    let heroViews = this.state.heroes.filter(isNameMatch).map(heroView);

    if (!this.state.fontsLoaded && !this.state.heroes.length) {
      return (
        <Container>
          <Header />
          <Content>
            <Spinner />
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <Header />

          <Item>
            <Icon active name='search' />
            <Input placeholder='Icon Textbox' onChangeText={this.updateSearch}/>
          </Item>

          <Content>
            <List>
              {heroViews}
            </List>
          </Content>

          <Footer>
            <FooterTab>
              <Button>
                <Text>Apps</Text>
              </Button>
              <Button>
                <Text>Camera</Text>
              </Button>
              <Button active>
                <Text>Navigate</Text>
              </Button>
              <Button>
                <Text>Contact</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
