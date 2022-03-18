import { Fragment, lazy, Suspense } from "react";
import "swiper/scss";
import { Route, Routes } from "react-router-dom";
import Banner from "components/banner/Banner";
import Main from "components/layout/Main";
// import HomePage from "page/HomePage";
// import MoviesPage from "page/MoviesPage";
// import MoviesDetailPage from "page/MovieDetailPage";

const HomePage = lazy(() => import("page/HomePage"));
const MoviesPage = lazy(() => import("page/MoviesPage"));
const MoviesDetailPage = lazy(() => import("page/MovieDetailPage"));
function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviesPage></MoviesPage>}></Route>
            <Route
              path="/movies/:movieId"
              element={<MoviesDetailPage></MoviesDetailPage>}
            ></Route>
            <Route
              path="/movies/:movieId"
              element={<MoviesDetailPage></MoviesDetailPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
