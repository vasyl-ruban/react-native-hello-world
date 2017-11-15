import React from 'react';
import {
  Body,
  Button, Container, Content, Footer, FooterTab, Header, Icon, Input, Item, List, ListItem, Right, Spinner,
  Text, Thumbnail
} from "native-base";

const HeroListView = (navigate) => (hero) => {
  return (
    <ListItem key={hero.id} style={{paddingLeft: 10, marginLeft: 0}} onPress={() => {navigate('Hero', {hero: hero})}}>
      <Thumbnail square size={80} source={{uri: "http://api.opendota.com" + hero.img}}/>
      <Body>
        <Text>{hero.localized_name}</Text>
        <Text note>{hero.roles.join(', ')}</Text>
      </Body>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  );
};

const isMatchHeroName = (searchText) => (hero) => {
  if (!searchText) return true;
  return hero.localized_name.toLowerCase().indexOf(searchText.toLowerCase()) === 0;
};

export default class Heroes extends React.Component {
  static navigationOptions = {
    title: 'Heroes'
  };

  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      heroes: []
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

  updateSearch(text) {
    this.setState(prev => {
      prev.searchText = text;
      return prev;
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const heroListView =
      this.state.heroes
        .filter(isMatchHeroName(this.state.searchText))
        .map(HeroListView(navigate));

    return (
      <Container>
        <Header />

        <Content>
          <Item>
            <Icon active name='search' />
            <Input placeholder='Search hero' onChangeText={this.updateSearch}/>
          </Item>

          <List>
            {
              this.state.heroes.length
              ? heroListView
              : <Spinner />
            }
          </List>
        </Content>

        <Footer>
          <FooterTab>
            <Button onPress={() => navigate('Home')}>
              <Text>Home</Text>
            </Button>
            <Button active onPress={() => navigate('Heroes')}>
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

