import { useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { createStyles, makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    skeleton: {
      backgroundColor: theme.palette.grey[200],
    },
    img: {
      overflow: "hidden",
      display: "block",
      maxWidth: "100%",
    },
  })
);

export function ImageWithSkeleton({
  alt,
  src,
  width,
  height,
}: {
  alt: string;
  src: string;
  width: number;
  height: number;
}) {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);

  const handleImageLoaded = () => {
    setLoaded(true);
  };

  return (
    <>
      {!loaded && (
        <Skeleton
          className={classes.skeleton}
          animation="wave"
          variant="rect"
          height={height}
          width={width}
        />
      )}
      <img
        className={classes.img}
        src={src}
        alt={alt}
        onLoad={handleImageLoaded}
      />
    </>
  );
}
