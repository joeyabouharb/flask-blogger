import { useState } from 'react';

export const [formContent, onContentChange] = useState({});

export const setInputs = (event) => onContentChange({
  ...formContent,
  [event.target.name]: event.target.value,
});
