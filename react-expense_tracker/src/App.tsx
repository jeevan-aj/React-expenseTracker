import { useState } from "react";
import Table from "./components/Tables/Table.tsx";
import Filter from "./components/Filter.tsx";
import Form1 from "./components/Form1/Form1.tsx";
import "./categories.ts";

interface Form1DataProps {
  description: string;
  amount: number;
  category: string;
}

interface Props{
  id:number;
  description: string;
  amount: number;
  category: string;

}

function App() {
  const [data, setData] = useState<Props[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  function handleDelte(id: number) {
    const newdata = data.filter((cur) => {
      return cur.id != id;
    });
    setData(newdata);
  }

  const visibleExpenses = selectedCategory
    ? data.filter((cur) => cur.category === selectedCategory)
    : data;

  function handleSubmit(formData: Form1DataProps) {
    setData([...data, { ...formData, id: data.length + 1 }]);
  }

  return (
    <>
      <Form1 onSubmit={handleSubmit} />
      <Filter onFilter={(category) => setSelectedCategory(category)} />
      <Table expenses={visibleExpenses} onDelete={handleDelte} />
    </>
  );
}

export default App;
