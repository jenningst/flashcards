import React, { useState } from 'react';

const InputTest = () => {
  const [name, setName] = useState('');
  const handleNameChange = e => setName(e.target.value);

  return (
    <div>
      <h1>{name}</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          className="name-input"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
        <button
          type="submit"
          disabled={name !== '' ? false : true}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputTest;