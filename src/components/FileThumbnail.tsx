import { FC } from 'react';

type Props = {
  type: 'image' | 'video',
  url: string;
  originalName: string;
}
const FileThumbnail: FC<Props> = ({ type, url, originalName }) => {
  const isImage = type === 'image';
  const isVideo = type === 'video';

  return (
    <div className="file-thumbnail">
      {isImage && (
        // Render image thumbnail
        <img src={url} alt={originalName} className="size-10" />
      )}
      {isVideo && (
        // Render video thumbnail with custom poster or the first frame
        <video
          className="size-10"
          src={url}
          controls
          width="200"
          height="auto"
        >
          Your browser does not support the video tag.
        </video>
      )}
      <p>{originalName}</p>
    </div>
  );
};

export default FileThumbnail;
