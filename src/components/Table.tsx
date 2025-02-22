interface TableProps {
    data: Record<string, string | number>[];
  }
  
  const Table: React.FC<TableProps> = ({ data }) => {
    return (
      <table className="table">
        <thead>
          <tr>
            {Object.keys(data[0]).map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;
  