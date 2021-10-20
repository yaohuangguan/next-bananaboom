export interface IEnglishProjectProps {
  title: string;
  subtitle: string;
  intro: string;
  projects: [];
}
const EnglishIntro = ({
  title,
  subtitle,
  intro,
}: IEnglishProjectProps) => {
  return (
    <>
      <div className="row" id="content">
        <div className="col-md-12">
          <div className="intro-myself text-center py-3 px-3">
            <h3 className="linkTag">{title}</h3>
            <p>{subtitle}</p>

            <p style={{ lineHeight: "35px", fontSize: "17px" }}>{intro}</p>
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default EnglishIntro;
