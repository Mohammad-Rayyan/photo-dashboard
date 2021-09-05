import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@material-ui/core";
import { IPhoto } from "../../types/photoAPI";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      width: 300,
      height: 150,
      margin: 10,
    },
    listItem: {
      width: 150,
      listStyle: "none",
      margin: 10,
    },
    media: {
      width: 150,
      height: 150,
    },
    content: {
      height: 150,
      width: 150,
      overflow: "hidden",
    },
    paper: {
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
    },
  })
);

export function PhotoCard({
  photo,
  handleOpen,
  currentIndex,
  compact,
}: {
  photo: IPhoto;
  handleOpen: (index: number) => void;
  currentIndex: number;
  compact: boolean;
}) {
  const classes = useStyles();

  return (
    <>
      {compact ? (
        <ImageListItem
          key={photo.title}
          className={classes.listItem}
          onClick={() => handleOpen(currentIndex)}
        >
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <ImageListItemBar title={photo.title} classes={{}} />
        </ImageListItem>
      ) : (
        <Card className={classes.root} onClick={() => handleOpen(currentIndex)}>
          <CardMedia className={classes.media} image={photo.thumbnailUrl} />
          <CardContent className={classes.content}>
            <Typography gutterBottom>{photo.title}</Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}
