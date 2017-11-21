import React from 'react';
import { Body, Button, Card, CardItem, Col, Container, Content, Footer, FooterTab, Grid, H1, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Spinner, Text, Thumbnail, View } from "native-base";

export default class Drawer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{marginTop: 50}}>
        <List>
          <ListItem button noBorder onPress={() => navigate('PlayerModule')}>
            <Left>
              <Icon name="ios-people" />
              <Body>
                <Text>Players</Text>
              </Body>
            </Left>
          </ListItem>

          <ListItem button noBorder onPress={() => navigate('StreamModule')}>
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
