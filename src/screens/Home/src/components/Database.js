import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import { object, string, number, setLocale } from 'yup';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.plantDb'); // returns Database object

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

    // Check if the plants table exists if not create it
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS plants (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, LowerLimit INT, UpperLimit INT, RecLowerLimit INT, RecUpperLimit INT)'
      );
    });

    this.fetchData();
  }

  /**
   * Fetches data from database and stores it in state.
   */
  fetchData = () => {
    db.transaction((tx) => {
      // sending 4 arguments in executeSql
      tx.executeSql(
        'SELECT * FROM plants',
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

  /**
   * Validates form input using rules in mySchema. Inserts into plants table if successful. Otherwise, sets this.state.validationError.
   */
  handleSubmit = async () => {
    await mySchema
      .validate(this.state)
      .then(() => {
        this.setState({ ...this.state, validationError: null });
        db.transaction((tx) => {
          tx.executeSql(
            'INSERT INTO plants (Name, LowerLimit, UpperLimit, RecLowerLimit, RecUpperLimit) VALUES (?, ?, ?, ?, ?)',
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
      tx.executeSql('DELETE FROM plants');
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
        <Text>Plant Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Plant Name"
          onChangeText={(newData) => this.setState({ name: newData })}
        />
        <Text>Temperature Lower Limit</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Temperature Lower Limit"
          onChangeText={(newData) => this.setState({ lowerLimit: newData })}
        />
        <Text>Temperature Upper Limit</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Temperature Upper Limit"
          onChangeText={(newData) => this.setState({ upperLimit: newData })}
        />
        <Text>Temperature Recommended Lower Limit</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Temperature Recommended Lower Limit"
          onChangeText={(newData) => this.setState({ recLowerLimit: newData })}
        />
        <Text>Temperature Recommended Upper Limit</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Temperature Recommended Upper Limit"
          onChangeText={(newData) => this.setState({ recUpperLimit: newData })}
        />

        <Text style={styles.errorText}>
          {this.state.validationError !== null
            ? this.state.validationError.message
            : ''}
        </Text>

        <Button
          type="solid"
          title="Add new plant"
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

// Set shared error messages
setLocale({
  mixed: {
    required: 'All fields are required',
  },
});

// Validation schema for Yup
const mySchema = object({
  name: string().required(),
  lowerLimit: number().required().typeError('Lower limit must be a number'),
  upperLimit: number().required().typeError('Upper limit must be a number'),
  recLowerLimit: number()
    .required()
    .when(
      'lowerLimit',
      (lowerLimit, recLowerLimit) =>
        lowerLimit &&
        recLowerLimit.min(
          lowerLimit,
          'Recommended lower limit must be greater than lower limit'
        )
    )
    .when(
      'recUpperLimit',
      (recUpperLimit, recLowerLimit) =>
        recUpperLimit &&
        recLowerLimit.max(
          recUpperLimit,
          'Recommended lower limit must be less than recommended upper limit'
        )
    )
    .typeError('Recommended lower limit must be a number'),
  recUpperLimit: number()
    .required()
    .when(
      'upperLimit',
      (upperLimit, recUpperLimit) =>
        upperLimit &&
        recUpperLimit.max(
          upperLimit,
          'Recommended upper limit must be less than upper limit'
        )
    )
    .typeError('Recommended upper limit must be a number'),
});

const styles = {
  container: {
    flex: 1,
    marginTop: 20,
  },
  textInput: {
    height: 40,
    margin: 5,
    padding: 2,
    borderWidth: 2,
    minWidth: 300,
  },
  errorText: {
    color: 'red',
    maxWidth: 300,
  },
};
