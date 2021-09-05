import { Snackbar, useMediaQuery } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetPhotosQuery } from "./photoAPI";
import { PhotoFilters } from "./PhotoFilters";
import { PhotoList } from "./PhotoList";
import { PhotoPagination } from "./PhotoPagination";
import {
  selectFilters,
  selectPagination,
  selectPhotoList,
  updateAlbumsList,
  updatePhotoList,
} from "./photoSlice";

export function PhotoPage() {
  const dispatch = useAppDispatch();
  const tabletAndMax = useMediaQuery("(min-width:600px)");
  const { page, pageSize } = useAppSelector(selectPagination);
  const { title, album } = useAppSelector(selectFilters);
  const photoList = useAppSelector(selectPhotoList);
  const { data, isError } = useGetPhotosQuery();
  const [open, setOpen] = useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (isError) {
      setOpen(true);
    }
  }, [isError]);

  useEffect(() => {
    const albumsList = [...new Set((data || []).map((d) => d.albumId))];
    dispatch(updateAlbumsList(albumsList));
  }, [data, dispatch]);

  useEffect(() => {
    const filteredData = (data || []).filter(
      (photo) =>
        (!title || photo.title.includes(title)) &&
        (!album || photo.albumId === parseInt(album, 10))
    );
    const photos = filteredData.slice(
      tabletAndMax ? page * pageSize : 0,
      page * pageSize + pageSize
    );

    dispatch(updatePhotoList({ count: filteredData.length, photos }));
  }, [data, page, pageSize, title, album, tabletAndMax, dispatch]);

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          ERROR: API Failed to load data
        </Alert>
      </Snackbar>
      <PhotoFilters />
      <PhotoList photos={photoList} />
      <PhotoPagination />
    </div>
  );
}
