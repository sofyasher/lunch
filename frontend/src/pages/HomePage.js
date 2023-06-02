import React, { useState } from 'react';
import AddRestaurantForm from '../components/AddRestaurantForm';
import Votes from '../components/Votes';
import { Container, ThemeProvider } from 'react-bootstrap';
import AddVoteForm from '../components/AddVoteForm';

const HomePage = () => {
  let [refreshData, setRefreshData] = useState(0);
  return (
    <ThemeProvider breakpoints={['xl', 'md', 'sm']}>
      <Container className="p-5 bg-light" fluid>
        <AddRestaurantForm setRefreshData={setRefreshData} />
        <AddVoteForm
          refreshData={refreshData}
          setRefreshData={setRefreshData}
        />
        <Votes refreshData={refreshData} />
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;
