import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import { object, string, number } from 'yup';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.testDb'); // returns Database object

export default class Database extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      name: null,
      lowerLimit: null,
      upperLimit: null,
      recLowerLimit: null,
      recUpperLimit: null,
      validationError: null,
    };

    // Check if the items table exists if not create it
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, LowerLimit INT, UpperLimit INT, RecLowerLimit INT, RecUpperLimit INT)'
      );
    });

    this.fetchData();
  }

  fetchData = () => {
    db.transaction((tx) => {
      // sending 4 arguments in executeSql
      tx.executeSql(
        'SELECT * FROM items',
        null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => {
          this.setState({ ...this.state, data: _array });
          console.log(_array);
        },
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log('Error ', error)
      ); // end executeSQL
    }); // end transaction
  };

  handleChangeName = (newData) => {
    this.setState({ name: newData });
  };
  handleChangeLowerLimit = (newData) => {
    this.setState({ lowerLimit: newData });
  };
  handleChangeUpperLimit = (newData) => {
    this.setState({ upperLimit: newData });
  };
  handleChangeRecLowerLimit = (newData) => {
    this.setState({ recLowerLimit: newData });
  };
  handleChangeRecUpperLimit = (newData) => {
    this.setState({ recUpperLimit: newData });
  };

  handleSubmit = async () => {
    await mySchema
      .validate(this.state)
      .then(() => {
        this.setState({ ...this.state, validationError: null });
        db.transaction((tx) => {
          tx.executeSql(
            'INSERT INTO items (Name, LowerLimit, UpperLimit, RecLowerLimit, RecUpperLimit) VALUES (?, ?, ?, ?, ?)',
            [
              this.state.name,
              this.state.lowerLimit,
              this.state.upperLimit,
              this.state.recLowerLimit,
              this.state.recUpperLimit,
            ],
            this.fetchData(),
            (txObj, err) => console.log('Error ', err)
          );
        });
      })
      .catch((err) => {
        this.setState({ ...this.state, validationError: err });
        console.log(err);
      });
  };

  handleClear = () => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM items');
    });
    this.setState({
      data: null,
      name: null,
      lowerLimit: null,
      upperLimit: null,
      recLowerLimit: null,
      recUpperLimit: null,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Plant Name"
          onChangeText={this.handleChangeName}
          // value={}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Temperature Lower Limit"
          onChangeText={this.handleChangeLowerLimit}
          // value={}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Temperature Upper Limit"
          onChangeText={this.handleChangeUpperLimit}
          // value={}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Temperature Recommended Lower Limit"
          onChangeText={this.handleChangeRecLowerLimit}
          // value={}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Temperature Recommended Upper Limit"
          onChangeText={this.handleChangeRecUpperLimit}
          // value={}
        />

        <Text>
          {this.state.validationError !== null
            ? this.state.validationError.message
            : ''}
        </Text>

        <Button
          type="solid"
          title="Submit"
          onPress={this.handleSubmit}
        ></Button>

        <Button
          type="solid"
          title="Clear data"
          onPress={this.handleClear}
        ></Button>
      </View>
    );
  }
}

const mySchema = object({
  name: string().required(),
  lowerLimit: number().required(),
  upperLimit: number().required(),
  recLowerLimit: number()
    .required()
    .when(
      'lowerLimit',
      (lowerLimit, recLowerLimit) => lowerLimit && recLowerLimit.min(lowerLimit)
    )
    .when(
      'recUpperLimit',
      (recUpperLimit, recLowerLimit) =>
        recUpperLimit && recLowerLimit.max(recUpperLimit)
    ),
  recUpperLimit: number()
    .required()
    .when(
      'upperLimit',
      (upperLimit, recUpperLimit) => upperLimit && recUpperLimit.max(upperLimit)
    ),
});

const styles = {
  container: {
    flex: 1,
  },
  textInput: {
    height: 40,
    margin: 5,
    padding: 2,
    borderWidth: 2,
    minWidth: 300,
  },
};
