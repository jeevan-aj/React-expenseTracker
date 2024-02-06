import categories from "../../categories";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  description: z
    .string({ required_error: "required" })
    .min(3, { message: "minimum 3 char required" })
    .max(50),
  amount: z
    .number({ invalid_type_error: "amount is required" })
    .min(0.01)
    .max(100_000),
  category: z.enum(categories, {
    errorMap: () => ({ message: "select a category" }),
  }),
});

type Form1Data = z.infer<typeof schema>;

interface Props {
  onSubmit: (item: Form1Data) => void;
}

function Form1({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form1Data>({ resolver: zodResolver(schema) });
  return (
    <>
      <form
        className="mb-3"
        onSubmit={handleSubmit((data) => {
          onSubmit(data), reset();
        })}
      >
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            type="text"
            id="description"
            className="form-control"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            type="number"
            id="amount"
            className="form-control"
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            category
          </label>
          <select
            {...register("category")}
            className="form-select mb-3"
            id="category"
          >
            <option value="">all category</option>
            {categories.map((cur) => (
              <option value={cur} key={cur}>
                {cur}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </>
  );
}

export default Form1;
