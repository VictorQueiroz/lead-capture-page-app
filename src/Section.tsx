import './Section.scss';

export default function Section({
  title,
  children
}: {
  title: string;
  children: JSX.Element;
}) {
  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="section-title">{title}</h4>
            <div className="section-horizontal-divider"></div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
