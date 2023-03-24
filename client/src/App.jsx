import { useState } from "react";
import {
  userValidateRequest,
  validateUserRequest,
} from "./api/backendConnection";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function App() {
  const [user, setUser] = useState({});
  const [dataform, setDataForm] = useState({
    name: "",
    password: "",
  });
  const [userExiste, setUserExiste] = useState(false);

  const validateUser = async (fields) => {
    const res = await validateUserRequest(fields);
    return res.data;
  };

  const getUser = async (data, token) => {
    const res = userValidateRequest(data, token);
    return res
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center px-3">
      {userExiste && user ? (
        <h1 className="text-info">Bienvenido {user.name} fuiste validado correctamente</h1>
      ) : (
        <main className="">
          <Formik
            initialValues={dataform}
            validationSchema={Yup.object({
              name: Yup.string()
                .trim()
                .lowercase()
                .required("Nombre requerido"),
              password: Yup.string().trim().required("Contraseña requerida"),
            })}
            onSubmit={async (values, actions) => {
              const res = await validateUser(values);
              document.cookie = `token=${res}; max-age=${
                60 * 2
              }; path=/; samesite=strict; secure=true`;              
              const token = document.cookie.replace("token=", "");
              const userChecked = await getUser(values, token);

              setUser(userChecked.data);
              actions.setSubmitting(true);
              setUserExiste(true);
            }}
            enableReinitialize
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form
                onSubmit={handleSubmit}
                className="form-control-sm p-5 rounded formularioLogin flex-column d-flex"
              >
                <h3 className="text-info text-break text-center mb-3 fw-bold">
                  Logearse
                </h3>

                <label
                  className="form-label text-light m-0 fw-bold"
                  htmlFor="n"
                >
                  Nombre
                </label>
                <Field
                  className="form-control fw-bold bg-secondary text-light border border-secondary mt-1 mb-3 mx-0"
                  placeholder="Nombre"
                  name="name"
                  id="n"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-danger"
                />

                <label
                  className="form-label text-light m-0 fw-bold"
                  htmlFor="c"
                >
                  Contraseña
                </label>
                <Field
                  className="form-control fw-bold bg-secondary border border-secondary text-light mt-1 mb-3 mx-0"
                  placeholder="Contraseña"
                  name="password"
                  id="c"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-danger"
                />

                <button
                  type="submit"
                  className="bg-dark text-info fw-bold mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Iniciando sesion..." : "Iniciar sesion"}
                </button>
              </Form>
            )}
          </Formik>
        </main>
      )}
    </div>
  );
}

export default App;
