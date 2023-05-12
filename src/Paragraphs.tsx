import { Fragment, JSX } from 'react';

export default function Paragraphs({
  children
}: {
  children: (JSX.Element | string[])[];
}) {
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          {children.map((sentences, i) =>
            Array.isArray(sentences) ? (
              <p key={i}>
                {sentences.map((s, j, list) => (
                  <Fragment key={j}>
                    {s}
                    {j !== list.length - 1 ? ' ' : null}
                  </Fragment>
                ))}
              </p>
            ) : (
              sentences
            )
          )}
        </div>
      </div>
    </>
  );
}
