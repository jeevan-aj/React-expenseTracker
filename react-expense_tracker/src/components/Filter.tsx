import categories from "../categories";

interface Props {
  onFilter: (item: string) => void;
}

function Filter({ onFilter }: Props) {
  return (
    <>
      <div className="mb-2 mt-5">
        <select
          name=""
          id="filter"
          className="form-select"
          onChange={(e) => onFilter(e.target.value)}
        >
          <option value="">all categories</option>
          {categories.map(cur => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Filter;
