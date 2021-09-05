import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeFilters, selectAlbumList, selectFilters } from "./photoSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 10,
      Height: 60,
      display: "flex",
    },
    filter: {
      margin: 5,
      minWidth: 90,
    },
  })
);

export function PhotoFilters() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const albumList = useAppSelector(selectAlbumList);
  const filters = useAppSelector(selectFilters);

  const onChangeFilter = (value: string, name: string) => {
    const newFilters = {
      ...filters,
      [name]: value,
    };
    dispatch(changeFilters(newFilters));
  };
  return (
    <div className={classes.root}>
      <FormControl className={classes.filter}>
        <TextField
          label="Title"
          value={filters.title}
          onChange={(e) => onChangeFilter(e.target.value, "title")}
        />
      </FormControl>
      <FormControl className={classes.filter}>
        <InputLabel>Album</InputLabel>
        <Select
          native
          value={filters.album}
          onChange={(e) => onChangeFilter(e.target.value as string, "album")}
        >
          <option aria-label="None" value="" />
          {albumList.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
