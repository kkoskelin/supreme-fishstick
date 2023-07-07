import React, { useEffect } from 'react';
type DownloadProps = {
  filename: string;
  data: unknown;
};

export const DownloadJSONFile = (props: DownloadProps) => {
  const blob = new Blob([JSON.stringify(props.data)], {
    type: 'application/json',
  });
  const blobUrl = URL.createObjectURL(blob);
  useEffect(() => {
    return () => URL.revokeObjectURL(blobUrl);
  });

  return (
    <a
      href={blobUrl}
      title={`Download ${props.filename}`}
      download={props.filename}
    >
      Download {props.filename}
    </a>
  );
};
