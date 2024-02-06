import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const Schema = z.object({
  name: z.string().min(3, { message: "minimum three character reqired" }),
  age: z.number({ invalid_type_error: "age feild required" }).min(2),
  category: z.string().min(1),
});

type User = z.infer<typeof Schema>;

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User>({ resolver: zodResolver(Schema) });

  const [person, setPerson] = useState<User[]>([]);

  const onSubmit = (data: FieldValues) => {
    setPerson(
      [...person,{name:data.name,age:data.age,category:data.category}]
    );
  };

  console.log(person)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            className="form-control"
            id="name"
          />
          {errors.name && <p className="text-danger">{errors.name.message} </p>}
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            age
          </label>
          <input
            {...register("age", { valueAsNumber: true })}
            type="number"
            className="form-control"
            id="age"
          />
          {errors.age && <p className="text-danger">{errors.age.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label"></label>
          <select
            id="category"
            className="form-select"
            {...register("category")}
          >
            <option value="">all categories</option>
            <option value="milk">milk</option>
            <option value="utilities">utilities</option>
            <option value="entertainment">entertainment</option>
          </select>
        </div>
        <button disabled={!isValid} className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default Form;
