import { createForm } from "effector-forms";
import { createGate } from "effector-react";
import { createDomain, forward, sample } from "effector";
import { toast } from "react-toastify";
import { authService } from "services/auth-service";

const loginDomain = createDomain("auth domain");

const gate = createGate({ domain: loginDomain });

const form = createForm({
  domain: loginDomain,
  fields: {
    login: {
      init: "",
      rules: [
        {
          name: "login not empty",
          validator: (value: string) => value.trim() !== "",
          errorText: "The field must not be empty",
        },
      ],
    },
    password: {
      init: "",
      rules: [
        {
          name: "password not empty",
          validator: (value: string) => value.trim() !== "",
          errorText: "The field must not be empty",
        },
      ],
    },
  },
  validateOn: ["submit"],
});

forward({ from: gate.close, to: form.reset });

sample({
  source: form.$values,
  clock: form.formValidated,
  target: authService.authFx,
});

authService.authFx.failData.watch((data) => {
  if (data.response?.status === 404) {
    toast.error("Incorrect data");
    form.resetValues();
  }
});

export const loginService = {
  loginForm: form,
  loginGate: gate,
};
