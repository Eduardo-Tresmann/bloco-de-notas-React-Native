import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [notes, setNotes] = useState<string[]>([]);
  const [currentNote, setCurrentNote] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("@notes");
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error("Erro ao carregar notas:", error);
    }
  };

  const saveNotes = async (notesToSave: string[]) => {
    try {
      await AsyncStorage.setItem("@notes", JSON.stringify(notesToSave));
    } catch (error) {
      console.error("Erro ao salvar notas:", error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const addNote = () => {
    if (currentNote.trim() === "") return;
    let updatedNotes;
    if (editingIndex !== null) {
      updatedNotes = [...notes];
      updatedNotes[editingIndex] = currentNote;
      setEditingIndex(null);
    } else {
      updatedNotes = [...notes, currentNote];
    }
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setCurrentNote("");
  };

  const editNote = (index: number) => {
    setCurrentNote(notes[index]);
    setEditingIndex(index);
  };

  const deleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bloco de Notas</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua nota aqui..."
        placeholderTextColor="#aaa"
        value={currentNote}
        onChangeText={setCurrentNote}
      />
      <TouchableOpacity style={styles.button} onPress={addNote}>
        <Text style={styles.buttonText}>
          {editingIndex !== null ? "Editar Nota" : "Adicionar Nota"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.noteItem}>
            <Text style={styles.noteText}>{item}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => editNote(index)}>
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteNote(index)}>
                <Text style={styles.deleteText}>Apagar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#111",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  noteItem: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  noteText: {
    color: "#fff",
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editText: {
    color: "#FFD700",
    fontSize: 14,
  },
  deleteText: {
    color: "#FF4500",
    fontSize: 14,
  },
});