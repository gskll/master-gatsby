import { useState } from "react";

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(event) {
    // check if its a number and convert
    let value = event.target.value;
    if (event.target.type == "number") {
      value = parseInt(value);
    }

    setValues({
      // copy existing values into items
      ...values,
      // update changed values
      [event.target.name]: event.target.value,
    });
  }

  return { values, updateValue };
}
