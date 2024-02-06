interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

function Table({ expenses, onDelete }: Props) {
  if (expenses.length === 0) return null;
  return (
    <>
      <table className="table table-stripped table-bordered table-hover">
        <thead>
          <tr>
            <th>descriptoin</th>
            <th>amount</th>
            <th>category</th>
            <th>delete</th>
            
          </tr>
        </thead>
        <tbody>
          {expenses.map((cur) => (
            <tr key={cur.id}>
              <td>{cur.description}</td>
              <td>{cur.amount}</td>
              <td>{cur.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDelete(cur.id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>
              ${expenses.reduce((acc, cur) => cur.amount + acc, 0).toFixed(2)}
            </td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default Table;
