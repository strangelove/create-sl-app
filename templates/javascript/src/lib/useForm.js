import { useFormik } from "formik";

export default function useForm({ initValues, submitForm }) {
  const formik = useFormik({
    initialValues: initValues,
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  return formik;
}
