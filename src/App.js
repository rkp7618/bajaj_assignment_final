import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const options = [
  { value: "numbers", label: "Numbers" },
  { value: "alphabets", label: "Alphabets" },
  { value: "highestAlphabet", label: "Highest Alphabet" },
];

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await axios.post(
        "http://your-backend-endpoint/bfhl",
        parsedJson
      );
      setResponse(res.data);
    } catch (error) {
      setError("Invalid JSON or request failed");
    }
  };

  const handleSelectChange = (selected) => setSelectedOptions(selected);

  const isVisible = (section) =>
    selectedOptions.some((opt) => opt.value === section);

  return (
    <Container>
      <Typography variant="h3">Your Roll Number</Typography>
      <TextField
        label="JSON Input"
        multiline
        rows={4}
        value={jsonInput}
        onChange={handleJsonChange}
        fullWidth
        error={!!error}
        helperText={error}
        variant="outlined"
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      {response && (
        <>
          <Box mt={2}>
            <Select
              options={options}
              isMulti
              onChange={handleSelectChange}
              placeholder="Multi Filter"
            />
          </Box>
          <Box mt={2}>
            {isVisible("numbers") && response.numbers && (
              <div>
                <Typography variant="h6">Numbers</Typography>
                <pre>{response.numbers.join(", ")}</pre>
              </div>
            )}
            {isVisible("alphabets") && response.alphabets && (
              <div>
                <Typography variant="h6">Alphabets</Typography>
                <pre>{response.alphabets.join(", ")}</pre>
              </div>
            )}
            {isVisible("highestAlphabet") && response.highest_alphabet && (
              <div>
                <Typography variant="h6">Highest Alphabet</Typography>
                <pre>{response.highest_alphabet.join(", ")}</pre>
              </div>
            )}
          </Box>
        </>
      )}
    </Container>
  );
}

export default App;
