// Form.tsx
import React from 'react';

const Form: React.FC = () => {
  return (
    <div>
      <h2>Login Form</h2>
      {/* Add your form elements here */}
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
