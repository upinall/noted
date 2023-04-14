import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, Button } from 'react-native'; // import react-native tools


const NotesScreen = () => {
  const [notes, setNotes] = useState([]);
  const [noteIndex, setNoteIndex] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState(''); // These look the exact same... why?

  const handleSaveNote = () => {
    const summary = newNote.slice(0, 20); // Get the first 20 characters of the note as a summary
    const date = new Date().toLocaleString(); // Get the current date/time

    const newNoteObject = { 
      content: newNote,
      summary: summary,
      date: date,
    };

    if (noteIndex !== null) { // I legit have no idea what this does but something broke pertaining to this.
      const newNotes = [...notes];
      newNotes[noteIndex] = newNoteObject;
      setNotes(newNotes);
    } else {
      setNotes([...notes, newNoteObject]);
    }

    setModalVisible(false); // setVisible
    setNewNote(''); // whenever a new note is created set blank
    setNoteIndex(null); // set note index passing null (no clue?)
  };

  const handleDeleteNote = (index) => { // no idea why this exists since it's being unused but I suppose it's for deleting notes?
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  const renderItem = ({ item, index }) => ( // render note content when clicked for editing
    <TouchableOpacity onPress={() => {
      setNewNote(item.content);
      setNoteIndex(index);
      setModalVisible(true);
    }}>
      <View style={{ padding: 10, borderBottomWidth: 1 }}>
        <Text style={{ fontSize: 18 }}>{item.summary}</Text>
        <Text style={{ fontSize: 12, color: 'gray' }}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, paddingTop: 50, backgroundColor: '#fff'}}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <Modal 
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={{ flex: 1, paddingTop: 50}}>
          <TextInput
            placeholder="Enter note... (Tip: Get as specific as possible!)"
            multiline={true}
            numberOfLines={4} // I mean I suppose these are meant to be short
            onChangeText={(text) => setNewNote(text)}
            value={newNote}
            style={{ fontSize: 24, padding: 20 }}
          />
          <Button title="Save" onPress={handleSaveNote} />
          <Button
            title="Cancel"
            onPress={() => setModalVisible(false)}
            color="red"
          />
          </View>
      </Modal>

      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Text style={{ fontSize: 30, color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 50 }}>+</Text>
      </TouchableOpacity>
    </View>

    
    );
  };
export default NotesScreen;