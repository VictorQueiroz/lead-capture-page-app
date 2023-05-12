import { Fragment, ReactNode } from 'react';

export default function Paragraphs({ children }: { children: ReactNode[][] }) {
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          {children.map((sentences, i) => (
            <p key={i}>
              {sentences.map((s, j, list) => (
                <Fragment key={j}>
                  {s}
                  {j !== list.length - 1 ? ' ' : null}
                </Fragment>
              ))}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
