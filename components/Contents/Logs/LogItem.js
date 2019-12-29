
const LogItem = ({ version, update_date, info }) => {
  return (
    <>
      <div>
        <h3>{version}</h3>
        <p>{update_date}</p>
        <p>{info}</p>
      </div>
    </>
  );
};

export default LogItem;
