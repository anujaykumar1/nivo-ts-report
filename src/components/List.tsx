interface ListProps {
    items: string[];
  }
  
  const List: React.FC<ListProps> = ({ items }) => {
    return (
      <ul className="list">
        {items.map((item, index) => (
          <li key={index} className="list-item">
            {item}
          </li>
        ))}
      </ul>
    );
  };
  
  export default List;
  