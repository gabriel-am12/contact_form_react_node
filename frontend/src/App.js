import React from 'react';
import './App.css';

function App() {
  return (
   <div className="App">
     <section class="mb-4">
       <form>
        <div class="form-group">
          <label for="email-input">Email address:</label>
          <input
            id="email-input"
            class="form-control"
            type="email"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="telephone-input">Telephone:</label>
          <input
            id="telephone-input"
            class="form-control"
            type="number" 
            placeholder="Enter phone number" 
          /> 
        </div>
        <div class="form-group">
          <label for="message-input">Message:</label>
          <textarea
            id="message-input"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="file-input">File:</label>
          <input
            id="file-input"
            class="form-control"
            type="file"
          /> 
        </div>
       </form>
     </section>
   </div>
  );
}

export default App;
