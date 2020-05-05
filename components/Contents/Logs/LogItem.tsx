export interface ILogItemProps {
  version: string;
  update_date: string;
  info: string;
}
const LogItem = ({ version, update_date, info }: ILogItemProps) => {
  return (
    <div>
      <h3>{version}</h3>
      <p>{update_date}</p>
      <p>{info}</p>
    </div>
  );
};

export default LogItem;
