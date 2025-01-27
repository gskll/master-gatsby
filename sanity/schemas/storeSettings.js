import { MdStore as icon } from "react-icons/md";

export default {
  // computer name
  name: "storeSettings",
  // visible title
  title: "Settings",
  type: "document",
  icon,
  fields: [
    {
      name: "name",
      title: "Store Name",
      type: "string",
      description: "Name of the Store",
    },
    {
      name: "slicemaster",
      title: "Slicemasters currently Slicing",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
    },
    {
      name: "hotSlices",
      title: "Hot Slices available in the case",
      type: "array",
      of: [{ type: "reference", to: [{ type: "pizza" }] }],
    },
  ],
};
