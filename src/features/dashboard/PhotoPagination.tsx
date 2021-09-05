import { useMediaQuery } from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import { MutableRefObject, useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PAGINATION } from "../../constants/photoDashboard";
import {
  changePage,
  changePageSize,
  selectPagination,
  selectPhotoList,
} from "./photoSlice";

export function PhotoPagination() {
  const { count, page, pageSize } = useAppSelector(selectPagination);
  const dispatch = useAppDispatch();
  const notAPhone = useMediaQuery("(min-width:600px)");
  const photoList = useAppSelector(selectPhotoList);

  const observer: MutableRefObject<IntersectionObserver | undefined> = useRef();
  const lastPhoto = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && photoList.length < count) {
          //add more pages
          dispatch(changePage(page + 1));
        }
      });
      if (node) observer.current.observe(node);
    },
    [photoList.length, count, page, dispatch]
  );

  return (
    <>
      {notAPhone ? (
        <TablePagination
          align="center"
          component="div"
          count={count}
          page={page}
          rowsPerPageOptions={PAGINATION.OPTIONS}
          onPageChange={(e, newPage: number) => dispatch(changePage(newPage))}
          rowsPerPage={pageSize}
          labelRowsPerPage="Photo per page:"
          onRowsPerPageChange={(e) =>
            dispatch(changePageSize(parseInt(e.target.value, 10)))
          }
        />
      ) : (
        <div ref={lastPhoto}> </div>
      )}
    </>
  );
}
