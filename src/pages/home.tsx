import { Grid } from "@mui/material";
import KweetForm from "../components/kweetForm";
import Mentions from "../components/mentions";
import SearchBar from "../components/searchBar";
import TimeLine from "../components/timeLine";
import Follow from "../components/follow";
import Trends from "../components/trends";
import Entry from "../pages/entry";

const Home = () => {
  return (
    <>
      <Grid container spacing={0} direction="column" alignItems="center">
        <SearchBar />
      </Grid>
      <Grid container spacing={0} direction="column" alignItems="center">
        <KweetForm />
      </Grid>
      <Grid container spacing={0} direction="column" alignItems="center">
        {/* <Mentions /> */}
      </Grid>
      <Grid container spacing={0} direction="column" alignItems="center">
        <TimeLine />
      </Grid>
      <Grid container spacing={0} direction="column" alignItems="center">
        <Follow />
      </Grid>
      <Grid container spacing={0} direction="column" alignItems="center">
        <Trends />
      </Grid>
      <Grid container spacing={0} direction="column" alignItems="center">
        {/* <Entry /> */}
      </Grid>
    </>
  );
};

export default Home;
