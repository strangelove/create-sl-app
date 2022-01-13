import { useFormik } from "formik";

interface FormProps<T> {
  initValues: T;
  submitForm: (values: T) => void;
}

export default function useForm<T>({ initValues, submitForm }: FormProps<T>) {
  const formik = useFormik<T>({
    initialValues: initValues,
    onSubmit: (values: T) => {
      submitForm(values);
    },
  });

  return formik;
}
