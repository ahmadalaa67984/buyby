import * as Yup from "yup";

export const notificationSchema = () => {
  return Yup.object().shape({
    title: Yup.string().required("Mandatory field").default(""),
    body: Yup.string().required("Mandatory field").default(""),
    imageUrl: Yup.string().required("Mandatory field").default(""),
  });
};

export const notificationSturcture = [
  {
    title: "title",
    label: "Title",
    type: "text",
    kind: "input",
    placeholder: "Title",
  },
  {
    title: "body",
    label: "Body",
    type: "text",
    kind: "input",
    placeholder: "Body",
  },
  {
    title: "imageUrl",
    label: "Image URL",
    type: "text",
    kind: "input",
    placeholder: "Image URL",
  },
];
