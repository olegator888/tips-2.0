import { Button, Input } from "@/shared/ui";
import { ChangeEvent, FormEvent, useState } from "react";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface Form {
  name: string;
  email: string;
}

export const BanquetsPage = () => {
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
  });

  const [error, setError] = useState<Form>({
    name: "",
    email: "",
  });

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof Form
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    // clear errors
    setError((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const error: Form = {
      name: "",
      email: "",
    };

    if (form.name.length < 3) {
      error.name = "Минимальная длина - 3 символа";
    }

    if (!emailRegex.test(form.email)) {
      error.email = "Невалидный формат почты";
    }

    setError(error);

    if (error.name || error.email) return false;
    return true;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    alert("form is submitted!");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <Input
            placeholder="name"
            value={form.name}
            onChange={(e) => onInputChange(e, "name")}
          />
          {!!error.name && <p>{error.name}</p>}
        </div>
        <div>
          <Input
            placeholder="emial"
            value={form.email}
            // type="email"s
            onChange={(e) => onInputChange(e, "email")}
          />
          {!!error.email && <p>{error.email}</p>}
        </div>
        <Button>submit</Button>
      </form>
    </div>
  );
};
