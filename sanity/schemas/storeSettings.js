import { MdStore as icon } from "react-icons/md";

export default {
  // computer name
  name: "Settings",
  // visible title
  title: "Settings",
  type: "document",
  icon,
  fields: [
    {
      name: "slicemaster",
      title: "Slicemasters currently Slicing",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    },
  ],
};
