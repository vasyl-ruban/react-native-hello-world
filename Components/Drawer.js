import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";

export default class Drawer extends React.Component {
  constructor(props) {
    super(props);

    const { navigate } = this.props.navigation;

    this.state = {
      selectedModule: 'PlayerModule',
      navigate: navigate
    };

    this.setModule = this.setModule.bind(this);
  }

  setModule(module) {
    this.state.navigate(module);
    this.setState((prev) => {
      prev.selectedModule = module;
      return prev;
    });
  }

  render() {
    return (
      <View style={{marginTop: 50}}>
        <List>
          <ListItem itemDivider={this.state.selectedModule === 'PlayerModule'} button noBorder onPress={() => this.setModule('PlayerModule')}>
            <Left>
              <Icon name="ios-people" />
              <Body>
                <Text>Players</Text>
              </Body>
            </Left>
          </ListItem>

          <ListItem itemDivider={this.state.selectedModule === 'StreamModule'} button noBorder onPress={() => this.setModule('StreamModule')}>
            <Left>
              <Icon name="easel" />
              <Body>
                <Text>Live streams</Text>
              </Body>
            </Left>
          </ListItem>
        </List>
      </View>
    );
  }
}
