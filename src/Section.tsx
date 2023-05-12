import './Section.scss';
import { JSX } from 'react';
import classNames from 'classnames';

export default function Section({
  title,
  className,
  children
}: {
  title: string;
  children: JSX.Element;
  className?: string;
}) {
  return (
    <div className={classNames('section', className)}>
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
