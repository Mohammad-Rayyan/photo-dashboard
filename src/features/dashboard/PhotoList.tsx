import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import { IPhoto } from "../../types/photoAPI";
import { PhotoCard } from "./PhotoCard";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Button,
  FormControlLabel,
  MobileStepper,
  Modal,
  Paper,
  Switch,
  Typography,
} from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { ImageWithSkeleton } from "../../common/ImageWithSkeleton";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.grey[200],
    },
    photoList: {
      backgroundColor: theme.palette.grey[200],
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    slideShow: {
      maxWidth: 600,
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
    },
    settings: {
      display: "flex",
      flexDirection: "row-reverse",
      padding: 5,
    },
    header: {
      display: "flex",
      alignItems: "center",
      height: 50,
      paddingLeft: theme.spacing(4),
    },
  })
);

export function PhotoList({ photos }: { photos: IPhoto[] }) {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [indexForModel, setIndexForModel] = useState(0);
  const [compact, setCompact] = useState(false);

  const handleCompactChange = () => {
    setCompact(!compact);
  };

  const handleOpen = (index: number) => {
    setIndexForModel(index);
    setOpen(true);
  };

  const handleNext = () => {
    setIndexForModel(indexForModel + 1);
  };

  const handleBack = () => {
    setIndexForModel(indexForModel - 1);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <div className={classes.settings}>
        <FormControlLabel
          control={
            <Switch
              checked={compact}
              onChange={handleCompactChange}
              name="Compact"
              color="primary"
            />
          }
          label="Compact view"
        />
      </div>
      <div className={classes.photoList}>
        {photos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            currentIndex={index}
            handleOpen={handleOpen}
            compact={compact}
          />
        ))}
      </div>
      <Modal
        aria-labelledby="photo-large"
        aria-describedby="photo-large"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.slideShow}>
            <Paper square elevation={0} className={classes.header}>
              <Typography>{(photos[indexForModel] || {}).title}</Typography>
            </Paper>
            <ImageWithSkeleton
              width={600}
              height={600}
              src={(photos[indexForModel] || {}).url}
              alt={(photos[indexForModel] || {}).title}
            />
            <MobileStepper
              steps={photos.length}
              position="static"
              variant="text"
              activeStep={indexForModel}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={indexForModel === photos.length - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={indexForModel === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
