import React, { useState, useEffect } from "react";
import "./App.css"

function Project() {
  const [showForm, setShowForm] = useState(false);
  const [selectedScript, setSelectedScript] = useState("");
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://mocki.io/v1/e1706842-8c58-4641-9671-2573e96c3682")
      .then((res) => res.json())
      .then((data) => setData(data.result))
      .catch(error => console.error('Error fetching data:', error));
  }, []);



  const handleScript = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedScriptData = data.find(item => item.script === selectedScript);
    if (selectedScriptData) {
      setTableData([...tableData, selectedScriptData]);
    }
    setShowForm(false);
  };

  const handleSelectChange = (e) => {
    setSelectedScript(e.target.value);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  };

  return (
    <>
      <button onClick={handleScript} style={{ fontSize: '30px', backgroundColor: 'white', color: 'black' }}>+</button>

      {showForm && (
        <div className="popup">
          <form onSubmit={handleSubmit}>
            <select onChange={handleSelectChange} value={selectedScript}>
              {data.map((item) => (
                <option key={item.script} value={item.script}>{item.script}</option>
              ))}
            </select>
            <button type="submit">Save</button>
          </form>
          <button onClick={handleScript}>Close</button>
        </div>
      )}

      {tableData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Strike Price</th>
              <th>CE PE</th>
              <th>Expiry Date</th>
              <th>Exchange</th>

            </tr>
          </thead>
          <tbody>
            {tableData.map((script, index) => (
              <tr key={index}>
                <td onClick={() => speakText("The company name is" + script.companyName)}>{script.companyName}</td>
                <td onClick={() => speakText("The strike price is rupees" + script.strikePrice)}>{script.strikePrice}</td>
                <td onClick={() => speakText(script.cepe)}>{script.cepe}</td>
                <td onClick={() => speakText("the expiry date is" + script.expiry)}>{script.expiry}</td>
                <td onClick={() => speakText("the exchange here is" + script.exchange)}>{script.exchange}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Project;